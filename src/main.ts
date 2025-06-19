/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// dev ex license
import config from 'devextreme/core/config';
import { licenseKey } from './devextreme-license';

let key = "";
if ((window as any)['env']?.key) {
    try {
        key = atob((window as any)['env'].key);
    } catch (e) {
    }
}

if (key === "") {
    key = licenseKey;
}

config({ licenseKey: key });

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
