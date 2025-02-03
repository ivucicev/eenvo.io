import { CommonModule } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray, AbstractControl, ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-invoice-detail',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, FormsModule, TranslateModule],
	templateUrl: './invoice-detail.component.html',
	styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent {
	// bread crumb items
	submitted = false;
	invoicesForm!: UntypedFormGroup;
	customers: any = [];
	services: any = [];
	userForm: UntypedFormGroup;
	items: any = [];
	logo = environment.pocketbase + '/api/files/companies/';
	isPayed = false;

	public readonly invoice = input<any>();

	constructor(private formBuilder: UntypedFormBuilder, private pocketbase: PocketBaseService) {

		this.userForm = this.formBuilder.group({
			items: this.formBuilder.array([
				this.formBuilder.control(null)
			])
		})

		/**
		 * Form Validation
		 */
		this.invoicesForm = this.formBuilder.group({
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
			user: ['', [Validators.required]],
			total: [0, [Validators.required]],
			subTotal: [0, [Validators.required]],
			taxValue: [0, [Validators.required]],
			discountValue: [0, [Validators.required]],

			customerData: new FormGroup({
				name: new FormControl('', [Validators.required]),
				address: new FormControl('', [Validators.required]),
				vatID: new FormControl('', [Validators.required]),
				contact: new FormControl('', [Validators.required]),
			}),

			companyData: new FormGroup({
				name: new FormControl(this.pocketbase.auth.expand.company.name, [Validators.required]),
				address: new FormControl(`${this.pocketbase.auth.expand.company.address},\n\r${this.pocketbase.auth.expand.company.postal} ${this.pocketbase.auth.expand.company.city}\n\r${this.pocketbase.auth.expand.company.country}`, [Validators.required]),
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

		this.items = [{
			title: '',
			quantity: 0,
			total: 0
		}]

		this.getCustomers();
		this.getServices();

		this.logo += this.pocketbase.auth.company + '/' + this.pocketbase.auth.expand.company.logo;

		effect(() => {
			this.setCurrentInvoice(this.invoice());
		})
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
			address: `${c.address},\n${c.postal} ${c.city}\n${c.country}`,
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
		this.items[index].total = 0;
		this.items[index].code = s.code;

		this.recalculate();
	}

	ngOnInit(): void {
	}

	/**
	 * Form data get
	 */
	get form() {
		return this.invoicesForm.controls;
	}


	/**
   * Save user
   */
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

		console.log(invoice)

		if (invoice.id) {

			const updated = await this.pocketbase.pb.collection('invoices').update(invoice.id, invoice);

		} else {

			const created = await this.pocketbase.pb.collection('invoices').create(invoice);

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
			const ttotal = (item.price.toFixed(2) * item.quantity.toFixed(2)) * (item.tax.toFixed(2) / 100 + 1);
			item.total = ttotal - ((item.price.toFixed(2) * item.quantity.toFixed(2)) * (item.discount.toFixed(2) / 100));
			item.total = item.total.toFixed(2);
			total += +ttotal;
			grandTotal += +item.total;
			taxValue += +(item.price.toFixed(2) * item.quantity.toFixed(2)) * (item.tax.toFixed(2) / 100)
			discountValue += +(item.price.toFixed(2) * item.quantity.toFixed(2)) * (item.discount.toFixed(2) / 100)
		})
		this.invoicesForm.patchValue({ total: grandTotal.toFixed(2) });
		this.invoicesForm.patchValue({ subTotal: total.toFixed(2) });
		this.invoicesForm.patchValue({ discountValue: discountValue.toFixed(2) });
		this.invoicesForm.patchValue({ taxValue: taxValue.toFixed(2) });
	}

	// Add Item
	addItem(): void {
		this.items.push({
			title: '',
			quantity: 0,
			total: 0
		});
	}

	// Get Item Data 
	getItemFormControls(): AbstractControl[] {
		return (<UntypedFormArray>this.userForm.get('items')).controls;
	}

	// Remove Item
	removeItem(index: any) {
		this.items.splice(index, 1);
	}
}
