import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { InvoiceGeneratorService } from '../../core/services/invoice-generator.service';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'eenvo-invoices',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        PopoverModule,
        MultiSelectModule,
        ConfirmDialogModule,
        ToastModule,
        CurrencyFormatPipe,
        TranslateModule,
        FormsModule,
        StatsWidgetComponent,
        ActionBarComponent,
        InvoiceDetailComponent
    ],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class InvoicesComponent {

    public data: any[] = [];
    public allData: any[] = [];
    public countries: any = []
    public invoiceDialogVisible = false;
    public currentInvoice: any = null;
    public currentDate = new Date().toISOString();
    public selectedYear = new Date().getFullYear();
    public currentYear = new Date().getFullYear();
    public pdf: any;
    public pdfPreviewVisible = false;
    public paidInvoices: any = []
    public unpaidInvoices: any = []
    public fullScreen: boolean = false;
    public isQuote = false;
    public isPO = false;
    public title: any = "Invoices";
    public loading = false;
    public globalFilterValue = '';

    public filter = {
        all: true,
        paid: false,
        pending: false,
        overdue: false
    }

    public visibleColumns: string[] = [
        'number', 'customer', 'user', 'total', 'isPaid', 'dueDate'
    ];

    public allColumns = [
        { field: 'number', header: 'Number' },
        { field: 'customer', header: 'Customer' },
        { field: 'user', header: 'User' },
        { field: 'total', header: 'Total' },
        { field: 'isPaid', header: 'Is Paid' },
        { field: 'dueDate', header: 'Due Date' }
    ];

    constructor(
        private pocketbase: PocketBaseService,
        private invoiceService: InvoiceGeneratorService,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private translate: TranslateService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) {

        activatedRoute.title.subscribe(title => {
            this.isQuote = title == 'Quotes';
            this.isPO = title == 'Purchase Orders';
            this.title = title;
        })

        this.getData();
    }

    editInvoice(invoice: any) {
        this.currentInvoice = invoice;
        this.invoiceDialogVisible = true;
    }

    async newInvoice() {
        this.currentInvoice = null;
        this.invoiceDialogVisible = true;
    }

    isMarkAsPayedVisible(row: any) {
        return !row?.isPaid;
    }

    isMarkAsUnpayedVisible(row: any) {
        return !!row?.isPaid;
    }

    markAsPaid = async (id: string) => {
        const res = await this.pocketbase.invoices.update(id, {
            'isPaid': true,
            'paymentDate': new Date()
        });

        this.close(true);

        return res;
    };

    markAsUnpaid = async (id?: string) => {
        const res = await this.pocketbase.invoices.update(id ?? this.currentInvoice.id, {
            'isPaid': false,
            'paymentDate': null
        });
        return res;
    };

    convertToInvoice = async (invoice: any) => {
        const res = await this.pocketbase.invoices.update(invoice.id, {
            'isQuote': false,
        });

        this.close(true);

        return res;
    }

    duplicateInvoice = async (row: any) => {
        const originalInvoice = row;
        if (!originalInvoice) return;

        // Get the full invoice data with expanded relations
        const fullInvoice: any = await this.pocketbase.invoices.getOne(originalInvoice.id, {
            expand: 'items'
        });

        // Create new invoice with copied data but new dates
        const newInvoice: any = {
            number: `${fullInvoice.number}`,
            date: new Date().toISOString(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            deliveryDate: new Date().toISOString(),
            total: fullInvoice.total,
            isPaid: false,
            paymentDate: null,
            note: fullInvoice.note,
            internalNote: fullInvoice.internalNote,
            customer: fullInvoice.customer,
            company: fullInvoice.company,
            companyData: fullInvoice.companyData,
            customerData: fullInvoice.customerData,
            paymentData: fullInvoice.paymentData,
            type: fullInvoice.type,
            paymentType: fullInvoice.paymentType,
            subTotal: fullInvoice.subTotal,
            discountValue: fullInvoice.discountValue,
            taxValue: fullInvoice.taxValue,
            currency: fullInvoice.currency,
            user: fullInvoice.user,
            isQuote: this.isQuote,
            isPO: this.isPO,
            hideValues: fullInvoice.hideValues,
            poShipping: fullInvoice.poShipping,
            language: fullInvoice.language,
            taxValueGroups: fullInvoice.taxValueGroups,
            tax: fullInvoice.tax,
            items: []
        };

        // Duplicate all items
        const allItems: any = [];
        if (fullInvoice.expand?.items) {
            for (const item of fullInvoice.expand.items) {
                const newItem = {
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    discount: item.discount,
                    tax: item.tax,
                    total: item.total,

                };
                allItems.push(this.pocketbase.items.create(newItem, {
                    '$autoCancel': false,
                    headers: { notoast: '1' }
                }));
            }
        }

        const itemsCreate = await Promise.all(allItems);

        newInvoice.items = itemsCreate.map(i => i.id);

        // Create the new invoice
        const createdInvoice = await this.pocketbase.invoices.create(newInvoice);

        await this.reload();

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
            this.data = [...this.allData.filter((f: any) => !f.isPaid && (!f.dueDate || new Date(f.dueDate) >= new Date()))]
        if (paid)
            this.data = [...this.allData.filter((f: any) => f.isPaid)]
        if (overdue)
            this.data = [...this.allData.filter((f: any) => !f.isPaid && f.dueDate && new Date(f.dueDate) <= new Date())]
    }

    async getData() {
        this.loading = true;
        try {
            const thisYear = new Date(this.selectedYear, 0, 1).toISOString();
            const currentYearEnd = new Date(+this.selectedYear + 1, 0, 1).toISOString();

            const list = await this.pocketbase.invoices.getFullList({
                expand: 'customer,user',
                filter: `date > "${thisYear}" && date <= "${currentYearEnd}" && isPO = ${this.isPO} && isQuote = ${this.isQuote}`,
                sort: '-date'
            });
            this.allData = list.map(item => this.decorateInvoice(item));
            this.data = [...this.allData];
            this.paidInvoices = [...this.allData.filter((d: any) => d.isPaid)];
            this.unpaidInvoices = [...this.allData.filter((d: any) => !d.isPaid)];
        } finally {
            this.loading = false;
        }
    }

    async deleteInvoice(invoice: any) {
        this.loading = true;
        try {
            await this.pocketbase.invoices.delete(invoice.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice deleted' });
            await this.reload();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete invoice' });
        } finally {
            this.loading = false;
        }
    }

    confirmDelete(invoice: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this invoice?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.deleteInvoice(invoice);
            }
        });
    }

    async download(invoice: any) {
        const file = await this.getPDFFile(invoice);
        if (!file) return;
        const response = await fetch(file, { mode: 'cors' });
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'downloaded-file';

        if (disposition && disposition.includes('filename=')) {
            const match = disposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                filename = match[1];
                filename = filename.replace(/(_\d{4})_[^_]+\.pdf$/, '$1.pdf');
            }
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }

    async preview(invoice: any) {
        try {
            this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(`${await this.getPDFFile(invoice)}#toolbar=1`)
            this.pdfPreviewVisible = true;
        } catch (e) {
            console.error(e);
        }
    }

    async send() {
        alert("Not yet implemented.");
    }

    async close(reload = false) {
        this.invoiceDialogVisible = false;

        if (reload) {
            this.reload();
        }
    }

    async reload() {
        await this.getData();
    }

    public invoiceCreatedEvent(e: any) {
        this.currentInvoice = e;
    }

    public invoiceUpdatedEvent(e: any) {
        this.currentInvoice = e;
    }

    setFullScreen = async () => {
        this.fullScreen = !this.fullScreen
    }

    hasInvoice = (row: any) => row?.pdfUrl != null && row?.pdfUrl?.length > 0

    private async getPDFFile(invoice: any) {
        if (invoice.pdfUrl && invoice.pdfUrl.length > 0) {
            const token = await this.pocketbase.files.getToken({ headers: { notoast: '1' } });
            return this.pocketbase.files.getURL(invoice, invoice['pdfUrl'].pop(), { token })
        }
        return null;
    }

    exportCsv() {
        const columns = this.allColumns.filter(c => this.visibleColumns.includes(c.field));
        const header = columns.map(c => c.header).join(',');
        const escape = (val: any) => {
            if (val === null || val === undefined) return '';
            const s = String(val).replace(/\"/g, '\"\"');
            return `\"${s}\"`;
        };
        const lines = this.data.map(row => columns.map(c => {
            if (c.field === 'customer') return escape(row.customerName || '');
            if (c.field === 'user') return escape(row.userName || '');
            return escape((row as any)[c.field]);
        }).join(','));
        const csv = [header, ...lines].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'invoices.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    onYearChange() {
        this.selectedYear = Number(this.selectedYear);
        this.getData();
    }

    private decorateInvoice(invoice: any) {
        const customerName = invoice.customerData?.name ?? invoice.expand?.customer?.name ?? '';
        const userName = invoice.expand?.user?.name ?? '';
        return {
            ...invoice,
            customerName,
            userName
        };
    }
}
