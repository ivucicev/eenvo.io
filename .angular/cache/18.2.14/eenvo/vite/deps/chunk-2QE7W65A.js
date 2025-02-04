import {
  CollectionNestedOption,
  DxTemplateHost,
  NestedOption,
  NestedOptionHost,
  extractTemplate
} from "./chunk-PYQM5LLR.js";
import {
  DOCUMENT
} from "./chunk-G2FHBYCL.js";
import {
  Component,
  ElementRef,
  Host,
  Inject,
  Input,
  NgModule,
  Renderer2,
  SkipSelf,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-SZFXRLZD.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-popup-nested.mjs
var _c0 = ["*"];
var DxoPopupAnimationComponent = class _DxoPopupAnimationComponent extends NestedOption {
  get hide() {
    return this._getOption("hide");
  }
  set hide(value) {
    this._setOption("hide", value);
  }
  get show() {
    return this._getOption("show");
  }
  set show(value) {
    this._setOption("show", value);
  }
  get _optionPath() {
    return "animation";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupAnimationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupAnimationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupAnimationComponent,
    selectors: [["dxo-popup-animation"]],
    inputs: {
      hide: "hide",
      show: "show"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupAnimationComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupAnimationComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-animation",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    hide: [{
      type: Input
    }],
    show: [{
      type: Input
    }]
  });
})();
var DxoPopupAnimationModule = class _DxoPopupAnimationModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupAnimationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupAnimationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupAnimationModule,
    declarations: [DxoPopupAnimationComponent],
    exports: [DxoPopupAnimationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupAnimationModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupAnimationComponent],
      exports: [DxoPopupAnimationComponent]
    }]
  }], null, null);
})();
var DxoPopupAtComponent = class _DxoPopupAtComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "at";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupAtComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupAtComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupAtComponent,
    selectors: [["dxo-popup-at"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupAtComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupAtComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-at",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoPopupAtModule = class _DxoPopupAtModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupAtModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupAtModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupAtModule,
    declarations: [DxoPopupAtComponent],
    exports: [DxoPopupAtComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupAtModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupAtComponent],
      exports: [DxoPopupAtComponent]
    }]
  }], null, null);
})();
var DxoPopupBoundaryOffsetComponent = class _DxoPopupBoundaryOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "boundaryOffset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupBoundaryOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupBoundaryOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupBoundaryOffsetComponent,
    selectors: [["dxo-popup-boundary-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupBoundaryOffsetComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupBoundaryOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-boundary-offset",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoPopupBoundaryOffsetModule = class _DxoPopupBoundaryOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupBoundaryOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupBoundaryOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupBoundaryOffsetModule,
    declarations: [DxoPopupBoundaryOffsetComponent],
    exports: [DxoPopupBoundaryOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupBoundaryOffsetModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupBoundaryOffsetComponent],
      exports: [DxoPopupBoundaryOffsetComponent]
    }]
  }], null, null);
})();
var DxoPopupCollisionComponent = class _DxoPopupCollisionComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "collision";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupCollisionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupCollisionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupCollisionComponent,
    selectors: [["dxo-popup-collision"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupCollisionComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupCollisionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-collision",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoPopupCollisionModule = class _DxoPopupCollisionModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupCollisionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupCollisionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupCollisionModule,
    declarations: [DxoPopupCollisionComponent],
    exports: [DxoPopupCollisionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupCollisionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupCollisionComponent],
      exports: [DxoPopupCollisionComponent]
    }]
  }], null, null);
})();
var DxoPopupFromComponent = class _DxoPopupFromComponent extends NestedOption {
  get left() {
    return this._getOption("left");
  }
  set left(value) {
    this._setOption("left", value);
  }
  get opacity() {
    return this._getOption("opacity");
  }
  set opacity(value) {
    this._setOption("opacity", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get scale() {
    return this._getOption("scale");
  }
  set scale(value) {
    this._setOption("scale", value);
  }
  get top() {
    return this._getOption("top");
  }
  set top(value) {
    this._setOption("top", value);
  }
  get _optionPath() {
    return "from";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupFromComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupFromComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupFromComponent,
    selectors: [["dxo-popup-from"]],
    inputs: {
      left: "left",
      opacity: "opacity",
      position: "position",
      scale: "scale",
      top: "top"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupFromComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupFromComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-from",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    left: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    top: [{
      type: Input
    }]
  });
})();
var DxoPopupFromModule = class _DxoPopupFromModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupFromModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupFromModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupFromModule,
    declarations: [DxoPopupFromComponent],
    exports: [DxoPopupFromComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupFromModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupFromComponent],
      exports: [DxoPopupFromComponent]
    }]
  }], null, null);
})();
var DxoPopupHideComponent = class _DxoPopupHideComponent extends NestedOption {
  get complete() {
    return this._getOption("complete");
  }
  set complete(value) {
    this._setOption("complete", value);
  }
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get direction() {
    return this._getOption("direction");
  }
  set direction(value) {
    this._setOption("direction", value);
  }
  get duration() {
    return this._getOption("duration");
  }
  set duration(value) {
    this._setOption("duration", value);
  }
  get easing() {
    return this._getOption("easing");
  }
  set easing(value) {
    this._setOption("easing", value);
  }
  get from() {
    return this._getOption("from");
  }
  set from(value) {
    this._setOption("from", value);
  }
  get staggerDelay() {
    return this._getOption("staggerDelay");
  }
  set staggerDelay(value) {
    this._setOption("staggerDelay", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get to() {
    return this._getOption("to");
  }
  set to(value) {
    this._setOption("to", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "hide";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupHideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupHideComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupHideComponent,
    selectors: [["dxo-popup-hide"]],
    inputs: {
      complete: "complete",
      delay: "delay",
      direction: "direction",
      duration: "duration",
      easing: "easing",
      from: "from",
      staggerDelay: "staggerDelay",
      start: "start",
      to: "to",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupHideComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupHideComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-hide",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    complete: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    easing: [{
      type: Input
    }],
    from: [{
      type: Input
    }],
    staggerDelay: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    to: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoPopupHideModule = class _DxoPopupHideModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupHideModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupHideModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupHideModule,
    declarations: [DxoPopupHideComponent],
    exports: [DxoPopupHideComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupHideModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupHideComponent],
      exports: [DxoPopupHideComponent]
    }]
  }], null, null);
})();
var DxoPopupMyComponent = class _DxoPopupMyComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "my";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupMyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupMyComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupMyComponent,
    selectors: [["dxo-popup-my"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupMyComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupMyComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-my",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoPopupMyModule = class _DxoPopupMyModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupMyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupMyModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupMyModule,
    declarations: [DxoPopupMyComponent],
    exports: [DxoPopupMyComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupMyModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupMyComponent],
      exports: [DxoPopupMyComponent]
    }]
  }], null, null);
})();
var DxoPopupOffsetComponent = class _DxoPopupOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "offset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupOffsetComponent,
    selectors: [["dxo-popup-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupOffsetComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-offset",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoPopupOffsetModule = class _DxoPopupOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupOffsetModule,
    declarations: [DxoPopupOffsetComponent],
    exports: [DxoPopupOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupOffsetModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupOffsetComponent],
      exports: [DxoPopupOffsetComponent]
    }]
  }], null, null);
})();
var DxoPopupPositionComponent = class _DxoPopupPositionComponent extends NestedOption {
  get at() {
    return this._getOption("at");
  }
  set at(value) {
    this._setOption("at", value);
  }
  get boundary() {
    return this._getOption("boundary");
  }
  set boundary(value) {
    this._setOption("boundary", value);
  }
  get boundaryOffset() {
    return this._getOption("boundaryOffset");
  }
  set boundaryOffset(value) {
    this._setOption("boundaryOffset", value);
  }
  get collision() {
    return this._getOption("collision");
  }
  set collision(value) {
    this._setOption("collision", value);
  }
  get my() {
    return this._getOption("my");
  }
  set my(value) {
    this._setOption("my", value);
  }
  get of() {
    return this._getOption("of");
  }
  set of(value) {
    this._setOption("of", value);
  }
  get offset() {
    return this._getOption("offset");
  }
  set offset(value) {
    this._setOption("offset", value);
  }
  get _optionPath() {
    return "position";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupPositionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupPositionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupPositionComponent,
    selectors: [["dxo-popup-position"]],
    inputs: {
      at: "at",
      boundary: "boundary",
      boundaryOffset: "boundaryOffset",
      collision: "collision",
      my: "my",
      of: "of",
      offset: "offset"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupPositionComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupPositionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-position",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    at: [{
      type: Input
    }],
    boundary: [{
      type: Input
    }],
    boundaryOffset: [{
      type: Input
    }],
    collision: [{
      type: Input
    }],
    my: [{
      type: Input
    }],
    of: [{
      type: Input
    }],
    offset: [{
      type: Input
    }]
  });
})();
var DxoPopupPositionModule = class _DxoPopupPositionModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupPositionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupPositionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupPositionModule,
    declarations: [DxoPopupPositionComponent],
    exports: [DxoPopupPositionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupPositionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupPositionComponent],
      exports: [DxoPopupPositionComponent]
    }]
  }], null, null);
})();
var DxoPopupShowComponent = class _DxoPopupShowComponent extends NestedOption {
  get complete() {
    return this._getOption("complete");
  }
  set complete(value) {
    this._setOption("complete", value);
  }
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get direction() {
    return this._getOption("direction");
  }
  set direction(value) {
    this._setOption("direction", value);
  }
  get duration() {
    return this._getOption("duration");
  }
  set duration(value) {
    this._setOption("duration", value);
  }
  get easing() {
    return this._getOption("easing");
  }
  set easing(value) {
    this._setOption("easing", value);
  }
  get from() {
    return this._getOption("from");
  }
  set from(value) {
    this._setOption("from", value);
  }
  get staggerDelay() {
    return this._getOption("staggerDelay");
  }
  set staggerDelay(value) {
    this._setOption("staggerDelay", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get to() {
    return this._getOption("to");
  }
  set to(value) {
    this._setOption("to", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "show";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupShowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupShowComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupShowComponent,
    selectors: [["dxo-popup-show"]],
    inputs: {
      complete: "complete",
      delay: "delay",
      direction: "direction",
      duration: "duration",
      easing: "easing",
      from: "from",
      staggerDelay: "staggerDelay",
      start: "start",
      to: "to",
      type: "type"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupShowComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupShowComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-show",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    complete: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    easing: [{
      type: Input
    }],
    from: [{
      type: Input
    }],
    staggerDelay: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    to: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoPopupShowModule = class _DxoPopupShowModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupShowModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupShowModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupShowModule,
    declarations: [DxoPopupShowComponent],
    exports: [DxoPopupShowComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupShowModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupShowComponent],
      exports: [DxoPopupShowComponent]
    }]
  }], null, null);
})();
var DxoPopupToComponent = class _DxoPopupToComponent extends NestedOption {
  get left() {
    return this._getOption("left");
  }
  set left(value) {
    this._setOption("left", value);
  }
  get opacity() {
    return this._getOption("opacity");
  }
  set opacity(value) {
    this._setOption("opacity", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get scale() {
    return this._getOption("scale");
  }
  set scale(value) {
    this._setOption("scale", value);
  }
  get top() {
    return this._getOption("top");
  }
  set top(value) {
    this._setOption("top", value);
  }
  get _optionPath() {
    return "to";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoPopupToComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupToComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoPopupToComponent,
    selectors: [["dxo-popup-to"]],
    inputs: {
      left: "left",
      opacity: "opacity",
      position: "position",
      scale: "scale",
      top: "top"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoPopupToComponent_Template(rf, ctx) {
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupToComponent, [{
    type: Component,
    args: [{
      selector: "dxo-popup-to",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    left: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    top: [{
      type: Input
    }]
  });
})();
var DxoPopupToModule = class _DxoPopupToModule {
  /** @nocollapse */
  static ɵfac = function DxoPopupToModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoPopupToModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoPopupToModule,
    declarations: [DxoPopupToComponent],
    exports: [DxoPopupToComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoPopupToModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoPopupToComponent],
      exports: [DxoPopupToComponent]
    }]
  }], null, null);
})();
var DxiPopupToolbarItemComponent = class _DxiPopupToolbarItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get html() {
    return this._getOption("html");
  }
  set html(value) {
    this._setOption("html", value);
  }
  get locateInMenu() {
    return this._getOption("locateInMenu");
  }
  set locateInMenu(value) {
    this._setOption("locateInMenu", value);
  }
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get menuItemTemplate() {
    return this._getOption("menuItemTemplate");
  }
  set menuItemTemplate(value) {
    this._setOption("menuItemTemplate", value);
  }
  get options() {
    return this._getOption("options");
  }
  set options(value) {
    this._setOption("options", value);
  }
  get showText() {
    return this._getOption("showText");
  }
  set showText(value) {
    this._setOption("showText", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get toolbar() {
    return this._getOption("toolbar");
  }
  set toolbar(value) {
    this._setOption("toolbar", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get widget() {
    return this._getOption("widget");
  }
  set widget(value) {
    this._setOption("widget", value);
  }
  get _optionPath() {
    return "toolbarItems";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiPopupToolbarItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiPopupToolbarItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiPopupToolbarItemComponent,
    selectors: [["dxi-popup-toolbar-item"]],
    inputs: {
      cssClass: "cssClass",
      disabled: "disabled",
      html: "html",
      locateInMenu: "locateInMenu",
      location: "location",
      menuItemTemplate: "menuItemTemplate",
      options: "options",
      showText: "showText",
      template: "template",
      text: "text",
      toolbar: "toolbar",
      visible: "visible",
      widget: "widget"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiPopupToolbarItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiPopupToolbarItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-popup-toolbar-item",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    cssClass: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    html: [{
      type: Input
    }],
    locateInMenu: [{
      type: Input
    }],
    location: [{
      type: Input
    }],
    menuItemTemplate: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    showText: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    toolbar: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    widget: [{
      type: Input
    }]
  });
})();
var DxiPopupToolbarItemModule = class _DxiPopupToolbarItemModule {
  /** @nocollapse */
  static ɵfac = function DxiPopupToolbarItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiPopupToolbarItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiPopupToolbarItemModule,
    declarations: [DxiPopupToolbarItemComponent],
    exports: [DxiPopupToolbarItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiPopupToolbarItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiPopupToolbarItemComponent],
      exports: [DxiPopupToolbarItemComponent]
    }]
  }], null, null);
})();

export {
  DxoPopupAnimationComponent,
  DxoPopupAnimationModule,
  DxoPopupAtComponent,
  DxoPopupAtModule,
  DxoPopupBoundaryOffsetComponent,
  DxoPopupBoundaryOffsetModule,
  DxoPopupCollisionComponent,
  DxoPopupCollisionModule,
  DxoPopupFromComponent,
  DxoPopupFromModule,
  DxoPopupHideComponent,
  DxoPopupHideModule,
  DxoPopupMyComponent,
  DxoPopupMyModule,
  DxoPopupOffsetComponent,
  DxoPopupOffsetModule,
  DxoPopupPositionComponent,
  DxoPopupPositionModule,
  DxoPopupShowComponent,
  DxoPopupShowModule,
  DxoPopupToComponent,
  DxoPopupToModule,
  DxiPopupToolbarItemComponent,
  DxiPopupToolbarItemModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-popup-nested.mjs:
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
//# sourceMappingURL=chunk-2QE7W65A.js.map
