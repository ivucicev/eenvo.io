import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// @ts-ignore
import * as font from "../../../assets/js/jspdffont.js"
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class InvoiceGeneratorService {

    constructor(private pocketbase: PocketBaseService, private sanitizer: DomSanitizer) { }

    generate = async (id: any, preview = false) => {

        const invoice: any = await this.pocketbase.pb.collection('invoices').getOne(id, { expand: 'customer,company,items' })
        
        const doc: any = new jsPDF();

        // Set document properties
        doc.setProperties({
            title: `Invoice ${invoice.number}`,
            subject: 'invoice for' + invoice.companyData.name,
            author: 'eenvo.io'
        });

        const img = new Image();
        img.src = environment.pocketbase + '/api/files/companies/' + this.pocketbase.auth.company + '/' + invoice.expand.company.logo;

        return new Promise((resolve, reject) => {
            img.onload = () => {
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
    
                doc.addFileToVFS('dejavu-sans.book-normal.ttf', font.default.fontNormal);
                doc.addFileToVFS('dejavu-sans.book-bold.ttf', font.default.fontBold);
    
                doc.addFont('dejavu-sans.book-normal.ttf', 'dejavu-sans.book', 'normal');
                doc.addFont('dejavu-sans.book-bold.ttf', 'dejavu-sans.book', 'bold');
    
                doc.setFont("dejavu-sans.book")
    
                let imgWidth = img.naturalWidth;
                let imgHeight = img.naturalHeight;
    
                const fixedWidth = 70;
                const aspectRatio = img.naturalHeight / img.naturalWidth;
                const calculatedHeight = fixedWidth * aspectRatio;
    
                doc.addImage(environment.pocketbase + '/api/files/companies/' + this.pocketbase.auth.company + '/' + invoice.expand.company.logo, 'PNG', 20, 15, fixedWidth, calculatedHeight);
    
                // Invoice details
                doc.setFontSize(10);
                doc.setTextColor(100);
    
                doc.setFontSize(16);
                doc.text("Invoice", 120, 25);
                doc.text(`${invoice.number}`, 189, 25, { align: 'right' });
    
                doc.setFontSize(10);
                doc.text(`Issue Date`, 120, 30);
                doc.text(`${new Date(invoice.date).toLocaleDateString()}`, 189, 30, { align: 'right' });
    
                doc.text(`Due Date`, 120, 35);
                doc.text(`${new Date(invoice.dueDate).toLocaleDateString()}`, 189, 35, { align: 'right' });
    
                doc.text(`Delivery Date`, 120, 40);
                doc.text(`${new Date(invoice.deliveryDate).toLocaleDateString()}`, 189, 40, { align: 'right' });
    
    
                // Seller/Buyer section
                doc.setFontSize(12);
                doc.setFont("dejavu-sans.book", "bold")
                doc.text("Seller:", 20, 65);
                doc.text("Buyer:", 120, 65);
    
                doc.setFont("dejavu-sans.book", "normal")
                doc.setFontSize(10);
    
                // company data
                doc.text(invoice.companyData.name, 20, 70);
                //doc.text(invoice.companyData.address?.split(',')[0].replace('\n', '').replace('\r', ''), 20, 75);
                //doc.text(invoice.companyData.address?.split(',')[1].replace('\n', '').replace('\r', '') || '', 20, 80);
                doc.text(invoice.companyData.vatID, 20, 90);
    
                // customer data
                doc.text(invoice.customerData.name, 120, 70);
                //doc.text(invoice.customerData.address?.split(',')[0].replace('\n', '').replace('\r', ''), 120, 75);
                //doc.text(invoice.customerData.address?.split(',')[1].replace('\n', '').replace('\r', '') || '', 120, 80);
                doc.text(invoice.customerData.vatID, 120, 90);
    
                // Items table with reduced padding and soft borders
                doc.autoTable({
                    startY: 100,
                    head: [['#', 'Product/Service', 'Price', 'Quantity', 'Discount', 'Tax', 'Total']],
                    body: invoice.expand.items.map((item: any, i: number) => [
                        i + 1 + '.',
                        item.title,
                        item.price.toFixed(2) + ' €',
                        item.quantity.toFixed(2) + ' h',
                        item.discount.toFixed(2) + ' %',
                        item.tax.toFixed(2) + ' %',
                        item.total.toFixed(2) + ' €'
                    ]),
                    headStyles: {
                        fillColor: [255, 255, 255],
                        textColor: [0, 0, 0],
                        halign: 'center',
                        fontStyle: 'bold',
                        cellPadding: 3
                    },
                    columnStyles: {
                        0: { halign: 'center' },
                        1: { halign: 'left' },
                        2: { halign: 'right' },
                        3: { halign: 'right' },
                        4: { halign: 'right' },
                        5: { halign: 'right' },
                        6: { halign: 'right' }
                    },
                    theme: 'striped',
                    margin: { left: 20, right: 20, bottom: 40 },
                    showHead: 'firstPage',
                    didDrawPage: (data: any) => {
                        doc.setFontSize(10);
                        //const pageCount = doc.internal.getNumberOfPages();
                        /*doc.text(`Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
                            data.settings.margin.left,
                            doc.internal.pageSize.height - 10);*/
                        // Add background pattern in footer area
                        //const splitNote = doc.splitTextToSize(invoice.note.replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', ''), doc.internal.pageSize.getWidth() - 40)
                        
                        doc.setFontSize(8);
                        const splitNote = doc.splitTextToSize(invoice.note.replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', ''), doc.internal.pageSize.getWidth() - 40)
                        //const splitNote = this.splitTextIntoChunks(invoice.note);
              
                        doc.setTextColor(100);
                        doc.text(splitNote, 20 /*(doc.internal.pageSize.getWidth()) / 2*/, doc.internal.pageSize.height - 23, 'left');
              
                        
                        doc.autoTable({
                            startY: doc.internal.pageSize.height - 40, // Position at the bottom
                            head: [["Address", "Legal", "Contact"]],
                            body: [
                                [invoice.companyData.address + ', ', "VATID: " + invoice.companyData.vatID, "Phone: " + invoice.companyData.phone],
                                [invoice.companyData.postal + ' ' + invoice.companyData.city + ', ', "IBAN: " + invoice.companyData.iban, "Mobile: " + invoice.companyData.phone],
                                [invoice.companyData.country, "SWIFT: " + invoice.companyData.vatID, "email: " + invoice.companyData.phone],
                                //[{ colSpan: 3, content: splitNote }]
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
                                textColor: 100,//[0, 0, 0],
                                halign: 'left',
                                cellPadding: 0
                            },
                            margin: { left: 20, right: 20, bottom: 0 },
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
                        doc.text("Powered by eenvo.io – Your Smart & Effortless Invoicing Solution.", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 2, 'center');
    
                    }
                });
    
    
                doc.setDrawColor(180, 180, 180); // Light gray (RGB)
                doc.setLineWidth(0.1);
                doc.line(20, doc.autoTable.previous.finalY + 1, doc.internal.pageSize.width - 20, doc.autoTable.previous.finalY + 1);
    
                // Totals section aligned with table
                const finalY = doc.autoTable.previous.finalY + 3;
                const rightColumnX = 189;//doc.autoTable.previous.finalX - 40; // Align with table's last column
    
                doc.setFontSize(10);
                doc.text("Subtotal:", rightColumnX - 40, finalY + 6);
                doc.text(`${invoice.total.toFixed(2)} €`, rightColumnX, finalY + 6, { align: 'right' });
    
                doc.text("Discount:", rightColumnX - 40, finalY + 11);
                doc.text(`${(invoice.total * 0.25).toFixed(2)} €`, rightColumnX, finalY + 11, { align: 'right' });
    
                doc.text("VAT:", rightColumnX - 40, finalY + 16);
                doc.text(`${(invoice.total * 0.25).toFixed(2)} €`, rightColumnX, finalY + 16, { align: 'right' });
    
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.1);
                doc.line(rightColumnX - 40, finalY + 18, rightColumnX, finalY + 18);
    
                doc.setFont("dejavu-sans.book", "bold")
                doc.text("Total:", rightColumnX - 40, finalY + 23);
                doc.text(`${invoice.total.toFixed(2)} €`, rightColumnX, finalY + 23, { align: 'right' });
    
                // Add footer content
                doc.setFont("dejavu-sans.book", "normal")
                doc.setFontSize(8);
                doc.setTextColor(100);
    
                // Footer text sections
                //doc.text("Bank details: IBAN " + invoice.paymentData.iban, 20, doc.internal.pageSize.height - 20);
    
                // Terms and conditions
                /* const termsText = "Terms & Conditions: This invoice is subject to our standard terms and conditions. " +
                    "Late payments may incur additional charges. All prices are in EUR unless otherwise stated. " +
                    "Please include the invoice number in all correspondence.";*/
    
                doc.setFontSize(7);
                // const splitTerms = doc.splitTextToSize(termsText, doc.internal.pageSize.width - 40);
                //doc.text(splitTerms, 20, doc.internal.pageSize.height - 10);
    
                // Company details at the very bottom
                doc.setFontSize(7);
                /*const companyText = "Bytewise d.o.o. | Address: Example Street 123, City | VAT: HR12345678901 | " +
                    "Phone: +385 123 456 789 | Email: contact@bytewise.hr | www.bytewise.hr";
                doc.text(companyText, 20, doc.internal.pageSize.height - 10); */
    
                // Generate PDF
                var out = doc.output('blob');
                const blob = new Blob([out], { type: 'application/pdf' });
    
                if (!preview) {
                    doc.save(`${invoice.number}_${invoice.customerData.name}.pdf`);
                    resolve(true);
                }
                else {
                    const url = this.sanitizer.bypassSecurityTrustResourceUrl(`${URL.createObjectURL(blob)}#toolbar=1`)
                    resolve(url)
                }

                reject(null)
    
            }
        })

    }
}
