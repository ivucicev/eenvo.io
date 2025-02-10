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


import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

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

        // Return the key as fallback
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
