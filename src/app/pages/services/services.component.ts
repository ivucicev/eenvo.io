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
import { SelectModule } from 'primeng/select';


@Component({
    selector: 'eenvo-services',
    imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    MultiSelectModule,
    PopoverModule,
    TranslatePipe
],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class ServicesComponent {
    public data: any[] = [];
    public title: any = 'Services';
    public visible = false;
    public serviceForm: FormGroup;
    public selectedService: any = null;
    public loading = false;
    public globalFilterValue = '';
    public units = ['-', 'Hour', 'Piece', 'Kg', 'Km', 'L', 'Year', 'Month'];
    public visibleColumns: string[] = [
        'code','title','unit','quantity','price','discount','tax'
    ];
    public allColumns = [
        { field: 'code', header: 'Code' },
        { field: 'title', header: 'Title' },
        { field: 'unit', header: 'Unit' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' },
        { field: 'discount', header: 'Discount' },
        { field: 'tax', header: 'Tax' }
    ];

    constructor(private pocketbase: PocketBaseService,
                private fb: FormBuilder,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.serviceForm = this.fb.group({
            code: ['', Validators.required],
            title: ['', Validators.required],
            unit: ['-'],
            quantity: [1, Validators.required],
            price: [0, Validators.required],
            discount: [0],
            tax: [0]
        });
        this.getData();
    }

    async getData() {
        this.loading = true;
        try {
            this.data = await this.pocketbase.services.getFullList();
        } finally {
            this.loading = false;
        }
    }

    newService() {
        this.selectedService = null;
        this.serviceForm.reset({ code: '', title: '', unit: '-', quantity: 1, price: 0, discount: 0, tax: 0 });
        this.visible = true;
    }

    editService(service: any) {
        this.selectedService = service;
        this.serviceForm.patchValue(service);
        this.visible = true;
    }

    async saveService() {
        if (this.serviceForm.valid) {
            this.loading = true;
            try {
                const data = this.serviceForm.value;
                data.company = this.pocketbase.auth.company;
                if (this.selectedService) {
                    await this.pocketbase.services.update(this.selectedService.id, data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service updated successfully' });
                } else {
                    await this.pocketbase.services.create(data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service created successfully' });
                }
                this.visible = false;
                this.getData();
            } catch (e) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save service' });
            } finally {
                this.loading = false;
            }
        }
    }

    confirmDelete(service: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this service?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteService(service)
        });
    }

    async deleteService(service: any) {
        this.loading = true;
        try {
            await this.pocketbase.services.delete(service.id);
            this.data = this.data.filter(s => s.id !== service.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service deleted successfully' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete service' });
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
        link.download = 'services.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async reload() {
        this.getData();
    }
}
