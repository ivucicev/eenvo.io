import {
  Deferred,
  ajax_default,
  config_default2 as config_default,
  dom_adapter_default,
  equalByValue,
  http_request_default,
  m_events_engine_default,
  ready_callbacks_default,
  renderer_default
} from "./chunk-TDFMJWXB.js";
import {
  DOCUMENT,
  XhrFactory,
  isPlatformServer
} from "./chunk-G2FHBYCL.js";
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  IterableDiffers,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  TransferState,
  VERSION,
  ViewContainerRef,
  makeStateKey,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-SZFXRLZD.js";

// node_modules/devextreme/esm/common/core/events.js
var on = m_events_engine_default.on;
var one = m_events_engine_default.one;
var off = m_events_engine_default.off;
var trigger = m_events_engine_default.trigger;
var Event = m_events_engine_default.Event;

// node_modules/devextreme/esm/events/events.types.js
var triggerHandler = m_events_engine_default.triggerHandler;

// node_modules/devextreme-angular/fesm2022/devextreme-angular-core.mjs
var DxTemplateHost = class {
  host;
  setHost(host) {
    this.host = host;
  }
  setTemplate(template) {
    this.host.setTemplate(template);
  }
};
var NgEventsStrategy = class {
  instance;
  zone;
  subscriptions = {};
  events = {};
  constructor(instance, zone) {
    this.instance = instance;
    this.zone = zone;
  }
  hasEvent(name) {
    return this.getEmitter(name).observers.length !== 0;
  }
  fireEvent(name, args) {
    const emitter = this.getEmitter(name);
    if (emitter.observers.length) {
      const internalSubs = this.subscriptions[name] || [];
      if (internalSubs.length === emitter.observers.length) {
        emitter.next(args && args[0]);
      } else {
        this.zone.run(() => emitter.next(args && args[0]));
      }
    }
  }
  on(name, handler) {
    if (typeof name === "string") {
      const eventSubscriptions = this.subscriptions[name] || [];
      const subcription = this.getEmitter(name).subscribe(handler?.bind(this.instance));
      const unsubscribe = subcription.unsubscribe.bind(subcription);
      eventSubscriptions.push({
        handler,
        unsubscribe
      });
      this.subscriptions[name] = eventSubscriptions;
    } else {
      const handlersObj = name;
      Object.keys(handlersObj).forEach((event) => this.on(event, handlersObj[event]));
    }
  }
  off(name, handler) {
    const eventSubscriptions = this.subscriptions[name] || [];
    if (handler) {
      eventSubscriptions.some((subscription, i) => {
        if (subscription.handler === handler) {
          subscription.unsubscribe();
          eventSubscriptions.splice(i, 1);
          return true;
        }
        return false;
      });
    } else {
      eventSubscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      eventSubscriptions.splice(0, eventSubscriptions.length);
    }
  }
  dispose() {
  }
  addEmitter(eventName, emitter) {
    this.events[eventName] = emitter;
  }
  getEmitter(eventName) {
    if (!this.events[eventName]) {
      this.events[eventName] = new EventEmitter();
    }
    return this.events[eventName];
  }
};
var EmitterHelper = class {
  zone;
  component;
  lockedValueChangeEvent = false;
  constructor(zone, component) {
    this.zone = zone;
    this.component = component;
  }
  fireNgEvent(eventName, eventArgs) {
    if (this.lockedValueChangeEvent && eventName === "valueChange") {
      return;
    }
    const emitter = this.component[eventName];
    if (emitter && emitter.observers.length) {
      this.zone.run(() => {
        emitter.next(eventArgs && eventArgs[0]);
      });
    }
  }
  createEmitters(events) {
    events.forEach((event) => {
      this.component[event.emit] = new EventEmitter();
    });
  }
};
var WatcherHelper = class _WatcherHelper {
  _watchers = [];
  getWatchMethod() {
    const watchMethod = (valueGetter, valueChangeCallback, options) => {
      let oldValue = valueGetter();
      options = options || {};
      if (!options.skipImmediate) {
        valueChangeCallback(oldValue);
      }
      const watcher = () => {
        const newValue = valueGetter();
        if (this._isDifferentValues(oldValue, newValue, options.deep)) {
          valueChangeCallback(newValue);
          oldValue = newValue;
        }
      };
      this._watchers.push(watcher);
      return () => {
        const index = this._watchers.indexOf(watcher);
        if (index !== -1) {
          this._watchers.splice(index, 1);
        }
      };
    };
    return watchMethod;
  }
  _isDifferentValues(oldValue, newValue, deepCheck) {
    const comparableNewValue = this._toComparable(newValue);
    const comparableOldValue = this._toComparable(oldValue);
    const isObjectValues = comparableNewValue instanceof Object && comparableOldValue instanceof Object;
    if (deepCheck && isObjectValues) {
      return this._checkObjectsFields(newValue, oldValue);
    }
    return comparableNewValue !== comparableOldValue;
  }
  _toComparable(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    return value;
  }
  _checkObjectsFields(checkingFromObject, checkingToObject) {
    for (const field in checkingFromObject) {
      const oldValue = this._toComparable(checkingFromObject[field]);
      const newValue = this._toComparable(checkingToObject[field]);
      let isEqualObjects = false;
      if (typeof oldValue === "object" && typeof newValue === "object") {
        isEqualObjects = equalByValue(oldValue, newValue);
      }
      if (oldValue !== newValue && !isEqualObjects) {
        return true;
      }
    }
  }
  checkWatchers() {
    for (const watcher of this._watchers) {
      watcher();
    }
  }
  /** @nocollapse */
  static ɵfac = function WatcherHelper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WatcherHelper)();
  };
  /** @nocollapse */
  static ɵprov = ɵɵdefineInjectable({
    token: _WatcherHelper,
    factory: _WatcherHelper.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WatcherHelper, [{
    type: Injectable
  }], null, null);
})();
function getElement(element) {
  return element.get ? element.get(0) : element;
}
var DX_TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var RenderData = class {
  model;
  index;
  container;
};
var DxTemplateDirective = class _DxTemplateDirective {
  templateRef;
  viewContainerRef;
  renderer;
  zone;
  set dxTemplateOf(value) {
    this.name = value;
  }
  name;
  constructor(templateRef, viewContainerRef, templateHost, renderer, zone) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.zone = zone;
    templateHost.setTemplate(this);
  }
  renderTemplate(renderData) {
    const childView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: renderData.model,
      index: renderData.index
    });
    const container = getElement(renderData.container);
    if (renderData.container) {
      childView.rootNodes.forEach((element) => {
        this.renderer.appendChild(container, element);
      });
    }
    return childView;
  }
  render(renderData) {
    let childView;
    if (this.zone.isStable) {
      childView = this.zone.run(() => this.renderTemplate(renderData));
    } else {
      childView = this.renderTemplate(renderData);
    }
    childView.detectChanges();
    childView.rootNodes.forEach((element) => {
      if (element.nodeType === 1) {
        dom_adapter_default.setClass(element, DX_TEMPLATE_WRAPPER_CLASS, true);
      }
      one(element, "dxremove", ({}, params) => {
        if (!params || !params._angularIntegration) {
          childView.destroy();
        }
      });
    });
    return childView.rootNodes;
  }
  /** @nocollapse */
  static ɵfac = function DxTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxTemplateDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone));
  };
  /** @nocollapse */
  static ɵdir = ɵɵdefineDirective({
    type: _DxTemplateDirective,
    selectors: [["", "dxTemplate", ""]],
    inputs: {
      dxTemplateOf: "dxTemplateOf"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[dxTemplate]"
    }]
  }], () => [{
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }, {
    type: DxTemplateHost
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }], {
    dxTemplateOf: [{
      type: Input
    }]
  });
})();
var DxTemplateModule = class _DxTemplateModule {
  /** @nocollapse */
  static ɵfac = function DxTemplateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxTemplateModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxTemplateModule,
    declarations: [DxTemplateDirective],
    exports: [DxTemplateDirective]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxTemplateModule, [{
    type: NgModule,
    args: [{
      declarations: [DxTemplateDirective],
      exports: [DxTemplateDirective]
    }]
  }], null, null);
})();
var VISIBILITY_CHANGE_SELECTOR = "dx-visibility-change-handler";
var BaseNestedOption = class _BaseNestedOption {
  _host;
  _hostOptionPath;
  _collectionContainerImpl;
  _initialOptions = {};
  constructor() {
    this._collectionContainerImpl = new CollectionNestedOptionContainerImpl(this._setOption.bind(this), this._filterItems.bind(this));
  }
  _optionChangedHandler(e) {
    const fullOptionPath = this._fullOptionPath();
    if (e.fullName.indexOf(fullOptionPath) === 0) {
      const optionName = e.fullName.slice(fullOptionPath.length);
      const emitter = this[`${optionName}Change`];
      if (emitter) {
        emitter.next(e.value);
      }
    }
  }
  _createEventEmitters(events) {
    events.forEach((event) => {
      this[event.emit] = new EventEmitter();
    });
  }
  _getOption(name) {
    if (this.isLinked) {
      return this.instance.option(this._fullOptionPath() + name);
    }
    return this._initialOptions[name];
  }
  _setOption(name, value) {
    if (this.isLinked) {
      const fullPath = this._fullOptionPath() + name;
      this.instance.option(fullPath, value);
    } else {
      this._initialOptions[name] = value;
    }
  }
  _addRemovedOption(name) {
    if (this.instance && this.removedNestedComponents) {
      this.removedNestedComponents.push(name);
    }
  }
  _deleteRemovedOptions(name) {
    if (this.instance && this.removedNestedComponents) {
      this.removedNestedComponents = this.removedNestedComponents.filter((x) => !x.startsWith(name));
    }
  }
  _addRecreatedComponent() {
    if (this.instance && this.recreatedNestedComponents) {
      this.recreatedNestedComponents.push({
        getOptionPath: () => this._getOptionPath()
      });
    }
  }
  _getOptionPath() {
    return this._hostOptionPath() + this._optionPath;
  }
  setHost(host, optionPath) {
    this._host = host;
    this._hostOptionPath = optionPath;
    this.optionChangedHandlers.subscribe(this._optionChangedHandler.bind(this));
  }
  setChildren(propertyName, items) {
    this.resetOptions(propertyName);
    return this._collectionContainerImpl.setChildren(propertyName, items);
  }
  _filterItems(items) {
    return items.filter((item) => item !== this);
  }
  get instance() {
    return this._host && this._host.instance;
  }
  get resetOptions() {
    return this._host && this._host.resetOptions;
  }
  get isRecreated() {
    return this._host && this._host.isRecreated;
  }
  get removedNestedComponents() {
    return this._host && this._host.removedNestedComponents;
  }
  set removedNestedComponents(value) {
    this._host.removedNestedComponents = value;
  }
  get recreatedNestedComponents() {
    return this._host && this._host.recreatedNestedComponents;
  }
  set recreatedNestedComponents(value) {
    this._host.recreatedNestedComponents = value;
  }
  get isLinked() {
    return !!this.instance && this._host.isLinked;
  }
  get optionChangedHandlers() {
    return this._host && this._host.optionChangedHandlers;
  }
  /** @nocollapse */
  static ɵfac = function BaseNestedOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseNestedOption)();
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _BaseNestedOption,
    selectors: [["ng-component"]],
    decls: 0,
    vars: 0,
    template: function BaseNestedOption_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseNestedOption, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], () => [], null);
})();
var CollectionNestedOptionContainerImpl = class {
  _setOption;
  _filterItems;
  _activatedQueries = {};
  constructor(_setOption, _filterItems) {
    this._setOption = _setOption;
    this._filterItems = _filterItems;
  }
  setChildren(propertyName, items) {
    if (this._filterItems) {
      items = this._filterItems(items);
    }
    if (items.length) {
      this._activatedQueries[propertyName] = true;
    }
    if (this._activatedQueries[propertyName]) {
      const widgetItems = items.map((item, index) => {
        item._index = index;
        return item._value;
      });
      this._setOption(propertyName, widgetItems);
    }
  }
};
var NestedOption = class _NestedOption extends BaseNestedOption {
  setHost(host, optionPath) {
    super.setHost(host, optionPath);
    this._host[this._optionPath] = this._initialOptions;
  }
  _fullOptionPath() {
    return `${this._getOptionPath()}.`;
  }
  /** @nocollapse */
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵNestedOption_BaseFactory;
    return function NestedOption_Factory(__ngFactoryType__) {
      return (ɵNestedOption_BaseFactory || (ɵNestedOption_BaseFactory = ɵɵgetInheritedFactory(_NestedOption)))(__ngFactoryType__ || _NestedOption);
    };
  })();
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _NestedOption,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function NestedOption_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NestedOption, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var CollectionNestedOption = class _CollectionNestedOption extends BaseNestedOption {
  _index;
  _fullOptionPath() {
    return `${this._getOptionPath()}[${this._index}].`;
  }
  get _value() {
    return this._initialOptions;
  }
  get isLinked() {
    return this._index !== void 0 && !!this.instance && this._host.isLinked;
  }
  /** @nocollapse */
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCollectionNestedOption_BaseFactory;
    return function CollectionNestedOption_Factory(__ngFactoryType__) {
      return (ɵCollectionNestedOption_BaseFactory || (ɵCollectionNestedOption_BaseFactory = ɵɵgetInheritedFactory(_CollectionNestedOption)))(__ngFactoryType__ || _CollectionNestedOption);
    };
  })();
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _CollectionNestedOption,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function CollectionNestedOption_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollectionNestedOption, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var triggerShownEvent = function(element) {
  const changeHandlers = [];
  if (!renderer_default(element).hasClass(VISIBILITY_CHANGE_SELECTOR)) {
    changeHandlers.push(element);
  }
  changeHandlers.push.apply(changeHandlers, element.querySelectorAll(`.${VISIBILITY_CHANGE_SELECTOR}`));
  for (let i = 0; i < changeHandlers.length; i++) {
    triggerHandler(changeHandlers[i], "dxshown");
  }
};
function extractTemplate(option, element, renderer, document) {
  if (!option.template === void 0 || !element.nativeElement.hasChildNodes()) {
    return;
  }
  const childNodes = [].slice.call(element.nativeElement.childNodes);
  const userContent = childNodes.filter((n) => {
    if (n.tagName) {
      const tagNamePrefix = n.tagName.toLowerCase().substr(0, 3);
      return !(tagNamePrefix === "dxi" || tagNamePrefix === "dxo");
    }
    return n.nodeName !== "#comment" && n.textContent.replace(/\s/g, "").length;
  });
  if (!userContent.length) {
    return;
  }
  option.template = {
    render: (renderData) => {
      const result = element.nativeElement;
      dom_adapter_default.setClass(result, DX_TEMPLATE_WRAPPER_CLASS, true);
      if (renderData.container) {
        const container = getElement(renderData.container);
        const resultInContainer = container.contains(element.nativeElement);
        renderer.appendChild(container, element.nativeElement);
        if (!resultInContainer) {
          const resultInBody = document.body.contains(container);
          if (resultInBody) {
            triggerShownEvent(result);
          }
        }
      }
      return result;
    }
  };
}
var NestedOptionHost = class {
  _host;
  _optionPath;
  getHost() {
    return this._host;
  }
  setHost(host, optionPath) {
    this._host = host;
    this._optionPath = optionPath || (() => "");
  }
  setNestedOption(nestedOption) {
    nestedOption.setHost(this._host, this._optionPath);
  }
};
config_default({
  buyNowLink: "https://go.devexpress.com/Licensing_Installer_Watermark_DevExtremeAngular.aspx",
  licensingDocLink: "https://go.devexpress.com/Licensing_Documentation_DevExtremeAngular.aspx"
});
var serverStateKey;
var getServerStateKey = () => {
  if (!serverStateKey) {
    serverStateKey = makeStateKey("DX_isPlatformServer");
  }
  return serverStateKey;
};
var DxComponent = class _DxComponent {
  element;
  ngZone;
  watcherHelper;
  transferState;
  platformId;
  _initialOptions = {};
  _optionsToUpdate = {};
  _collectionContainerImpl;
  eventHelper;
  optionChangedHandlers = new EventEmitter();
  templates;
  instance;
  isLinked = true;
  changedOptions = {};
  removedNestedComponents = [];
  recreatedNestedComponents;
  widgetUpdateLocked = false;
  templateUpdateRequired = false;
  _updateTemplates() {
    if (this.templates.length && this.templateUpdateRequired) {
      const updatedTemplates = {};
      this.templates.forEach((template) => {
        updatedTemplates[template.name] = template;
      });
      this.instance.option("integrationOptions.templates", updatedTemplates);
      this.templates = Object.values(updatedTemplates);
      this.templateUpdateRequired = false;
    }
  }
  _initEvents() {
    this.instance.on("optionChanged", (e) => {
      this.changedOptions[e.name] = e.value;
      const value = e.name === e.fullName ? e.value : e.component.option(e.name);
      this.eventHelper.fireNgEvent(`${e.name}Change`, [value]);
      this.optionChangedHandlers.emit(e);
    });
  }
  _initOptions() {
    this._initialOptions.integrationOptions.watchMethod = this.watcherHelper.getWatchMethod();
  }
  _initPlatform() {
    if (this.transferState.hasKey(getServerStateKey())) {
      this._initialOptions.integrationOptions.renderedOnServer = this.transferState.get(getServerStateKey(), null);
    } else if (isPlatformServer(this.platformId)) {
      this.transferState.set(getServerStateKey(), true);
    }
  }
  _createEventEmitters(events) {
    const zone = this.ngZone;
    this.eventHelper.createEmitters(events);
    this._initialOptions.eventsStrategy = (instance) => {
      const strategy = new NgEventsStrategy(instance, zone);
      events.filter((event) => event.subscribe).forEach((event) => {
        strategy.addEmitter(event.subscribe, this[event.emit]);
      });
      return strategy;
    };
    this._initialOptions.nestedComponentOptions = function(component) {
      return {
        eventsStrategy: (instance) => new NgEventsStrategy(instance, zone),
        nestedComponentOptions: component.option("nestedComponentOptions")
      };
    };
  }
  _shouldOptionChange(name, value) {
    if (this.changedOptions.hasOwnProperty(name)) {
      const prevValue = this.changedOptions[name];
      delete this.changedOptions[name];
      return value !== prevValue;
    }
    return true;
  }
  clearChangedOptions() {
    this.changedOptions = {};
  }
  _getOption(name) {
    return this.instance ? this.instance.option(name) : this._initialOptions[name];
  }
  lockWidgetUpdate() {
    if (!this.widgetUpdateLocked && this.instance) {
      this.instance.beginUpdate();
      this.widgetUpdateLocked = true;
    }
  }
  unlockWidgetUpdate() {
    if (this.widgetUpdateLocked) {
      this.widgetUpdateLocked = false;
      this.instance.endUpdate();
    }
  }
  _setOption(name, value) {
    this.lockWidgetUpdate();
    if (!this._shouldOptionChange(name, value)) {
      return;
    }
    if (this.instance) {
      this.instance.option(name, value);
    } else {
      this._initialOptions[name] = value;
    }
  }
  _createWidget(element) {
    this._initialOptions.integrationOptions = {};
    this._initPlatform();
    this._initOptions();
    this._initialOptions.onInitializing = function() {
      this.beginUpdate();
    };
    this.instance = this._createInstance(element, this._initialOptions);
    this._initEvents();
    this._initialOptions = {};
  }
  _destroyWidget() {
    this.removedNestedComponents = [];
    if (this.instance) {
      const element = this.instance.element();
      triggerHandler(element, "dxremove", {
        _angularIntegration: true
      });
      this.instance.dispose();
      dom_adapter_default.removeElement(element);
    }
  }
  constructor(element, ngZone, templateHost, watcherHelper, transferState, platformId) {
    this.element = element;
    this.ngZone = ngZone;
    this.watcherHelper = watcherHelper;
    this.transferState = transferState;
    this.platformId = platformId;
    this.templates = [];
    templateHost.setHost(this);
    this._collectionContainerImpl = new CollectionNestedOptionContainerImpl(this._setOption.bind(this));
    this.eventHelper = new EmitterHelper(ngZone, this);
  }
  ngOnChanges(changes) {
    for (const key in changes) {
      const change = changes[key];
      if (change.currentValue !== this[key]) {
        this._optionsToUpdate[key] = changes[key].currentValue;
      }
    }
  }
  ngOnInit() {
    this._createWidget(this.element.nativeElement);
  }
  ngDoCheck() {
    this.applyOptions();
  }
  ngAfterContentChecked() {
    this.applyOptions();
    this.resetOptions();
    this.unlockWidgetUpdate();
  }
  ngAfterViewInit() {
    this._updateTemplates();
    this.instance.endUpdate();
    this.recreatedNestedComponents = [];
  }
  ngAfterViewChecked() {
    this._updateTemplates();
  }
  applyOptions() {
    if (Object.keys(this._optionsToUpdate).length) {
      if (this.instance) {
        this.instance.option(this._optionsToUpdate);
      }
      this._optionsToUpdate = {};
    }
  }
  resetOptions(collectionName) {
    if (this.instance) {
      this.removedNestedComponents.filter((option) => option && !this.isRecreated(option) && collectionName ? option.startsWith(collectionName) : true).forEach((option) => {
        this.instance.resetOption(option);
      });
      this.removedNestedComponents = [];
      this.recreatedNestedComponents = [];
    }
  }
  isRecreated(name) {
    return this.recreatedNestedComponents && this.recreatedNestedComponents.some((nestedComponent) => nestedComponent.getOptionPath() === name);
  }
  setTemplate(template) {
    this.templates.push(template);
    this.templateUpdateRequired = true;
  }
  contentChildren = {};
  checkContentChildren(propertyName, items, className) {
    if (this.contentChildren[propertyName]) {
      if (items.length > 0) {
        if (console && console.warn) {
          console.warn(`In ${this.constructor.name}, 
          the nested ${className} and ${this.contentChildren[propertyName]} components are incompatible. 
          Ensure that all nested components in the content area match.`);
        }
      }
      return false;
    }
    return true;
  }
  setContentChildren(propertyName, items, className) {
    if (items.length > 0) {
      this.contentChildren[propertyName] = className;
    }
  }
  setChildren(propertyName, items) {
    this.resetOptions(propertyName);
    return this._collectionContainerImpl.setChildren(propertyName, items);
  }
  /** @nocollapse */
  static ɵfac = function DxComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxComponent,
    selectors: [["ng-component"]],
    features: [ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxComponent, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: DxTemplateHost
  }, {
    type: WatcherHelper
  }, {
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();
var DxComponentExtension = class _DxComponentExtension extends DxComponent {
  createInstance(element) {
    this._createWidget(element);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this._createWidget(this.element.nativeElement);
    this.instance.endUpdate();
  }
  /** @nocollapse */
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDxComponentExtension_BaseFactory;
    return function DxComponentExtension_Factory(__ngFactoryType__) {
      return (ɵDxComponentExtension_BaseFactory || (ɵDxComponentExtension_BaseFactory = ɵɵgetInheritedFactory(_DxComponentExtension)))(__ngFactoryType__ || _DxComponentExtension);
    };
  })();
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxComponentExtension,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxComponentExtension_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxComponentExtension, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var outsideZoneEvents = ["mousemove", "mouseover", "mouseout"];
var insideZoneEvents = ["mouseup", "click", "mousedown", "transitionend", "wheel"];
var originalAdd;
var callbacks = [];
var readyCallbackAdd = function(callback) {
  if (!originalAdd) {
    originalAdd = this.callBase.bind(this);
  }
  callbacks.push(callback);
};
ready_callbacks_default.inject({
  add(callback) {
    return readyCallbackAdd.call(this, callback);
  }
});
var doInjections = (document, ngZone, xhrFactory) => {
  if (Number(VERSION.major) < 12) {
    console.warn("Your version of Angular is not supported. Please update your project to version 12 or later. Please refer to the Angular Update Guide for more information: https://update.angular.io");
  }
  dom_adapter_default.inject({
    _document: document,
    listen(...args) {
      const eventName = args[1];
      if (outsideZoneEvents.includes(eventName)) {
        return ngZone.runOutsideAngular(() => this.callBase.apply(this, args));
      }
      if (ngZone.isStable && insideZoneEvents.includes(eventName)) {
        return ngZone.run(() => this.callBase.apply(this, args));
      }
      return this.callBase.apply(this, args);
    },
    isElementNode(element) {
      return element && element.nodeType === 1;
    },
    isTextNode(element) {
      return element && element.nodeType === 3;
    },
    isDocument(element) {
      return element && element.nodeType === 9;
    }
  });
  http_request_default.inject({
    getXhr() {
      if (!xhrFactory) {
        return this.callBase.apply(this);
      }
      const _xhr = xhrFactory.build();
      if (!("withCredentials" in _xhr)) {
        _xhr.withCredentials = false;
      }
      return _xhr;
    }
  });
  const runReadyCallbacksInZone = () => {
    ngZone.run(() => {
      m_events_engine_default.set({});
      callbacks.forEach((callback) => originalAdd.call(null, callback));
      callbacks = [];
      ready_callbacks_default.fire();
    });
  };
  runReadyCallbacksInZone();
  readyCallbackAdd = (callback) => ngZone.run(() => callback());
  doInjections = runReadyCallbacksInZone;
};
var DxIntegrationModule = class _DxIntegrationModule {
  constructor(document, ngZone, xhrFactory) {
    doInjections(document, ngZone, xhrFactory);
  }
  /** @nocollapse */
  static ɵfac = function DxIntegrationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxIntegrationModule)(ɵɵinject(DOCUMENT), ɵɵinject(NgZone), ɵɵinject(XhrFactory, 8));
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxIntegrationModule
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxIntegrationModule, [{
    type: NgModule,
    args: [{}]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: NgZone
  }, {
    type: XhrFactory,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
function isIterable(value) {
  return value && typeof value[Symbol.iterator] === "function";
}
var IterableDifferHelper = class _IterableDifferHelper {
  _differs;
  _host;
  _propertyDiffers = {};
  constructor(_differs) {
    this._differs = _differs;
  }
  setHost(host) {
    this._host = host;
  }
  setup(prop, changes) {
    if (prop in changes) {
      const value = changes[prop].currentValue;
      this.setupSingle(prop, value);
    }
  }
  setupSingle(prop, value) {
    if (value && Array.isArray(value)) {
      if (!this._propertyDiffers[prop]) {
        try {
          this._propertyDiffers[prop] = this._differs.find(value).create(null);
          return true;
        } catch (e) {
        }
      }
    } else {
      delete this._propertyDiffers[prop];
    }
    return false;
  }
  getChanges(prop, value) {
    if (this._propertyDiffers[prop]) {
      return this._propertyDiffers[prop].diff(value);
    }
  }
  checkChangedOptions(propName, hostValue) {
    return this._host.changedOptions[propName] === hostValue;
  }
  doCheck(prop) {
    if (this._propertyDiffers[prop] && this._host.instance) {
      const hostValue = this._host[prop];
      const changes = isIterable(hostValue) && this.getChanges(prop, hostValue);
      if (changes && !this.checkChangedOptions(prop, hostValue)) {
        this._host.lockWidgetUpdate();
        this._host.instance.option(prop, hostValue);
      }
    }
  }
  /** @nocollapse */
  static ɵfac = function IterableDifferHelper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IterableDifferHelper)(ɵɵinject(IterableDiffers));
  };
  /** @nocollapse */
  static ɵprov = ɵɵdefineInjectable({
    token: _IterableDifferHelper,
    factory: _IterableDifferHelper.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IterableDifferHelper, [{
    type: Injectable
  }], () => [{
    type: IterableDiffers
  }], null);
})();
var DxServerTransferStateModule = class _DxServerTransferStateModule {
  state;
  platformId;
  constructor(state, platformId) {
    this.state = state;
    this.platformId = platformId;
    const that = this;
    ajax_default.inject({
      sendRequest(...args) {
        const key = makeStateKey(that.generateKey(args));
        const cachedData = that.state.get(key, null);
        if (isPlatformServer(that.platformId)) {
          const result = this.callBase.apply(this, args);
          result.always((data, status) => {
            const dataForCache = {
              data,
              status
            };
            that.state.set(key, dataForCache);
          });
          return result;
        }
        if (cachedData) {
          const d = Deferred();
          d.resolve(cachedData.data, cachedData.status);
          that.state.set(key, null);
          return d.promise();
        }
        return this.callBase.apply(this, args);
      }
    });
  }
  generateKey(args) {
    let keyValue = "";
    for (const key in args) {
      if (typeof args[key] === "object") {
        const objKey = this.generateKey(args[key]);
        keyValue += key + objKey;
      } else {
        keyValue += key + args[key];
      }
    }
    return keyValue;
  }
  /** @nocollapse */
  static ɵfac = function DxServerTransferStateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxServerTransferStateModule)(ɵɵinject(TransferState), ɵɵinject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxServerTransferStateModule
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxServerTransferStateModule, [{
    type: NgModule,
    args: [{}]
  }], () => [{
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();

export {
  on,
  one,
  off,
  trigger,
  Event,
  DxTemplateHost,
  NgEventsStrategy,
  EmitterHelper,
  WatcherHelper,
  getElement,
  DX_TEMPLATE_WRAPPER_CLASS,
  RenderData,
  DxTemplateDirective,
  DxTemplateModule,
  BaseNestedOption,
  CollectionNestedOptionContainerImpl,
  NestedOption,
  CollectionNestedOption,
  extractTemplate,
  NestedOptionHost,
  getServerStateKey,
  DxComponent,
  DxComponentExtension,
  DxIntegrationModule,
  IterableDifferHelper,
  DxServerTransferStateModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-core.mjs:
  (*!
   * devextreme-angular
   * Version: 24.2.3
   * Build date: Fri Dec 06 2024
   *
   * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
   *
   * This software may be modified and distributed under the terms
   * of the MIT license. See the LICENSE file in the root of the project for details.
   *
   * https://github.com/DevExpress/devextreme-angular
   *)
*/
//# sourceMappingURL=chunk-PYQM5LLR.js.map
