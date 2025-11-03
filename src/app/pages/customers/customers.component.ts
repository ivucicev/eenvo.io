import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
import { SelectModule } from 'primeng/select';


@Component({
    selector: 'eenvo-customers',
    imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
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
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class CustomersComponent {
    public data: any[] = [];
    public countries: any[] = [];
    public isVendor = false;
    public title: any = 'Customers';
    public visible = false;
    public customerForm: FormGroup;
    public selectedCustomer: any = null;
    public loading = false;
    public globalFilterValue = '';
    public visibleColumns: string[] = [
        'code','name','addition','vatID','address','city','postal','country','phone','email','due', 'note', 'invoiceNote'
    ];

    exportCsv() {
        const columns = this.allColumns.filter(c => this.visibleColumns.includes(c.field));
        const header = columns.map(c => (this as any).title ? (c.header) : c.header).join(',');
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
        link.download = 'customers.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    public allColumns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'addition', header: 'Addition' },
        { field: 'vatID', header: 'VAT ID' },
        { field: 'address', header: 'Address' },
        { field: 'city', header: 'City' },
        { field: 'postal', header: 'Postal Code' },
        { field: 'country', header: 'Country' },
        { field: 'phone', header: 'Phone' },
        { field: 'email', header: 'Email' },
        { field: 'note', header: 'Note' },
        { field: 'invoiceNote', header: 'Notes & Terms' },
        { field: 'due', header: 'Due Amount' }
    ];

    constructor(
        private http: HttpClient, 
        private pocketbase: PocketBaseService, 
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.customerForm = this.fb.group({
            code: [''],
            name: ['', Validators.required],
            addition: [''],
            vatID: [''],
            address: [''],
            city: [''],
            postal: [''],
            country: [''],
            phone: [''],
            fax: [''],
            mobile: [''],
            email: ['', Validators.email],
            web: [''],
            iban: [''],
            note: [''],
            invoiceNote: [''],
            due: [0]
        });

        activatedRoute.title.subscribe(title => {
            this.isVendor = title == "Vendors";
            this.title = title;
        });

        this.getData();

        this.http.get<any[]>('assets/json/country-list.json').subscribe(data => {
            data.forEach(d => {
                d.countryName = d.countryName[localStorage.getItem('lang') || 'en'] ?? d.country2LetterCode;
            });
            this.countries = data;
        });
    }

    async getData() {
        this.loading = true;
        try {
            this.data = await this.pocketbase.customers.getFullList({
                filter: `isVendor = ${this.isVendor}`
            });
        } finally {
            this.loading = false;
        }
    }

    newCustomer() {
        this.selectedCustomer = null;
        this.customerForm.reset();
        this.customerForm.patchValue({ isVendor: this.isVendor });
        this.visible = true;
    }

    editCustomer(customer: any) {
        this.selectedCustomer = customer;
        this.customerForm.patchValue(customer);
        this.visible = true;
    }

    async saveCustomer() {
        if (this.customerForm.valid) {
            this.loading = true;
            try {
                const formData = this.customerForm.value;
                formData.isVendor = this.isVendor;

                if (this.selectedCustomer) {
                    await this.pocketbase.customers.update(this.selectedCustomer.id, formData);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer updated successfully' });
                } else {
                    await this.pocketbase.customers.create(formData);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer created successfully' });
                }
                
                this.visible = false;
                this.getData();
            } catch (error) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save customer' });
            } finally {
                this.loading = false;
            }
        }
    }

    confirmDelete(customer: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this customer?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteCustomer(customer);
            }
        });
    }

    async deleteCustomer(customer: any) {
        this.loading = true;
        try {
            await this.pocketbase.customers.delete(customer.id);
            this.data = this.data.filter((f: any) => f.id !== customer.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer deleted successfully' });
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete customer' });
        } finally {
            this.loading = false;
        }
    }

    async reload() {
        this.getData();
    }

}
