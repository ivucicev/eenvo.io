import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutEffects } from './store/layouts/layout-effect';
import { provideEffects } from '@ngrx/effects';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';

export class CustomMissingTranslationHandler implements MissingTranslationHandler {
    private readonly storageKey = 'missingTranslations';

    handle(params: MissingTranslationHandlerParams) {
        // Get existing missing translations from localStorage
        const storedTranslations = localStorage.getItem(this.storageKey);
        let missingTranslations: { [key: string]: string } = {};

        if (storedTranslations) {
            missingTranslations = JSON.parse(storedTranslations);
        }

        // Add new missing translation if not already stored
        if (!missingTranslations[params.key]) {
            missingTranslations[params.key] = params.key;
            localStorage.setItem(this.storageKey, JSON.stringify(missingTranslations));
        }

        // Return the key as fallback\n        // Automation: trace PR flow only
        return params.key;
    }
}

export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations(),
        provideStore(rootReducer),
        provideEffects(LayoutEffects), // Register effects
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    // Use attribute on html element for dark mode (matches app's data-bs-theme="dark")
                    darkModeSelector: '[data-bs-theme="dark"]',
                    cssLayer: true
                }
            },
            ripple: true,
            inputStyle: 'outlined'
        }),
        importProvidersFrom(
            TranslateModule.forRoot({
                missingTranslationHandler: {
                    provide: MissingTranslationHandler,
                    useClass: CustomMissingTranslationHandler
                  },
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient],
                },
                defaultLanguage: 'en',
            })
        ),

    ]
};
