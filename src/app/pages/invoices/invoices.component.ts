import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';
import { FormsModule } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { InvoiceGeneratorService } from '../../core/services/invoice-generator.service';
import { RowDblClickEvent } from 'devextreme/ui/data_grid';
import { ActionBarComponent } from '../../shared/action-bar/action-bar.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'eenvo-invoices',
    imports: [DxDataGridModule, CurrencyFormatPipe, TranslateModule, DxButtonModule, DxPopupModule, InvoiceDetailComponent, DxSelectBoxModule, FormsModule, StatsWidgetComponent, ActionBarComponent],
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
    public fullScreen: boolean = false;
    public isQuote = false;
    public isPO = false;
    public title: any = "Invoices";

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

    constructor(
        private pocketbase: PocketBaseService,
        private invoiceService: InvoiceGeneratorService, private activatedRoute: ActivatedRoute) {

        activatedRoute.title.subscribe(title => {
            this.isQuote = title == 'Quotes';
            this.isPO = title == 'Purchase Orders';
            this.title = title;
        })

        this.getData();

        this.dxMarkAsPaid = this.dxMarkAsPaid.bind(this);
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

    dxMarkAsPaid = async (e: DxDataGridTypes.ColumnButtonClickEvent) => {
        await this.markAsPaid(e.row?.data.id);

        if (e.row?.data) {
            e.row.data.isPaid = true;
            e.row.data.paymentDate = new Date()
        }

        e?.event?.preventDefault();
    };

    markAsPaid = async (id: string) => {
        const res = await this.pocketbase.invoices.update(id, {
            'isPaid': true,
            'paymentDate': new Date()
        });

        this.close(true);

        return res;
    };

    convertToInvoice = async (e: DxDataGridTypes.ColumnButtonClickEvent) => {
        const res = await this.pocketbase.invoices.update(e.row?.data.id, {
            'isQuote': false,
        });

        this.close(true);

        return res;
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
            isQuote: this.isQuote,
            isPO: this.isPO,
            hideValues: fullInvoice.hideValues,
            poShipping: fullInvoice.poShipping,
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
        const thisYear = new Date(this.selectedYear, 0, 1).toISOString();
        const currentYearEnd = new Date(+this.selectedYear + 1, 0, 1).toISOString();

        this.allData = await this.pocketbase.invoices.getFullList({
            expand: 'customer,user',
            filter: `date > "${thisYear}" && date <= "${currentYearEnd}" && isPO = ${this.isPO} && isQuote = ${this.isQuote}`,
            sort: '-date'
        });

        this.data = [...this.allData];
        this.paidInvoices = [...this.allData.filter((d: any) => d.isPaid)];
        this.unpaidInvoices = [...this.allData.filter((d: any) => !d.isPaid)];
    }

    async saved(e: any) {
        if (e.changes[0]?.type == 'remove') {
            const invoice = e.changes[0].key;
            const toDelete: any = [];

            invoice.items?.forEach((itemId: string) => {
                toDelete.push(this.pocketbase.items.delete(itemId, {
                    '$autoCancel': false,
                }));
            });
            const res = await Promise.all(toDelete);
            if (!res) {
                return;
            }

        }
        this.reload();
    }

    async delete(invoice: any) {
        this.close(false);
        this.grid?.instance.deleteRow(this.grid?.instance.getRowIndexByKey(invoice));
    }

    async download(id: any) {
        await this.invoiceService.generate(id);
    }

    async preview(id: any) {
        try {
            this.pdf = await this.invoiceService.generate(id, true);
        } catch (e) {
            console.error(e);
        }
    }

    async send() {
        alert("Not yet implemented.");
    }

    async close(reload = false) {
        this.pdf = null;
        this.invoicePopupVisible = false;

        if (reload) {
            this.reload();
        }
    }

    async reload() {
        this.grid?.instance.cancelEditData();
        this.getData();
    }

    public invoiceCreatedEvent(e: any) {
        this.currentInvoice = e;
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

    setFullScreen = async () => {
        this.fullScreen = !this.fullScreen
    }

}
