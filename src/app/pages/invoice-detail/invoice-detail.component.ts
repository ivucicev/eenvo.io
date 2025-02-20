import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { DxNumberBoxModule } from 'devextreme-angular';

@Component({
    selector: 'eenvo-invoice-detail',
    standalone: true,
    imports: [ReactiveFormsModule, DxNumberBoxModule, CommonModule, FormsModule, TranslateModule],
    templateUrl: './invoice-detail.component.html',
    styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent {

    submitted = false;
    invoicesForm!: UntypedFormGroup;
    customers: any = [];
    services: any = [];
    items: any = [];
    logo = environment.pocketbase + '/api/files/companies/';
    isPaid = false;

    public readonly invoice = input<any>();

    constructor(private formBuilder: UntypedFormBuilder, private pocketbase: PocketBaseService) {

        this.invoicesForm = this.formBuilder.group({

            id: [''],
            customer: ['', [Validators.required]],
            number: ['', [Validators.required]],
            tax: [true, [Validators.required]],
            isPaid: [false, [Validators.required]],
            type: ['-', [Validators.required]],
            paymentType: ['Transaction', [Validators.required]],
            date: [new Date().toISOString().split('T')[0], [Validators.required]],
            deliveryDate: [null],
            dueDate: [null],
            paymentDate: [null],
            note: [''],
            internalNote: [''],
            user: [this.pocketbase.auth.id, [Validators.required]],
            total: [0, [Validators.required]],
            subTotal: [0, [Validators.required]],
            taxValue: [0, [Validators.required]],
            discountValue: [0, [Validators.required]],
            showShippingHandlingFees: [false],
            shippingHandlingFee: [0],
            useBillingAndShippingAddress: [false],
            billingAddressSameAsShippingAddress: [true],

            customerData: new FormGroup({
                name: new FormControl('', [Validators.required]),
                address: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                postal: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                vatID: new FormControl('', [Validators.required]),
                contact: new FormControl('', [Validators.required]),
            }),

            shippingData: new FormGroup({
                name: new FormControl('', [Validators.required]),
                address: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                postal: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                contact: new FormControl('', [Validators.required]),
            }),

            companyData: new FormGroup({
                name: new FormControl(this.pocketbase.auth.expand.company.name, [Validators.required]),
                address: new FormControl(`${this.pocketbase.auth.expand.company.address}`, [Validators.required]),
                city: new FormControl(`${this.pocketbase.auth.expand.company.city}`, [Validators.required]),
                postal: new FormControl(`${this.pocketbase.auth.expand.company.postal}`, [Validators.required]),
                country: new FormControl(`${this.pocketbase.auth.expand.company.country}`, [Validators.required]),
                vatID: new FormControl(this.pocketbase.auth.expand.company.vatID, [Validators.required]),
                note: new FormControl(this.pocketbase.auth.expand.company.additional, [Validators.required]),
                phone: new FormControl(this.pocketbase.auth.expand.company.phone, [Validators.required]),
                swift: new FormControl(this.pocketbase.auth.expand.company.swift, [Validators.required]),
                web: new FormControl(this.pocketbase.auth.expand.company.web, [Validators.required]),
                iban: new FormControl(this.pocketbase.auth.expand.company.iban, [Validators.required]),
                email: new FormControl(this.pocketbase.auth.expand.company.email, [Validators.required]),
            }),

            paymentData: new FormGroup({
                iban: new FormControl(this.pocketbase.auth.expand.company.iban, [Validators.required]),
                reference: new FormControl('', [Validators.required]),
                name: new FormControl(this.pocketbase.auth.expand.company.name, [Validators.required]),
            })

        });

        this.addItem();
        this.getCustomers();
        this.getServices();

        this.logo += this.pocketbase.auth.company + '/' + this.pocketbase.auth.expand.company.logo;

        this.invoicesForm.get('tax')?.valueChanges.subscribe(this.recalculate.bind(this))
        this.invoicesForm.get('type')?.valueChanges.subscribe(this.recalculate.bind(this))
        this.invoicesForm.get('number')?.valueChanges.subscribe(this.setReference.bind(this))

        effect(() => {
            this.setCurrentInvoice(this.invoice());
        })
    }

    addItem() {
        this.items.push({
            title: '',
            quantity: 1.0,
            total: 0,
            discount: 0,
            tax: 0,
            price: 0
        });
    }

    async setCurrentInvoice(invoice: any) {

        if (!invoice?.id) return;

        const i: any = await this.pocketbase.invoices.getOne(invoice.id, { expand: 'items' });

        this.invoicesForm.patchValue(i);

        if (i.date)
            this.invoicesForm.patchValue({ date: new Date(i.date).toISOString().split('T')[0] });
        if (i.deliveryDate)
            this.invoicesForm.patchValue({ deliveryDate: new Date(i.deliveryDate).toISOString().split('T')[0] });
        if (i.dueDate)
            this.invoicesForm.patchValue({ dueDate: new Date(i.dueDate).toISOString().split('T')[0] });

        this.items = i.expand?.items || [];

        if (i.isPaid) this.invoicesForm.disable();
        this.isPaid = i.isPaid;

    }

    async setReference(number: any) {
        this.invoicesForm.get('paymentData')?.patchValue({
            reference: `HR00 ${number}-${new Date().getFullYear()}`
        })
    }

    async getCustomers() {
        this.customers = await this.pocketbase.customers.getFullList();
    }

    async getServices() {
        this.services = await this.pocketbase.services.getFullList();
    }

    async customerSelected(e: any) {

        const c = this.customers.find((customer: any) => customer.name == e.target.value);
        if (!c) return;

        this.invoicesForm.patchValue({ customer: c.id });

        this.invoicesForm.get('customerData')?.patchValue({
            name: c.name,
            address: `${c.address}`,
            postal: `${c.postal}`,
            city: `${c.city}`,
            country: `${c.country}`,
            vatID: c.vatID,
            contact: c.email
        });

        this.invoicesForm.get('shippingData')?.patchValue({
            name: c.name,
            address: `${c.address}`,
            postal: `${c.postal}`,
            city: `${c.city}`,
            country: `${c.country}`,
            vatID: c.vatID,
            contact: c.email
        });

        if (c.due) {
            this.invoicesForm.patchValue({ dueDate: new Date((new Date().setDate(new Date().getDate() + c.due))).toISOString().split('T')[0] })
        }
    }

    async serviceSelected(e: any, index: number) {
        const s = this.services.find((service: any) => service.code + " - " + service.title == e.target.value);
        
        if (s) {
            this.items[index].unit = s.unit;
            this.items[index].quantity = s.quantity;
            this.items[index].price = s.price;
            this.items[index].discount = s.discount;
            this.items[index].tax = s.tax;
            this.items[index].total = 0.0;
            this.items[index].code = s.code;
        }

        this.recalculate();

    }

    ngOnInit(): void {
    }

    get form() {
        return this.invoicesForm.controls;
    }

    async saveInvoice() {

        this.submitted = true

        const invoice = this.invoicesForm.getRawValue();

        invoice.company = this.pocketbase.auth.company;

        invoice.items = [];

        const allItems: any = [];
        this.items.forEach((item: any) => {
            if (item.id)
                allItems.push(this.pocketbase.items.update(item.id, item, {
                    '$autoCancel': false,
                    headers: { notoast: '1' }
                }));
            else
                allItems.push(this.pocketbase.items.create(item, {
                    '$autoCancel': false,
                    headers: { notoast: '1' }
                }));
        })

        const itemsCreate = await Promise.all(allItems);

        invoice.items = itemsCreate.map(i => i.id);

        if (!invoice.customer) {
            // should create new customer if no customer data provided
            const customer = {
                name: invoice.customerData.name,
                address: invoice.customerData.address,
                postal: invoice.customerData.postal,
                city: invoice.customerData.city,
                country: invoice.customerData.country,
                vatID: invoice.customerData.vatID,
            };

            const create = await this.pocketbase.customers.create(customer);
            invoice.customer = create.id;
            this.invoicesForm.patchValue({ customer: create.id });
        }

        if (invoice.id) {
            const updated = await this.pocketbase.invoices.update(invoice.id, invoice);
        } else {
            const created = await this.pocketbase.invoices.create(invoice);
            this.invoicesForm.patchValue({ id: created.id });
        }
        
    }

    recalculate() {
        let subTotal = 0;
        let grandTotal = 0;
        let totalTaxValue = 0;
        let totalDiscountValue = 0;
        const isR1 = this.invoicesForm.get('type')?.value == "R1";
        const isTaxed = !!this.invoicesForm.get('tax')?.value;

        this.items.forEach((item: any) => {

            if (!isTaxed) item.tax = 0.0;

            const itemTotalValue = +(item.price * item.quantity)
            const itemDiscountValue = itemTotalValue * (item.discount);
            const discountedItemTotalValue = itemTotalValue - itemDiscountValue;
            const itemTaxValue = discountedItemTotalValue * item.tax;
            const itemTaxedTotalValue = itemTaxValue + discountedItemTotalValue;

            totalDiscountValue += +itemDiscountValue;
            totalTaxValue += +itemTaxValue;
            subTotal += +discountedItemTotalValue;
            grandTotal += +itemTaxedTotalValue;

            if (isR1) item.total = +discountedItemTotalValue;
            else item.total = +itemTaxedTotalValue;

        });

        this.invoicesForm.patchValue({ total: grandTotal });
        this.invoicesForm.patchValue({ subTotal: subTotal });
        this.invoicesForm.patchValue({ discountValue: totalDiscountValue });
        this.invoicesForm.patchValue({ taxValue: totalTaxValue });
    }

    // Remove Item
    removeItem(index: any) {
        this.items.splice(index, 1);
        this.recalculate();
    }
}
