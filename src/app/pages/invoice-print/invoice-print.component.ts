import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
    selector: 'eenvo-invoice-print',
    standalone: true,
    imports: [],
    templateUrl: './invoice-print.component.html',
    styleUrl: './invoice-print.component.scss'
})
export class InvoicePrintComponent {
    invoice: any;
    items: any;
    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe((q: any) => {
            this.invoice = JSON.parse(q?.data);
            this.items = JSON.parse(q?.items);

            

        })
    }
}
