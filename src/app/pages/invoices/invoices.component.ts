import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastService } from '../../core/services/toast.service';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { SettingsService } from '../../core/services/settings.service';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { InvoiceGeneratorService } from '../../core/services/invoice-generator.service';
import { RowDblClickEvent } from 'devextreme/ui/data_grid';

@Component({
    selector: 'eenvo-invoices',
    standalone: true,
    imports: [DxDataGridModule, CurrencyFormatPipe, TranslateModule, DxButtonModule, DxPopupModule, InvoiceDetailComponent, DxSelectBoxModule, FormsModule, StatsWidgetComponent],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

    public data: any;
    public allData: any;
    public countries: any = []
    public invoicePopupVisible = false;
    public currentInvoice: any = null;
    public currentDate = new Date().toISOString();
    public selectedYear = new Date().getFullYear();
    public currentYear = new Date().getFullYear();
    public pdf: any;
    public paidInvoices: any = []
    public unpaidInvoices: any = []

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

    constructor(private pocketbase: PocketBaseService, private invoiceService: InvoiceGeneratorService, private settingsService: SettingsService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private toast: ToastService) {
        this.getData();
    }

    editInvoice = (e: any) => {
        this.currentInvoice = e.row?.data || e.data;
        this.invoicePopupVisible = true;
    }

    async newInvoice() {
        this.currentInvoice = null;
        this.invoicePopupVisible = true;
    }

    isMarkAsPayedVisible({ row }: any) {
        return !row.data.isPaid;
    }

    markAsPayed = async (e: DxDataGridTypes.ColumnButtonClickEvent) => {

        await this.pocketbase.invoices.update(e.row?.data.id, {
            'isPaid': true,
            'paymentDate': new Date()
        })
        if (e.row?.data) {
            e.row.data.isPaid = true;
            e.row.data.paymentDate = new Date()
        }
        this.toast.success();

        await this.createTransaction(e.row?.data);

        this.reload()

        e?.event?.preventDefault();
    };

    async createTransaction(invoice: any) {
        const transaction = {
            date: invoice.paymentDate,
            title: invoice.number,
            total: invoice.total,
            user: this.pocketbase.auth.id,
            invoice: invoice.id,
            type: 'in'
        };
        await this.pocketbase.transactions.create(transaction);
    }

    duplicateInvoice = async (e: DxDataGridTypes.ColumnButtonClickEvent) => {
        const originalInvoice = e.row?.data;
        if (!originalInvoice) return;

        // Get the full invoice data with expanded relations
        const fullInvoice: any = await this.pocketbase.invoices.getOne(originalInvoice.id, {
            expand: 'items'
        });

        // Create new invoice with copied data but new dates
        const newInvoice: any = {
            number: `${fullInvoice.number}`, // Temporary number, you might want to implement proper numbering
            date: new Date().toISOString(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
            deliveryDate: new Date().toISOString(),
            total: fullInvoice.total,
            isPaid: false,
            paymentDate: null,
            note: fullInvoice.note,
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
                    total: item.total
                };
                allItems.push(this.pocketbase.items.create(newItem, {
                    '$autoCancel': false,
                }));
            }
        }

        const itemsCreate = await Promise.all(allItems);

        newInvoice.items = itemsCreate.map(i => i.id);

        // Create the new invoice
        const createdInvoice = await this.pocketbase.invoices.create(newInvoice);

        this.toast.success();
        this.reload();

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
            this.data = [...this.allData.filter((f: any) => !f.isPaid && (!f.dueDate || new Date(f.dueDate) >= new Date()))]
        if (paid)
            this.data = [...this.allData.filter((f: any) => f.isPaid)]
        if (overdue)
            this.data = [...this.allData.filter((f: any) => !f.isPaid && f.dueDate && new Date(f.dueDate) <= new Date())]
    }

    async getData() {

        const thisYear = new Date(this.selectedYear, 0, 1).toISOString();//.slice(0, 10);
        const currentYearEnd = new Date(+this.selectedYear + 1, 0, 1).toISOString();//.slice(0, 10);

        this.allData = await this.pocketbase.invoices.getFullList({
            expand: 'customer,user',
            filter: `date > "${thisYear}" && date <= "${currentYearEnd}"`,
            sort: '-date'
        });

        this.data = [...this.allData];
        this.paidInvoices = [...this.allData.filter((d: any) => d.isPaid)];
        this.unpaidInvoices = [...this.allData.filter((d: any) => !d.isPaid)];
    }

    async saved(e: any) {
        if (e.changes[0].type == 'remove') {
            const toDelete: any = [];
            e.changes[0].key.items?.forEach((item: any) => {
                toDelete.push(this.pocketbase.items.delete(item, {
                    '$autoCancel': false,
                }));
            })
            const deleted = await Promise.all(toDelete);
            await this.pocketbase.invoices.delete(e.changes[0].key.id);
        }
        this.reload();
    }

    async delete() {
        this.close();
        this.grid?.instance.deleteRow(this.grid?.instance.getRowIndexByKey(this.grid?.instance.getSelectedRowKeys()[0]));
    }

    async download(id: any) {
        await this.invoiceService.generate(id);
    }

    async preview(id: any) {
        try {
            this.pdf = await this.invoiceService.generate(id, true);
        } catch (e) {
        }
    }

    async send() {
        alert("Not yet implemented.");
    }

    async close() {
        this.pdf = null;
        this.invoicePopupVisible = false;
        this.reload();
    }

    async reload() {
        this.grid?.instance.cancelEditData();
        this.getData();
    }

    rowDoubleClicked(e: RowDblClickEvent) {
        this.editInvoice(e);
    }

    downloadPDF = async (e: any) => {
        e?.event?.preventDefault();
        await this.invoiceService.generate(e.row?.data?.id)
    }

    previewPDF = async (e: any) => {
        e?.event?.preventDefault();
        this.pdf = await this.invoiceService.generate(e.row?.data?.id, true)
    }

}
