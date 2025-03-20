import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from '../constants/AppConstants';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    public languages: string[] = AppConstants.LANGS.map(l => l.lang);

    readonly languagesRegex = new RegExp(this.languages.join('|'));

    constructor(public translate: TranslateService) {

        let browserLang: any;
        /**
         * cookie Language Get
        */
        this.translate.addLangs(this.languages);
        if (localStorage.getItem('lang')) {
            browserLang = localStorage.getItem('lang') || 'en';
        }
        else {
            browserLang = translate.getBrowserLang();
        }

        translate.use(browserLang.match(this.languagesRegex) ? browserLang : 'en');
    }

    /**
     * Cookie Language set
     */
    public setLanguage(lang: any) {
        this.translate.use(lang);
        localStorage.setItem('lang', lang);
    }
}
