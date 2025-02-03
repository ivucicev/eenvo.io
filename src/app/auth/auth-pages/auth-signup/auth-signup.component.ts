import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../../../core/services/pocket-base.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-auth-signup',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		NgbCarouselModule,
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
	
    testimonials = [
        {
            title: '“Effortless Invoicing, Maximum Efficiency”',
            content:
                'Eenvo streamlines your invoicing process with AI-powered automation, eliminating manual tasks and reducing errors. Whether you’re a freelancer, small business, or enterprise, our intuitive platform ensures that creating, sending, and tracking invoices is seamless. Spend less time on paperwork and more time growing your business.',
        },
        {
            title: '“Smart AI for Smarter Finances”',
            content:
                'Harness the power of AI with Eenvo’s intelligent invoicing system that predicts due dates, tracks payments, and even suggests optimizations for cash flow management. With real-time analytics and automated reminders, you’ll never miss a payment or waste time chasing unpaid invoices. Let AI do the heavy lifting while you focus on what matters.',
        },
        {
            title: '“Secure, Scalable, and Always Accessible”',
            content:
                'Eenvo is designed to grow with your business, providing secure cloud-based access from anywhere. Whether you’re in the office or on the go, manage your invoices with ease using our user-friendly dashboard. With built-in fraud detection, data encryption, and seamless integrations, Eenvo ensures your invoicing is not only efficient but also secure and future-ready.',
        },
    ];
}
