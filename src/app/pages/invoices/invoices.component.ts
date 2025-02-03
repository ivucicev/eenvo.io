import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormsModule, NgModel } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastService } from '../../core/services/toast.service';
import { CountUpModule } from 'ngx-countup';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

// @ts-ignore
import * as font from "../../../assets/js/jspdffont.js"

@Component({
    selector: 'app-invoices',
    standalone: true,
    imports: [DxDataGridModule, TranslateModule, DxButtonModule, DxPopupModule, InvoiceDetailComponent, DxSelectBoxModule, FormsModule, CountUpModule],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

    public data: any;
    public allData: any;
    public countries: any = []
    public moreInfoButtonOptions;
    public emailButtonOptions;
    public closeButtonOptions;
    public invoicePopupVisible = false;
    public currentInvoice: any = null;
    public stats: any = {};
    public currentDate = new Date().toISOString();
    public selectedYear = new Date().getFullYear();
    public currentYear = new Date().getFullYear();

    public filter = {
        all: true,
        paid: false,
        pending: false,
        overdue: false
    }

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    @ViewChild('invoiceDetail')
    public detail?: InvoiceDetailComponent;

    constructor(private pocketbase: PocketBaseService, private sanitizer: DomSanitizer, private toast: ToastService) {
        this.moreInfoButtonOptions = {
            text: 'More info',
            onClick: () => {

            },
        };
        this.emailButtonOptions = {
            icon: 'email',
            stylingMode: 'contained',
            text: 'Send',
            onClick: () => {

            },
        };
        this.closeButtonOptions = {
            text: 'Close',
            stylingMode: 'outlined',
            type: 'normal',
            onClick: () => {
                this.invoicePopupVisible = false;
            },
        };

        this.getData();
    }

    async editInvoice(e: any) {
        this.currentInvoice = e.data;
        this.invoicePopupVisible = true;
    }

    async newInvoice() {
        this.currentInvoice = null;
        this.invoicePopupVisible = true;
    }

    isMarkAsPayedVisible({ row }: any) {
        return !row.data.isPayed;
    }

    markAsPayed = async (e: DxDataGridTypes.ColumnButtonClickEvent) => {

        await this.pocketbase.pb.collection('invoices').update(e.row?.data.id, {
            'isPayed': true,
            'paymentDate': new Date()
        })
        if (e.row?.data) {
            e.row.data.isPayed = true;
            e.row.data.paymentDate = new Date()
        }
        this.toast.success();
        e?.event?.preventDefault();
    };


    setFilter(all = false, paid = false, pending = false, overdue = false) {
        this.filter = {
            all,
            pending,
            paid,
            overdue
        }
        if (all)
            this.data = [...this.allData]
        if (pending)
            this.data = [...this.allData.filter((f: any) => !f.isPayed && (!f.dueDate || new Date(f.dueDate) >= new Date()))]
        if (paid)
            this.data = [...this.allData.filter((f: any) => f.isPayed)]
        if (overdue)
            this.data = [...this.allData.filter((f: any) => !f.isPayed && f.dueDate && new Date(f.dueDate) <= new Date())]
    }

    async getData() {

        const thisYear = new Date(this.selectedYear, 0, 1).toISOString();//.slice(0, 10);
        const currentYearEnd = new Date(+this.selectedYear + 1, 0, 1).toISOString();//.slice(0, 10);

        this.allData = await this.pocketbase.pb.collection('invoices').getFullList({
            expand: 'customer,user',
            filter: `date > "${thisYear}" && date <= "${currentYearEnd}"`,
            sort: '-date'
        });

        this.data = [...this.allData];
        if (this.selectedYear == this.currentYear)
            this.calculateInvoiceStats();
    }

    async newRow(e: any) {

    }

    async saved(e: any) {
        if (e.changes[0].type == 'remove') {
            await this.pocketbase.pb.collection('invoices').delete(e.changes[0].key.id);
        }
        this.reload();
    }

    async delete() {
        if (this.currentInvoice?.id)
            await this.pocketbase.pb.collection('invoices').delete(this.currentInvoice?.id);
        this.close();
        this.reload();
    }

    async download() {
        this.close();
    }

    async send() {
        this.close();
    }

    async close() {
        this.invoicePopupVisible = false;
        this.reload();
    }

    async reload() {
        this.grid?.instance.cancelEditData();
        this.getData();
    }

    onEditorPreparing(e: any) {
        if (e.dataField === "created" || e.dataField === "updated") {
            e.editorOptions.disabled = true;
        }
    }

    calculateInvoiceStats() {

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Normalize to start of day

        const last31DaysStart = new Date(today);
        last31DaysStart.setDate(today.getDate() - 31);

        const prev32To63DaysStart = new Date(today);
        prev32To63DaysStart.setDate(today.getDate() - 63);

        const prev32To63DaysEnd = new Date(today);
        prev32To63DaysEnd.setDate(today.getDate() - 32);

        const currentYearStart = new Date(today.getFullYear(), 0, 1); // Start of current year

        let totalPaidLast31 = 0;
        let totalUnpaidLast31 = 0;
        let totalPaidPrevPeriod = 0;
        let totalUnpaidPrevPeriod = 0;
        let totalLast31 = 0;
        let unpaidCount = 0;
        let paidCount = 0;
        let totalLast31Count = 0;
        let totalPrevPeriod = 0;

        this.data.forEach((invoice: any) => {
            const date = new Date(invoice.date);
            const isPaid = invoice.isPayed;
            const total = invoice.total;

            // Last 31 days
            if (isPaid && date >= last31DaysStart) {
                totalPaidLast31 += total;
                totalLast31 += total;
                totalLast31Count++;
                paidCount++;
            }

            if (!isPaid && date >= last31DaysStart) {
                totalUnpaidLast31 += total;
                totalLast31 += total;
                totalLast31Count++;
                unpaidCount++;
            }

            // Previous 32-63 days period
            if (date >= prev32To63DaysStart && date <= prev32To63DaysEnd && isPaid) {
                totalPaidPrevPeriod += total;
                totalPrevPeriod += total;
            }

            if (date >= prev32To63DaysStart && date <= prev32To63DaysEnd && isPaid) {
                totalUnpaidPrevPeriod += total;
                totalPrevPeriod += total;
            }
        });

        // Calculate percentage change
        let percentageChange = 0;
        if (totalPaidPrevPeriod !== 0) {
            percentageChange = ((totalPaidLast31 - totalPaidPrevPeriod) / totalPaidPrevPeriod) * 100;
        }

        let percentageUnpaidChange = 0;
        if (totalUnpaidPrevPeriod !== 0) {
            percentageUnpaidChange = ((totalUnpaidLast31 - totalUnpaidPrevPeriod) / totalUnpaidPrevPeriod) * 100;
        }

        let totalChange = 0;
        if (totalPrevPeriod !== 0) {
            totalChange = ((totalLast31 - totalPrevPeriod) / totalPrevPeriod) * 100;
        }

        this.stats = {
            totalPaidLast31: totalPaidLast31.toFixed(2),
            totalUnpaidLast31: totalUnpaidLast31.toFixed(2),
            percentageUnpaidChange: percentageUnpaidChange.toFixed(2),
            percentageChange: percentageChange.toFixed(2),
            totalLast31: totalLast31.toFixed(2),
            totalChange: totalChange.toFixed(2),
            totalChangePrefix: totalPrevPeriod > totalLast31 ? '-' : '+',
            unpaidChangePrefix: totalUnpaidPrevPeriod > totalUnpaidLast31 ? '-' : '+',
            paidChangePrefix: totalPaidPrevPeriod > totalPaidLast31 ? '-' : '+',
            unpaidCount,
            paidCount,
            totalLast31Count
        };

    }

    downloadPDF = (e: any) => {
        e?.event?.preventDefault();
        this.generate(e.row?.data?.id)
    }

    public pdf: any;

    async generate(id: any) {

        const invoice: any = await this.pocketbase.pb.collection('invoices').getOne(id, { expand: 'customer,company,items' })

        console.log(invoice)
        const doc: any = new jsPDF();

        // Set document properties
        doc.setProperties({
            title: `Invoice ${invoice.number}`,
            subject: 'Invoice Document',
            author: 'Bytewise'
        });

        const img = new Image();
        img.src = environment.pocketbase + '/api/files/companies/' + this.pocketbase.auth.company + '/' + invoice.expand.company.logo;

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
            doc.text(invoice.companyData.address.split(',')[0], 20, 75);
            doc.text(invoice.companyData.address.split(',')[1] || '', 20, 75);
            doc.text(invoice.companyData.vatID, 20, 90);

            // customer data
            doc.text(invoice.customerData.name, 120, 70);
            doc.text(invoice.customerData.address.split(',')[0], 120, 75);
            doc.text(invoice.customerData.address.split(',')[1] || '', 120, 75);
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
                margin: { left: 20, right: 20 },
                showHead: 'firstPage',
            });

            doc.setDrawColor(180, 180, 180); // Light gray (RGB)
            doc.setLineWidth(0.5);
            doc.line(20, doc.autoTable.previous.finalY + 1, doc.internal.pageSize.width-20, doc.autoTable.previous.finalY + 1);

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
            doc.setLineWidth(0.5);
            doc.line(rightColumnX - 40, finalY + 18, rightColumnX, finalY + 18);

            doc.setFont("dejavu-sans.book", "bold")
            doc.text("Total:", rightColumnX - 40, finalY + 23);
            doc.text(`${invoice.total.toFixed(2)} €`, rightColumnX, finalY + 23, { align: 'right' });


            // Add background pattern in footer area
            const footerHeight = 100;
            const footerY = doc.internal.pageSize.height - footerHeight;
            doc.addImage('/assets/images/pattern-1.png', 'PNG', 0, footerY, doc.internal.pageSize.width, footerHeight, '', 'NONE', 0);

            // Add footer content
            doc.setFont("dejavu-sans.book", "normal")
            doc.setFontSize(8);
            doc.setTextColor(100);

            // Footer text sections
            
            const splitNote = doc.splitTextToSize(invoice.note.replace('\n', '').replace('\n', '').replace('\n', '').replace('\n', ''), doc.internal.pageSize.getWidth() - 40)
            //const splitNote = this.splitTextIntoChunks(invoice.note);
            console.log(splitNote)

            doc.text(splitNote,  (doc.internal.pageSize.getWidth())/2, doc.internal.pageSize.height - 40, 'center');

            doc.text("Bank details: IBAN " + invoice.paymentData.iban, 20, doc.internal.pageSize.height - 20);

            // Terms and conditions
            const termsText = "Terms & Conditions: This invoice is subject to our standard terms and conditions. " +
                "Late payments may incur additional charges. All prices are in EUR unless otherwise stated. " +
                "Please include the invoice number in all correspondence.";

            doc.setFontSize(7);
            const splitTerms = doc.splitTextToSize(termsText, doc.internal.pageSize.width - 40);
            doc.text(splitTerms, 20, doc.internal.pageSize.height - 10);

            // Company details at the very bottom
            doc.setFontSize(7);
            const companyText = "Bytewise d.o.o. | Address: Example Street 123, City | VAT: HR12345678901 | " +
                "Phone: +385 123 456 789 | Email: contact@bytewise.hr | www.bytewise.hr";
            doc.text(companyText, 20, doc.internal.pageSize.height - 10);

            // Generate PDF
            var out = doc.output('blob');
            const blob = new Blob([out], { type: 'application/pdf' });
            this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob) + "#toolbar=1");
        }
        //doc.save(`Invoice_${invoice.number}.pdf`);
    }

}
