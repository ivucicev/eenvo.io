import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { CurrencyFormatPipe } from '../../core/pipes/number-format.pipe';
import { StatsWidgetComponent } from '../../core/componate/stats-widget/stats-widget.component';
import { CountUpModule } from 'ngx-countup';
import { SettingsService } from '../../core/services/settings.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'primeng/popover';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'eenvo-transactions',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        SelectModule,
        MultiSelectModule,
        PopoverModule,
        ConfirmDialogModule,
        ToastModule,
        StatsWidgetComponent,
        CountUpModule,
        TranslateModule,
        CurrencyFormatPipe,
        FormsModule,
        ReactiveFormsModule,
        TranslatePipe
    ],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class TransactionsComponent {

    public data: any[] = [];
    public allData: any[] = [];
    public currentTransaction: any = null;
    public currentYear = new Date().getFullYear();
    public selectedYear = this.currentYear;
    public types: any[] = [];
    public expenses: any[] = [];
    public inflow: any[] = [];
    public dataNetIncome: any[] = [];
    public defaultCurrency: string;
    public categories: any[] = [];
    public displayDialog = false;
    public loading = false;
    public transactionForm: FormGroup;
    public globalFilterValue = '';
    public visibleColumns: string[] = ['type', 'title', 'category', 'total', 'date', 'invoice', 'expense'];
    public allColumns = [
        { field: 'type', header: 'Type' },
        { field: 'title', header: 'Title' },
        { field: 'category', header: 'Category' },
        { field: 'total', header: 'Total' },
        { field: 'date', header: 'Date' },
        { field: 'invoice', header: 'Invoice' },
        { field: 'expense', header: 'Expense' }
    ];
    public categoryInput = '';

    constructor(
        private pocketbase: PocketBaseService,
        private settings: SettingsService,
        private translation: TranslateService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.getData();
        this.getCategories();
        this.setTypes();
        this.defaultCurrency = settings.settings?.defaultCurrency || '€';
        this.transactionForm = this.fb.group({
            id: [''],
            type: ['out', Validators.required],
            title: ['', Validators.required],
            category: [[]],
            total: [0, [Validators.required]],
            date: [this.formatDate(new Date()), Validators.required],
        });
    }

    public async setTypes() {
        const outLabel = await firstValueFrom(this.translation.get('out'));
        const inLabel = await firstValueFrom(this.translation.get('in'));
        this.types = [
            { name: outLabel, value: 'out' },
            { name: inLabel, value: 'in' }
        ];
    }

    async newTransaction() {
        this.transactionForm.reset({
            id: '',
            type: 'out',
            title: '',
            category: [],
            total: 0,
            date: this.formatDate(new Date())
        });
        this.currentTransaction = null;
        this.displayDialog = true;
    }

    async getData() {
        this.loading = true;
        try {
            const list = await this.pocketbase.transactions.getFullList({
                expand: 'customer,invoice,expense,category',
                sort: '-date'
            });
            this.allData = list.map(item => this.decorateTransaction(item));
            this.filterByYear();
        } finally {
            this.loading = false;
        }
    }

    recordForYear(data: any) {
        const date = new Date(data.date);
        return date.getFullYear() === this.selectedYear;
    }

    filterByYear() {
        this.data = this.allData
            .filter(d => this.recordForYear(d))
            .map(item => this.decorateTransaction(item));
        this.expenses = this.data.filter((s: any) => s.type === 'out');
        this.inflow = this.data.filter((s: any) => s.type === 'in');
        this.dataNetIncome = this.data.map((s: any) => ({
            ...s,
            total: s.type === 'in' ? s.total : -1 * s.total
        }));
    }

    async getCategories() {
        this.categories = await this.pocketbase.categories.getFullList({ sort: 'name' });
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
            const selected = new Set(this.transactionForm.get('category')?.value ?? []);
            selected.add(category.id);
            this.transactionForm.patchValue({ category: Array.from(selected) });
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category added' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add category' });
        } finally {
            this.categoryInput = '';
        }
    }

    editTransaction(transaction: any) {
        this.currentTransaction = transaction;
        this.transactionForm.reset({
            id: transaction.id,
            type: transaction.type,
            title: transaction.title,
            category: transaction.category || [],
            total: transaction.total,
            date: this.formatDate(transaction.date)
        });
        this.displayDialog = true;
    }

    async saveTransaction() {
        if (this.transactionForm.invalid) {
            this.transactionForm.markAllAsTouched();
            return;
        }

        const formValue = this.transactionForm.value;
        const payload: any = {
            type: formValue.type,
            title: formValue.title,
            category: formValue.category,
            total: Number(formValue.total),
            date: formValue.date ? new Date(formValue.date).toISOString() : new Date().toISOString()
        };

        this.loading = true;
        try {
            if (formValue.id) {
                await this.pocketbase.transactions.update(formValue.id, payload);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transaction updated' });
            } else {
                payload.user = this.pocketbase.auth.id;
                await this.pocketbase.transactions.create(payload);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transaction created' });
            }
            this.displayDialog = false;
            await this.getData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save transaction' });
        } finally {
            this.loading = false;
        }
    }

    confirmDelete(transaction: any) {
        if (transaction?.expand?.invoice || transaction?.expand?.expense) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cannot delete linked transaction' });
            return;
        }

        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this transaction?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.deleteTransaction(transaction);
            }
        });
    }

    private async deleteTransaction(transaction: any) {
        this.loading = true;
        try {
            await this.pocketbase.transactions.delete(transaction.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transaction deleted' });
            await this.getData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete transaction' });
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
            if (c.field === 'category') {
                const expanded = row.expand?.category || [];
                return escape(expanded.map((cat: any) => cat.name).join('; '));
            }
            if (c.field === 'invoice') {
                return escape(row.expand?.invoice?.number || '');
            }
            if (c.field === 'expense') {
                return escape(row.expand?.expense?.title || '');
            }
            const value = (row as any)[c.field];
            return escape(value);
        }).join(','));
        const csv = [header, ...lines].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transactions.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async reload() {
        await this.getData();
    }

    onYearChange() {
        this.selectedYear = Number(this.selectedYear);
        this.filterByYear();
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

    private decorateTransaction(transaction: any) {
        const categoryNames = (transaction.expand?.category ?? []).map((cat: any) => cat.name).join(', ');
        return {
            ...transaction,
            categoryNames,
            invoiceNumber: transaction.expand?.invoice?.number ?? '',
            expenseTitle: transaction.expand?.expense?.title ?? ''
        };
    }
}
