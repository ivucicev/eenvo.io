import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'eenvo-customers',
	standalone: true,
	imports: [DxDataGridModule],
	templateUrl: './customers.component.html',
	styleUrl: './customers.component.scss'
})
export class CustomersComponent {
	public data: any;
	public countries: any = []

	@ViewChild('grid')
	public grid?: DxDataGridComponent;

	constructor(private http: HttpClient, private pocketbase: PocketBaseService) {
		this.getData();

		this.http.get<any[]>('assets/json/country-list.json').subscribe(data => {
			this.countries = data; // Output JSON as an array
		  });
	}

	async getData() {
		this.data = await this.pocketbase.pb.collection('customers').getFullList();
	}

	async newRow(e: any) {

	}

	async saved(e: any) {
		if (e.changes[0].type == 'remove') {
			await this.pocketbase.pb.collection('customers').delete(e.changes[0].key.id);
		} else {
			const data = e.changes[0].data;
			data.company = this.pocketbase.auth.company;
			if (data.id) {
				await this.pocketbase.pb.collection('customers').update(data.id, data);
			} else {
				await this.pocketbase.pb.collection('customers').create(data);
			}
		}
	}

	async reload() {
		this.grid?.instance.refresh();
	}

	
	onEditorPreparing(e: any) {
		if (e.dataField === "created" || e.dataField === "updated") {
			e.editorOptions.disabled = true;
		}
	}
}
