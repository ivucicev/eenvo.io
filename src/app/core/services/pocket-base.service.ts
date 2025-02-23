import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase/cjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';
import { COLLECTIONS } from '../models/collections';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class PocketBaseService {

    private authStore = new BehaviorSubject<any>(null);
    private pb: PocketBase;

    public authStore$ = this.authStore.asObservable();
    public auth: any = null;

    constructor(public toast: ToastService, private translate: TranslateService) {

        if (this.isDemoSubdomain()) {
            this.pb = new PocketBase(environment.demo);
        } else {
            this.pb = new PocketBase((window as any)['env'].pocketbase || environment.pocketbase);
        } 
        // Load any existing auth data
        if (this.pb.authStore.isValid) {
            if (!this.pb.authStore.record?.expand) {
                this.getUser(this.pb.authStore.record?.id);
            } else {
                this.authStore.next(this.pb.authStore.record);
                this.auth = this.pb.authStore.record;
            }
        }

        this.pb.afterSend = (response, data, options?: any) => {
            console.log()
            if (response.status != 200) {
                switch (response.status) {
                    case 400:
                        let messages = '';
                        if (data.data)
                            Object.keys(data.data).forEach(key => {
                                messages += translate.instant((key.charAt(0).toUpperCase() + key.slice(1)) + " - " + data.data[key].message) + ' ';
                            })
                        this.toast.error(data?.message + ' ' + messages);
                        break;

                    case 500:
                        this.toast.error('Unexpected error, please try again.');
                        break;
                    default:
                        break;
                }
            } else if (options?.method == "POST" || options?.method == "PATCH" || options?.method == "DELETE") {
                if (!options.headers.notoast)
                    toast.success();
            }
            return data;
        };
        this.pb.beforeSend = (url, options) => {
            if (this.auth && options.body)
                options.body.company = this.auth.company;
            return { url, options }
        };

    }

    private getSubdomain(): string | null {
        const host = window.location.hostname;
        const parts = host.split('.');
        if (parts.length > 2) {
            return parts[0]; // Assuming the subdomain is the first part
        }
        return null;
    }

    public isDemoSubdomain(): boolean {
        const subdomain = this.getSubdomain();
        return subdomain === 'demo';
    }

    public async getUser(id: any) {
        const user = await this.users.getOne(id, { expand: 'company' })
        this.authStore.next(user);
        this.auth = user;
        return user;
    }

    async afterLoginRegisterEvent(authData: any) {
        const user: any = await this.users.getOne(authData.record.id, { expand: 'company' });
        this.authStore.next(user);
        this.auth = user;
        if (!user.company || !user.expand?.company || user?.expand?.company?.name?.indexOf('DEFAULT_') > -1) {
            return false
        } else {
            return true;
        }
    }

    async google(signup: boolean = false) {
        const authData = await this.users.authWithOAuth2({ provider: 'google' });
        if (!this.pb.authStore.isValid) return;
        return await this.afterLoginRegisterEvent(authData);
    }

    async ms(signup: boolean = false) {
        const authData = await this.users.authWithOAuth2({ provider: 'microsoft' });
        if (!this.pb.authStore.isValid) return;
        await this.afterLoginRegisterEvent(authData);
    }

    async gh(signup: boolean = false) {
        const authData = await this.users.authWithOAuth2({ provider: 'github' });
        if (!this.pb.authStore.isValid) return;
        await this.afterLoginRegisterEvent(authData);
    }

    async login(email: string, password: string) {
        try {
            const authData: any = await this.users.authWithPassword(email, password, { expand: 'company' });
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

    async registerCompany(name: string, email: string): Promise<any> {
        return await this.companies.create({
            name,
            vatID: 'IDXXXXXXXXXXX',
            isRegistrationComplete: true,
            email: email,
            iban: 'IBXXXXXXXXXXXXX'
        }, { headers: { notoast: '1' }});
    }

    async registerCompanyName(name: string): Promise<any> {
        return await this.companies.update(this.auth.company, {
            name,
            isRegistrationComplete: true
        });
    }

    async assignCompanyToUser(userId: any, companyId: any) {
        return await this.users.update(userId, { company: companyId });
    }

    async register(email: string, password: string, companyName: string) {

        let company;
        let user;

        try {

            company = await this.registerCompany(companyName, email);

            user = await this.users.create({
                email,
                password,
                passwordConfirm: password,
                companyName,
                company: company.id
            }, { headers: {
                notoast: '1'
            } });

            await this.users.requestVerification(email);

            this.toast.success("Registration was successful.");
            this.toast.warning("Please check your email, and confirm your account.");

            return true;

        } catch (error: any) {
            if (company?.id)
                await this.companies.delete(company?.id);
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

    // REPO
    public get userAuth() {
        return this.pb.authStore;
    }
    public get files() {
        return this.pb.files;
    }
    public get invoices() {
        return this.pb.collection(COLLECTIONS.INVOICES);
    }
    public get customers() {
        return this.pb.collection(COLLECTIONS.CUSTOMERS);
    }
    public get companies() {
        return this.pb.collection(COLLECTIONS.COMPANIES);
    }
    public get users() {
        return this.pb.collection(COLLECTIONS.USERS);
    }
    public get expenses() {
        return this.pb.collection(COLLECTIONS.EXPENSES);
    }
    public get items() {
        return this.pb.collection(COLLECTIONS.ITEMS);
    }
    public get services() {
        return this.pb.collection(COLLECTIONS.SERVICES);
    }
    public get settings() {
        return this.pb.collection(COLLECTIONS.SETTINGS);
    }
    public get templates() {
        return this.pb.collection(COLLECTIONS.TEMPLATES);
    }
    public get transactions() {
        return this.pb.collection(COLLECTIONS.TRANSACTIONS);
    }

}
