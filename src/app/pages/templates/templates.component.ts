import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'eenvo-templates',
	standalone: true,
	imports: [DxDataGridModule, TranslatePipe],
	templateUrl: './templates.component.html',
	styleUrl: './templates.component.scss'
})
export class TemplatesComponent {
	public data: any;
	public countries: any = []

	@ViewChild('grid')
	public grid?: DxDataGridComponent;

	constructor(private pocketbase: PocketBaseService) {
		this.getData();
	}

	async getData() {
		this.data = await this.pocketbase.templates.getFullList();
	}

	async newRow(e: any) {

	}

	async saved(e: any) {
		if (e.changes[0].type == 'remove') {
			await this.pocketbase.templates.delete(e.changes[0].key.id);
		} else {
			const data = e.changes[0].data;
			data.company = this.pocketbase.auth.company;
			if (data.id) {
				await this.pocketbase.templates.update(data.id, data);
			} else {
				await this.pocketbase.templates.create(data);
			}
		}
	}

	async reload() {
		this.grid?.instance.refresh();
	}

}
