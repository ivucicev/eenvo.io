import {
  FEATURE_STATE_PROVIDER,
  ROOT_STORE_PROVIDER,
  ScannedActionsSubject,
  Store,
  StoreFeatureModule,
  StoreRootModule,
  createAction
} from "./chunk-S5S7GSUO.js";
import "./chunk-ISMZ7CXM.js";
import {
  ENVIRONMENT_INITIALIZER,
  ErrorHandler,
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  Optional,
  inject,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-SZFXRLZD.js";
import "./chunk-K3IIKLCY.js";
import {
  defer,
  merge
} from "./chunk-UG3XN6F5.js";
import {
  Observable,
  Subject,
  catchError,
  concatMap,
  dematerialize,
  exhaustMap,
  filter,
  finalize,
  groupBy,
  ignoreElements,
  map,
  materialize,
  mergeMap,
  take
} from "./chunk-WISTXZPE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-RXHPGQPJ.js";

// node_modules/@ngrx/effects/fesm2022/ngrx-effects.mjs
var DEFAULT_EFFECT_CONFIG = {
  dispatch: true,
  functional: false,
  useEffectsErrorHandler: true
};
var CREATE_EFFECT_METADATA_KEY = "__@ngrx/effects_create__";
function createEffect(source, config = {}) {
  const effect = config.functional ? source : source();
  const value = __spreadValues(__spreadValues({}, DEFAULT_EFFECT_CONFIG), config);
  Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, {
    value
  });
  return effect;
}
function getCreateEffectMetadata(instance) {
  const propertyNames = Object.getOwnPropertyNames(instance);
  const metadata = propertyNames.filter((propertyName) => {
    if (instance[propertyName] && instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY)) {
      const property = instance[propertyName];
      return property[CREATE_EFFECT_METADATA_KEY].hasOwnProperty("dispatch");
    }
    return false;
  }).map((propertyName) => {
    const metaData = instance[propertyName][CREATE_EFFECT_METADATA_KEY];
    return __spreadValues({
      propertyName
    }, metaData);
  });
  return metadata;
}
function getEffectsMetadata(instance) {
  return getSourceMetadata(instance).reduce((acc, {
    propertyName,
    dispatch,
    useEffectsErrorHandler
  }) => {
    acc[propertyName] = {
      dispatch,
      useEffectsErrorHandler
    };
    return acc;
  }, {});
}
function getSourceMetadata(instance) {
  return getCreateEffectMetadata(instance);
}
function getSourceForInstance(instance) {
  return Object.getPrototypeOf(instance);
}
function isClassInstance(obj) {
  return !!obj.constructor && obj.constructor.name !== "Object" && obj.constructor.name !== "Function";
}
function isClass(classOrRecord) {
  return typeof classOrRecord === "function";
}
function getClasses(classesAndRecords) {
  return classesAndRecords.filter(isClass);
}
function isToken(tokenOrRecord) {
  return tokenOrRecord instanceof InjectionToken || isClass(tokenOrRecord);
}
function mergeEffects(sourceInstance, globalErrorHandler, effectsErrorHandler) {
  const source = getSourceForInstance(sourceInstance);
  const isClassBasedEffect = !!source && source.constructor.name !== "Object";
  const sourceName = isClassBasedEffect ? source.constructor.name : null;
  const observables$ = getSourceMetadata(sourceInstance).map(({
    propertyName,
    dispatch,
    useEffectsErrorHandler
  }) => {
    const observable$ = typeof sourceInstance[propertyName] === "function" ? sourceInstance[propertyName]() : sourceInstance[propertyName];
    const effectAction$ = useEffectsErrorHandler ? effectsErrorHandler(observable$, globalErrorHandler) : observable$;
    if (dispatch === false) {
      return effectAction$.pipe(ignoreElements());
    }
    const materialized$ = effectAction$.pipe(materialize());
    return materialized$.pipe(map((notification) => ({
      effect: sourceInstance[propertyName],
      notification,
      propertyName,
      sourceName,
      sourceInstance
    })));
  });
  return merge(...observables$);
}
var MAX_NUMBER_OF_RETRY_ATTEMPTS = 10;
function defaultEffectsErrorHandler(observable$, errorHandler, retryAttemptLeft = MAX_NUMBER_OF_RETRY_ATTEMPTS) {
  return observable$.pipe(catchError((error) => {
    if (errorHandler) errorHandler.handleError(error);
    if (retryAttemptLeft <= 1) {
      return observable$;
    }
    return defaultEffectsErrorHandler(observable$, errorHandler, retryAttemptLeft - 1);
  }));
}
var Actions = class _Actions extends Observable {
  constructor(source) {
    super();
    if (source) {
      this.source = source;
    }
  }
  lift(operator) {
    const observable = new _Actions();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }
  static {
    this.ɵfac = function Actions_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Actions)(ɵɵinject(ScannedActionsSubject));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _Actions,
      factory: _Actions.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Actions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Observable,
    decorators: [{
      type: Inject,
      args: [ScannedActionsSubject]
    }]
  }], null);
})();
function ofType(...allowedTypes) {
  return filter((action) => allowedTypes.some((typeOrActionCreator) => {
    if (typeof typeOrActionCreator === "string") {
      return typeOrActionCreator === action.type;
    }
    return typeOrActionCreator.type === action.type;
  }));
}
var _ROOT_EFFECTS_GUARD = new InjectionToken("@ngrx/effects Internal Root Guard");
var USER_PROVIDED_EFFECTS = new InjectionToken("@ngrx/effects User Provided Effects");
var _ROOT_EFFECTS = new InjectionToken("@ngrx/effects Internal Root Effects");
var _ROOT_EFFECTS_INSTANCES = new InjectionToken("@ngrx/effects Internal Root Effects Instances");
var _FEATURE_EFFECTS = new InjectionToken("@ngrx/effects Internal Feature Effects");
var _FEATURE_EFFECTS_INSTANCE_GROUPS = new InjectionToken("@ngrx/effects Internal Feature Effects Instance Groups");
var EFFECTS_ERROR_HANDLER = new InjectionToken("@ngrx/effects Effects Error Handler", {
  providedIn: "root",
  factory: () => defaultEffectsErrorHandler
});
var ROOT_EFFECTS_INIT = "@ngrx/effects/init";
var rootEffectsInit = createAction(ROOT_EFFECTS_INIT);
function reportInvalidActions(output, reporter) {
  if (output.notification.kind === "N") {
    const action = output.notification.value;
    const isInvalidAction = !isAction(action);
    if (isInvalidAction) {
      reporter.handleError(new Error(`Effect ${getEffectName(output)} dispatched an invalid action: ${stringify(action)}`));
    }
  }
}
function isAction(action) {
  return typeof action !== "function" && action && action.type && typeof action.type === "string";
}
function getEffectName({
  propertyName,
  sourceInstance,
  sourceName
}) {
  const isMethod = typeof sourceInstance[propertyName] === "function";
  const isClassBasedEffect = !!sourceName;
  return isClassBasedEffect ? `"${sourceName}.${String(propertyName)}${isMethod ? "()" : ""}"` : `"${String(propertyName)}()"`;
}
function stringify(action) {
  try {
    return JSON.stringify(action);
  } catch {
    return action;
  }
}
var onIdentifyEffectsKey = "ngrxOnIdentifyEffects";
function isOnIdentifyEffects(instance) {
  return isFunction(instance, onIdentifyEffectsKey);
}
var onRunEffectsKey = "ngrxOnRunEffects";
function isOnRunEffects(instance) {
  return isFunction(instance, onRunEffectsKey);
}
var onInitEffects = "ngrxOnInitEffects";
function isOnInitEffects(instance) {
  return isFunction(instance, onInitEffects);
}
function isFunction(instance, functionName) {
  return instance && functionName in instance && typeof instance[functionName] === "function";
}
var EffectSources = class _EffectSources extends Subject {
  constructor(errorHandler, effectsErrorHandler) {
    super();
    this.errorHandler = errorHandler;
    this.effectsErrorHandler = effectsErrorHandler;
  }
  addEffects(effectSourceInstance) {
    this.next(effectSourceInstance);
  }
  /**
   * @internal
   */
  toActions() {
    return this.pipe(groupBy((effectsInstance2) => isClassInstance(effectsInstance2) ? getSourceForInstance(effectsInstance2) : effectsInstance2), mergeMap((source$) => {
      return source$.pipe(groupBy(effectsInstance));
    }), mergeMap((source$) => {
      const effect$ = source$.pipe(exhaustMap((sourceInstance) => {
        return resolveEffectSource(this.errorHandler, this.effectsErrorHandler)(sourceInstance);
      }), map((output) => {
        reportInvalidActions(output, this.errorHandler);
        return output.notification;
      }), filter((notification) => notification.kind === "N" && notification.value != null), dematerialize());
      const init$ = source$.pipe(take(1), filter(isOnInitEffects), map((instance) => instance.ngrxOnInitEffects()));
      return merge(effect$, init$);
    }));
  }
  static {
    this.ɵfac = function EffectSources_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EffectSources)(ɵɵinject(ErrorHandler), ɵɵinject(EFFECTS_ERROR_HANDLER));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _EffectSources,
      factory: _EffectSources.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectSources, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: ErrorHandler
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [EFFECTS_ERROR_HANDLER]
    }]
  }], null);
})();
function effectsInstance(sourceInstance) {
  if (isOnIdentifyEffects(sourceInstance)) {
    return sourceInstance.ngrxOnIdentifyEffects();
  }
  return "";
}
function resolveEffectSource(errorHandler, effectsErrorHandler) {
  return (sourceInstance) => {
    const mergedEffects$ = mergeEffects(sourceInstance, errorHandler, effectsErrorHandler);
    if (isOnRunEffects(sourceInstance)) {
      return sourceInstance.ngrxOnRunEffects(mergedEffects$);
    }
    return mergedEffects$;
  };
}
var EffectsRunner = class _EffectsRunner {
  get isStarted() {
    return !!this.effectsSubscription;
  }
  constructor(effectSources, store) {
    this.effectSources = effectSources;
    this.store = store;
    this.effectsSubscription = null;
  }
  start() {
    if (!this.effectsSubscription) {
      this.effectsSubscription = this.effectSources.toActions().subscribe(this.store);
    }
  }
  ngOnDestroy() {
    if (this.effectsSubscription) {
      this.effectsSubscription.unsubscribe();
      this.effectsSubscription = null;
    }
  }
  static {
    this.ɵfac = function EffectsRunner_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EffectsRunner)(ɵɵinject(EffectSources), ɵɵinject(Store));
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _EffectsRunner,
      factory: _EffectsRunner.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsRunner, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: EffectSources
  }, {
    type: Store
  }], null);
})();
var EffectsRootModule = class _EffectsRootModule {
  constructor(sources, runner, store, rootEffectsInstances, storeRootModule, storeFeatureModule, guard) {
    this.sources = sources;
    runner.start();
    for (const effectsInstance2 of rootEffectsInstances) {
      sources.addEffects(effectsInstance2);
    }
    store.dispatch({
      type: ROOT_EFFECTS_INIT
    });
  }
  addEffects(effectsInstance2) {
    this.sources.addEffects(effectsInstance2);
  }
  static {
    this.ɵfac = function EffectsRootModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EffectsRootModule)(ɵɵinject(EffectSources), ɵɵinject(EffectsRunner), ɵɵinject(Store), ɵɵinject(_ROOT_EFFECTS_INSTANCES), ɵɵinject(StoreRootModule, 8), ɵɵinject(StoreFeatureModule, 8), ɵɵinject(_ROOT_EFFECTS_GUARD, 8));
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _EffectsRootModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsRootModule, [{
    type: NgModule,
    args: [{}]
  }], () => [{
    type: EffectSources
  }, {
    type: EffectsRunner
  }, {
    type: Store
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [_ROOT_EFFECTS_INSTANCES]
    }]
  }, {
    type: StoreRootModule,
    decorators: [{
      type: Optional
    }]
  }, {
    type: StoreFeatureModule,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [_ROOT_EFFECTS_GUARD]
    }]
  }], null);
})();
var EffectsFeatureModule = class _EffectsFeatureModule {
  constructor(effectsRootModule, effectsInstanceGroups, storeRootModule, storeFeatureModule) {
    const effectsInstances = effectsInstanceGroups.flat();
    for (const effectsInstance2 of effectsInstances) {
      effectsRootModule.addEffects(effectsInstance2);
    }
  }
  static {
    this.ɵfac = function EffectsFeatureModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EffectsFeatureModule)(ɵɵinject(EffectsRootModule), ɵɵinject(_FEATURE_EFFECTS_INSTANCE_GROUPS), ɵɵinject(StoreRootModule, 8), ɵɵinject(StoreFeatureModule, 8));
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _EffectsFeatureModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsFeatureModule, [{
    type: NgModule,
    args: [{}]
  }], () => [{
    type: EffectsRootModule
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [_FEATURE_EFFECTS_INSTANCE_GROUPS]
    }]
  }, {
    type: StoreRootModule,
    decorators: [{
      type: Optional
    }]
  }, {
    type: StoreFeatureModule,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var EffectsModule = class _EffectsModule {
  static forFeature(...featureEffects) {
    const effects = featureEffects.flat();
    const effectsClasses = getClasses(effects);
    return {
      ngModule: EffectsFeatureModule,
      providers: [effectsClasses, {
        provide: _FEATURE_EFFECTS,
        multi: true,
        useValue: effects
      }, {
        provide: USER_PROVIDED_EFFECTS,
        multi: true,
        useValue: []
      }, {
        provide: _FEATURE_EFFECTS_INSTANCE_GROUPS,
        multi: true,
        useFactory: createEffectsInstances,
        deps: [_FEATURE_EFFECTS, USER_PROVIDED_EFFECTS]
      }]
    };
  }
  static forRoot(...rootEffects) {
    const effects = rootEffects.flat();
    const effectsClasses = getClasses(effects);
    return {
      ngModule: EffectsRootModule,
      providers: [effectsClasses, {
        provide: _ROOT_EFFECTS,
        useValue: [effects]
      }, {
        provide: _ROOT_EFFECTS_GUARD,
        useFactory: _provideForRootGuard
      }, {
        provide: USER_PROVIDED_EFFECTS,
        multi: true,
        useValue: []
      }, {
        provide: _ROOT_EFFECTS_INSTANCES,
        useFactory: createEffectsInstances,
        deps: [_ROOT_EFFECTS, USER_PROVIDED_EFFECTS]
      }]
    };
  }
  static {
    this.ɵfac = function EffectsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EffectsModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _EffectsModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EffectsModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();
function createEffectsInstances(effectsGroups, userProvidedEffectsGroups) {
  const effects = [];
  for (const effectsGroup of effectsGroups) {
    effects.push(...effectsGroup);
  }
  for (const userProvidedEffectsGroup of userProvidedEffectsGroups) {
    effects.push(...userProvidedEffectsGroup);
  }
  return effects.map((effectsTokenOrRecord) => isToken(effectsTokenOrRecord) ? inject(effectsTokenOrRecord) : effectsTokenOrRecord);
}
function _provideForRootGuard() {
  const runner = inject(EffectsRunner, {
    optional: true,
    skipSelf: true
  });
  const rootEffects = inject(_ROOT_EFFECTS, {
    self: true
  });
  const hasEffects = !(rootEffects.length === 1 && rootEffects[0].length === 0);
  if (hasEffects && runner) {
    throw new TypeError(`EffectsModule.forRoot() called twice. Feature modules should use EffectsModule.forFeature() instead.`);
  }
  return "guarded";
}
function act(configOrProject, errorFn) {
  const {
    project,
    error,
    complete,
    operator,
    unsubscribe
  } = typeof configOrProject === "function" ? {
    project: configOrProject,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    error: errorFn,
    operator: concatMap,
    complete: void 0,
    unsubscribe: void 0
  } : __spreadProps(__spreadValues({}, configOrProject), {
    operator: configOrProject.operator || concatMap
  });
  return (source) => defer(() => {
    const subject = new Subject();
    return merge(source.pipe(operator((input, index) => defer(() => {
      let completed = false;
      let errored = false;
      let projectedCount = 0;
      return project(input, index).pipe(materialize(), map((notification) => {
        switch (notification.kind) {
          case "E":
            errored = true;
            return {
              kind: "N",
              value: error(notification.error, input)
            };
          case "C":
            completed = true;
            return complete ? {
              kind: "N",
              value: complete(projectedCount, input)
            } : void 0;
          default:
            ++projectedCount;
            return notification;
        }
      }), filter((n) => n != null), dematerialize(), finalize(() => {
        if (!completed && !errored && unsubscribe) {
          subject.next(unsubscribe(projectedCount, input));
        }
      }));
    }))), subject);
  });
}
function provideEffects(...effects) {
  const effectsClassesAndRecords = effects.flat();
  const effectsClasses = getClasses(effectsClassesAndRecords);
  return makeEnvironmentProviders([effectsClasses, {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useValue: () => {
      inject(ROOT_STORE_PROVIDER);
      inject(FEATURE_STATE_PROVIDER, {
        optional: true
      });
      const effectsRunner = inject(EffectsRunner);
      const effectSources = inject(EffectSources);
      const shouldInitEffects = !effectsRunner.isStarted;
      if (shouldInitEffects) {
        effectsRunner.start();
      }
      for (const effectsClassOrRecord of effectsClassesAndRecords) {
        const effectsInstance2 = isClass(effectsClassOrRecord) ? inject(effectsClassOrRecord) : effectsClassOrRecord;
        effectSources.addEffects(effectsInstance2);
      }
      if (shouldInitEffects) {
        const store = inject(Store);
        store.dispatch(rootEffectsInit());
      }
    }
  }]);
}
export {
  Actions,
  EFFECTS_ERROR_HANDLER,
  EffectSources,
  EffectsFeatureModule,
  EffectsModule,
  EffectsRootModule,
  EffectsRunner,
  ROOT_EFFECTS_INIT,
  USER_PROVIDED_EFFECTS,
  act,
  createEffect,
  defaultEffectsErrorHandler,
  getEffectsMetadata,
  mergeEffects,
  ofType,
  provideEffects,
  rootEffectsInit
};
//# sourceMappingURL=@ngrx_effects.js.map
