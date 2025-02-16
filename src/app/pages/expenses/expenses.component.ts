import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxLookupComponent, DxLookupModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastService } from '../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { EditorPreparingEvent } from 'devextreme/ui/data_grid';

@Component({
    selector: 'app-expenses',
    standalone: true,
    imports: [DxDataGridModule, DxPieChartModule, StatsWidgetComponent, TranslateModule, DxButtonModule, CurrencyFormatPipe, DxLookupModule, DxPopupModule, DxSelectBoxModule, FormsModule],
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {

    public data: any;
    public allData: any;
    public currentExpense: any = null;
    public currentDate = new Date().toISOString();
    public currentYear = new Date().getFullYear();
    public selectedYear = this.currentYear;
    public customers: any = [];

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    constructor(private pocketbase: PocketBaseService, private toast: ToastService) {
        this.getData();

        this.getCustomers();
    }

    public chartDS = [{
        region: 'Asia',
        val: 4119626293,
    }, {
        region: 'Africa',
        val: 1012956064,
    }, {
        region: 'Northern America',
        val: 344124520,
    }, {
        region: 'Latin America and the Caribbean',
        val: 590946440,
    }, {
        region: 'Europe',
        val: 727082222,
    }, {
        region: 'Oceania',
        val: 35104756,
    }];

    public initNewRow(e: any) {
        e.data['user'] = this.pocketbase.auth.id;
        e.data['date'] = new Date();
        e.data['total'] = 0.0;
    }

    customizeTooltip = ({ valueText, percent }: { valueText: string, percent: number }) => ({
        text: `${valueText} - %`,
    });

    async getCustomers() {
        this.customers = await this.pocketbase.customers.getFullList();
    }

    async editExpense(e: any) {
        this.currentExpense = e.data;
    }

    async newExpense() {
        this.grid?.instance.addRow();
        this.currentExpense = null;
    }

    async getData() {
        this.allData = await this.pocketbase.expenses.getFullList({
            expand: 'customer',
            sort: '-date'
        });

        this.data = [...this.allData];
    }

    async saved(e: any) {
        // updating or deleting or creating expense should automatically track transaction
        const change = e.changes[0];
        const data = change.data;
        let updateTransaction;
        if (data) {
            data.user = this.pocketbase.auth.id;
            if (data.id)
                updateTransaction = await this.pocketbase.transactions.getFirstListItem(`expense = '${data.id}'`);
        }
        if (change.type === 'remove') {
            await this.pocketbase.expenses.delete(change.key.id);
            if (updateTransaction?.id)
                await this.pocketbase.transactions.delete(change.key.id);
        } else {
            const transaction = {
                expense: data.id,
                date: data.date,
                title: data.title,
                total: data.total,
                user: data.user,
                type: 'out'
            };
            if (data.id) {
                await this.pocketbase.expenses.update(data.id, data);
                if (updateTransaction?.id)
                    await this.pocketbase.transactions.update(updateTransaction.id, transaction);
            } else {
                const createdExpense = await this.pocketbase.expenses.create(data);
                transaction.expense = createdExpense.id;
                await this.pocketbase.transactions.create(transaction);
            }
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