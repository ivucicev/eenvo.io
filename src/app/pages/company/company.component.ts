import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DxSelectBoxModule, DxTextAreaModule, DxDateBoxModule, DxFormModule, DxFileUploaderComponent, DxFileUploaderModule } from 'devextreme-angular';
import { environment } from '../../../environments/environment';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastsContainer } from '../../core/componate/toasts-container.component';
import { ToastService } from '../../core/services/toast.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'eenvo-company',
	standalone: true,
	imports: [
		DxSelectBoxModule,
		DxTextAreaModule,
		DxDateBoxModule,
		DxFormModule,
		DxFileUploaderModule,
		ReactiveFormsModule,
        TranslatePipe
	],
	templateUrl: './company.component.html',
	styleUrl: './company.component.scss'
})
export class CompanyComponent {
	public data: any;

	companyForm!: FormGroup;
	public countries: any = []
	public logo = environment.pocketbase + '/api/files/companies/';

	@ViewChild('uploader')
	public file?: DxFileUploaderComponent;

	constructor(private http: HttpClient, private toast: ToastService, private pocketbase: PocketBaseService) {
		this.http.get<any[]>('assets/json/country-list.json').subscribe(data => {
			this.countries = data; // Output JSON as an array
		});
		this.companyForm = new FormGroup({
			id: new FormControl('', [Validators.required]),
			logo: new FormControl(''), // Image URL
			name: new FormControl('', [Validators.required]),
			vatID: new FormControl('', [Validators.required]),
			address: new FormControl(''),
			city: new FormControl(''),
			postal: new FormControl(''),
			phone: new FormControl('', [Validators.pattern('^[0-9()+ -]*$')]),
			email: new FormControl('', [Validators.required, Validators.email]),
			web: new FormControl(''),
			nkd: new FormControl(''),
			swift: new FormControl(''),
			additional: new FormControl(''),
			country: new FormControl(''),
			iban: new FormControl('', [Validators.required]),
			responsible: new FormControl(''),
			created: new FormControl(new Date()),
			updated: new FormControl(new Date())
		});
		this.getData();
	}

	async getData() {
		this.data = await this.pocketbase.companies.getOne(this.pocketbase.auth.company);
		this.companyForm.patchValue(this.data);

		this.logo += this.data.id + '/' + this.data.logo;

	}

	async fileAdded(e: any) {

		const file = e.value[0];

		const formData = new FormData();
		formData.append('logo', file);

		this.data = await this.pocketbase.companies.update(this.data.id, formData);

        this.companyForm.patchValue({ logo: this.data.logo });

	    this.logo = environment.pocketbase + `/api/files/companies/${this.data.id}/${this.data.logo}`;

	}

	async submit() {
		const data = this.companyForm.getRawValue();
		this.data = await this.pocketbase.companies.update(data.id, data);
		this.toast.success()
	}

}
