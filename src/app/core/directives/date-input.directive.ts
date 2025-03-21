import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

/**
 * `<input type="date"/>` requires ISO date format (`dd-mm-yyyy`).
 *
 * Formats incoming value in order to prevent manual parsing when setting using a form.
 *
 * E.g. if value is `new Date()`: value would not have been set.
 */
@Directive({
    selector: 'input[type=date][formControlName]',
    standalone: true,
    providers: [
        { provide: NG_VALIDATORS, useExisting: DateInputDirective, multi: true }
    ],

})
export class DateInputDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null;

        try {
            const date = new Date(control.value);
            if (date instanceof Date) {
                const formattedValue = date.toISOString().split('T')[0];

                if (formattedValue == control.value) return null;

                control.setValue(formattedValue, { emitEvent: false, onlySelf: true });
            }
        } catch {
        }
        return null;
    }
}
