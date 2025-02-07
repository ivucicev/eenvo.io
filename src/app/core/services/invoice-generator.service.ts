import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PocketBaseService } from './pocket-base.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// @ts-ignore
import * as font from "../../../assets/js/jspdffont.js"
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyFormatPipe, DateFormatPipe, FractionFormatPipe, NumberFormatPipe } from '../pipes/number-format.pipe';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class InvoiceGeneratorService {

    constructor(private pocketbase: PocketBaseService, private date: DateFormatPipe, private currency: CurrencyFormatPipe, private fraction: FractionFormatPipe, private number: NumberFormatPipe, private sanitizer: DomSanitizer, private translate: TranslateService) { }

    generate = async (id: any, preview = false) => {

        const invoice: any = await this.pocketbase.pb.collection('invoices').getOne(id, { expand: 'customer,user,company,items' });

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
        img.src = environment.pocketbase + '/api/files/companies/' + this.pocketbase.auth.company + '/' + invoice.expand.company.logo;

        return new Promise((resolve, reject) => {
            img.onload = async () => {
                
                await this.translate.get("Seller:").toPromise();
                
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                let imgWidth = img.naturalWidth;
                let imgHeight = img.naturalHeight;

                const fixedWidth = FIXED_BANNER_WIDTH;
                const aspectRatio = img.naturalHeight / img.naturalWidth;
                const calculatedHeight = fixedWidth * aspectRatio;

                doc.addImage(environment.pocketbase + '/api/files/companies/' + this.pocketbase.auth.company + '/' + invoice.expand.company.logo, 'PNG', LEFT_MARGIN, TOP_MARGIN, fixedWidth, calculatedHeight);

                doc.setTextColor(100);
                doc.setFontSize(16);

                Y += 10;
                doc.text(this.translate.instant("Invoice"), SECOND_COLUMN_MARGIN, Y);
                doc.text(`${invoice.number}`, RIGHT_END, Y, { align: 'right' });

                Y += 5;
                doc.setFontSize(10);
                doc.text(this.translate.instant("Issue Date"), SECOND_COLUMN_MARGIN, Y);
                doc.text(this.date.transform(invoice.date), RIGHT_END, Y, { align: 'right' });

                Y += 5;
                doc.text(this.translate.instant("Due Date"), SECOND_COLUMN_MARGIN, Y);
                doc.text(this.date.transform(invoice.dueDate), RIGHT_END, Y, { align: 'right' });

                console.log(invoice.dueDate, this.date.transform(invoice.dueDate))
                Y += 5;
                if (invoice.deliveryDate) {
                    doc.text(this.translate.instant("Delivery Date"), SECOND_COLUMN_MARGIN, Y);
                    doc.text(this.date.transform(invoice.deliveryDate), RIGHT_END, Y, { align: 'right' });
                }

                // Seller/Buyer section
                Y = 65;
                doc.setFontSize(12);
                doc.setFont("dejavu-sans.book", "bold")
                doc.text(this.translate.instant("Seller:"), LEFT_MARGIN, Y);
                doc.text(this.translate.instant("Buyer:"), SECOND_COLUMN_MARGIN, Y);

                doc.setFont("dejavu-sans.book", "normal")
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
                        this.translate.instant('Product/Service'), 
                        this.translate.instant('Price'), 
                        this.translate.instant('Quantity'), 
                        this.translate.instant('Discount'), 
                        this.translate.instant('Tax'), 
                        this.translate.instant('Total')]],
                    body: invoice.expand.items.map((item: any, i: number) => [
                        i + 1 + '.',
                        item.title,
                        this.currency.transform(item.price),
                        this.number.transform(item.quantity),
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
                        font: 'dejavu-sans.book',
                    },
                    bodyStyles: {
                        font: 'dejavu-sans.book',
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
                doc.text(this.translate.instant("Subtotal:"), RIGHT_END - 55, Y += 6);
                doc.text(this.currency.transform(invoice.subTotal), RIGHT_END, Y, { align: 'right' });

                doc.text(this.translate.instant("Discount:"), RIGHT_END - 55, Y += 4);
                doc.text(this.currency.transform(invoice.discountValue), RIGHT_END, Y, { align: 'right' });

                if (invoice.tax) {
                    doc.text(this.translate.instant("VAT:"), RIGHT_END - 55, Y += 4);
                    doc.text(this.currency.transform(invoice.taxValue), RIGHT_END, Y, { align: 'right' });
                }

                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.1);
                doc.line(RIGHT_END - 55, Y += 2, RIGHT_END, Y);

                doc.setFont("dejavu-sans.book", "bold")
                doc.text(this.translate.instant("Total:"), RIGHT_END - 55, Y += 4);
                doc.text(this.currency.transform(invoice.total), RIGHT_END, Y, { align: 'right' });

                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                // payment data
                doc.setFont("dejavu-sans.book", "normal")
                doc.setFontSize(10);

                doc.setFont("dejavu-sans.book", "bold")
                doc.text(this.translate.instant("Payment"), LEFT_MARGIN, Y += 25);

                doc.setFont("dejavu-sans.book", "normal")
                doc.text(this.translate.instant("IBAN ") + invoice.paymentData.iban + "" + (invoice.paymentData.reference ? (this.translate.instant(" Reference ") + invoice.paymentData.reference) : ''), LEFT_MARGIN, Y += 5);


                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                if (invoice.note) {
                    doc.setFont("dejavu-sans.book", "bold")
                    doc.text(this.translate.instant("Note"), LEFT_MARGIN, Y += 15);

                    doc.setFont("dejavu-sans.book", "normal")
                    const splitNote = doc.splitTextToSize(invoice.note, doc.internal.pageSize.width - RIGHT_MARGIN - LEFT_MARGIN)
                    doc.text(splitNote, LEFT_MARGIN, Y += 5);
                }

                //page break check
                Y = this.pageBreak(Y, 30, doc, PAGE_BREAK, TOP_MARGIN)

                doc.setFont("dejavu-sans.book", "bold")
                doc.text(this.translate.instant("Issued by"), LEFT_MARGIN, Y += 25);


                doc.setFont("dejavu-sans.book", "normal")
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

    addFooter(doc: any, invoice: any, LEFT_MARGIN: any, RIGHT_MARGIN: any) {

        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 0; i <= pageCount; i++) {
            
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(100);

            const splitNote = doc.splitTextToSize(invoice.companyData?.note, doc.internal.pageSize.width - RIGHT_MARGIN - LEFT_MARGIN)
            doc.text(splitNote, LEFT_MARGIN, doc.internal.pageSize.height - 21, 'left');

            doc.autoTable({
                startY: doc.internal.pageSize.height - 40,
                head: [[this.translate.instant("Address"), this.translate.instant("Legal"), this.translate.instant("Contact")]],
                body: [
                    [invoice.companyData.address + ', ', this.translate.instant("VATID: ") + invoice.companyData.vatID, this.translate.instant("Mobile: ") + invoice.companyData.phone],
                    [invoice.companyData.postal + ' ' + invoice.companyData.city + ', ', this.translate.instant("IBAN: ") + invoice.companyData.iban, this.translate.instant("Email: ") + invoice.companyData.email],
                    [invoice.companyData.country, this.translate.instant("SWIFT: ") + invoice.companyData.vatID, this.translate.instant("Web: ") + invoice.companyData.web],
                ],
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
            doc.text(this.translate.instant("Powered by eenvo.io – Your Smart & Effortless Invoicing Solution."), doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 2, 'center');
        }

    }

    setDefaults(doc: any, number: string, name: string) {
        // Set document properties
        doc.setProperties({
            title: this.translate.instant(`Invoice ${number}`),
            subject: this.translate.instant('invoice for ') + name,
            author: 'eenvo.io'
        });

        doc.addFileToVFS('dejavu-sans.book-normal.ttf', font.default.fontNormal);
        doc.addFileToVFS('dejavu-sans.book-bold.ttf', font.default.fontBold);

        doc.addFont('dejavu-sans.book-normal.ttf', 'dejavu-sans.book', 'normal');
        doc.addFont('dejavu-sans.book-bold.ttf', 'dejavu-sans.book', 'bold');

        doc.setFont("dejavu-sans.book")
    }
}
