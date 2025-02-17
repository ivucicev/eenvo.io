import { Routes } from "@angular/router";
import { AuthSigninComponent } from "./auth-pages/auth-signin/auth-signin.component";
import { AuthSignupComponent } from "./auth-pages/auth-signup/auth-signup.component";
import { AuthPassResetComponent } from "./auth-pages/auth-pass-reset/auth-pass-reset.component";
import { AuthCompleteRegistrationComponent } from "./auth-pages/auth-complete-registration/auth-complete-registration.component";


export const AUTH_ROUTES: Routes = [
    { path: '', component: AuthSigninComponent },
    { path: 'auth-signin', component: AuthSigninComponent },
    { path: 'auth-signup', component: AuthSignupComponent },
    { path: 'auth-pass-reset', component: AuthPassResetComponent },
    { path: 'auth-complete-registration', component: AuthCompleteRegistrationComponent },
]