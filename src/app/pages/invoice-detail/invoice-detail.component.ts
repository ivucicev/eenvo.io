import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, AbstractControl, ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../core/services/toast.service';
import { DxNumberBoxComponent, DxNumberBoxModule } from 'devextreme-angular';

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
    isPayed = false;

    public readonly invoice = input<any>();

    constructor(private formBuilder: UntypedFormBuilder, private toast: ToastService, private pocketbase: PocketBaseService) {

        this.invoicesForm = this.formBuilder.group({
            id: [''],
            customer: ['', [Validators.required]],
            number: ['', [Validators.required]],
            tax: [true, [Validators.required]],
            isPayed: [false, [Validators.required]],
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

            customerData: new FormGroup({
                name: new FormControl('', [Validators.required]),
                address: new FormControl('', [Validators.required]),
                city: new FormControl('', [Validators.required]),
                postal: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                vatID: new FormControl('', [Validators.required]),
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
            }),

            paymentData: new FormGroup({
                iban: new FormControl('', [Validators.required]),
                reference: new FormControl('', [Validators.required]),
                name: new FormControl('', [Validators.required]),
            }),
            companyEmail: ['', [Validators.required]],
            companyWebsite: ['', [Validators.required]],
            companyContactno: ['', [Validators.required]],
            billingName: ['', [Validators.required]],
            billingAddress: ['', [Validators.required]],
            billingPhoneno: ['', [Validators.required]],
            billingTaxno: ['', [Validators.required]],
            same: ['', [Validators.required]],
            shippingName: ['', [Validators.required]],
            shippingAddress: ['', [Validators.required]],
            shippingPhoneno: ['', [Validators.required]],
            shippingTaxno: ['', [Validators.required]],
            productName: ['', [Validators.required]],
        });

        this.addItem();
        this.getCustomers();
        this.getServices();
        
        this.logo += this.pocketbase.auth.company + '/' + this.pocketbase.auth.expand.company.logo;
        
        effect(() => {
            this.setCurrentInvoice(this.invoice());
        })
    }
    
    addItem() {
        this.items.push({
            title: '',
            quantity: 0,
            total: 0,
            discount: 0,
            tax: 0,
            price: 0
        });
    }

    async setCurrentInvoice(invoice: any) {

        if (!invoice?.id) return;

        const i: any = await this.pocketbase.pb.collection('invoices').getOne(invoice.id, { expand: 'items' });

        this.invoicesForm.patchValue(i);

        this.invoicesForm.patchValue({
            note: this.pocketbase.auth.expand.company.additional
        })

        if (i.date)
            this.invoicesForm.patchValue({ date: new Date(i.date).toISOString().split('T')[0] });
        if (i.deliveryDate)
            this.invoicesForm.patchValue({ deliveryDate: new Date(i.deliveryDate).toISOString().split('T')[0] });
        if (i.dueDate)
            this.invoicesForm.patchValue({ dueDate: new Date(i.dueDate).toISOString().split('T')[0] });

        this.items = i.expand?.items || [];

        if (i.isPayed) this.invoicesForm.disable();
        this.isPayed = i.isPayed;

    }

    async print() {

        const src = "http://localhost:4200/invoice-print?print=1&data=" + encodeURIComponent(JSON.stringify(this.invoicesForm.getRawValue())) + "&items=" + JSON.stringify(this.items);

        //let newWindow: any = window.open(src, "_blank");

        /*newWindow.onload = function () {
            setTimeout(() => {
                newWindow.print();
            }, 1000)
            newWindow.onafterprint = function () {
                newWindow.close(); // Close the tab after printing
            };
        };*/

        let iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.width = "0px";
        iframe.style.height = "0px";
        iframe.style.border = "none";
        iframe.src = src;

        iframe.onload = function () {
            setTimeout(() => {
                iframe?.contentWindow?.print();
            }, 500);
            setTimeout(() => document.body.removeChild(iframe), 1000); // Clean up
        };

        document.body.appendChild(iframe);

    }

    async getCustomers() {
        this.customers = await this.pocketbase.pb.collection('customers').getFullList();
    }

    async getServices() {
        this.services = await this.pocketbase.pb.collection('services').getFullList();
    }

    async customerSelected(e: any) {

        const c = this.customers.find((customer: any) => customer.name == e.target.value);
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

        if (c.due) {
            this.invoicesForm.patchValue({ dueDate: new Date((new Date().setDate(new Date().getDate() + c.due))).toISOString().split('T')[0] })
        }
    }

    async serviceSelected(e: any, index: number) {
        const s = this.services.find((service: any) => service.code + " - " + service.title == e.target.value);
        this.items[index].unit = s.unit;
        this.items[index].quantity = s.quantity;
        this.items[index].price = s.price;
        this.items[index].discount = s.discount;
        this.items[index].tax = s.tax;
        this.items[index].total = 0.0;
        this.items[index].code = s.code;

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
                allItems.push(this.pocketbase.pb.collection('items').update(item.id, item, {
                    '$autoCancel': false,
                }));
            else
                allItems.push(this.pocketbase.pb.collection('items').create(item, {
                    '$autoCancel': false,
                }));
        })

        const itemsCreate = await Promise.all(allItems);

        invoice.items = itemsCreate.map(i => i.id);

        if (invoice.id) {

            const updated = await this.pocketbase.pb.collection('invoices').update(invoice.id, invoice);
            this.toast.success();

        } else {

            const created = await this.pocketbase.pb.collection('invoices').create(invoice);
            this.invoicesForm.patchValue({ id: created.id });
            this.toast.success();
        }

    }

    // Default
    counter = 0;
    increment() {
        this.counter++;
        var itemAmount = document.querySelector('.product-price') as HTMLInputElement;
        var priceselection = document.querySelector(".product-line-price") as HTMLInputElement;
        this.updateQuantity(itemAmount?.value, this.counter, priceselection);
    }

    decrement() {
        this.counter--;
        var itemAmount = document.querySelector('.product-price') as HTMLInputElement;
        var priceselection = document.querySelector(".product-line-price") as HTMLInputElement;
        this.updateQuantity(itemAmount?.value, this.counter, priceselection);
    }

    updateQuantity(amount: any, itemQuntity: any, priceselection: any) {
        var linePrice = amount * itemQuntity;
        priceselection.value = linePrice;
    }

    recalculate() {
        let total = 0;
        let grandTotal = 0;
        let taxValue = 0;
        let discountValue = 0;
        this.items.forEach((item: any) => {
            const ttotal = (item.price * item.quantity) * (item.tax + 1);
            item.total = ttotal - ((item.price * item.quantity) * (item.discount));
            item.total = item.total;
            total += +ttotal;
            grandTotal += +item.total;
            taxValue += +(item.price * item.quantity) * (item.tax)
            discountValue += +(item.price * item.quantity) * (item.discount)
        })
        this.invoicesForm.patchValue({ total: grandTotal });
        this.invoicesForm.patchValue({ subTotal: total });
        this.invoicesForm.patchValue({ discountValue: discountValue });
        this.invoicesForm.patchValue({ taxValue: taxValue });
    }

    // Remove Item
    removeItem(index: any) {
        this.items.splice(index, 1);
    }
}
