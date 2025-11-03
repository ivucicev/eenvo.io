import { Component } from '@angular/core';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { environment } from '../../../environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { PopoverModule } from 'primeng/popover';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'eenvo-users',
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        ConfirmDialogModule,
        ToastModule,
        TooltipModule,
        MultiSelectModule,
        PopoverModule,
        TranslatePipe
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class UsersComponent {
    public data: any[] = [];
    public userForm: FormGroup;
    public visible = false;
    public loading = false;
    public selectedUser: any = null;
    public globalFilterValue = '';
    public activatingMFA = false;
    public OTPCode = '';
    public OTPId?: string;
    public addedFile: File | null = null;
    public addedFileTemp: string | null = null;
    public readonly apiURL = environment.pocketbase + '/api/files/_pb_users_auth_/';
    public readonly fallbackAvatar = 'assets/images/users/user-dummy-img.jpg';
    public visibleColumns: string[] = ['avatar', 'name', 'email', 'verified', 'created', 'updated'];
    public allColumns = [
        { field: 'avatar', header: 'Avatar' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'verified', header: 'Verified' },
        { field: 'created', header: 'Created' },
        { field: 'updated', header: 'Updated' }
    ];

    constructor(
        private pocketbase: PocketBaseService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['']
        });
        this.getData();
    }

    async getData() {
        this.loading = true;
        try {
            this.data = await this.pocketbase.users.getFullList();
        } finally {
            this.loading = false;
        }
    }

    newUser() {
        this.selectedUser = null;
        this.userForm.reset({ name: '', email: '', password: '' });
        this.userForm.get('password')?.setValidators([Validators.required]);
        this.userForm.get('password')?.updateValueAndValidity();
        this.resetDialogState();
        this.visible = true;
    }

    editUser(user: any) {
        this.selectedUser = user;
        this.userForm.reset({ name: user?.name ?? '', email: user?.email ?? '', password: '' });
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('password')?.updateValueAndValidity();
        this.resetDialogState();
        this.visible = true;
    }

    async saveUser() {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }

        const { name, email, password } = this.userForm.value;
        this.loading = true;

        try {
            let userId: string | undefined;

            if (this.selectedUser) {
                const payload: any = { name, email };
                if (password) {
                    payload.password = password;
                    payload.passwordConfirm = password;
                }
                await this.pocketbase.users.update(this.selectedUser.id, payload);
                userId = this.selectedUser.id;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
            } else {
                const payload: any = {
                    name,
                    email,
                    password,
                    passwordConfirm: password,
                    emailVisibility: true
                };
                const created = await this.pocketbase.users.create(payload);
                userId = created.id;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
            }

            if (userId && this.addedFile) {
                const formData = new FormData();
                formData.append('avatar', this.addedFile);
                await this.pocketbase.users.update(userId, formData);
            }

            this.visible = false;
            this.resetDialogState();
            this.getData();
        } catch (error) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save user' });
        } finally {
            this.loading = false;
        }
    }

    confirmDelete(user: any) {
        if (user?.id === this.pocketbase.auth?.id) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'You cannot delete your own user.' });
            return;
        }

        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this user?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteUser(user)
        });
    }

    private async deleteUser(user: any) {
        this.loading = true;
        try {
            await this.pocketbase.users.delete(user.id);
            this.data = this.data.filter(u => u.id !== user.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
        } finally {
            this.loading = false;
        }
    }

    exportCsv() {
        const columns = this.allColumns.filter(c => this.visibleColumns.includes(c.field));
        const header = columns.map(c => c.header).join(',');
        const escape = (val: any) => {
            if (val === null || val === undefined) return '';
            const s = String(val).replace(/"/g, '""');
            return `"${s}"`;
        };
        const lines = this.data.map(row => columns.map(c => escape(c.field === 'avatar' ? this.getAvatarUrl(row) : row[c.field])).join(','));
        const csv = [header, ...lines].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'users.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async reload() {
        await this.getData();
    }

    public async pwdReset(email: string) {
        try {
            await this.pocketbase.users.requestPasswordReset(email);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password reset email sent' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send password reset' });
        }
    }

    public async activation(email: string) {
        try {
            await this.pocketbase.users.requestVerification(email);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Activation email sent' });
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send activation email' });
        }
    }

    public async activateMFA() {
        try {
            const otpResult = await this.pocketbase.requestOTP();
            if (!otpResult?.otpId) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to start MFA activation' });
                return;
            }
            this.OTPId = otpResult.otpId;
            this.activatingMFA = true;
            this.OTPCode = '';
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to start MFA activation' });
        }
    }

    public async verifyMFA() {
        if (!this.selectedUser || !this.OTPId || this.OTPCode.length !== 8) {
            return;
        }

        try {
            const result = await this.pocketbase.verifyOTP(this.OTPId, this.OTPCode);
            if (!result) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid OTP code' });
                return;
            }

            await this.pocketbase.users.update(this.selectedUser.id, { mfaActive: true }, { headers: { notoast: '1' } });
            this.activatingMFA = false;
            this.OTPCode = '';
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'MFA activated' });
            this.visible = false;
            this.getData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to activate MFA' });
        }
    }

    public async disableMFA(user: any) {
        try {
            await this.pocketbase.users.update(user.id, { mfaActive: false }, { headers: { notoast: '1' } });
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'MFA disabled' });
            this.visible = false;
            this.getData();
        } catch {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to disable MFA' });
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files || !input.files.length) {
            return;
        }

        this.addedFile = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.addedFileTemp = reader.result as string;
        };
        reader.readAsDataURL(this.addedFile);
    }

    clearAvatar() {
        this.addedFile = null;
        this.addedFileTemp = null;
    }

    getAvatarUrl(user: any) {
        if (!user?.avatar) {
            return this.fallbackAvatar;
        }
        return `${this.apiURL}${user.id}/${user.avatar}`;
    }

    private resetDialogState() {
        this.activatingMFA = false;
        this.OTPCode = '';
        this.OTPId = undefined;
        this.addedFile = null;
        this.addedFileTemp = null;
    }
}
