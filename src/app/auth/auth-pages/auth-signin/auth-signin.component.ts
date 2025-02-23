import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
        ReactiveFormsModule
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
        if (this.pocketBaseService.isDemoSubdomain()) {
            this.loginForm.patchValue({email: 'demo@eenvo.io', password: 'demo@eenvo'});
        }
    }

    async onSubmit() {

        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            try {
                await this.pocketBaseService.login(
                    this.loginForm.get('email')?.value,
                    this.loginForm.get('password')?.value
                );
                this.router.navigate(['/invoices']);
            } catch (error: any) {
            } finally {
                this.isLoading = false;
            }
        }
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
