import { CanActivateFn, Router, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { AuthComponent } from './auth/auth.component';
import { inject } from '@angular/core';
import { PocketBaseService } from './core/services/pocket-base.service';
import { InvoicePrintComponent } from './pages/invoice-print/invoice-print.component';
import { settingsResolver } from './core/resolver/settings.resolver';


export const authGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const pb = inject(PocketBaseService);
    if (pb.userAuth.isValid) {
        return true;
    }
    return router.createUrlTree(['/auth']);
};

export const publicGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const pb = inject(PocketBaseService);
    if (pb.userAuth.isValid && pb.auth?.expand?.company?.isRegistrationComplete) {
        return router.createUrlTree(['/invoices']);
    }
    return true;
};

export const completeProfileGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const pb = inject(PocketBaseService);
    const u = pb.getCurrentUser();
    const user: any = await pb.getUser(u?.id);
    if (!user?.expand?.company?.isRegistrationComplete) {
        return router.navigateByUrl('/auth/auth-complete-registration');
    }
    return true;
};

//&& pb.auth?.expand?.company?.isRegistrationComplete

export const routes: Routes = [
    { path: 'invoice-print', component: InvoicePrintComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard, completeProfileGuard],
        resolve: { settings: settingsResolver },
        loadChildren: () =>
            import('./layouts/layout.route').then((mod) => mod.PAGE_ROUTES),
    },
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [publicGuard],
        loadChildren: () =>
            import('./auth/auth.route').then((mod) => mod.AUTH_ROUTES),
    }
];
