// inputnumber-global-config.directive.ts
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputNumber } from 'primeng/inputnumber';
import { SettingsService } from '../services/settings.service';

@Directive({
    selector: 'p-inputnumber[mode=currency]',
    standalone: true
})
export class InputNumberGlobalConfigDirective implements OnInit, OnDestroy {

    constructor(private settingsService: SettingsService, private comp: InputNumber) { 
    }

    async ngOnInit() {
        // set initial
        const currency = this.settingsService?.settings?.currency || '€';
        
        const format = this.settingsService?.settings?.numberFormat || 'decimal';

        const code = await this.settingsService.getCurrencyISO();
        
        let locale = 'de-DE';
        if (format == 'decimal')
            locale = 'en-US';
        
        this.comp.locale = locale;
        this.comp.currency = code;
        
    }

    ngOnDestroy() {  }
}