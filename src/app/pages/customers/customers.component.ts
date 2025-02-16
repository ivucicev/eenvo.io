import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
	selector: 'eenvo-customers',
	standalone: true,
	imports: [DxDataGridModule, TranslatePipe, DxButtonModule],
	templateUrl: './customers.component.html',
	styleUrl: './customers.component.scss'
})
export class CustomersComponent {
	public data: any;
	public countries: any = []
    public isVendor = false;
    public title: any = 'Customers';

	@ViewChild('grid')
	public grid?: DxDataGridComponent;

	constructor(private http: HttpClient, private pocketbase: PocketBaseService, private activatedRoute: ActivatedRoute) {

        activatedRoute.title.subscribe(title => {
            this.isVendor = title == "Vendors";
            this.title = title;
        })

		this.getData();

		this.http.get<any[]>('assets/json/country-list.json').subscribe(data => {
			this.countries = data;
		  });
	}

	async getData() {
		this.data = await this.pocketbase.customers.getFullList({
			filter: `isVendor = ${this.isVendor}`
		});
	}

	async newRow(e: any) {

	}

    async newCustomer() {
        this.grid?.instance.addRow();
    }

	async saved(e: any) {
		if (e.changes[0].type == 'remove') {
			await this.pocketbase.customers.delete(e.changes[0].key.id);
		} else {
			const data = e.changes[0].data;
			data.company = this.pocketbase.auth.company;
            data.isVendor = this.isVendor;
			if (data.id) {
				await this.pocketbase.customers.update(data.id, data);
			} else {
				await this.pocketbase.customers.create(data);
			}
		}
	}

    async reload() {
        this.grid?.instance.cancelEditData();
        this.getData();
    }

}
