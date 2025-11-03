import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'primeng/popover';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { InputNumber } from 'primeng/inputnumber';
import { InputNumberGlobalConfigDirective } from '../../core/directives/currency-input.directive';

@Component({
    selector: 'eenvo-expenses',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        SelectModule,
        MultiSelectModule,
        PopoverModule,
        FileUploadModule,
        ConfirmDialogModule,
        ToastModule,
        StatsWidgetComponent,
        TranslateModule,
        CurrencyFormatPipe,
        FormsModule,
        ReactiveFormsModule,
        InputNumber,
        InputNumberGlobalConfigDirective
    ],
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class ExpensesComponent {

    public data: any[] = [];
    public allData: any[] = [];
    public currentExpense: any = null;
    public currentYear = new Date().getFullYear();
    public selectedYear = this.currentYear;
    public customers: any[] = [];
    public showPreview = false;
    public previewTitle = '';
    public isPdf = false;
    public contentUrl?: SafeResourceUrl;
    public categories: any[] = [];
    public addedFiles: File[] = [];
    public filesToRemove: string[] = [];
    public avg = 0;
    public monthlyTotals: { name: string; value: number }[] = [];
    public expenseForm: FormGroup;
    public displayDialog = false;
    public loading = false;
    public globalFilterValue = '';
    public visibleColumns: string[] = ['customer', 'title', 'category', 'total', 'date', 'files'];
    public allColumns = [
        { field: 'customer', header: 'Customer/Vendor' },
        { field: 'title', header: 'Title' },
        { field: 'category', header: 'Category' },
        { field: 'total', header: 'Total' },
        { field: 'date', header: 'Date' },
        { field: 'files', header: 'Documents' }
    ];
    public categoryInput = '';

    constructor(
        private pocketbase: PocketBaseService,
        private sanitizer: DomSanitizer,
        private translate: TranslateService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.expenseForm = this.fb.group({
            id: [''],
            customer: [''],
            title: ['', Validators.required],
            category: [[]],
            total: [0, Validators.required],
            date: [this.formatDate(new Date()), Validators.required]
        });
        this.loadData();
    }

    async loadData() {
        await Promise.all([this.getData(), this.getCategories(), this.getCustomers()]);
    }

    async getCustomers() {
        this.customers = await this.pocketbase.customers.getFullList();
    }

    async editExpense(expense: any) {
        this.currentExpense = expense;
        this.expenseForm.reset({
            id: expense.id,
            customer: expense.customer || '',
            title: expense.title,
            category: expense.category || [],
            total: expense.total,
            date: this.formatDate(expense.date)
        });
        this.addedFiles = [];
        this.filesToRemove = [];
        this.displayDialog = true;
    }

    async newExpense() {
        this.currentExpense = null;
        this.expenseForm.reset({
            id: '',
            customer: '',
            title: '',
            category: [],
            total: 0,
            date: this.formatDate(new Date())
        });
        this.addedFiles = [];
        this.filesToRemove = [];
        this.displayDialog = true;
    }

    async getData() {
        this.loading = true;
        try {
            const start = new Date(this.selectedYear, 0, 1).toISOString();
            const end = new Date(this.selectedYear + 1, 0, 1).toISOString();
            const list = await this.pocketbase.expenses.getFullList({
                expand: 'customer,category',
                filter: `date >= "${start}" && date < "${end}"`,
                sort: '-date'
            });
            this.allData = list.map(item => this.decorateExpense(item));
            this.data = [...this.allData];
            this.calculateStats();
        } finally {
            this.loading = false;
        }
    }

    private async calculateStats() {
        const totals = this.data.map(item => Number(item.total) || 0);
        this.avg = Math.round(totals.reduce((sum, value) => sum + value, 0) / (totals.length || 1));

        const months = await Promise.all([
            firstValueFrom(this.translate.get('Jan')),
            firstValueFrom(this.translate.get('Feb')),
            firstValueFrom(this.translate.get('Mar')),
            firstValueFrom(this.translate.get('Apr')),
            firstValueFrom(this.translate.get('May')),
            firstValueFrom(this.translate.get('Jun')),
            firstValueFrom(this.translate.get('Jul')),
            firstValueFrom(this.translate.get('Aug')),
            firstValueFrom(this.translate.get('Sep')),
            firstValueFrom(this.translate.get('Oct')),
            firstValueFrom(this.translate.get('Nov')),
            firstValueFrom(this.translate.get('Dec'))
        ]);

        const monthlyTotals = new Array(12).fill(0);
        this.data.forEach(item => {
            const monthIndex = new Date(item.date).getMonth();
            monthlyTotals[monthIndex] += Number(item.total) || 0;
        });

        this.monthlyTotals = months.map((label, idx) => ({ name: label, value: monthlyTotals[idx] }));
    }

    async getCategories() {
        this.categories = [...(await this.pocketbase.categories.getFullList({ sort: 'name' }))
            .map((c: any) => { return { id: c.id, name: c.name } })];
    }

    async addCategoryFromInput() {
        const name = (this.categoryInput || '').trim();
        if (!name) {
            return;
        }
        try {
            const created = await this.pocketbase.categories.create({ name: name.toLowerCase() });
            const category = { id: created.id, name: created['name'] };
            this.categories = [category, ...this.categories];
            const selected = new Set(this.expenseForm.get('category')?.value ?? []);
            selected.add(category.id);
            this.expenseForm.patchValue({ category: Array.from(selected) });
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add category' });
        } finally {
            this.categoryInput = '';
        }
    }

    async saveExpense() {
        if (this.expenseForm.invalid) {
            this.expenseForm.markAllAsTouched();
            return;
        }

        const value = this.expenseForm.value;
        const payload: any = {
            customer: value.customer || null,
            title: value.title,
            category: value.category,
            total: Number(value.total),
            date: value.date ? new Date(value.date).toISOString() : new Date().toISOString(),
            user: this.pocketbase.auth.id
        };

        this.loading = true;
        let expenseId = value.id;
        try {
            if (expenseId) {
                await this.pocketbase.expenses.update(expenseId, payload);
            } else {
                const created = await this.pocketbase.expenses.create(payload);
                expenseId = created.id;
            }

            console.log(this.addedFiles)
            if (expenseId && this.addedFiles.length) {
                await this.pocketbase.expenses.update(expenseId, { 'files+': this.addedFiles }, { headers: { notoast: '1' } });
                this.addedFiles = [];
            }

            if (expenseId && this.filesToRemove.length) {
                await this.pocketbase.expenses.update(expenseId, { 'files-': this.filesToRemove }, { headers: { notoast: '1' } });
                this.filesToRemove = [];
            }

            this.displayDialog = false;
            await this.getData();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense saved' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save expense' });
        } finally {
            this.loading = false;
        }
    }

    async getFile(data: any, file: string) {
        this.isPdf = file.indexOf('.pdf') > -1;
        this.contentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pocketbase.files.getURL({ ...data }, file));
        this.showPreview = true;
        this.previewTitle = file;
    }

    async reload() {
        await this.getData();
    }

    async fileAdded(event: any) {
        const list: File[] = event?.files ?? [];
        console.log(event)
        this.addedFiles.push(...list);
        event?.options?.clear?.();
    }

    async removeAddedFile(i: number) {
        this.addedFiles.splice(i, 1);
    }

    // remove existing file
    async removeFile(data: any, name: string) {
        this.filesToRemove.push(name);
        data.files = [...data.files.filter((f: any) => f !== name)];
    }

    confirmDelete(expense: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this expense?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.deleteExpense(expense);
            }
        });
    }

    private async deleteExpense(expense: any) {
        this.loading = true;
        try {
            await this.pocketbase.expenses.delete(expense.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense deleted' });
            await this.getData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete expense' });
        } finally {
            this.loading = false;
        }
    }

    exportCsv() {
        const columns = this.allColumns.filter(c => this.visibleColumns.includes(c.field));
        const header = columns.map(c => c.header).join(',');
        const escape = (val: any) => {
            if (val === null || val === undefined) return '';
            const s = String(val).replace(/"/g, '""');
            return `"${s}"`;
        };
        const lines = this.data.map(row => columns.map(c => {
            if (c.field === 'customer') {
                return escape(row.customerName || row.expand?.customer?.name || '');
            }
            if (c.field === 'category') {
                return escape(row.categoryNames || (row.expand?.category || []).map((cat: any) => cat.name).join('; '));
            }
            if (c.field === 'files') {
                return escape(row.fileNames || (row.files || []).join('; '));
            }
            return escape((row as any)[c.field]);
        }).join(','));
        const csv = [header, ...lines].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expenses.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    onYearChange() {
        this.selectedYear = Number(this.selectedYear);
        this.getData();
    }

    private formatDate(value: Date | string | null | undefined): string {
        if (!value) {
            return '';
        }
        const date = typeof value === 'string' ? new Date(value) : value;
        if (isNaN(date.getTime())) {
            return '';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private decorateExpense(expense: any) {
        const categoryNames = (expense.expand?.category ?? []).map((cat: any) => cat.name).join(', ');
        const customerName = expense.expand?.customer?.name ?? '';
        const fileNames = (expense.files ?? []).join(', ');
        return {
            ...expense,
            categoryNames,
            customerName,
            fileNames
        };
    }
}
