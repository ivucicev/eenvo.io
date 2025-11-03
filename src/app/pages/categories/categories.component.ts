import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'primeng/popover';

@Component({
    selector: 'app-categories',
    imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    MultiSelectModule,
    PopoverModule,
    TranslatePipe
],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class CategoriesComponent {
    public data: any[] = [];
    public title: any = 'Categories';
    public visible = false;
    public categoryForm: FormGroup;
    public selectedCategory: any = null;
    public loading = false;
    public globalFilterValue = '';
    public visibleColumns: string[] = [ 'name' ];
    public allColumns = [ { field: 'name', header: 'Name' } ];

    constructor(private pocketbase: PocketBaseService,
                private fb: FormBuilder,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.categoryForm = this.fb.group({ name: ['', Validators.required] });
        this.getData();
    }

    async getData() {
        this.loading = true;
        try {
            this.data = await this.pocketbase.categories.getFullList();
        } finally {
            this.loading = false;
        }
    }

    newCategory() {
        this.selectedCategory = null;
        this.categoryForm.reset({ name: '' });
        this.visible = true;
    }

    editCategory(category: any) {
        this.selectedCategory = category;
        this.categoryForm.patchValue(category);
        this.visible = true;
    }

    async saveCategory() {
        if (this.categoryForm.valid) {
            this.loading = true;
            try {
                const data = this.categoryForm.value;
                if (this.selectedCategory) {
                    await this.pocketbase.categories.update(this.selectedCategory.id, data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category updated successfully' });
                } else {
                    await this.pocketbase.categories.create(data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category created successfully' });
                }
                this.visible = false;
                this.getData();
            } catch {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save category' });
            } finally {
                this.loading = false;
            }
        }
    }

    confirmDelete(category: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this category?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteCategory(category)
        });
    }

    async deleteCategory(category: any) {
        this.loading = true;
        try {
            await this.pocketbase.categories.delete(category.id);
            this.data = this.data.filter(c => c.id !== category.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category deleted successfully' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete category' });
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
        const lines = this.data.map(row => columns.map(c => escape((row as any)[c.field])).join(','));
        const csv = [header, ...lines].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'categories.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async reload() { this.getData(); }
}