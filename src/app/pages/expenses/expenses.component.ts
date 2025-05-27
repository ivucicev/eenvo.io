import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxFileUploaderModule, DxLookupComponent, DxLookupModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
    selector: 'app-expenses',
    standalone: true,
    imports: [DxDataGridModule, DxPieChartModule, DxPopupModule, DxFileUploaderModule, StatsWidgetComponent, DxTagBoxModule, TranslateModule, DxButtonModule, CurrencyFormatPipe, DxLookupModule, DxPopupModule, DxSelectBoxModule, FormsModule],
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
    public fullScreen: boolean = false;
    public showPreview = false;
    public previewTitle = '';
    public isPdf = false;
    public contentUrl: any = '';
    public categories: any = [];
    public addedFiles: File[] = [];
    public filesToRemove: string[] = [];

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    constructor(private pocketbase: PocketBaseService, private sanitizer: DomSanitizer) {
        this.getData();
        this.getCategories();
        this.getCustomers();
    }

    public initNewRow(e: any) {
        e.data['user'] = this.pocketbase.auth.id;
        e.data['date'] = new Date();
        e.data['total'] = 0.0;
    }

    customizeTooltip = ({ valueText, percent }: { valueText: string, percent: number }) => ({
        text: `${valueText} - %`,
    });

    setFullScreen = async () => {
        this.fullScreen = !this.fullScreen;
    }

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
            expand: 'customer,category',
            sort: '-date'
        });

        this.data = [...this.allData];
    }

    async getCategories() {
        this.categories = await this.pocketbase.categories.getFullList({ sort: 'name' });
    }

    async onCustomItemCreating(args: DxTagBoxTypes.CustomItemCreatingEvent) {
        const newValue = args.text;

        const res = await this.pocketbase.categories.create({
            name: newValue?.toLowerCase()
        });

        this.categories.unshift(res);
        args.customItem = newValue;
    }

    async saved(e: any) {

        // updating or deleting or creating expense should automatically track transaction
        const change = e.changes[0];
        const data = change?.data;
        let id = null

        if (change?.type === 'remove') {
            await this.pocketbase.expenses.delete(change.key.id);
        } else if (change?.type === 'update' || change?.type === 'insert') {
            if (data.id) {
                await this.pocketbase.expenses.update(data.id, data);
            } else {
                const res = await this.pocketbase.expenses.create(data);
                id = res.id;
            }
        }

        // add documents
        if ((this.currentExpense?.id || id) && this.addedFiles && this.addedFiles.length) {
            await this.pocketbase.expenses.update(this.currentExpense?.id ?? id, { "files+": this.addedFiles }, { headers: { notoast: '1' } });
            this.addedFiles.length = 0;
        }


        // remove documents
        if (this.currentExpense?.id && this.filesToRemove && this.filesToRemove.length) {
            await this.pocketbase.expenses.update(this.currentExpense.id, { 'files-': this.filesToRemove }, { headers: { notoast: '1' } });
            this.filesToRemove.length = 0;
        }

        this.reload();
    }

    async getFile(data: any, file: string) {
        this.isPdf = file.indexOf('.pdf') > -1
        this.contentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pocketbase.files.getURL({ ...data }, file));
        this.showPreview = true;
        this.previewTitle = file;
    }

    async reload() {
        this.grid?.instance.cancelEditData();
        this.getData();
    }

    rowDoubleClicked(e: any) {
        this.grid?.instance.editRow(e.rowIndex);
    }

    calculateFilterExpression(filterValue: any, selectedFilterOperation: any, target: any) {
        if (target === 'search' && typeof (filterValue) === 'string') {
            return [(this as any).dataField, 'contains', filterValue];
        }
        return function (rowData: any) {
            return (rowData.category || []).indexOf(filterValue) !== -1;
        };
    }

    async fileAdded(e: any) {
        const list: File[] = e.value;
        this.addedFiles.push(...list);
    }

    async removeAddedFile(i: number) {
        this.addedFiles.splice(i, 1);
    }

    // remove existing file
    async removeFile(data: any, name: string) {
        this.filesToRemove.push(name);
        data.files = [...data.files.filter((f: any) => f !== name)];
    }
}