import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxLookupComponent, DxLookupModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastService } from '../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { CountUpModule } from 'ngx-countup';
import { SettingsService } from '../../core/services/settings.service';

@Component({
    selector: 'app-transactions',
    standalone: true,
    imports: [DxDataGridModule, StatsWidgetComponent, CountUpModule, TranslateModule, DxButtonModule, CurrencyFormatPipe, DxLookupModule, DxPopupModule, DxSelectBoxModule, FormsModule],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {

    public data: any;
    public allData: any;
    public currentTransaction: any = null;
    public currentDate = new Date().toISOString();
    public currentYear = new Date().getFullYear();
    public selectedYear = this.currentYear;
    public customers: any = [];
    public vendors: any = [];
    public types: any = [];
    public expenses: any = [];
    public inflow: any = [];
    public dataNetIncome: any = [];
    public defaultCurrency;

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    constructor(private pocketbase: PocketBaseService, private settings: SettingsService, private translation: TranslateService, private toast: ToastService) {
        this.getData();
        this.setTypes();
        this.defaultCurrency = settings.settings?.defaultCurrency || '€';
    }

    public async setTypes() {
        this.types = [
            {
                name: await this.translation.get('out').toPromise(),
                value: 'out'
            },
            {
                name: await this.translation.get('in').toPromise(),
                value: 'in'
            }
        ]
    }

    public initNewRow(e: any) {
        e.data['type'] = 'out';
        e.data['date'] = new Date();
        e.data['total'] = 0.0;
        e.data['user'] = this.pocketbase.auth.id;
    }

    async editTransaction(e: any) {
        if (e.data.invoice || e.data.expense) {
            this.toast.warning('Cannot edit transaction that came from invoice or expense.');
            e.cancel = true;
            return;
        }
        this.currentTransaction = e.data;
    }

    async newTransaction() {
        this.grid?.instance.addRow();
        this.currentTransaction = null;
    }

    async getData() {
        this.allData = await this.pocketbase.transactions.getFullList({
            expand: 'customer,invoice,expense',
            sort: '-date'
        });

        this.data = [...this.allData];
        this.expenses = [...this.allData.filter((s: any) => s.type == 'out')];
        this.inflow = [...this.allData.filter((s: any) => s.type == 'in')];
        this.dataNetIncome = [...this.allData.map((s: any) => {
            return {
                ...s,
                total: s.type == 'in' ? s.total : -1 * s.total
            }
        })];
    }

    async saved(e: any) {
        if (e.changes[0]?.type == 'remove') {
            if (e.changes[0]?.key?.invoice || e.changes[0]?.key?.expense) {
                this.toast.warning('Cannot delete transaction that came from invoice or expense.');
                e.cancel = true;
                this.grid?.instance.cancelEditData();
                return;
            }
            await this.pocketbase.transactions.delete(e.changes[0].key.id);
            this.data = [...this.data.filter((f: any) => f.id != e.changes[0].key.id)];
            return;
        } else if (e.changes[0]?.type == 'update') {
            await this.pocketbase.transactions.update(e.changes[0]?.key?.id, e.changes[0]?.data);
        } else if (e.changes[0]?.type == 'insert') {
            await this.pocketbase.transactions.create(e.changes[0]?.data);
        }
        this.reload();
    }

    async reload() {
        this.grid?.instance.cancelEditData();
        this.getData();
    }

    rowDoubleClicked(e: any) {
        this.grid?.instance.editRow(e.rowIndex);
    }
}