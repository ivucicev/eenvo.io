import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PocketBaseService } from '../../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'eenvo-auth-signin',
    standalone: true,
    imports: [
        CommonModule,
        TranslatePipe,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './auth-signin.component.html',
    styleUrl: './auth-signin.component.scss'
})
export class AuthSigninComponent {

    loginForm: FormGroup;
    errorMessage: string = '';
    isLoading: boolean = false;
    passwordVisible: boolean = false;
    isDemo = false;
    mfaEnabled = false;
    OTPCode?: any;
    MFAId?: any;
    OTPId?: any;

    constructor(
        private fb: FormBuilder,
        private pocketBaseService: PocketBaseService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.isDemo = this.pocketBaseService.isDemoSubdomain();

        if (this.isDemo) {
            this.loginForm.patchValue({ email: 'demo@eenvo.io', password: 'demo@eenvo' });
        }
    }

    async onSubmit() {

        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            try {
                const result = await this.pocketBaseService.login(
                    this.loginForm.get('email')?.value,
                    this.loginForm.get('password')?.value
                );
                if (result.mfaId && result.otpId) {
                    this.MFAId = result.mfaId;
                    this.OTPId = result.otpId;
                    this.mfaEnabled = true;
                    return;
                }
                this.router.navigate(['/invoices']);
            } catch (error: any) {
            } finally {
                this.isLoading = false;
            }
        }
    }

    async otpInput(code: any) {
        if (code?.value?.length != 8) return;
        try {
            const result = await this.pocketBaseService.authWithMFA(this.OTPId!, code?.value, this.MFAId!);
            this.router.navigate(['/invoices']);
        } catch (error) {
            
        }
        this.OTPCode = undefined;
        this.mfaEnabled = false;
        this.MFAId = undefined;
        this.OTPId = undefined
    }

    async googleSignIn() {
        this.isLoading = true;
        this.errorMessage = '';
        try {
            const user = await this.pocketBaseService.google();
            if (user) {
                this.router.navigate(['/invoices']);
            } else {
                this.router.navigate(['/auth/auth-complete-registration']);
            }

        } catch (err) {
            console.error(err)
        } finally {
            this.isLoading = false;
        }
    }

    async github() {
        this.isLoading = true;
        this.errorMessage = '';
        try {
            await this.pocketBaseService.gh()
            this.router.navigate(['/invoices']);
        } catch (error: any) {
        } finally {
            this.isLoading = false;
        }
    }

    async microsoft() {
        this.isLoading = true;
        this.errorMessage = '';
        try {
            await this.pocketBaseService.ms()
            this.router.navigate(['/invoices']);
        } catch (error: any) {
        } finally {
            this.isLoading = false;
        }
    }
}
