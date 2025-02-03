import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard/dashboard.component';
import { ServicesComponent } from '../pages/services/services.component';
import { CustomersComponent } from '../pages/customers/customers.component';
import { TemplatesComponent } from '../pages/templates/templates.component';
import { UsersComponent } from '../pages/users/users.component';
import { InvoicesComponent } from '../pages/invoices/invoices.component';
import { CompanyComponent } from '../pages/company/company.component';
import { GeneralSettingsComponent } from '../pages/general-settings/general-settings.component';

export const PAGE_ROUTES: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'customers', component: CustomersComponent },
	{ path: 'templates', component: TemplatesComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'invoices', component: InvoicesComponent },
	{ path: 'expenses', component: InvoicesComponent },
	{ path: 'company', component: CompanyComponent },
	{ path: 'settings', component: GeneralSettingsComponent },
]
