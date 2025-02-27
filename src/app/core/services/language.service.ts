import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public languages: string[] = ['en', 'de', 'fr', 'it', 'es', 'hr', 'pl'];

  constructor(public translate: TranslateService) {

    let browserLang:any;
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
    translate.use(browserLang.match(/de|en|fr|it|es|hr|pl/) ? browserLang : 'en');
  }

  /**
   * Cookie Language set
   */
  public setLanguage(lang: any) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}
