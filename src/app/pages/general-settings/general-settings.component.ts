import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DxSelectBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { ToastService } from '../../core/services/toast.service';
import { SettingsService } from '../../core/services/settings.service';
import { DateFormats } from '../../core/models/date-formats';

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
    public dateFormats: any[] = Object.values(DateFormats);

    constructor(
        private http: HttpClient,
        private toast: ToastService,
        private pocketbase: PocketBaseService,
        private settingsService: SettingsService
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
            currency: new FormControl('€', [Validators.required]),
            numberFormat: new FormControl('decimal', [Validators.required]),
            timeZone: new FormControl(Intl.DateTimeFormat().resolvedOptions().timeZone, [Validators.required]),
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
            this.data = await this.pocketbase.settings
                .getFirstListItem(`company="${this.pocketbase.auth.company}"`);

            this.settingsForm.patchValue(this.data);
        } catch (error) {
            // If no settings exist, create default settings
            this.createDefaultSettings();
        }
    }

    private async createDefaultSettings() {
        try {
            this.data = await this.pocketbase.settings
                .create(this.settingsForm.getRawValue());

            this.settingsForm.patchValue(this.data);

            this.settingsService.settings = { ...this.data };
        } catch (error) {
            this.toast.error('Error creating default settings');
        }
    }

    async submit() {
        if (this.settingsForm.valid) {
            const formData = this.settingsForm.getRawValue();
            formData.updated = new Date();

            try {
                this.data = await this.pocketbase.settings
                    .update(this.data.id, formData);
                this.settingsService.settings = { ...this.data };
                this.settingsService.reinit();
                this.toast.success();
            } catch (error) {
                this.toast.error('Error updating settings');
            }
        }
    }
}
