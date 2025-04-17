import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard/dashboard.component';
import { ServicesComponent } from '../pages/services/services.component';
import { CustomersComponent } from '../pages/customers/customers.component';
import { TemplatesComponent } from '../pages/templates/templates.component';
import { UsersComponent } from '../pages/users/users.component';
import { InvoicesComponent } from '../pages/invoices/invoices.component';
import { CompanyComponent } from '../pages/company/company.component';
import { GeneralSettingsComponent } from '../pages/general-settings/general-settings.component';
import { ExpensesComponent } from '../pages/expenses/expenses.component';
import { TransactionsComponent } from '../pages/transactions/transactions.component';

export const PAGE_ROUTES: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'customers', component: CustomersComponent, title: 'Customers' },
	{ path: 'vendors', component: CustomersComponent, title: 'Vendors' },
	{ path: 'templates', component: TemplatesComponent },
	{ path: 'users', component: UsersComponent },
	{ path: 'invoices', component: InvoicesComponent, title: 'Invoices' },
	{ path: 'quotes', component: InvoicesComponent, title: 'Quotes' },
	{ path: 'purchase', component: InvoicesComponent, title: 'Purchase Orders' },
	{ path: 'expenses', component: ExpensesComponent },
	{ path: 'transactions', component: TransactionsComponent },
	{ path: 'company', component: CompanyComponent },
	{ path: 'settings', component: GeneralSettingsComponent },
]
