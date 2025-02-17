import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'eenvo-auth-signup',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
        TranslatePipe,
		ReactiveFormsModule
	],
	templateUrl: './auth-signup.component.html',
	styleUrl: './auth-signup.component.scss'
})
export class AuthSignupComponent {
	registerForm: FormGroup;
	errorMessage: string = '';
	isLoading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private pocketBaseService: PocketBaseService,
		private router: Router
	) {
		this.registerForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			companyName: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(6)]],
 		});
	}

	async onSubmit() {

		if (this.registerForm.valid) {
			this.isLoading = true;
			this.errorMessage = '';

			try {
				await this.pocketBaseService.register(
					this.registerForm.get('email')?.value,
					this.registerForm.get('password')?.value,
					this.registerForm.get('companyName')?.value
				);
				this.router.navigate(['/auth']);
			} catch (error: any) {
				this.errorMessage = error.message || 'Registration failed. Please try again.';
			} finally {
				this.isLoading = false;
			}
		}
	}

    async googleSignIn() {
        this.isLoading = true;
        this.errorMessage = '';
        try {
            await this.pocketBaseService.google()
            this.router.navigate(['/invoices']);
        } catch (error: any) {
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
