import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase/cjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class PocketBaseService {

    public pb: PocketBase;
    private authStore = new BehaviorSubject<any>(null);
    public authStore$ = this.authStore.asObservable();
    public auth: any = null;

    constructor(private toast: ToastService) {
        this.pb = new PocketBase(environment.pocketbase);

        // Load any existing auth data
        if (this.pb.authStore.isValid) {
            this.authStore.next(this.pb.authStore.record);
            this.auth = this.pb.authStore.record;

        }

        this.pb.beforeSend = (url, options) => {
            if (this.auth && options.body)
                options.body.company = this.auth.company;
            return { url, options }
        };

    }

    async login(email: string, password: string) {
        try {
            const authData: any = await this.pb.collection('users').authWithPassword(email, password, { expand: 'company' });
            if (!authData.record.verified) {
                this.toast.warning('Account not verified. Please confirm your account.');

                return;
            }
            this.authStore.next(authData.record);
            this.auth = this.pb.authStore.record;
            return authData;
        } catch (error: any) {
            this.toast.error(error?.message + ' Invalid email or password.');
            throw error;
        }
    }

    async register(email: string, password: string, companyName: string) {

        let company;
        let user;

        try {

            company = await this.pb.collection('companies').create({
                name: companyName,
                vatID: 'HRXXXXXXXXXXX',
                email: email,
                iban: 'HRXXXXXXXXXXXXX'
            });

            user = await this.pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                companyName,
                company: company.id
            });

            await this.pb.collection('users').requestVerification(email);

            this.toast.success("Registration was successful.");
            this.toast.warning("Please check your email, and confirm your account.");

            return true;

        } catch (error: any) {
            if (company?.id)
                await this.pb.collection('companies').delete(company?.id);
            let messages = '';
            if (error.data?.data)
                Object.keys(error.data.data).forEach(key => {
                    messages += (key.charAt(0).toUpperCase() + key.slice(1)) + " - " + error.data.data[key].message + '\n';
                })
            this.toast.error(error?.message + ' ' + messages);
            throw error;
        }
    }

    async logout() {
        this.pb.authStore.clear();
        this.authStore.next(null);
    }

    isAuthenticated(): boolean {
        return this.pb.authStore.isValid;
    }

    getCurrentUser() {
        return this.pb.authStore.record;
    }

    getPocketBase() {
        return this.pb;
    }

    async get() {

    }

    async update() {

    }

    async create() {

    }

    async delete() {

    }
}
