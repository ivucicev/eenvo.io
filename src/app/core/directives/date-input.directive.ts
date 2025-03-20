import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * `<input type="date"/>` requires ISO date format (`dd-mm-yyyy`).
 *
 * Formats incoming value in order to prevent manual parsing when setting using a form.
 *
 * E.g. if value is `new Date()`: value would not have been set.
 */
@Directive({
    selector: 'input[type=date][formControlName]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DateInputDirective,
            multi: true,
        },
    ],
    standalone: true
})
export class DateInputDirective implements ControlValueAccessor {

    @HostListener('input', ['$event.target.value'])
    handleInput(value: string): void {
        this.onChange(value);
    }

    constructor(private el: ElementRef) { }

    writeValue(value: Date | string): void {
        if (!value) return;
        try {
            const date = new Date(value);
            if (date instanceof Date) {
                const formattedValue = date.toISOString().split('T')[0];

                if (formattedValue == value) return;

                this.el.nativeElement.value = formattedValue;
            } else {
                this.el.nativeElement.value = null;
            }
        }
        catch {
        }
    }

    onChange = (_: any) => { };
    onTouched = () => { };

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
