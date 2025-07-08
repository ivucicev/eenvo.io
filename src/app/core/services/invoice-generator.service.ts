import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PocketBaseService } from './pocket-base.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// @ts-ignore
import * as font from "../../../assets/js/jspdffont.js"
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyFormatPipe, DateFormatPipe, FractionFormatPipe, NumberFormatPipe } from '../pipes/number-format.pipe';
import { TranslateCompiler, TranslateParser, TranslateService } from '@ngx-translate/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvoiceGeneratorService {

    private readonly FONT_NAME = 'dejavu-sans.book';
    private language = 'en';
    private translationCache: { [lang: string]: any } = {}; // Cache storage
    private countries: any = [];
    private isQuote: boolean = false;
    private isPO: boolean = false;

    constructor(private pocketbase: PocketBaseService, private compiler: TranslateCompiler, private date: DateFormatPipe, private currency: CurrencyFormatPipe, private fraction: FractionFormatPipe, private number: NumberFormatPipe, private parser: TranslateParser, private sanitizer: DomSanitizer, private translate: TranslateService, private http: HttpClient) {
        this.loadCountries();
    }

    loadCountries() {
        this.http.get<any[]>('assets/json/country-list.json').subscribe(data => {
            this.countries = data;
        });
    }

    getLocalizedCountryName(localizedName: string) {
        if (!localizedName) return "";
        const country = this.countries.find((c: { countryName: { [key: string]: string } }) =>
            Object.values(c.countryName).includes(localizedName)
        );

        if (!country) return localizedName;

        return country.countryName[this.language] ?? country.country2LetterCode;
    }

    generateAndSave = async (id: any) => {

        const invoice: any = await this.pocketbase.invoices.getOne(id, { expand: 'customer,user,company,items' });

        invoice.companyData = { ...invoice.expand.company, note: invoice.expand.company.additional };
        if (!invoice.paymentData.iban || invoice.paymentData.iban.indexOf('IBXXX') > -1) {
            invoice.paymentData.iban = invoice.expand.company.iban;
        }

        if (!invoice.paymentData.swift) {
            invoice.paymentData.swift = invoice.expand.company.swift;
        }

        this.language = invoice.language || 'en';
        this.isQuote = invoice.isQuote;
        this.isPO = invoice.isPO;

        const doc: jsPDF | any = new jsPDF('p', 'mm', 'a4', true);

        const LEFT_MARGIN = 15;
        const RIGHT_MARGIN = 15;
        const TOP_MARGIN = 15;
        const RIGHT_END = doc.internal.pageSize.width - RIGHT_MARGIN;
        const SECOND_COLUMN_MARGIN = 120;
        const FIXED_BANNER_WIDTH = 70;
        const PAGE_BREAK = 255;
        const TITLE_SPACE = 10;
        const TEXT_SPACE = 5;

        let Y = TOP_MARGIN;

        await this.setDefaults(doc, invoice.number, invoice.customerData.name);

        const img = new Image();

        // dont forget demo
        if (invoice.expand.company.logo) {
            img.src = (this.pocketbase.isDemoSubdomain() ? environment.demo : environment.pocketbase) + '/api/files/companies/' + this.pocketbase.auth.company + '/' + invoice.expand.company.logo;
        }
        else
            img.src = "/assets/images/logo-dark.png";

        return new Promise((resolve, reject) => {
            img.onload = async () => {

                await this.translate.get("Seller:").toPromise();

                // if no logo uploaded do not use logo at all
                if (invoice.expand.company.logo) {
                    const fixedWidth = FIXED_BANNER_WIDTH;
                    const aspectRatio = img.naturalHeight / img.naturalWidth;
                    let calculatedHeight = fixedWidth * aspectRatio;
                    const maxHeight = 25; // Define a maximum height for the image

                    if (calculatedHeight > maxHeight) {
                        calculatedHeight = maxHeight;
                        const adjustedWidth = maxHeight / aspectRatio;
                        doc.addImage(img.src, 'JPEG', LEFT_MARGIN, TOP_MARGIN, adjustedWidth, calculatedHeight, undefined, 'FAST');
                    } else {
                        doc.addImage(img.src, 'JPEG', LEFT_MARGIN, TOP_MARGIN, fixedWidth, calculatedHeight, undefined, 'FAST');
                    }
                }

                doc.setTextColor(100);
                doc.setFontSize(16);

                Y += TITLE_SPACE;
                let type = '';
                if (invoice.type && invoice.type != '-') {
                    type = invoice.type;
                }

                let invoiceType = `${this.isQuote ? await this.getTranslation("Quote") : this.isPO ? await this.getTranslation('Purchse order') : await this.getTranslation("Invoice")} ${type}`;

                doc.text(invoiceType, SECOND_COLUMN_MARGIN, Y);
                doc.text(`${invoice.number}`, RIGHT_END, Y, { align: 'right' });

                Y += TEXT_SPACE;
                doc.setFontSize(10);
                doc.text(await this.getTranslation("Issue Date"), SECOND_COLUMN_MARGIN, Y);
                doc.text(this.date.transform(invoice.date), RIGHT_END, Y, { align: 'right' });

                if (invoice.isQuote) {
                    Y += TEXT_SPACE;
                    const validDays = Math.ceil((new Date(invoice.dueDate).getTime() - new Date(invoice.date).getTime()) / (1000 * 60 * 60 * 24));
                    doc.text(await this.getTranslation("Quote is valid for"), SECOND_COLUMN_MARGIN, Y);
                    doc.text(`${validDays} ${await this.getTranslation('days')}`, RIGHT_END, Y, { align: 'right' });
                } else {
                    Y += TEXT_SPACE;
                    doc.text(await this.getTranslation("Due Date"), SECOND_COLUMN_MARGIN, Y);
                    doc.text(this.date.transform(invoice.dueDate), RIGHT_END, Y, { align: 'right' });
                }

                Y += TEXT_SPACE;
                if (invoice.deliveryDate && !invoice.isQuote && !invoice.isPO) {
                    doc.text(await this.getTranslation("Delivery Date"), SECOND_COLUMN_MARGIN, Y);
                    doc.text(this.date.transform(invoice.deliveryDate), RIGHT_END, Y, { align: 'right' });
                }

                // Seller/Buyer section
                Y = 65;
                doc.setFontSize(12);
                doc.setFont(this.FONT_NAME, "bold")
                doc.text(this.isPO ? await this.getTranslation("Buyer:") : await this.getTranslation("Seller:"), LEFT_MARGIN, Y);
                doc.text(this.isPO ? await this.getTranslation("Vendor:") : await this.getTranslation("Buyer:"), SECOND_COLUMN_MARGIN, Y);

                doc.setFont(this.FONT_NAME, "normal")
                doc.setFontSize(10);

                // company data
                if (invoice.companyData.name)
                    doc.text(invoice.companyData.name, LEFT_MARGIN, Y += TEXT_SPACE);
                if (invoice.companyData.addition)
                    doc.text(invoice.companyData.addition, LEFT_MARGIN, Y += TEXT_SPACE);
                if (invoice.companyData.address)
                    doc.text(invoice.companyData.address + ', ', LEFT_MARGIN, Y += TEXT_SPACE);
                if (invoice.companyData.postal)
                    doc.text(invoice.companyData.postal + ' ' + invoice.companyData.city, LEFT_MARGIN, Y += TEXT_SPACE);
                if (invoice.companyData.country)
                    doc.text(this.getLocalizedCountryName(invoice.companyData.country), LEFT_MARGIN, Y += TEXT_SPACE);
                if (invoice.companyData.vatID)
                    doc.text(invoice.companyData.vatID, LEFT_MARGIN, Y += TEXT_SPACE);

                Y = 65;
                // customer data
                if (invoice.customerData.name)
                    doc.text(invoice.customerData.name, SECOND_COLUMN_MARGIN, Y += TEXT_SPACE);
                if (invoice.customerData.addition)
                    doc.text(invoice.customerData.addition, SECOND_COLUMN_MARGIN, Y += TEXT_SPACE);
                if (invoice.customerData.address)
                    doc.text(invoice.customerData.address + ', ', SECOND_COLUMN_MARGIN, Y += TEXT_SPACE);
                if (invoice.customerData.postal)
                    doc.text(invoice.customerData.postal + ' ' + invoice.customerData.city, SECOND_COLUMN_MARGIN, Y += TEXT_SPACE);
                if (invoice.customerData.country)
                    doc.text(this.getLocalizedCountryName(invoice.customerData.country), SECOND_COLUMN_MARGIN, Y += TEXT_SPACE);
                if (invoice.customerData.vatID)
                    doc.text(invoice.customerData.vatID, SECOND_COLUMN_MARGIN, Y += TEXT_SPACE);

                Y = 100;

                // Items table with reduced padding and soft borders
                const tableHeader = [
                    '#',
                    await this.getTranslation('Product/Service'),
                    await this.getTranslation('Quantity'),
                    await this.getTranslation('Price'),
                    await this.getTranslation('Discount'),
                    await this.getTranslation('Tax'),
                    await this.getTranslation('Total')
                ];

                if (this.isPO && invoice.hideValues) {
                    tableHeader.splice(3, tableHeader.length)
                } else if (!invoice.tax) {
                    tableHeader.splice(5, 1)
                }

                const tableBody = invoice.expand.items.map((item: any, i: number) => {
                    const row = [
                        i + 1 + '.',
                        item.title,
                        this.number.transform(item.quantity),
                        this.currency.transform(item.price),
                        `${item.discount * 100} %`,
                        `${item.tax * 100} %`,
                        this.currency.transform(item.total)
                    ];

                    if (this.isPO && invoice.hideValues) {
                        row.splice(3, row.length)
                    } else if (!invoice.tax) {
                        row.splice(5, 1)
                    }
                    return row;
                })

                doc.autoTable({
                    startY: Y,
                    head: [tableHeader],
                    body: tableBody,
                    headStyles: {
                        1: { cellWidth: 50 },
                        fillColor: [255, 255, 255],
                        textColor: [0, 0, 0],
                        halign: 'center',
                        fontStyle: 'bold',
                        cellPadding: 3,
                        fontSize: 9,
                        font: this.FONT_NAME,
                    },
                    bodyStyles: {
                        font: this.FONT_NAME,
                        fontSize: 9
                    },
                    columnStyles: {
                        0: { halign: 'center' },
                        1: { halign: 'left', cellWidth: 50 },
                        2: { halign: 'right' },
                        3: { halign: 'right' },
                        4: { halign: 'right' },
                        5: { halign: 'right' },
                        6: { halign: 'right' }
                    },
                    theme: 'striped',
                    margin: { left: LEFT_MARGIN, right: RIGHT_MARGIN, bottom: 40 },
                    showHead: 'firstPage',
                });

                Y = doc.autoTable.previous.finalY + 1;

                Y = this.pageBreak(Y, 20, doc, PAGE_BREAK, TOP_MARGIN)

                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.1);
                doc.line(LEFT_MARGIN, Y, RIGHT_END, Y);

                doc.setFontSize(10);

                if (!invoice.hideValues) {
                    doc.text(await this.getTranslation("Subtotal:"), RIGHT_END - 55, Y += TEXT_SPACE);
                    doc.text(this.currency.transform(invoice.subTotal), RIGHT_END, Y, { align: 'right' });

                    doc.text(await this.getTranslation("Discount:"), RIGHT_END - 55, Y += TEXT_SPACE);
                    doc.text(this.currency.transform(invoice.discountValue), RIGHT_END, Y, { align: 'right' });
                }

                if (invoice.tax && !invoice.hideValues) {

                    if (invoice.taxValueGroups && Object.keys(invoice.taxValueGroups).length) {
                        const taxKeys = Object.keys(invoice.taxValueGroups);
                        for (var i = 0; i < taxKeys.length; i++) {
                            const taxValue = taxKeys[i];
                            doc.text(await this.getTranslation("VAT ({{tax}}%):", { tax: invoice.taxValueGroups[taxValue].tax * 100 }), RIGHT_END - 55, Y += TEXT_SPACE);
                            doc.text(this.currency.transform(invoice.taxValueGroups[taxValue].value), RIGHT_END, Y, { align: 'right' });
                        }
                    }

                    if (invoice.taxValueGroups && Object.keys(invoice.taxValueGroups).length > 1) {
                        doc.text(await this.getTranslation("VAT:"), RIGHT_END - 55, Y += TEXT_SPACE);
                        doc.text(this.currency.transform(invoice.taxValue), RIGHT_END, Y, { align: 'right' });
                    }

                }

                if (!invoice.hideValues) {
                    doc.setDrawColor(180, 180, 180);
                    doc.setLineWidth(0.1);
                    doc.line(RIGHT_END - 55, Y += 2, RIGHT_END, Y);
                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Total:"), RIGHT_END - 55, Y += TEXT_SPACE);
                    doc.text(this.currency.transform(invoice.total), RIGHT_END, Y, { align: 'right' });
                }

                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                // payment data
                doc.setFont(this.FONT_NAME, "normal")
                doc.setFontSize(10);

                if (invoice.paymentType && !this.isPO) {
                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Payment type"), LEFT_MARGIN, Y += TITLE_SPACE);

                    doc.setFont(this.FONT_NAME, "normal");
                    doc.text(await this.getTranslation(invoice.paymentType), LEFT_MARGIN, Y += TEXT_SPACE);

                }

                if (!this.isPO && (invoice.paymentData.reference || invoice.paymentData.iban || invoice.paymentData.swift)) {

                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Payment"), LEFT_MARGIN, Y += TITLE_SPACE);

                    doc.setFont(this.FONT_NAME, "normal")

                    let paymentText = '';

                    if (invoice.paymentData.reference) {
                        paymentText = await this.getTranslation("Reference ") + invoice.paymentData.reference;
                    }

                    if (invoice.paymentData.iban) {
                        paymentText = await this.getTranslation("IBAN ") + invoice.paymentData.iban + " " + paymentText;
                    }
                    if (invoice.paymentData.swift) {
                        paymentText = await this.getTranslation("SWIFT ") + invoice.paymentData.swift + " " + paymentText;
                    }

                    doc.text(paymentText, LEFT_MARGIN, Y += TEXT_SPACE);
                }

                if (this.isPO) {
                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Shipping"), LEFT_MARGIN, Y += TITLE_SPACE);
                    doc.setFont(this.FONT_NAME, "normal");
                    doc.text(invoice.poShipping, LEFT_MARGIN, Y += TEXT_SPACE);
                }

                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                if (invoice.note) {
                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Note"), LEFT_MARGIN, Y += TITLE_SPACE);

                    doc.setFont(this.FONT_NAME, "normal")
                    const splitNote = doc.splitTextToSize(invoice.note, doc.internal.pageSize.width - RIGHT_MARGIN - LEFT_MARGIN)
                    doc.text(splitNote, LEFT_MARGIN, Y += TEXT_SPACE);

                    // fix multiline text
                    if (splitNote.length)
                        Y += splitNote.length + TITLE_SPACE;
                }

                //page break check
                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                doc.setFont(this.FONT_NAME, "bold")
                doc.text(await this.getTranslation("Issued by"), LEFT_MARGIN, Y += TITLE_SPACE);

                doc.setFont(this.FONT_NAME, "normal")
                doc.text(invoice.expand.user.name, LEFT_MARGIN, Y += TEXT_SPACE);

                // signature part
                if (this.isPO) {

                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Approved by"), RIGHT_END - 55, Y);
                    doc.setFont(this.FONT_NAME, "normal")

                    //left
                    doc.setDrawColor(180, 180, 180);
                    doc.setLineWidth(0.1);
                    doc.line(0 + LEFT_MARGIN, Y += 15, LEFT_MARGIN + 55, Y);


                    //right
                    doc.setDrawColor(180, 180, 180);
                    doc.setLineWidth(0.1);
                    doc.line(RIGHT_END - 55, Y, RIGHT_END, Y);
                }

                // add footer
                await this.addFooter(doc, invoice, LEFT_MARGIN, RIGHT_MARGIN);

                // Generate PDF
                const name = `${invoice.number}_${new Date().getFullYear()}.pdf`;
                const pdfBlob = doc.output('blob');
                const formData = new FormData();
                formData.append('pdfUrl', pdfBlob, name);
                const savedInvoice: any = await this.pocketbase.invoices.update(invoice.id, formData, { '$autoCancel': false, headers: { "notoast": "1" } });

                resolve(savedInvoice.pdfUrl);

            }
        })

    }

    pageBreak(Y: number, modifier: number, doc: jsPDF, PAGE_BREAK: number, TOP_MARGIN: number) {
        if (Y + modifier > PAGE_BREAK) {
            doc.addPage();
            Y = TOP_MARGIN;
        }
        return Y;
    }

    async addFooter(doc: any, invoice: any, LEFT_MARGIN: any, RIGHT_MARGIN: any) {

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 0; i <= pageCount; i++) {

            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(100);

            if (invoice.companyData?.note) {
                const splitNote = doc.splitTextToSize(invoice.companyData?.note, doc.internal.pageSize.width - RIGHT_MARGIN - LEFT_MARGIN)
                doc.text(splitNote, LEFT_MARGIN, doc.internal.pageSize.height - 21, 'left');
            }

            let address = false;
            let legal = false;
            let contact = false;

            const head: any = [[]];

            if (invoice.companyData.address || invoice.companyData.city || invoice.companyData.postal || invoice.companyData.country) {
                head[0].push(await this.getTranslation("Address"));
                address = true;
            }

            if ((invoice.companyData.vatID && invoice.companyData?.vatID?.indexOf('XXXXXX') < 0) || (invoice.companyData.iban && invoice.companyData?.iban?.indexOf('XXXXXX') < 0) || invoice.companyData.swift) {
                head[0].push(await this.getTranslation("Legal"));
                legal = true;
            }

            if (invoice.companyData?.email || invoice.companyData?.phone || invoice.companyData.web) {
                head[0].push(await this.getTranslation("Contact"));
                contact = true;
            }

            let row1: any = [];
            let row2: any = [];
            let row3: any = [];
            let body: any = [row1, row2, row3];

            // Check if address data is complete
            if (address) {
                if (invoice.companyData.address) row1.push(invoice.companyData.address + ', ');
                else row1.push('')
                if (invoice.companyData.postal || invoice.companyData.city) row2.push(invoice.companyData.postal + ' ' + invoice.companyData.city + ', ');
                else row2.push('')
                if (invoice.companyData.country) row3.push(this.getLocalizedCountryName(invoice.companyData.country));
                else row3.push('')
            }

            // Check if legal data is complete
            const legalParts = [];
            if (legal) {
                if (invoice.companyData.vatID) row1.push(await this.getTranslation("VATID: ") + invoice.companyData.vatID);
                else row1.push('')
                if (invoice.companyData.iban) row2.push(await this.getTranslation("IBAN: ") + invoice.companyData.iban);
                else row2.push('')
                if (invoice.companyData.swift) row3.push(await this.getTranslation("SWIFT: ") + invoice.companyData.swift);
                else row3.push('')
            }

            // Check if contact data is complete
            const contactParts = [];
            if (contact) {
                if (invoice.companyData.phone) row1.push(await this.getTranslation("Mobile: ") + invoice.companyData.phone);
                else row1.push('')
                if (invoice.companyData.email) row2.push(await this.getTranslation("Email: ") + invoice.companyData.email);
                else row2.push('')
                if (invoice.companyData.web) row3.push(await this.getTranslation("Web: ") + invoice.companyData.web);
                else row3.push('')
            }

            doc.autoTable({
                startY: doc.internal.pageSize.height - 40,
                head: head,
                body: body,
                headStyles: {
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    halign: 'left',
                    fontStyle: 'bold',
                    cellPadding: 0
                },
                bodyStyles: {
                    fillColor: [255, 255, 255],
                    textColor: 100,
                    halign: 'left',
                    cellPadding: 0
                },
                margin: { left: LEFT_MARGIN, right: RIGHT_MARGIN, bottom: 0 },
                theme: "plain",
                styles: { fontSize: 8, halign: "center" }
            });

            const footerHeight = 100;
            const footerY = doc.internal.pageSize.height - footerHeight;

            doc.addImage('/assets/images/pattern-1.png', 'JPEG', 0, footerY, doc.internal.pageSize.width, footerHeight, undefined, 'FAST', 0);
            doc.addImage('/assets/images/pattern-2.png', 'JPEG', 0, 0, doc.internal.pageSize.width, 100, undefined, 'FAST', 0);

            const fixedWidth_brand = 15;
            const aspectRatio_brand = 296 / 842;

            doc.addImage("assets/images/logo-dark.png", 'JPEG', doc.internal.pageSize.width / 2 - 15 / 2, doc.internal.pageSize.height - 10, 15, fixedWidth_brand * aspectRatio_brand, undefined, 'FAST');

            doc.setFontSize(6);
            doc.text(await this.getTranslation("Powered by eenvo.io – Your Smart & Effortless Invoicing Solution."), doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 2, 'center');
        }

    }

    async setDefaults(doc: any, number: string, name: string) {
        // Set document properties
        doc.setProperties({
            title: await this.getTranslation(`Invoice ${number}`),
            subject: await this.getTranslation('invoice for ') + name,
            author: 'eenvo.io'
        });

        doc.addFileToVFS('dejavu-sans.book-normal.ttf', font.default.fontNormal);
        doc.addFileToVFS('dejavu-sans.book-bold.ttf', font.default.fontBold);

        doc.addFont('dejavu-sans.book-normal.ttf', this.FONT_NAME, 'normal');
        doc.addFont('dejavu-sans.book-bold.ttf', this.FONT_NAME, 'bold');

        doc.setFont(this.FONT_NAME)
    }

    private loadTranslations(): Observable<any> {
        if (this.translationCache[this.language]) {
            return of(this.translationCache[this.language]); // Return cached translations
        }

        return this.translate.getTranslation(this.language).pipe(
            map(translations => {
                this.translationCache[this.language] = translations; // Store in cache
                return translations;
            })
        );
    }

    getTranslation(key: string, params?: any): Promise<string | undefined> {
        return this.loadTranslations().pipe(
            map(translations => {
                const rawText = translations[key] || key;
                return params ? this.parser.interpolate(rawText, params) : rawText;
            })
        ).toPromise();
    }
}
