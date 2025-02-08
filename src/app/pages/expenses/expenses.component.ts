import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxLookupComponent, DxLookupModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastService } from '../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';

@Component({
    selector: 'app-expenses',
    standalone: true,
    imports: [DxDataGridModule, StatsWidgetComponent, TranslateModule, DxButtonModule, CurrencyFormatPipe, DxLookupModule, DxPopupModule, DxSelectBoxModule, FormsModule],
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

    public initNewRow(e: any) {
        console.log(e);
    }

    async getCustomers() {
        console.log(1)
        this.customers = await this.pocketbase.pb.collection("customers").getFullList();
    }

    async editExpense(e: any) {
        this.currentExpense = e.data;
    }

    async newExpense() {
        this.grid?.instance.addRow();
        this.currentExpense = null;
    }

    async getData() {
        this.allData = await this.pocketbase.pb.collection('expenses').getFullList({
            expand: 'customer',
            sort: '-date'
        });

        this.data = [...this.allData];
    }

    async saved(e: any) {
        if (e.changes[0].type == 'remove') {
            await this.pocketbase.pb.collection('expenses').delete(e.changes[0].key.id);
        } else {
			const data = e.changes[0].data;
			if (data.id) {
				await this.pocketbase.pb.collection('expenses').update(data.id, data);
			} else {
				await this.pocketbase.pb.collection('expenses').create(data);
			}
		}
        this.reload();
    }


    async reload() {
        console.log(1)
        this.grid?.instance.cancelEditData();
        this.getData();
    }

    onEditorPreparing(e: any) {
        if (e.dataField === "created" || e.dataField === "updated") {
            e.editorOptions.disabled = true;
        }
    }

    rowDoubleClicked(e: any) {
        this.grid?.instance.editRow(e.rowIndex);
    }
}