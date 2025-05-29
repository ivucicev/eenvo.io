import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxChartModule, DxDataGridComponent, DxDataGridModule, DxDropDownBoxModule, DxFileUploaderModule, DxLookupComponent, DxLookupModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DxTagBoxTypes } from 'devextreme-angular/ui/tag-box';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'eenvo-expenses',
    standalone: true,
    imports: [DxDataGridModule, DxDropDownBoxModule, DxPieChartModule, DxChartModule, DxPopupModule, DxFileUploaderModule, StatsWidgetComponent, DxTagBoxModule, TranslateModule, DxButtonModule, CurrencyFormatPipe, DxLookupModule, DxPopupModule, DxSelectBoxModule, FormsModule],
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
    public dataPerMonth: any = [];
    public avg = 0;

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    constructor(private pocketbase: PocketBaseService, private sanitizer: DomSanitizer, private translate: TranslateService) {
        this.getData();
        this.getCategories();
        this.getCustomers();
    }

    public initNewRow(e: any) {
        e.data['user'] = this.pocketbase.auth.id;
        e.data['date'] = new Date();
        e.data['category'] = [];
        e.data['total'] = 0.0;
    }

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

        const thisYear = new Date(this.selectedYear, 0, 1).toISOString();
        const currentYearEnd = new Date(+this.selectedYear + 1, 0, 1).toISOString();

        this.allData = await this.pocketbase.expenses.getFullList({
            expand: 'customer,category',
            filter: `date > "${thisYear}" && date <= "${currentYearEnd}"`,
            sort: '-date'
        });

        this.data = [...this.allData];

        this.avg = Math.round(this.data.reduce((a: number, b: any) => a + (+b.total), 0) / this.data.length);

        const dataPerMonth: any = {
            0: { name: await this.translate.instant('Jan'), value: 0 },
            1: { name: await this.translate.instant('Feb'), value: 0 },
            2: { name: await this.translate.instant('Mar'), value: 0 },
            3: { name: await this.translate.instant('Apr'), value: 0 },
            4: { name: await this.translate.instant('May'), value: 0 },
            5: { name: await this.translate.instant('Jun'), value: 0 },
            6: { name: await this.translate.instant('Jul'), value: 0 },
            7: { name: await this.translate.instant('Aug'), value: 0 },
            8: { name: await this.translate.instant('Sep'), value: 0 },
            9: { name: await this.translate.instant('Oct'), value: 0 },
            10: { name: await this.translate.instant('Nov'), value: 0 },
            11: { name: await this.translate.instant('Dec'), value: 0 }
        }

        this.data.forEach(async (e: any, index: number) => {
            const month = new Date(e.date).getMonth();
            dataPerMonth[month].value += e.total;
        });

        this.dataPerMonth = Object.values(dataPerMonth);
    }

    customizeLabel = (val: any) => {
        return {
            visible: true,
            customizeText: (valueText: any) => `${val.argument}`
        } as any;
    };

    async getCategories() {
        this.categories = [...(await this.pocketbase.categories.getFullList({ sort: 'name' }))
            .map((c: any) => { return { id: c.id, name: c.name } })];
    }

    onCustomItemCreating(args: DxTagBoxTypes.CustomItemCreatingEvent, d:any) {
        const item = { id: new Date().getTime().toString(), name: args.text };
        const isItemInDataSource = this.categories.some((i: any) => i.id === item.id);
        if (!isItemInDataSource) {
            this.categories.unshift(item);
        }
        args.customItem = item;
        this.pocketbase.categories.create({
            name: args.text?.toLowerCase()
        }).then((res: any) => {
            const m = this.categories.find((i: any) => { return i.id == item.id});
            const cc = d.value.findIndex((c: any) => c == item.id);
            if (m)
                m.id = res.id;
            if (cc > -1) {
                d.value[cc] = res.id;
            }
            args.component.instance().getDataSource().reload();
        });
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