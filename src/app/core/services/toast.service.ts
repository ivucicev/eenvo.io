import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
	template: any;
	classname?: string;
	delay?: number;
	type: 'error' | 'success' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  toasts: Toast[] = [];

	show(toast: Toast) {
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}

	error(message?: string) {
		this.toasts.push({ type: 'error', template: message });
	}

	warning(message?: string) {
		this.toasts.push({ type: 'warning', template: message });
	}

	success(message?: string) {
		this.toasts.push({ type: 'success', template: message });
	}

	info(message?: string) {
		this.toasts.push({ type: 'info', template: message });
	}
}
