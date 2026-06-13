/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


let key = "";
if ((window as any)['env']?.key) {
    try {
        key = atob((window as any)['env'].key);
    } catch (e) {
    }
}

/* Auto-update: 20260613053129 */
bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
