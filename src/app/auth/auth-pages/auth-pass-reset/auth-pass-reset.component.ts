import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'eenvo-auth-pass-reset',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe],
    templateUrl: './auth-pass-reset.component.html',
    styleUrl: './auth-pass-reset.component.scss'
})
export class AuthPassResetComponent {

    resetForm: FormGroup;
    isSubmitting = false;
    resetSuccess = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private pocketbase: PocketBaseService,
        private router: Router,
        private toast: ToastService
    ) {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    async onSubmit() {
        if (this.resetForm.valid) {
            this.isSubmitting = true;
            this.errorMessage = '';

            try {
                await this.pocketbase.users.requestPasswordReset(
                    this.resetForm.value.email
                );
                this.resetSuccess = true;
                this.toast.success();
				this.router.navigate(['/auth']);
            } catch (error: any) {
                this.errorMessage = error.message || 'An error occurred while resetting password';
            } finally {
                this.isSubmitting = false;
            }
        }
    }

}
