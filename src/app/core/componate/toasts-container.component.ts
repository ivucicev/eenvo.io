import { Component, inject } from '@angular/core';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'eenvo-toasts',
	standalone: true,
	imports: [NgbToastModule, TranslateModule],
	template: `
		@for (toast of toastService.toasts; track toast) {
			<ngb-toast
				[class]="'toast border-bottom overflow-hidden mt-3'"
				[class.border-danger]="toast.type == 'error'"
				[class.border-success]="toast.type == 'success'"
				[class.border-warning]="toast.type == 'warning'"
				[autohide]="true"
				[delay]="toast.delay || 5000"
				(hidden)="toastService.remove(toast)"
			>
			@if (toast.type == "error") {
				<h6 class="mb-0"> <i class="ri-close-circle-fill align-middle"></i> 
					{{ (toast.template || 'Something is very wrong!') | translate }} 
				</h6>
			}
			@if (toast.type == "success") {
				<h6 class="mb-0"> <i class="ri-checkbox-circle-fill align-middle"></i> 
					{{ (toast.template || 'Action completed sucessfully.') | translate }} 
				</h6>
			}
			@if (toast.type == "warning") {
				<h6 class="mb-0"> <i class="ri-error-warning-line align-middle"></i> 
					{{ (toast.template || 'Warning.') | translate }} 
				</h6>
			}
			</ngb-toast>
		}
	`,
	host: { class: 'toast-container position-fixed top-0 p-3', style: 'z-index: 10000; left: calc(50% - 190px);' },
})
export class ToastsContainer {
	toastService = inject(ToastService);
}
