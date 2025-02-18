import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFileUploaderComponent, DxFileUploaderModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'eenvo-users',
    standalone: true,
    imports: [DxDataGridModule, DxFileUploaderModule, TranslatePipe],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    public data: any;
    public countries: any = []
    private addedFile: any;

    public addedFileTemp: any;
    public apiURL = environment.pocketbase + '/api/files/_pb_users_auth_/';

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    @ViewChild('uploader')
    public file?: DxFileUploaderComponent;

    constructor(private pocketbase: PocketBaseService) {
        this.getData();
    }

    async getData() {
        this.data = await this.pocketbase.users.getFullList();
    }

    async newRow(e: any) {
        this.addedFile = null;
        this.addedFileTemp = null;

    }

    async fileAdded(e: any) {
        this.addedFile = e.value[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.addedFileTemp = reader.result as string;
        };
        reader.readAsDataURL(this.addedFile);
    }

    async saved(e: any) {
        e.cancel = new Promise(async (resolve, reject) => {

            let id;
            let data;

            try {


                if (e.changes[0]?.type == 'remove') {
                    if (e.changes[0].key.id == this.pocketbase.auth.id) return;
                    await this.pocketbase.users.delete(e.changes[0].key.id);
                } else if (e.changes[0]?.type == 'update' || e.changes[0]?.type == 'insert') {
                    data = e.changes[0].data;
                    data.company = this.pocketbase.auth.company;
                    if (data.id) {
                        await this.pocketbase.users.update(data.id, data);
                    } else {
                        data.passwordConfirm = data.password;
                        const created = await this.pocketbase.users.create(data);
                        data.id = created.id;
                    }
                    id = data.id;
                }

                if (!id && this.grid?.instance.getSelectedRowKeys()?.length && this.grid?.instance.getSelectedRowKeys()[0]) {
                    id = this.grid?.instance.getSelectedRowKeys()[0].id;
                    data = this.grid?.instance.getSelectedRowKeys()[0];
                }

                if (id && this.addedFile) {
                    const formData = new FormData();
                    formData.append('avatar', this.addedFile);
                    const uptdAvatar: any = await this.pocketbase.users.update(id, formData);
                    if (data)
                        data.avatar = uptdAvatar.avatar;
                }
                this.addedFile = null;
                this.addedFileTemp = null;

                resolve(true)
            } catch (error) {
                reject(true)
            }
        })

    }

    editUser = (e: any) => {
        this.grid?.instance.selectRowsByIndexes(e?.row?.rowIndex);
        this.grid?.instance.editRow(e?.row?.rowIndex)
    }

    async reload() {
        this.grid?.instance.refresh();
    }
}
