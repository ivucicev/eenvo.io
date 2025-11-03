import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'primeng/popover';

@Component({
    selector: 'eenvo-templates',
    imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    MultiSelectModule,
    PopoverModule,
    TranslatePipe
],
    templateUrl: './templates.component.html',
    styleUrl: './templates.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class TemplatesComponent {
    public data: any[] = [];
    public title: any = 'Templates';
    public visible = false;
    public templateForm: FormGroup;
    public selectedTemplate: any = null;
    public loading = false;
    public globalFilterValue = '';
    public visibleColumns: string[] = [ 'name', 'template' ];
    public allColumns = [ { field: 'name', header: 'Name' }, { field: 'template', header: 'Template' } ];

    constructor(private pocketbase: PocketBaseService,
                private fb: FormBuilder,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.templateForm = this.fb.group({
            name: ['', Validators.required],
            template: ['', Validators.required]
        });
        this.getData();
    }

    async getData() {
        this.loading = true;
        try {
            this.data = await this.pocketbase.templates.getFullList();
        } finally {
            this.loading = false;
        }
    }

    newTemplate() {
        this.selectedTemplate = null;
        this.templateForm.reset({ name: '', template: '' });
        this.visible = true;
    }

    editTemplate(t: any) {
        this.selectedTemplate = t;
        this.templateForm.patchValue(t);
        this.visible = true;
    }

    async saveTemplate() {
        if (this.templateForm.valid) {
            this.loading = true;
            try {
                const data = this.templateForm.value;
                if (this.selectedTemplate) {
                    await this.pocketbase.templates.update(this.selectedTemplate.id, data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Template updated successfully' });
                } else {
                    await this.pocketbase.templates.create(data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Template created successfully' });
                }
                this.visible = false;
                this.getData();
            } catch {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save template' });
            } finally {
                this.loading = false;
            }
        }
    }

    confirmDelete(t: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this template?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteTemplate(t)
        });
    }

    async deleteTemplate(t: any) {
        this.loading = true;
        try {
            await this.pocketbase.templates.delete(t.id);
            this.data = this.data.filter(x => x.id !== t.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Template deleted successfully' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete template' });
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
        link.download = 'templates.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async reload() { this.getData(); }
}
