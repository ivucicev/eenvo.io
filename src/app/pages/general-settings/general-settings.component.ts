import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
	selector: 'app-general-settings',
	standalone: true,
	imports: [
		DxSelectBoxModule,
		ReactiveFormsModule
	],
	templateUrl: './general-settings.component.html',
	styleUrl: './general-settings.component.scss'
})
export class GeneralSettingsComponent {
	public data: any;
	settingsForm!: FormGroup;

	public currencies: any[] = [];
	public numberFormats: any[] = [
		{ id: 'decimal', format: '1,234.56', separator: '.' },
		{ id: 'comma', format: '1.234,56', separator: ',' }
	];

	public timeZones: any[] = [];
	public dateFormats: any[] = [
		{ id: 'MM/DD/YYYY', display: '12/31/2024' },
		{ id: 'DD/MM/YYYY', display: '31/12/2024' },
		{ id: 'YYYY-MM-DD', display: '2024-12-31' }
	];

	constructor(
		private http: HttpClient,
		private toast: ToastService,
		private pocketbase: PocketBaseService
	) {
		// Load currencies from JSON file
		this.http.get<any[]>('assets/json/currency-list.json').subscribe((data: any) => {
			Object.keys(data).forEach((k: string) => {
				this.currencies.push({ code: k, ...data[k] })
			})
		});

		// Load timezones
		this.timeZones = this.getTimeZones();

		this.settingsForm = new FormGroup({
			id: new FormControl('', [Validators.required]),
			currency: new FormControl('', [Validators.required]),
			numberFormat: new FormControl('decimal', [Validators.required]),
			timeZone: new FormControl('', [Validators.required]),
			dateFormat: new FormControl('YYYY-MM-DD', [Validators.required])
		});

		this.getData();
	}

	private getTimeZones(): any[] {
		return Intl.supportedValuesOf('timeZone').map(zone => ({
			id: zone,
			name: zone.replace(/_/g, ' ')
		}));
	}

	async getData() {
		try {
			this.data = await this.pocketbase.pb
				.collection('settings')
				.getFirstListItem(`company="${this.pocketbase.auth.company}"`);

			this.settingsForm.patchValue(this.data);
		} catch (error) {
			// If no settings exist, create default settings
			this.createDefaultSettings();
		}
	}

	private async createDefaultSettings() {
		const defaultSettings = {
			currency: 'EUR',
			numberFormat: 'decimal',
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			dateFormat: 'YYYY-MM-DD',
		};

		try {
			this.data = await this.pocketbase.pb
				.collection('settings')
				.create(defaultSettings);

			this.settingsForm.patchValue(this.data);
		} catch (error) {
			this.toast.error('Error creating default settings');
		}
	}

	async submit() {
		if (this.settingsForm.valid) {
			const formData = this.settingsForm.getRawValue();
			formData.updated = new Date();

			try {
				this.data = await this.pocketbase.pb
					.collection('settings')
					.update(this.data.id, formData);

				this.toast.success();
			} catch (error) {
				this.toast.error('Error updating settings');
			}
		}
	}
}
