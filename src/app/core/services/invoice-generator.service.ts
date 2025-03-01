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

@Injectable({
    providedIn: 'root'
})
export class InvoiceGeneratorService {

    private readonly FONT_NAME = 'dejavu-sans.book';
    private language = 'en';
    private translationCache: { [lang: string]: any } = {}; // Cache storage

    constructor(private pocketbase: PocketBaseService, private compiler: TranslateCompiler, private date: DateFormatPipe, private currency: CurrencyFormatPipe, private fraction: FractionFormatPipe, private number: NumberFormatPipe, private parser: TranslateParser, private sanitizer: DomSanitizer, private translate: TranslateService) { }

    generate = async (id: any, preview = false) => {

        const invoice: any = await this.pocketbase.invoices.getOne(id, { expand: 'customer,user,company,items' });

        this.language = invoice.language || 'en';
        //this.translate.use(invoice.language || 'en')

        const doc: jsPDF | any = new jsPDF('p', 'mm', 'a4');

        const LEFT_MARGIN = 15;
        const RIGHT_MARGIN = 15;
        const TOP_MARGIN = 15;
        const RIGHT_END = doc.internal.pageSize.width - RIGHT_MARGIN;
        const SECOND_COLUMN_MARGIN = 120;
        const FIXED_BANNER_WIDTH = 70;
        const PAGE_BREAK = 255;

        let Y = TOP_MARGIN;

        this.setDefaults(doc, invoice.number, invoice.customerData.name);

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

                const fixedWidth = FIXED_BANNER_WIDTH;
                const aspectRatio = img.naturalHeight / img.naturalWidth;
                let calculatedHeight = fixedWidth * aspectRatio;
                const maxHeight = 25; // Define a maximum height for the image

                if (calculatedHeight > maxHeight) {
                    calculatedHeight = maxHeight;
                    const adjustedWidth = maxHeight / aspectRatio;
                    doc.addImage(img.src, 'PNG', LEFT_MARGIN, TOP_MARGIN, adjustedWidth, calculatedHeight);
                } else {
                    doc.addImage(img.src, 'PNG', LEFT_MARGIN, TOP_MARGIN, fixedWidth, calculatedHeight);
                }

                doc.setTextColor(100);
                doc.setFontSize(16);

                Y += 10;
                doc.text(await this.getTranslation("Invoice"), SECOND_COLUMN_MARGIN, Y);
                doc.text(`${invoice.number}`, RIGHT_END, Y, { align: 'right' });

                Y += 5;
                doc.setFontSize(10);
                doc.text(await this.getTranslation("Issue Date"), SECOND_COLUMN_MARGIN, Y);
                doc.text(this.date.transform(invoice.date), RIGHT_END, Y, { align: 'right' });

                Y += 5;
                doc.text(await this.getTranslation("Due Date"), SECOND_COLUMN_MARGIN, Y);
                doc.text(this.date.transform(invoice.dueDate), RIGHT_END, Y, { align: 'right' });

                Y += 5;
                if (invoice.deliveryDate) {
                    doc.text(await this.getTranslation("Delivery Date"), SECOND_COLUMN_MARGIN, Y);
                    doc.text(this.date.transform(invoice.deliveryDate), RIGHT_END, Y, { align: 'right' });
                }

                // Seller/Buyer section
                Y = 65;
                doc.setFontSize(12);
                doc.setFont(this.FONT_NAME, "bold")
                doc.text(await this.getTranslation("Seller:"), LEFT_MARGIN, Y);
                doc.text(await this.getTranslation("Buyer:"), SECOND_COLUMN_MARGIN, Y);

                doc.setFont(this.FONT_NAME, "normal")
                doc.setFontSize(10);

                // company data
                if (invoice.companyData.name)
                    doc.text(invoice.companyData.name, LEFT_MARGIN, Y += 5);
                if (invoice.companyData.address)
                    doc.text(invoice.companyData.address + ', ', LEFT_MARGIN, Y += 5);
                if (invoice.companyData.postal)
                    doc.text(invoice.companyData.postal + ' ' + invoice.companyData.city, LEFT_MARGIN, Y += 5);
                if (invoice.companyData.country)
                    doc.text(invoice.companyData.country, LEFT_MARGIN, Y += 5);
                if (invoice.companyData.vatID)
                    doc.text(invoice.companyData.vatID, LEFT_MARGIN, Y += 5);

                Y = 65;
                // customer data
                if (invoice.companyData.name)
                    doc.text(invoice.customerData.name, SECOND_COLUMN_MARGIN, Y += 5);
                if (invoice.companyData.address)
                    doc.text(invoice.customerData.address + ', ', SECOND_COLUMN_MARGIN, Y += 5);
                if (invoice.companyData.postal)
                    doc.text(invoice.customerData.postal + ' ' + invoice.customerData.city, SECOND_COLUMN_MARGIN, Y += 5);
                if (invoice.companyData.country)
                    doc.text(invoice.customerData.country, SECOND_COLUMN_MARGIN, Y += 5);
                if (invoice.companyData.vatID)
                    doc.text(invoice.customerData.vatID, SECOND_COLUMN_MARGIN, Y += 5);

                Y = 100;
                // Items table with reduced padding and soft borders
                doc.autoTable({
                    startY: Y,
                    head: [[
                        '#',
                        await this.getTranslation('Product/Service'),
                        await this.getTranslation('Quantity'),
                        await this.getTranslation('Price'),
                        await this.getTranslation('Discount'),
                        await this.getTranslation('Tax'),
                        await this.getTranslation('Total')]],
                    body: invoice.expand.items.map((item: any, i: number) => [
                        i + 1 + '.',
                        item.title,
                        this.number.transform(item.quantity),
                        this.currency.transform(item.price),
                        `${item.discount * 100} %`,
                        `${item.tax * 100} %`,
                        this.currency.transform(item.total)
                    ]),
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
                doc.text(await this.getTranslation("Subtotal:"), RIGHT_END - 55, Y += 6);
                doc.text(this.currency.transform(invoice.subTotal), RIGHT_END, Y, { align: 'right' });

                doc.text(await this.getTranslation("Discount:"), RIGHT_END - 55, Y += 4);
                doc.text(this.currency.transform(invoice.discountValue), RIGHT_END, Y, { align: 'right' });

                if (invoice.tax) {

                    if (invoice.taxValueGroups && Object.keys(invoice.taxValueGroups).length) {
                        Object.keys(invoice.taxValueGroups).forEach(async (taxValue: any) => {
                            doc.text(await this.getTranslation("VAT ({{tax}}%):", { tax: invoice.taxValueGroups[taxValue].tax * 100 }), RIGHT_END - 55, Y += 4);
                            doc.text(this.currency.transform(invoice.taxValueGroups[taxValue].value), RIGHT_END, Y, { align: 'right' });
                        })
                    }

                    if (invoice.taxValueGroups && Object.keys(invoice.taxValueGroups).length > 1) {
                        doc.text(await this.getTranslation("VAT:"), RIGHT_END - 55, Y += 4);
                        doc.text(this.currency.transform(invoice.taxValue), RIGHT_END, Y, { align: 'right' });
                    }

                }

                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.1);
                doc.line(RIGHT_END - 55, Y += 2, RIGHT_END, Y);

                doc.setFont(this.FONT_NAME, "bold")
                doc.text(await this.getTranslation("Total:"), RIGHT_END - 55, Y += 4);
                doc.text(this.currency.transform(invoice.total), RIGHT_END, Y, { align: 'right' });

                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                // payment data
                doc.setFont(this.FONT_NAME, "normal")
                doc.setFontSize(10);

                doc.setFont(this.FONT_NAME, "bold")
                doc.text(await this.getTranslation("Payment"), LEFT_MARGIN, Y += 25);

                doc.setFont(this.FONT_NAME, "normal")
                doc.text(await this.getTranslation("IBAN ") + invoice.paymentData.iban + "" + (invoice.paymentData.reference ? (await this.getTranslation(" Reference ") + invoice.paymentData.reference) : ''), LEFT_MARGIN, Y += 5);


                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                if (invoice.note) {
                    doc.setFont(this.FONT_NAME, "bold")
                    doc.text(await this.getTranslation("Note"), LEFT_MARGIN, Y += 15);

                    doc.setFont(this.FONT_NAME, "normal")
                    const splitNote = doc.splitTextToSize(invoice.note, doc.internal.pageSize.width - RIGHT_MARGIN - LEFT_MARGIN)
                    doc.text(splitNote, LEFT_MARGIN, Y += 5);
                }

                //page break check
                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                doc.setFont(this.FONT_NAME, "bold")
                doc.text(await this.getTranslation("Issued by"), LEFT_MARGIN, Y += 25);


                doc.setFont(this.FONT_NAME, "normal")
                doc.text(invoice.expand.user.name, LEFT_MARGIN, Y += 5);

                // add footer
                this.addFooter(doc, invoice, LEFT_MARGIN, RIGHT_MARGIN);

                // Generate PDF
                var out = doc.output('blob');
                const blob = new Blob([out], { type: 'application/pdf' });

                if (!preview)
                    resolve(doc.save(`${invoice.number}_${invoice.customerData.name}.pdf`));
                else
                    resolve(this.sanitizer.bypassSecurityTrustResourceUrl(`${URL.createObjectURL(blob)}#toolbar=1`))

                reject(null)

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

            const splitNote = doc.splitTextToSize(invoice.companyData?.note, doc.internal.pageSize.width - RIGHT_MARGIN - LEFT_MARGIN)
            doc.text(splitNote, LEFT_MARGIN, doc.internal.pageSize.height - 21, 'left');

            let address = false;
            let legal = false;
            let contact = false;

            const head: any = [[]];

            if (invoice.companyData.address || invoice.companyData.city || invoice.companyData.postal || invoice.companyData.country) {
                head[0].push(await this.getTranslation("Address"));
                address = true;
            }

            if ((invoice.companyData.vatID && invoice.companyData?.vatID?.indexOf('XXXXXX') < 0) || (invoice.companyData.iban && invoice.companyData?.iban?.indexOf('XXXXXX') < 0) || invoice.companyData.switft) {
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
                if (invoice.companyData.country) row3.push(invoice.companyData.country);
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
            doc.addImage('/assets/images/pattern-1.png', 'PNG', 0, footerY, doc.internal.pageSize.width, footerHeight, '', 'NONE', 0);
            doc.addImage('/assets/images/pattern-2.png', 'PNG', 0, 0, doc.internal.pageSize.width, 100, '', 'NONE', 0);

            const fixedWidth_brand = 15;
            const aspectRatio_brand = 296 / 842;

            doc.addImage("assets/images/logo-dark.png", 'PNG', doc.internal.pageSize.width / 2 - 15 / 2, doc.internal.pageSize.height - 10, 15, fixedWidth_brand * aspectRatio_brand);

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
