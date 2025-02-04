import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { DateFormatKey, DateFormats } from '../models/date-formats';

const formatter = (format: any, value: any) => new Intl.NumberFormat(format === 'decimal' ? 'en-US' : 'de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(value);

@Pipe({
    name: 'numberFormat',
    standalone: true
})
export class NumberFormatPipe implements PipeTransform {
    
    private format = '';
    
    constructor(private settingsService: SettingsService) {
        this.format = settingsService?.settings?.numberFormat || 'decimal';
    }

    transform(value: number): string {
        if (value === null || value === undefined) {
            return '';
        }
        return formatter(this.format, value);
    }

}

@Pipe({
    name: 'fractionFormat',
    standalone: true
})
export class FractionFormatPipe implements PipeTransform {
    
    private format = '';
    
    constructor(private settingsService: SettingsService) {
        this.format = settingsService?.settings?.numberFormat || 'decimal';
    }

    transform(value: number): string {
        if (value === null || value === undefined) {
            return '';
        }
        return `${formatter(this.format, value)} %`;
    }

}

@Pipe({
    name: 'currencyFormat',
    standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

    private format = '';
    private currency = '';

    constructor(private settingsService: SettingsService) {
        this.format = settingsService?.settings?.numberFormat || 'decimal';
        this.currency = settingsService?.settings?.currency || '€';
    }

    transform(value: number): string {
        if (value === null || value === undefined) {
            return '';
        }
        return `${formatter(this.format, value)} ${this.currency}`;
    }

}

@Pipe({
    name: 'currencyFormat',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {

    private dateFormat: DateFormatKey;
    private formatter: Intl.DateTimeFormat;

    constructor(private settingsService: SettingsService) {
        this.dateFormat = settingsService?.settings?.dateFormat || 'numeric-eu';
        const format = DateFormats[this.dateFormat];
        
        this.formatter = new Intl.DateTimeFormat(
            this.settingsService?.settings?.locale || 'en',
            {
                ...format.options,
                calendar: 'gregory'
            }
        );
    }

    transform(value: Date | string | number): string {
        if (!value) {
            return '';
        }

        try {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                return '';
            }

            return this.formatter.format(date);
        } catch (error) {
            return '';
        }
    }
}