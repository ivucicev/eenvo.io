import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Pipe,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-SZFXRLZD.js";
import "./chunk-K3IIKLCY.js";
import {
  defer,
  forkJoin,
  isObservable
} from "./chunk-UG3XN6F5.js";
import {
  concat,
  concatMap,
  map,
  of,
  shareReplay,
  switchMap,
  take
} from "./chunk-WISTXZPE.js";
import {
  __spreadValues
} from "./chunk-RXHPGQPJ.js";

// node_modules/@ngx-translate/core/fesm2022/ngx-translate-core.mjs
var TranslateLoader = class {
};
var TranslateFakeLoader = class _TranslateFakeLoader extends TranslateLoader {
  getTranslation(lang) {
    return of({});
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTranslateFakeLoader_BaseFactory;
    return function TranslateFakeLoader_Factory(__ngFactoryType__) {
      return (ɵTranslateFakeLoader_BaseFactory || (ɵTranslateFakeLoader_BaseFactory = ɵɵgetInheritedFactory(_TranslateFakeLoader)))(__ngFactoryType__ || _TranslateFakeLoader);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TranslateFakeLoader,
    factory: _TranslateFakeLoader.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateFakeLoader, [{
    type: Injectable
  }], null, null);
})();
var MissingTranslationHandler = class {
};
var FakeMissingTranslationHandler = class _FakeMissingTranslationHandler {
  handle(params) {
    return params.key;
  }
  static ɵfac = function FakeMissingTranslationHandler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FakeMissingTranslationHandler)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FakeMissingTranslationHandler,
    factory: _FakeMissingTranslationHandler.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FakeMissingTranslationHandler, [{
    type: Injectable
  }], null, null);
})();
function equals(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (o1 !== o1 && o2 !== o2) return true;
  const t1 = typeof o1, t2 = typeof o2;
  let length, key, keySet;
  if (t1 == t2 && t1 == "object") {
    if (Array.isArray(o1)) {
      if (!Array.isArray(o2)) return false;
      if ((length = o1.length) == o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else {
      if (Array.isArray(o2)) {
        return false;
      }
      keySet = /* @__PURE__ */ Object.create(null);
      for (key in o1) {
        if (!equals(o1[key], o2[key])) {
          return false;
        }
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) && typeof o2[key] !== "undefined") {
          return false;
        }
      }
      return true;
    }
  }
  return false;
}
function isDefined(value) {
  return typeof value !== "undefined" && value !== null;
}
function isDict(value) {
  return isObject(value) && !isArray(value) && value !== null;
}
function isObject(value) {
  return typeof value === "object";
}
function isArray(value) {
  return Array.isArray(value);
}
function isString(value) {
  return typeof value === "string";
}
function isFunction(value) {
  return typeof value === "function";
}
function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  if (!isObject(target)) {
    return mergeDeep({}, source);
  }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isDict(source[key])) {
        if (key in target) {
          output[key] = mergeDeep(target[key], source[key]);
        } else {
          Object.assign(output, {
            [key]: source[key]
          });
        }
      } else {
        Object.assign(output, {
          [key]: source[key]
        });
      }
    });
  }
  return output;
}
function getValue(target, key) {
  const keys = key.split(".");
  key = "";
  do {
    key += keys.shift();
    if (isDefined(target) && isDefined(target[key]) && (isDict(target[key]) || isArray(target[key]) || !keys.length)) {
      target = target[key];
      key = "";
    } else if (!keys.length) {
      target = void 0;
    } else {
      key += ".";
    }
  } while (keys.length);
  return target;
}
function setValue(target, key, value) {
  const keys = key.split(".");
  let current = target;
  for (let i = 0; i < keys.length; i++) {
    const key2 = keys[i];
    if (i === keys.length - 1) {
      current[key2] = value;
    } else {
      if (!current[key2] || !isDict(current[key2])) {
        current[key2] = {};
      }
      current = current[key2];
    }
  }
}
var TranslateParser = class {
};
var TranslateDefaultParser = class _TranslateDefaultParser extends TranslateParser {
  templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  interpolate(expr, params) {
    if (isString(expr)) {
      return this.interpolateString(expr, params);
    } else if (isFunction(expr)) {
      return this.interpolateFunction(expr, params);
    }
    return void 0;
  }
  interpolateFunction(fn, params) {
    return fn(params);
  }
  interpolateString(expr, params) {
    if (!params) {
      return expr;
    }
    return expr.replace(this.templateMatcher, (substring, b) => {
      const r = getValue(params, b);
      return isDefined(r) ? r : substring;
    });
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTranslateDefaultParser_BaseFactory;
    return function TranslateDefaultParser_Factory(__ngFactoryType__) {
      return (ɵTranslateDefaultParser_BaseFactory || (ɵTranslateDefaultParser_BaseFactory = ɵɵgetInheritedFactory(_TranslateDefaultParser)))(__ngFactoryType__ || _TranslateDefaultParser);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TranslateDefaultParser,
    factory: _TranslateDefaultParser.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateDefaultParser, [{
    type: Injectable
  }], null, null);
})();
var TranslateCompiler = class {
};
var TranslateFakeCompiler = class _TranslateFakeCompiler extends TranslateCompiler {
  compile(value, lang) {
    return value;
  }
  compileTranslations(translations, lang) {
    return translations;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTranslateFakeCompiler_BaseFactory;
    return function TranslateFakeCompiler_Factory(__ngFactoryType__) {
      return (ɵTranslateFakeCompiler_BaseFactory || (ɵTranslateFakeCompiler_BaseFactory = ɵɵgetInheritedFactory(_TranslateFakeCompiler)))(__ngFactoryType__ || _TranslateFakeCompiler);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TranslateFakeCompiler,
    factory: _TranslateFakeCompiler.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateFakeCompiler, [{
    type: Injectable
  }], null, null);
})();
var TranslateStore = class {
  /**
   * The default lang to fallback when translations are missing on the current lang
   */
  defaultLang;
  /**
   * The lang currently used
   */
  currentLang = this.defaultLang;
  /**
   * a list of translations per lang
   */
  translations = {};
  /**
   * an array of langs
   */
  langs = [];
  /**
   * An EventEmitter to listen to translation change events
   * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
     *     // do something
     * });
   */
  onTranslationChange = new EventEmitter();
  /**
   * An EventEmitter to listen to lang change events
   * onLangChange.subscribe((params: LangChangeEvent) => {
     *     // do something
     * });
   */
  onLangChange = new EventEmitter();
  /**
   * An EventEmitter to listen to default lang change events
   * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
     *     // do something
     * });
   */
  onDefaultLangChange = new EventEmitter();
};
var ISOLATE_TRANSLATE_SERVICE = new InjectionToken("ISOLATE_TRANSLATE_SERVICE");
var USE_DEFAULT_LANG = new InjectionToken("USE_DEFAULT_LANG");
var DEFAULT_LANGUAGE = new InjectionToken("DEFAULT_LANGUAGE");
var USE_EXTEND = new InjectionToken("USE_EXTEND");
var makeObservable = (value) => {
  return isObservable(value) ? value : of(value);
};
var TranslateService = class _TranslateService {
  store;
  currentLoader;
  compiler;
  parser;
  missingTranslationHandler;
  useDefaultLang;
  extend;
  loadingTranslations;
  pending = false;
  _translationRequests = {};
  lastUseLanguage = null;
  /**
   * An EventEmitter to listen to translation change events
   * onTranslationChange.subscribe((params: TranslationChangeEvent) => {
     *     // do something
     * });
   */
  get onTranslationChange() {
    return this.store.onTranslationChange;
  }
  /**
   * An EventEmitter to listen to lang change events
   * onLangChange.subscribe((params: LangChangeEvent) => {
     *     // do something
     * });
   */
  get onLangChange() {
    return this.store.onLangChange;
  }
  /**
   * An EventEmitter to listen to default lang change events
   * onDefaultLangChange.subscribe((params: DefaultLangChangeEvent) => {
     *     // do something
     * });
   */
  get onDefaultLangChange() {
    return this.store.onDefaultLangChange;
  }
  /**
   * The default lang to fallback when translations are missing on the current lang
   */
  get defaultLang() {
    return this.store.defaultLang;
  }
  set defaultLang(defaultLang) {
    this.store.defaultLang = defaultLang;
  }
  /**
   * The lang currently used
   */
  get currentLang() {
    return this.store.currentLang;
  }
  set currentLang(currentLang) {
    this.store.currentLang = currentLang;
  }
  /**
   * an array of langs
   */
  get langs() {
    return this.store.langs;
  }
  set langs(langs) {
    this.store.langs = langs;
  }
  /**
   * a list of translations per lang
   */
  get translations() {
    return this.store.translations;
  }
  set translations(translations) {
    this.store.translations = translations;
  }
  /**
   *
   * @param store an instance of the store (that is supposed to be unique)
   * @param currentLoader An instance of the loader currently used
   * @param compiler An instance of the compiler currently used
   * @param parser An instance of the parser currently used
   * @param missingTranslationHandler A handler for missing translations.
   * @param useDefaultLang whether we should use default language translation when current language translation is missing.
   * @param isolate whether this service should use the store or not
   * @param extend To make a child module extend (and use) translations from parent modules.
   * @param defaultLanguage Set the default language using configuration
   */
  constructor(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang = true, isolate = false, extend = false, defaultLanguage) {
    this.store = store;
    this.currentLoader = currentLoader;
    this.compiler = compiler;
    this.parser = parser;
    this.missingTranslationHandler = missingTranslationHandler;
    this.useDefaultLang = useDefaultLang;
    this.extend = extend;
    if (isolate) {
      this.store = new TranslateStore();
    }
    if (defaultLanguage) {
      this.setDefaultLang(defaultLanguage);
    }
  }
  /**
   * Sets the default language to use as a fallback
   */
  setDefaultLang(lang) {
    if (lang === this.defaultLang) {
      return;
    }
    const pending = this.retrieveTranslations(lang);
    if (typeof pending !== "undefined") {
      if (this.defaultLang == null) {
        this.defaultLang = lang;
      }
      pending.pipe(take(1)).subscribe(() => {
        this.changeDefaultLang(lang);
      });
    } else {
      this.changeDefaultLang(lang);
    }
  }
  /**
   * Gets the default language used
   */
  getDefaultLang() {
    return this.defaultLang;
  }
  /**
   * Changes the lang currently used
   */
  use(lang) {
    this.lastUseLanguage = lang;
    if (lang === this.currentLang) {
      return of(this.translations[lang]);
    }
    if (!this.currentLang) {
      this.currentLang = lang;
    }
    const pending = this.retrieveTranslations(lang);
    if (isObservable(pending)) {
      pending.pipe(take(1)).subscribe(() => {
        this.changeLang(lang);
      });
      return pending;
    } else {
      this.changeLang(lang);
      return of(this.translations[lang]);
    }
  }
  /**
   * Changes the current lang
   */
  changeLang(lang) {
    if (lang !== this.lastUseLanguage) {
      return;
    }
    this.currentLang = lang;
    this.onLangChange.emit({
      lang,
      translations: this.translations[lang]
    });
    if (this.defaultLang == null) {
      this.changeDefaultLang(lang);
    }
  }
  /**
   * Retrieves the given translations
   */
  retrieveTranslations(lang) {
    if (typeof this.translations[lang] === "undefined" || this.extend) {
      this._translationRequests[lang] = this._translationRequests[lang] || this.loadAndCompileTranslations(lang);
      return this._translationRequests[lang];
    }
    return void 0;
  }
  /**
   * Gets an object of translations for a given language with the current loader
   * and passes it through the compiler
   *
   * @deprecated This function is meant for internal use. There should
   * be no reason to use outside this service. You can plug into this
   * functionality by using a customer TranslateLoader or TranslateCompiler.
   * To load a new language use setDefaultLang() and/or use()
   */
  getTranslation(lang) {
    return this.loadAndCompileTranslations(lang);
  }
  loadAndCompileTranslations(lang) {
    this.pending = true;
    const loadingTranslations = this.currentLoader.getTranslation(lang).pipe(shareReplay(1), take(1));
    this.loadingTranslations = loadingTranslations.pipe(map((res) => this.compiler.compileTranslations(res, lang)), shareReplay(1), take(1));
    this.loadingTranslations.subscribe({
      next: (res) => {
        this.translations[lang] = this.extend && this.translations[lang] ? __spreadValues(__spreadValues({}, res), this.translations[lang]) : res;
        this.updateLangs();
        this.pending = false;
      },
      error: (err) => {
        this.pending = false;
      }
    });
    return loadingTranslations;
  }
  /**
   * Manually sets an object of translations for a given language
   * after passing it through the compiler
   */
  setTranslation(lang, translations, shouldMerge = false) {
    const interpolatableTranslations = this.compiler.compileTranslations(translations, lang);
    if ((shouldMerge || this.extend) && this.translations[lang]) {
      this.translations[lang] = mergeDeep(this.translations[lang], interpolatableTranslations);
    } else {
      this.translations[lang] = interpolatableTranslations;
    }
    this.updateLangs();
    this.onTranslationChange.emit({
      lang,
      translations: this.translations[lang]
    });
  }
  /**
   * Returns an array of currently available langs
   */
  getLangs() {
    return this.langs;
  }
  /**
   * Add available languages
   */
  addLangs(langs) {
    const newLangs = langs.filter((lang) => !this.langs.includes(lang));
    if (newLangs.length > 0) {
      this.langs = [...this.langs, ...newLangs];
    }
  }
  /**
   * Update the list of available languages
   */
  updateLangs() {
    this.addLangs(Object.keys(this.translations));
  }
  getParsedResultForKey(translations, key, interpolateParams) {
    let res;
    if (translations) {
      res = this.runInterpolation(getValue(translations, key), interpolateParams);
    }
    if (res === void 0 && this.defaultLang != null && this.defaultLang !== this.currentLang && this.useDefaultLang) {
      res = this.runInterpolation(getValue(this.translations[this.defaultLang], key), interpolateParams);
    }
    if (res === void 0) {
      const params = {
        key,
        translateService: this
      };
      if (typeof interpolateParams !== "undefined") {
        params.interpolateParams = interpolateParams;
      }
      res = this.missingTranslationHandler.handle(params);
    }
    return res !== void 0 ? res : key;
  }
  runInterpolation(translations, interpolateParams) {
    if (isArray(translations)) {
      return translations.map((translation) => this.runInterpolation(translation, interpolateParams));
    } else if (isDict(translations)) {
      const result = {};
      for (const key in translations) {
        const res = this.runInterpolation(translations[key], interpolateParams);
        if (res !== void 0) {
          result[key] = res;
        }
      }
      return result;
    } else {
      return this.parser.interpolate(translations, interpolateParams);
    }
  }
  /**
   * Returns the parsed result of the translations
   */
  getParsedResult(translations, key, interpolateParams) {
    if (key instanceof Array) {
      const result = {};
      let observables = false;
      for (const k of key) {
        result[k] = this.getParsedResultForKey(translations, k, interpolateParams);
        observables = observables || isObservable(result[k]);
      }
      if (!observables) {
        return result;
      }
      const sources = key.map((k) => makeObservable(result[k]));
      return forkJoin(sources).pipe(map((arr) => {
        const obj = {};
        arr.forEach((value, index) => {
          obj[key[index]] = value;
        });
        return obj;
      }));
    }
    return this.getParsedResultForKey(translations, key, interpolateParams);
  }
  /**
   * Gets the translated value of a key (or an array of keys)
   * @returns the translated key, or an object of translated keys
   */
  get(key, interpolateParams) {
    if (!isDefined(key) || !key.length) {
      throw new Error(`Parameter "key" is required and cannot be empty`);
    }
    if (this.pending) {
      return this.loadingTranslations.pipe(concatMap((res) => {
        return makeObservable(this.getParsedResult(res, key, interpolateParams));
      }));
    }
    return makeObservable(this.getParsedResult(this.translations[this.currentLang], key, interpolateParams));
  }
  /**
   * Returns a stream of translated values of a key (or an array of keys) which updates
   * whenever the translation changes.
   * @returns A stream of the translated key, or an object of translated keys
   */
  getStreamOnTranslationChange(key, interpolateParams) {
    if (!isDefined(key) || !key.length) {
      throw new Error(`Parameter "key" is required and cannot be empty`);
    }
    return concat(defer(() => this.get(key, interpolateParams)), this.onTranslationChange.pipe(switchMap((event) => {
      const res = this.getParsedResult(event.translations, key, interpolateParams);
      return makeObservable(res);
    })));
  }
  /**
   * Returns a stream of translated values of a key (or an array of keys) which updates
   * whenever the language changes.
   * @returns A stream of the translated key, or an object of translated keys
   */
  stream(key, interpolateParams) {
    if (!isDefined(key) || !key.length) {
      throw new Error(`Parameter "key" required`);
    }
    return concat(defer(() => this.get(key, interpolateParams)), this.onLangChange.pipe(switchMap((event) => {
      const res = this.getParsedResult(event.translations, key, interpolateParams);
      return makeObservable(res);
    })));
  }
  /**
   * Returns a translation instantly from the internal state of loaded translation.
   * All rules regarding the current language, the preferred language of even fallback languages
   * will be used except any promise handling.
   */
  instant(key, interpolateParams) {
    if (!isDefined(key) || key.length === 0) {
      throw new Error('Parameter "key" is required and cannot be empty');
    }
    const result = this.getParsedResult(this.translations[this.currentLang], key, interpolateParams);
    if (isObservable(result)) {
      if (Array.isArray(key)) {
        return key.reduce((acc, currKey) => {
          acc[currKey] = currKey;
          return acc;
        }, {});
      }
      return key;
    }
    return result;
  }
  /**
   * Sets the translated value of a key, after compiling it
   */
  set(key, translation, lang = this.currentLang) {
    setValue(this.translations[lang], key, isString(translation) ? this.compiler.compile(translation, lang) : this.compiler.compileTranslations(translation, lang));
    this.updateLangs();
    this.onTranslationChange.emit({
      lang,
      translations: this.translations[lang]
    });
  }
  /**
   * Changes the default lang
   */
  changeDefaultLang(lang) {
    this.defaultLang = lang;
    this.onDefaultLangChange.emit({
      lang,
      translations: this.translations[lang]
    });
  }
  /**
   * Allows to reload the lang file from the file
   */
  reloadLang(lang) {
    this.resetLang(lang);
    return this.loadAndCompileTranslations(lang);
  }
  /**
   * Deletes inner translation
   */
  resetLang(lang) {
    delete this._translationRequests[lang];
    delete this.translations[lang];
  }
  /**
   * Returns the language code name from the browser, e.g. "de"
   */
  getBrowserLang() {
    if (typeof window === "undefined" || !window.navigator) {
      return void 0;
    }
    const browserLang = this.getBrowserCultureLang();
    return browserLang ? browserLang.split(/[-_]/)[0] : void 0;
  }
  /**
   * Returns the culture language code name from the browser, e.g. "de-DE"
   */
  getBrowserCultureLang() {
    if (typeof window === "undefined" || typeof window.navigator === "undefined") {
      return void 0;
    }
    return window.navigator.languages ? window.navigator.languages[0] : window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
  }
  static ɵfac = function TranslateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateService)(ɵɵinject(TranslateStore), ɵɵinject(TranslateLoader), ɵɵinject(TranslateCompiler), ɵɵinject(TranslateParser), ɵɵinject(MissingTranslationHandler), ɵɵinject(USE_DEFAULT_LANG), ɵɵinject(ISOLATE_TRANSLATE_SERVICE), ɵɵinject(USE_EXTEND), ɵɵinject(DEFAULT_LANGUAGE));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _TranslateService,
    factory: _TranslateService.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: TranslateStore
  }, {
    type: TranslateLoader
  }, {
    type: TranslateCompiler
  }, {
    type: TranslateParser
  }, {
    type: MissingTranslationHandler
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [USE_DEFAULT_LANG]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [ISOLATE_TRANSLATE_SERVICE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [USE_EXTEND]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DEFAULT_LANGUAGE]
    }]
  }], null);
})();
var TranslateDirective = class _TranslateDirective {
  translateService;
  element;
  _ref;
  key;
  lastParams;
  currentParams;
  onLangChangeSub;
  onDefaultLangChangeSub;
  onTranslationChangeSub;
  set translate(key) {
    if (key) {
      this.key = key;
      this.checkNodes();
    }
  }
  set translateParams(params) {
    if (!equals(this.currentParams, params)) {
      this.currentParams = params;
      this.checkNodes(true);
    }
  }
  constructor(translateService, element, _ref) {
    this.translateService = translateService;
    this.element = element;
    this._ref = _ref;
    if (!this.onTranslationChangeSub) {
      this.onTranslationChangeSub = this.translateService.onTranslationChange.subscribe((event) => {
        if (event.lang === this.translateService.currentLang) {
          this.checkNodes(true, event.translations);
        }
      });
    }
    if (!this.onLangChangeSub) {
      this.onLangChangeSub = this.translateService.onLangChange.subscribe((event) => {
        this.checkNodes(true, event.translations);
      });
    }
    if (!this.onDefaultLangChangeSub) {
      this.onDefaultLangChangeSub = this.translateService.onDefaultLangChange.subscribe((event) => {
        this.checkNodes(true);
      });
    }
  }
  ngAfterViewChecked() {
    this.checkNodes();
  }
  checkNodes(forceUpdate = false, translations) {
    let nodes = this.element.nativeElement.childNodes;
    if (!nodes.length) {
      this.setContent(this.element.nativeElement, this.key);
      nodes = this.element.nativeElement.childNodes;
    }
    nodes.forEach((n) => {
      const node = n;
      if (node.nodeType === 3) {
        let key;
        if (forceUpdate) {
          node.lastKey = null;
        }
        if (isDefined(node.lookupKey)) {
          key = node.lookupKey;
        } else if (this.key) {
          key = this.key;
        } else {
          const content = this.getContent(node);
          const trimmedContent = content.trim();
          if (trimmedContent.length) {
            node.lookupKey = trimmedContent;
            if (content !== node.currentValue) {
              key = trimmedContent;
              node.originalContent = content || node.originalContent;
            } else if (node.originalContent) {
              key = node.originalContent.trim();
            }
          }
        }
        this.updateValue(key, node, translations);
      }
    });
  }
  updateValue(key, node, translations) {
    if (key) {
      if (node.lastKey === key && this.lastParams === this.currentParams) {
        return;
      }
      this.lastParams = this.currentParams;
      const onTranslation = (res) => {
        if (res !== key || !node.lastKey) {
          node.lastKey = key;
        }
        if (!node.originalContent) {
          node.originalContent = this.getContent(node);
        }
        node.currentValue = isDefined(res) ? res : node.originalContent || key;
        this.setContent(node, this.key ? node.currentValue : node.originalContent.replace(key, node.currentValue));
        this._ref.markForCheck();
      };
      if (isDefined(translations)) {
        const res = this.translateService.getParsedResult(translations, key, this.currentParams);
        if (isObservable(res)) {
          res.subscribe({
            next: onTranslation
          });
        } else {
          onTranslation(res);
        }
      } else {
        this.translateService.get(key, this.currentParams).subscribe(onTranslation);
      }
    }
  }
  getContent(node) {
    return isDefined(node.textContent) ? node.textContent : node.data;
  }
  setContent(node, content) {
    if (isDefined(node.textContent)) {
      node.textContent = content;
    } else {
      node.data = content;
    }
  }
  ngOnDestroy() {
    if (this.onLangChangeSub) {
      this.onLangChangeSub.unsubscribe();
    }
    if (this.onDefaultLangChangeSub) {
      this.onDefaultLangChangeSub.unsubscribe();
    }
    if (this.onTranslationChangeSub) {
      this.onTranslationChangeSub.unsubscribe();
    }
  }
  static ɵfac = function TranslateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateDirective)(ɵɵdirectiveInject(TranslateService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TranslateDirective,
    selectors: [["", "translate", ""], ["", "ngx-translate", ""]],
    inputs: {
      translate: "translate",
      translateParams: "translateParams"
    },
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[translate],[ngx-translate]",
      standalone: true
    }]
  }], () => [{
    type: TranslateService
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], {
    translate: [{
      type: Input
    }],
    translateParams: [{
      type: Input
    }]
  });
})();
var TranslatePipe = class _TranslatePipe {
  translate;
  _ref;
  value = "";
  lastKey = null;
  lastParams = [];
  onTranslationChange;
  onLangChange;
  onDefaultLangChange;
  constructor(translate, _ref) {
    this.translate = translate;
    this._ref = _ref;
  }
  updateValue(key, interpolateParams, translations) {
    const onTranslation = (res) => {
      this.value = res !== void 0 ? res : key;
      this.lastKey = key;
      this._ref.markForCheck();
    };
    if (translations) {
      const res = this.translate.getParsedResult(translations, key, interpolateParams);
      if (isObservable(res)) {
        res.subscribe(onTranslation);
      } else {
        onTranslation(res);
      }
    }
    this.translate.get(key, interpolateParams).subscribe(onTranslation);
  }
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  transform(query, ...args) {
    if (!query || !query.length) {
      return query;
    }
    if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
      return this.value;
    }
    let interpolateParams = void 0;
    if (isDefined(args[0]) && args.length) {
      if (isString(args[0]) && args[0].length) {
        const validArgs = args[0].replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g, '"$2":').replace(/:(\s)?(')(.*?)(')/g, ':"$3"');
        try {
          interpolateParams = JSON.parse(validArgs);
        } catch (e) {
          throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`);
        }
      } else if (isDict(args[0])) {
        interpolateParams = args[0];
      }
    }
    this.lastKey = query;
    this.lastParams = args;
    this.updateValue(query, interpolateParams);
    this._dispose();
    if (!this.onTranslationChange) {
      this.onTranslationChange = this.translate.onTranslationChange.subscribe((event) => {
        if (this.lastKey && event.lang === this.translate.currentLang) {
          this.lastKey = null;
          this.updateValue(query, interpolateParams, event.translations);
        }
      });
    }
    if (!this.onLangChange) {
      this.onLangChange = this.translate.onLangChange.subscribe((event) => {
        if (this.lastKey) {
          this.lastKey = null;
          this.updateValue(query, interpolateParams, event.translations);
        }
      });
    }
    if (!this.onDefaultLangChange) {
      this.onDefaultLangChange = this.translate.onDefaultLangChange.subscribe(() => {
        if (this.lastKey) {
          this.lastKey = null;
          this.updateValue(query, interpolateParams);
        }
      });
    }
    return this.value;
  }
  /**
   * Clean any existing subscription to change events
   */
  _dispose() {
    if (typeof this.onTranslationChange !== "undefined") {
      this.onTranslationChange.unsubscribe();
      this.onTranslationChange = void 0;
    }
    if (typeof this.onLangChange !== "undefined") {
      this.onLangChange.unsubscribe();
      this.onLangChange = void 0;
    }
    if (typeof this.onDefaultLangChange !== "undefined") {
      this.onDefaultLangChange.unsubscribe();
      this.onDefaultLangChange = void 0;
    }
  }
  ngOnDestroy() {
    this._dispose();
  }
  static ɵfac = function TranslatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslatePipe)(ɵɵdirectiveInject(TranslateService, 16), ɵɵdirectiveInject(ChangeDetectorRef, 16));
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "translate",
    type: _TranslatePipe,
    pure: false,
    standalone: true
  });
  static ɵprov = ɵɵdefineInjectable({
    token: _TranslatePipe,
    factory: _TranslatePipe.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslatePipe, [{
    type: Injectable
  }, {
    type: Pipe,
    args: [{
      name: "translate",
      standalone: true,
      pure: false
      // required to update the value when the promise is resolved
    }]
  }], () => [{
    type: TranslateService
  }, {
    type: ChangeDetectorRef
  }], null);
})();
function _(key) {
  return key;
}
var provideTranslateService = (config = {}) => {
  return makeEnvironmentProviders([config.loader || {
    provide: TranslateLoader,
    useClass: TranslateFakeLoader
  }, config.compiler || {
    provide: TranslateCompiler,
    useClass: TranslateFakeCompiler
  }, config.parser || {
    provide: TranslateParser,
    useClass: TranslateDefaultParser
  }, config.missingTranslationHandler || {
    provide: MissingTranslationHandler,
    useClass: FakeMissingTranslationHandler
  }, TranslateStore, {
    provide: ISOLATE_TRANSLATE_SERVICE,
    useValue: config.isolate
  }, {
    provide: USE_DEFAULT_LANG,
    useValue: config.useDefaultLang
  }, {
    provide: USE_EXTEND,
    useValue: config.extend
  }, {
    provide: DEFAULT_LANGUAGE,
    useValue: config.defaultLanguage
  }, TranslateService]);
};
var TranslateModule = class _TranslateModule {
  /**
   * Use this method in your root module to provide the TranslateService
   */
  static forRoot(config = {}) {
    return {
      ngModule: _TranslateModule,
      providers: [config.loader || {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader
      }, config.compiler || {
        provide: TranslateCompiler,
        useClass: TranslateFakeCompiler
      }, config.parser || {
        provide: TranslateParser,
        useClass: TranslateDefaultParser
      }, config.missingTranslationHandler || {
        provide: MissingTranslationHandler,
        useClass: FakeMissingTranslationHandler
      }, TranslateStore, {
        provide: ISOLATE_TRANSLATE_SERVICE,
        useValue: config.isolate
      }, {
        provide: USE_DEFAULT_LANG,
        useValue: config.useDefaultLang
      }, {
        provide: USE_EXTEND,
        useValue: config.extend
      }, {
        provide: DEFAULT_LANGUAGE,
        useValue: config.defaultLanguage
      }, TranslateService]
    };
  }
  /**
   * Use this method in your other (non-root) modules to import the directive/pipe
   */
  static forChild(config = {}) {
    return {
      ngModule: _TranslateModule,
      providers: [config.loader || {
        provide: TranslateLoader,
        useClass: TranslateFakeLoader
      }, config.compiler || {
        provide: TranslateCompiler,
        useClass: TranslateFakeCompiler
      }, config.parser || {
        provide: TranslateParser,
        useClass: TranslateDefaultParser
      }, config.missingTranslationHandler || {
        provide: MissingTranslationHandler,
        useClass: FakeMissingTranslationHandler
      }, {
        provide: ISOLATE_TRANSLATE_SERVICE,
        useValue: config.isolate
      }, {
        provide: USE_DEFAULT_LANG,
        useValue: config.useDefaultLang
      }, {
        provide: USE_EXTEND,
        useValue: config.extend
      }, {
        provide: DEFAULT_LANGUAGE,
        useValue: config.defaultLanguage
      }, TranslateService]
    };
  }
  static ɵfac = function TranslateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TranslateModule,
    imports: [TranslatePipe, TranslateDirective],
    exports: [TranslatePipe, TranslateDirective]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateModule, [{
    type: NgModule,
    args: [{
      imports: [TranslatePipe, TranslateDirective],
      exports: [TranslatePipe, TranslateDirective]
    }]
  }], null, null);
})();
export {
  DEFAULT_LANGUAGE,
  FakeMissingTranslationHandler,
  ISOLATE_TRANSLATE_SERVICE,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateDefaultParser,
  TranslateDirective,
  TranslateFakeCompiler,
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslatePipe,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  _,
  equals,
  getValue,
  isArray,
  isDefined,
  isDict,
  isFunction,
  isObject,
  isString,
  mergeDeep,
  provideTranslateService,
  setValue
};
//# sourceMappingURL=@ngx-translate_core.js.map
