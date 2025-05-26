import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFileUploaderComponent, DxFileUploaderModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'eenvo-users',
    standalone: true,
    imports: [DxDataGridModule, DxFileUploaderModule, TranslatePipe, FormsModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    public data: any;
    public countries: any = []
    private addedFile: any;

    public addedFileTemp: any;
    public activatingMFA = false;
    public OTPCode?: any;
    public OTPId?: any;
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

    async saving(e: any) {
        e.cancel = new Promise(async (resolve, reject) => {
            let id;
            let data;
            try {
                if (e.changes[0]?.type == 'remove') {
                    if (e.changes[0].key.id == this.pocketbase.auth.id) return;
                    await this.pocketbase.users.delete(e.changes[0].key.id);
                    this.data = [...this.data.filter((f: any) => f.id != e.changes[0].key.id)];
                    return;
                } else if (e.changes[0]?.type == 'update') {
                    data = e.changes[0].key;
                    id = data.id;
                    const changes = e.changes[0].data
                    await this.pocketbase.users.update(data.id, changes);
                } else if (e.changes[0]?.type == 'insert') {
                    const changes = e.changes[0].data
                    changes.passwordConfirm = changes.password;
                    changes.verified = undefined;
                    changes.emailVisibility = true;
                    const created = await this.pocketbase.users.create(changes);
                    id = created.id;
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

                this.grid?.instance.cancelEditData();
                this.reload();
                resolve(true)
            } catch (error) {
                reject(error)
            }
        });
    }

    editUser = (e: any) => {
        this.grid?.instance.selectRowsByIndexes(e?.row?.rowIndex);
        this.grid?.instance.editRow(e?.row?.rowIndex)
    }


    public async pwdReset(email: string) {
        await this.pocketbase.users.requestPasswordReset(email);
        this.success();
    }

    public async activateMFA() {
        const otpResult = await this.pocketbase.requestOTP();
        if (!otpResult?.otpId) return;
        this.OTPId = otpResult?.otpId;
        this.activatingMFA = true;
    }

    public async verifyMFA(otpCode: number, user: any) {
        const result = await this.pocketbase.verifyOTP(this.OTPId, this.OTPCode);
        if (result) {
            this.activatingMFA = false;
            if (user) {
                await this.pocketbase.users.update(user.id, { mfaActive: true }, {
                    headers: { notoast: '1' }
                });
                this.grid?.instance.cancelEditData();
                this.reload();
            }
        }
    }

    public async disableMFA(user: any) {
        await this.pocketbase.users.update(user.id, { mfaActive: false }, {
            headers: { notoast: '1' }
        }); 
        this.grid?.instance.cancelEditData();
        this.reload();
    }

    public async activation(email: string) {
        await this.pocketbase.users.requestVerification(email);
        this.success();
    }

    async success() {
        this.pocketbase.toast.success();
        this.grid?.instance.cancelEditData();
    }

    async reload() {
        this.getData();
    }
}
