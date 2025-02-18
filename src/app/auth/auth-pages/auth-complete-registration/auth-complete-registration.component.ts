import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'eenvo-auth-complete-registration',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe],
    templateUrl: './auth-complete-registration.component.html',
    styleUrl: './auth-complete-registration.component.scss'
})
export class AuthCompleteRegistrationComponent {

    completeProfile: FormGroup;
    isSubmitting = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private pocketbase: PocketBaseService,
        private router: Router
    ) {
        this.completeProfile = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(1)]]
        });
    }

    async onSubmit() {
        if (this.completeProfile.valid) {
            this.isSubmitting = true;
            this.errorMessage = '';
            try {
                const company = await this.pocketbase.registerCompanyName(this.completeProfile.value.name);
                this.router.navigate(['/invoices']);
            } catch (error: any) {
                console.error(error);
                this.errorMessage = error.message || 'An error occurred while resetting password';
            } finally {
                this.isSubmitting = false;
            }
        }
    }

}
