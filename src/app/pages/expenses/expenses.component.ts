import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxFileUploaderModule, DxLookupComponent, DxLookupModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastService } from '../../core/services/toast.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { EditorPreparingEvent } from 'devextreme/ui/data_grid';
import { ValueChangedEvent } from 'devextreme/ui/file_uploader';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-expenses',
    standalone: true,
    imports: [DxDataGridModule, DxPieChartModule, DxPopupModule, DxFileUploaderModule, StatsWidgetComponent, TranslateModule, DxButtonModule, CurrencyFormatPipe, DxLookupModule, DxPopupModule, DxSelectBoxModule, FormsModule],
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
    public contentUrl:any = '';

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    constructor(private pocketbase: PocketBaseService, private toast: ToastService, private sanitizer: DomSanitizer) {
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
            expand: 'customer',
            sort: '-date'
        });

        this.data = [...this.allData];
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

    public addedFiles: File[] = [];
    public filesToRemove: string[] = [];

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