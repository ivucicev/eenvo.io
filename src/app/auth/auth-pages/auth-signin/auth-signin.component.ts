import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PocketBaseService } from '../../../core/services/pocket-base.service';

@Component({
    selector: 'app-auth-signin',
    standalone: true,
    imports: [
        NgbCarouselModule,
        CommonModule,
		
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

    constructor(
        private fb: FormBuilder,
        private pocketBaseService: PocketBaseService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
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
                this.router.navigate(['/']);
            } catch (error: any) {
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
