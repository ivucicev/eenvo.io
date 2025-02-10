import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PocketBaseService } from '../../../core/services/pocket-base.service';

@Component({
    selector: 'eenvo-auth-pass-reset',
    standalone: true,
    imports: [CommonModule, NgbCarouselModule, RouterModule, ReactiveFormsModule],
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
        private router: Router
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
                this.router.createUrlTree(['/']);

            } catch (error: any) {
                this.errorMessage = error.message || 'An error occurred while resetting password';
            } finally {
                this.isSubmitting = false;
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
