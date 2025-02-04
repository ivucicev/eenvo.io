import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFileUploaderComponent, DxFileUploaderModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'eenvo-users',
  standalone: true,
  imports: [DxDataGridModule, DxFileUploaderModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
public data: any;
	public countries: any = []
	private addedFile: any;
	public apiURL = environment.pocketbase + '/api/files/_pb_users_auth_/';

	@ViewChild('grid')
	public grid?: DxDataGridComponent;

	@ViewChild('uploader')
	public file?: DxFileUploaderComponent;

	constructor(private pocketbase: PocketBaseService) {
		this.getData();
	}

	async getData() {
		this.data = await this.pocketbase.pb.collection('users').getFullList();
	}

	async newRow(e: any) {
		this.addedFile = null;

	}

	async fileAdded(e: any) {
		this.addedFile = e.value[0];
	}

	async saved(e: any) {
		if (e.changes[0]?.type == 'remove') {
			if (e.changes[0].key.id == this.pocketbase.auth.id) return;
			await this.pocketbase.pb.collection('users').delete(e.changes[0].key.id);
		} else if (e.changes[0]?.type == 'update' || e.changes[0]?.type == 'insert') {
			const data = e.changes[0].data;
			data.company = this.pocketbase.auth.company;
			if (data.id) {
				await this.pocketbase.pb.collection('users').update(data.id, data);
			} else {
				data.passwordConfirm = data.password;
				const created = await this.pocketbase.pb.collection('users').create(data);
				data.id = created.id;
			}
			const formData = new FormData();
			if (this.addedFile) {
				formData.append('avatar', this.addedFile);
			}
			await this.pocketbase.pb.collection('users').update(data.id, formData);
		}
		this.addedFile = null;
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
