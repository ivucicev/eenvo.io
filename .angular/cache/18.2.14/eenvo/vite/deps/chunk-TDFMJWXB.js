// node_modules/devextreme/esm/__internal/core/utils/m_type.js
var types = {
  "[object Array]": "array",
  "[object Date]": "date",
  "[object Object]": "object",
  "[object String]": "string"
};
var type = function(object) {
  if (null === object) {
    return "null";
  }
  const typeOfObject = Object.prototype.toString.call(object);
  return "object" === typeof object ? types[typeOfObject] || "object" : typeof object;
};
var isBoolean = function(object) {
  return "boolean" === typeof object;
};
var isExponential = function(value) {
  return isNumeric(value) && -1 !== value.toString().indexOf("e");
};
var isDate = function(object) {
  return "date" === type(object);
};
var isDefined = function(object) {
  return null !== object && void 0 !== object;
};
var isFunction = function(object) {
  return "function" === typeof object;
};
var isString = function(object) {
  return "string" === typeof object;
};
var isNumeric = function(object) {
  return "number" === typeof object && isFinite(object) || !isNaN(object - parseFloat(object));
};
var isObject = function(object) {
  return "object" === type(object);
};
var isEmptyObject = function(object) {
  let property;
  for (property in object) {
    return false;
  }
  return true;
};
var isPlainObject = function(object) {
  if (!object || "object" !== type(object)) {
    return false;
  }
  const proto = Object.getPrototypeOf(object);
  if (!proto) {
    return true;
  }
  const ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return "function" === typeof ctor && Object.toString.call(ctor) === Object.toString.call(Object);
};
var isPrimitive = function(value) {
  return !["object", "array", "function"].includes(type(value));
};
var isWindow = function(object) {
  return null != object && object === object.window;
};
var isRenderer = function(object) {
  return !!object && !!(object.jquery || object.dxRenderer);
};
var isPromise = function(object) {
  return !!object && isFunction(object.then);
};
var isDeferred = function(object) {
  return !!object && isFunction(object.done) && isFunction(object.fail);
};
var isEvent = function(object) {
  return !!(object && object.preventDefault);
};
var m_type_default = {
  isBoolean,
  isDate,
  isDeferred,
  isDefined,
  isEmptyObject,
  isEvent,
  isExponential,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRenderer,
  isString,
  isWindow,
  type
};

// node_modules/devextreme/esm/__internal/core/utils/m_extend.js
var extendFromObject = function(target, source, overrideExistingValues) {
  target = target || {};
  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      const value = source[prop];
      if (!(prop in target) || overrideExistingValues) {
        target[prop] = value;
      }
    }
  }
  return target;
};
var extend = function(target) {
  target = target || {};
  let i = 1;
  let deep = false;
  if ("boolean" === typeof target) {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  for (; i < arguments.length; i++) {
    const source = arguments[i];
    if (null == source) {
      continue;
    }
    for (const key in source) {
      const targetValue = target[key];
      const sourceValue = source[key];
      let sourceValueIsArray = false;
      let clone2;
      if ("__proto__" === key || "constructor" === key || target === sourceValue) {
        continue;
      }
      if (deep && sourceValue && (isPlainObject(sourceValue) || (sourceValueIsArray = Array.isArray(sourceValue)))) {
        if (sourceValueIsArray) {
          clone2 = targetValue && Array.isArray(targetValue) ? targetValue : [];
        } else {
          clone2 = targetValue && isPlainObject(targetValue) ? targetValue : {};
        }
        target[key] = extend(deep, clone2, sourceValue);
      } else if (void 0 !== sourceValue) {
        target[key] = sourceValue;
      }
    }
  }
  return target;
};

// node_modules/devextreme/esm/__internal/core/utils/m_string.js
var encodeHtml = function() {
  const encodeRegExp = [new RegExp("&", "g"), new RegExp('"', "g"), new RegExp("'", "g"), new RegExp("<", "g"), new RegExp(">", "g")];
  return function(str) {
    return String(str).replace(encodeRegExp[0], "&amp;").replace(encodeRegExp[1], "&quot;").replace(encodeRegExp[2], "&#39;").replace(encodeRegExp[3], "&lt;").replace(encodeRegExp[4], "&gt;");
  };
}();
var splitQuad = function(raw) {
  switch (typeof raw) {
    case "string":
      return raw.split(/\s+/, 4);
    case "object":
      return [raw.x || raw.h || raw.left, raw.y || raw.v || raw.top, raw.x || raw.h || raw.right, raw.y || raw.v || raw.bottom];
    case "number":
      return [raw];
    default:
      return raw;
  }
};
var quadToObject = function(raw) {
  const quad = splitQuad(raw);
  let left = parseInt(quad && quad[0], 10);
  let top = parseInt(quad && quad[1], 10);
  let right = parseInt(quad && quad[2], 10);
  let bottom = parseInt(quad && quad[3], 10);
  if (!isFinite(left)) {
    left = 0;
  }
  if (!isFinite(top)) {
    top = left;
  }
  if (!isFinite(right)) {
    right = left;
  }
  if (!isFinite(bottom)) {
    bottom = top;
  }
  return {
    top,
    right,
    bottom,
    left
  };
};
function format(template) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  if (isFunction(template)) {
    return template(...values);
  }
  values.forEach((value, index) => {
    if (isString(value)) {
      value = value.replace(/\$/g, "$$$$");
    }
    const placeholderReg = new RegExp(`\\{${index}\\}`, "gm");
    template = template.replace(placeholderReg, value);
  });
  return template;
}
var isEmpty = /* @__PURE__ */ function() {
  const SPACE_REGEXP = /\s/g;
  return function(text) {
    return !text || !text.replace(SPACE_REGEXP, "");
  };
}();

// node_modules/devextreme/esm/core/version.js
var version = "24.2.3";
var fullVersion = "24.2.3";

// node_modules/devextreme/esm/__internal/core/utils/m_console.js
var noop = function() {
};
var getConsoleMethod = function(method) {
  if ("undefined" === typeof console || !isFunction(console[method])) {
    return noop;
  }
  return console[method].bind(console);
};
var logger = {
  log: getConsoleMethod("log"),
  info: getConsoleMethod("info"),
  warn: getConsoleMethod("warn"),
  error: getConsoleMethod("error")
};
var debug = /* @__PURE__ */ function() {
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }
  return {
    assert,
    assertParam: function(parameter, message) {
      assert(null !== parameter && void 0 !== parameter, message);
    }
  };
}();
var m_console_default = {
  logger,
  debug
};

// node_modules/devextreme/esm/__internal/core/utils/m_error.js
var ERROR_URL = `https://js.devexpress.com/error/${version.split(".").slice(0, 2).join("_")}/`;
function error(baseErrors, errors) {
  const exports = {
    ERROR_MESSAGES: extend(errors, baseErrors),
    Error: function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return function(args2) {
        const id = args2[0];
        args2 = args2.slice(1);
        const details = formatDetails(id, args2);
        const url = getErrorUrl(id);
        const message = formatMessage(id, details);
        return extend(new Error(message), {
          __id: id,
          __details: details,
          url
        });
      }(args);
    },
    log() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      const id = args[0];
      let method = "log";
      if (/^E\d+$/.test(id)) {
        method = "error";
      } else if (/^W\d+$/.test(id)) {
        method = "warn";
      }
      m_console_default.logger[method]("log" === method ? id : function(args2) {
        const id2 = args2[0];
        args2 = args2.slice(1);
        return formatMessage(id2, formatDetails(id2, args2));
      }(args));
    }
  };
  function formatDetails(id, args) {
    args = [exports.ERROR_MESSAGES[id]].concat(args);
    return format.apply(this, args).replace(/\.*\s*?$/, "");
  }
  function formatMessage(id, details) {
    const kind = null !== id && void 0 !== id && id.startsWith("W") ? "warning" : "error";
    return format.apply(this, ["{0} - {1}.\n\nFor additional information on this {2} message, see: {3}", id, details, kind, getErrorUrl(id)]);
  }
  function getErrorUrl(id) {
    return ERROR_URL + id;
  }
  return exports;
}

// node_modules/devextreme/esm/core/utils/error.js
var error_default = error;

// node_modules/devextreme/esm/__internal/core/m_errors.js
var m_errors_default = error_default({
  E0001: "Method is not implemented",
  E0002: "Member name collision: {0}",
  E0003: "A class must be instantiated using the 'new' keyword",
  E0004: "The NAME property of the component is not specified",
  E0005: "Unknown device",
  E0006: "Unknown endpoint key is requested",
  E0007: "'Invalidate' method is called outside the update transaction",
  E0008: "Type of the option name is not appropriate to create an action",
  E0009: "Component '{0}' has not been initialized for an element",
  E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as {2}",
  E0011: "Unknown animation type '{0}'",
  E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later",
  E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later",
  E0014: "The 'release' method shouldn't be called for an unlocked Lock object",
  E0015: "Queued task returned an unexpected result",
  E0017: "Event namespace is not defined",
  E0018: "DevExpress.ui.DevExpressPopup widget is required",
  E0020: "Template engine '{0}' is not supported",
  E0021: "Unknown theme is set: {0}",
  E0022: "LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts",
  E0023: "Template name is not specified",
  E0024: "DevExtreme bundle already included",
  E0025: "Unexpected argument type",
  E0100: "Unknown validation type is detected",
  E0101: "Misconfigured range validation rule is detected",
  E0102: "Misconfigured comparison validation rule is detected",
  E0103: "validationCallback of an asynchronous rule should return a jQuery or a native promise",
  E0110: "Unknown validation group is detected",
  E0120: "Adapter for a DevExpressValidator component cannot be configured",
  E0121: "The 'customItem' parameter of the 'onCustomItemCreating' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.",
  W0000: "'{0}' is deprecated in {1}. {2}",
  W0001: "{0} - '{1}' option is deprecated in {2}. {3}",
  W0002: "{0} - '{1}' method is deprecated in {2}. {3}",
  W0003: "{0} - '{1}' property is deprecated in {2}. {3}",
  W0004: "Timeout for theme loading is over: {0}",
  W0005: "'{0}' event is deprecated in {1}. {2}",
  W0006: "Invalid recurrence rule: '{0}'",
  W0007: "'{0}' Globalize culture is not defined",
  W0008: "Invalid view name: '{0}'",
  W0009: "Invalid time zone name: '{0}'",
  W0010: "{0} is deprecated in {1}. {2}",
  W0011: "Number parsing is invoked while the parser is not defined",
  W0012: "Date parsing is invoked while the parser is not defined",
  W0013: "'{0}' file is deprecated in {1}. {2}",
  W0014: "{0} - '{1}' type is deprecated in {2}. {3}",
  W0015: "Instead of returning a value from the '{0}' function, write it into the '{1}' field of the function's parameter.",
  W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
  W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
  W0018: 'Setting the "position" property with a function is deprecated since v21.2',
  W0019: "DevExtreme: Unable to Locate a Valid License Key.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nIf you are using a 30-day trial version of DevExtreme, you must uninstall all copies of DevExtreme once your 30-day trial period expires. For terms and conditions that govern use of DevExtreme UI components/libraries, please refer to the DevExtreme End User License Agreement: https://js.devexpress.com/EULAs/DevExtremeComplete.\n\nTo use DevExtreme in a commercial project, you must purchase a license. For pricing/licensing options, please visit: https://js.devexpress.com/Buy.\n\nIf you have licensing-related questions or need help with a purchase, please email clientservices@devexpress.com.\n\n",
  W0020: "DevExtreme: License Key Has Expired.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nA mismatch exists between the license key used and the DevExtreme version referenced in this project.\n\nTo proceed, you can:\n• use a version of DevExtreme linked to your license key: https://www.devexpress.com/ClientCenter/DownloadManager\n• renew your DevExpress Subscription: https://www.devexpress.com/buy/renew (once you renew your subscription, you will be entitled to product updates and support service as defined in the DevExtreme End User License Agreement)\n\nIf you have licensing-related questions or need help with a renewal, please email clientservices@devexpress.com.\n\n",
  W0021: "DevExtreme: License Key Verification Has Failed.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nTo verify your DevExtreme license, make certain to specify a correct key in the GlobalConfig. If you continue to encounter this error, please visit https://www.devexpress.com/ClientCenter/DownloadManager to obtain a valid license key.\n\nIf you have a valid license and this problem persists, please submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.devexpress.com/ticket/create.\n\n",
  W0022: "DevExtreme: Pre-release software. Not suitable for commercial use.\n\nDetailed license/registration related information and instructions: https://js.devexpress.com/Documentation/Licensing/.\n\nPre-release software may contain deficiencies and as such, should not be considered for use or integrated in any mission critical application.\n\n",
  W0023: "DevExtreme: the following 'devextreme' package version does not match versions of other DevExpress products used in this application:\n\n{0}\n\nInteroperability between different versions of the products listed herein cannot be guaranteed.\n\n"
});

// node_modules/devextreme/esm/core/errors.js
var errors_default = m_errors_default;

// node_modules/devextreme/esm/__internal/core/m_config.js
var config = {
  rtlEnabled: false,
  defaultCurrency: "USD",
  defaultUseCurrencyAccountingStyle: true,
  oDataFilterToLower: true,
  serverDecimalSeparator: ".",
  decimalSeparator: ".",
  thousandsSeparator: ",",
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,
  useJQuery: void 0,
  editorStylingMode: void 0,
  useLegacyVisibleIndex: false,
  floatingActionButtonConfig: {
    icon: "add",
    closeIcon: "close",
    label: "",
    position: {
      at: "right bottom",
      my: "right bottom",
      offset: {
        x: -16,
        y: -16
      }
    },
    maxSpeedDialActionCount: 5,
    shading: false,
    direction: "auto"
  },
  optionsParser: (optionsString) => {
    if ("{" !== optionsString.trim().charAt(0)) {
      optionsString = `{${optionsString}}`;
    }
    try {
      return JSON.parse(optionsString);
    } catch (ex) {
      try {
        return JSON.parse(normalizeToJSONString(optionsString));
      } catch (exNormalize) {
        throw errors_default.Error("E3018", ex, optionsString);
      }
    }
  }
};
var normalizeToJSONString = (optionsString) => optionsString.replace(/'/g, '"').replace(/,\s*([\]}])/g, "$1").replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":');
var deprecatedFields = ["decimalSeparator", "thousandsSeparator"];
var configMethod = function() {
  if (!arguments.length) {
    return config;
  }
  const newConfig = arguments.length <= 0 ? void 0 : arguments[0];
  deprecatedFields.forEach((deprecatedField) => {
    if (newConfig[deprecatedField]) {
      const message = `Now, the ${deprecatedField} is selected based on the specified locale.`;
      errors_default.log("W0003", "config", deprecatedField, "19.2", message);
    }
  });
  extend(config, newConfig);
};
if ("undefined" !== typeof DevExpress && DevExpress.config) {
  configMethod(DevExpress.config);
}
var m_config_default = configMethod;

// node_modules/devextreme/esm/common/config.js
var config_default = m_config_default;

// node_modules/devextreme/esm/__internal/core/m_class.js
var wrapOverridden = function(baseProto, methodName, method) {
  return function() {
    const prevCallBase = this.callBase;
    this.callBase = baseProto[methodName];
    try {
      return method.apply(this, arguments);
    } finally {
      this.callBase = prevCallBase;
    }
  };
};
var clonePrototype = function(obj) {
  const func = function() {
  };
  func.prototype = obj.prototype;
  return new func();
};
var redefine = function(members) {
  const that = this;
  let overridden;
  let memberName;
  let member;
  if (!members) {
    return that;
  }
  for (memberName in members) {
    member = members[memberName];
    overridden = "function" === typeof that.prototype[memberName] && "function" === typeof member;
    that.prototype[memberName] = overridden ? wrapOverridden(that.parent.prototype, memberName, member) : member;
  }
  return that;
};
var include = function() {
  const classObj = this;
  let argument;
  let name;
  let i;
  const hasClassObjOwnProperty = Object.prototype.hasOwnProperty.bind(classObj);
  const isES6Class = !hasClassObjOwnProperty("_includedCtors") && !hasClassObjOwnProperty("_includedPostCtors");
  if (isES6Class) {
    classObj._includedCtors = classObj._includedCtors.slice(0);
    classObj._includedPostCtors = classObj._includedPostCtors.slice(0);
  }
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  for (i = 0; i < args.length; i++) {
    argument = args[i];
    if (argument.ctor) {
      classObj._includedCtors.push(argument.ctor);
    }
    if (argument.postCtor) {
      classObj._includedPostCtors.push(argument.postCtor);
    }
    for (name in argument) {
      if ("ctor" === name || "postCtor" === name || "default" === name) {
        continue;
      }
      classObj.prototype[name] = argument[name];
    }
  }
  return classObj;
};
var subclassOf = function(parentClass) {
  const hasParentProperty = Object.prototype.hasOwnProperty.bind(this)("parent");
  const isES6Class = !hasParentProperty && this.parent;
  if (isES6Class) {
    const baseClass = Object.getPrototypeOf(this);
    return baseClass === parentClass || baseClass.subclassOf(parentClass);
  }
  if (this.parent === parentClass) {
    return true;
  }
  if (!this.parent || !this.parent.subclassOf) {
    return false;
  }
  return this.parent.subclassOf(parentClass);
};
var abstract = function() {
  throw errors_default.Error("E0001");
};
var classImpl = function() {
};
classImpl.inherit = function(members) {
  const inheritor = function() {
    if (!this || isWindow(this) || "function" !== typeof this.constructor) {
      throw errors_default.Error("E0003");
    }
    const instance = this;
    const {
      ctor
    } = instance;
    const includedCtors = instance.constructor._includedCtors;
    const includedPostCtors = instance.constructor._includedPostCtors;
    let i;
    for (i = 0; i < includedCtors.length; i++) {
      includedCtors[i].call(instance);
    }
    if (ctor) {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      ctor.apply(instance, args);
    }
    for (i = 0; i < includedPostCtors.length; i++) {
      includedPostCtors[i].call(instance);
    }
  };
  inheritor.prototype = clonePrototype(this);
  Object.setPrototypeOf(inheritor, this);
  inheritor.inherit = this.inherit;
  inheritor.abstract = abstract;
  inheritor.redefine = redefine;
  inheritor.include = include;
  inheritor.subclassOf = subclassOf;
  inheritor.parent = this;
  inheritor._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
  inheritor._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
  inheritor.prototype.constructor = inheritor;
  inheritor.redefine(members);
  return inheritor;
};
classImpl.abstract = abstract;
var m_class_default = classImpl;

// node_modules/devextreme/esm/core/class.js
var class_default = m_class_default;

// node_modules/devextreme/esm/__internal/core/m_guid.js
var Guid = class_default.inherit({
  ctor: function(value) {
    if (value) {
      value = String(value);
    }
    this._value = this._normalize(value || this._generate());
  },
  _normalize: function(value) {
    value = value.replace(/[^a-f0-9]/gi, "").toLowerCase();
    while (value.length < 32) {
      value += "0";
    }
    return [value.substr(0, 8), value.substr(8, 4), value.substr(12, 4), value.substr(16, 4), value.substr(20, 12)].join("-");
  },
  _generate: function() {
    let value = "";
    for (let i = 0; i < 32; i++) {
      value += Math.round(15 * Math.random()).toString(16);
    }
    return value;
  },
  toString: function() {
    return this._value;
  },
  valueOf: function() {
    return this._value;
  },
  toJSON: function() {
    return this._value;
  }
});

// node_modules/devextreme/esm/common/guid.js
var guid_default = Guid;

// node_modules/devextreme/esm/__internal/core/templates/m_template_engine_registry.js
var templateEngines = {};
var currentTemplateEngine;
function registerTemplateEngine(name, templateEngine) {
  templateEngines[name] = templateEngine;
}
function setTemplateEngine(templateEngine) {
  if (isString(templateEngine)) {
    currentTemplateEngine = templateEngines[templateEngine];
    if (!currentTemplateEngine) {
      throw errors_default.Error("E0020", templateEngine);
    }
  } else {
    currentTemplateEngine = templateEngine;
  }
}
function getCurrentTemplateEngine() {
  return currentTemplateEngine;
}

// node_modules/devextreme/esm/common/set_template_engine.js
var set_template_engine_default = setTemplateEngine;

// node_modules/devextreme/esm/core/config.js
var config_default2 = config_default;

// node_modules/devextreme/esm/__internal/core/utils/m_iterator.js
var map = (values, callback) => {
  if (Array.isArray(values)) {
    return values.map(callback);
  }
  const result = [];
  for (const key in values) {
    result.push(callback(values[key], key));
  }
  return result;
};
var each = (values, callback) => {
  if (!values) {
    return;
  }
  if ("length" in values) {
    for (let i = 0; i < values.length; i++) {
      if (false === callback.call(values[i], i, values[i])) {
        break;
      }
    }
  } else {
    for (const key in values) {
      if (false === callback.call(values[key], key, values[key])) {
        break;
      }
    }
  }
  return values;
};
var reverseEach = (array, callback) => {
  if (!array || !("length" in array) || 0 === array.length) {
    return;
  }
  for (let i = array.length - 1; i >= 0; i--) {
    if (false === callback.call(array[i], i, array[i])) {
      break;
    }
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_dependency_injector.js
function injector(object) {
  const BaseClass = class_default.inherit(object);
  let InjectedClass = BaseClass;
  let instance = new InjectedClass(object);
  const initialFields = {};
  const injectFields = function(injectionObject, initial) {
    each(injectionObject, function(key) {
      if (isFunction(instance[key])) {
        if (initial || !object[key]) {
          object[key] = function() {
            return instance[key].apply(object, arguments);
          };
        }
      } else {
        if (initial) {
          initialFields[key] = object[key];
        }
        object[key] = instance[key];
      }
    });
  };
  injectFields(object, true);
  object.inject = function(injectionObject) {
    InjectedClass = InjectedClass.inherit(injectionObject);
    instance = new InjectedClass();
    injectFields(injectionObject);
  };
  object.resetInjection = function() {
    extend(object, initialFields);
    InjectedClass = BaseClass;
    instance = new BaseClass();
  };
  return object;
}

// node_modules/devextreme/esm/core/utils/dependency_injector.js
var dependency_injector_default = injector;

// node_modules/devextreme/esm/__internal/core/utils/m_variable_wrapper.js
var variableWrapper = dependency_injector_default({
  isWrapped: function() {
    return false;
  },
  isWritableWrapped: function() {
    return false;
  },
  wrap: function(value) {
    return value;
  },
  unwrap: function(value) {
    return value;
  },
  assign: function() {
    logger.error("Method 'assign' should not be used for not wrapped variables. Use 'isWrapped' method for ensuring.");
  }
});

// node_modules/devextreme/esm/core/utils/variable_wrapper.js
var variable_wrapper_default = variableWrapper;

// node_modules/devextreme/esm/__internal/core/utils/m_object.js
var clone = /* @__PURE__ */ function() {
  function Clone() {
  }
  return function(obj) {
    Clone.prototype = obj;
    return new Clone();
  };
}();
var orderEach = function(map2, func) {
  const keys = [];
  let key;
  let i;
  for (key in map2) {
    if (Object.prototype.hasOwnProperty.call(map2, key)) {
      keys.push(key);
    }
  }
  keys.sort(function(x, y) {
    const isNumberX = isNumeric(x);
    const isNumberY = isNumeric(y);
    if (isNumberX && isNumberY) {
      return x - y;
    }
    if (isNumberX && !isNumberY) {
      return -1;
    }
    if (!isNumberX && isNumberY) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    func(key, map2[key]);
  }
};
var getDeepCopyTarget = (item) => {
  if (isObject(item)) {
    return Array.isArray(item) ? [] : {};
  }
  return item;
};
var legacyAssign = function(target, property, value, extendComplexObject, assignByReference, shouldCopyUndefined) {
  if (!assignByReference && variable_wrapper_default.isWrapped(target[property])) {
    variable_wrapper_default.assign(target[property], value);
  } else {
    target[property] = value;
  }
};
var newAssign = function(target, property, value, extendComplexObject, assignByReference, shouldCopyUndefined) {
  const goDeeper = extendComplexObject ? isObject(target) : isPlainObject(target);
  if (!assignByReference && variable_wrapper_default.isWrapped(target[property])) {
    variable_wrapper_default.assign(target[property], value);
  } else if (!assignByReference && Array.isArray(value)) {
    target[property] = value.map((item) => deepExtendArraySafe(getDeepCopyTarget(item), item, extendComplexObject, assignByReference, shouldCopyUndefined));
  } else if (!assignByReference && goDeeper) {
    target[property] = deepExtendArraySafe(getDeepCopyTarget(value), value, extendComplexObject, assignByReference, shouldCopyUndefined, newAssign);
  } else {
    target[property] = value;
  }
};
var deepExtendArraySafe = function(target, changes, extendComplexObject, assignByReference, shouldCopyUndefined, useNewAssign) {
  let prevValue;
  let newValue;
  const assignFunc = useNewAssign ? newAssign : legacyAssign;
  for (const name in changes) {
    prevValue = target[name];
    newValue = changes[name];
    if ("__proto__" === name || "constructor" === name || target === newValue) {
      continue;
    }
    if (isPlainObject(newValue)) {
      const goDeeper = extendComplexObject ? isObject(prevValue) : isPlainObject(prevValue);
      newValue = deepExtendArraySafe(goDeeper ? prevValue : {}, newValue, extendComplexObject, assignByReference, shouldCopyUndefined);
    }
    const isDeepCopyArray = Array.isArray(newValue) && !assignByReference;
    const hasDifferentNewValue = (shouldCopyUndefined || void 0 !== newValue) && prevValue !== newValue || shouldCopyUndefined && void 0 === prevValue;
    if (isDeepCopyArray || hasDifferentNewValue) {
      assignFunc(target, name, newValue, extendComplexObject, assignByReference, shouldCopyUndefined);
    }
  }
  return target;
};

// node_modules/devextreme/esm/__internal/core/utils/m_data.js
var unwrapVariable = variable_wrapper_default.unwrap;
var {
  isWrapped
} = variable_wrapper_default;
var {
  assign
} = variable_wrapper_default;
var bracketsToDots = function(expr) {
  return expr.replace(/\[/g, ".").replace(/\]/g, "");
};
var getPathParts = function(name) {
  return bracketsToDots(name).split(".");
};
var readPropValue = function(obj, propName, options) {
  options = options || {};
  if ("this" === propName) {
    return unwrap(obj, options);
  }
  return unwrap(obj[propName], options);
};
var assignPropValue = function(obj, propName, value, options) {
  if ("this" === propName) {
    throw new errors_default.Error("E4016");
  }
  const propValue = obj[propName];
  if (options.unwrapObservables && isWrapped(propValue)) {
    assign(propValue, value);
  } else {
    obj[propName] = value;
  }
};
var prepareOptions = function(options) {
  options = options || {};
  options.unwrapObservables = void 0 !== options.unwrapObservables ? options.unwrapObservables : true;
  return options;
};
function unwrap(value, options) {
  return options.unwrapObservables ? unwrapVariable(value) : value;
}
var compileGetter = function(expr) {
  if (arguments.length > 1) {
    expr = [].slice.call(arguments);
  }
  if (!expr || "this" === expr) {
    return function(obj) {
      return obj;
    };
  }
  if ("string" === typeof expr) {
    const path = getPathParts(expr);
    return function(obj, options) {
      options = prepareOptions(options);
      const functionAsIs = options.functionsAsIs;
      const hasDefaultValue = "defaultValue" in options;
      let current = unwrap(obj, options);
      for (let i = 0; i < path.length; i++) {
        if (!current) {
          if (null == current && hasDefaultValue) {
            return options.defaultValue;
          }
          break;
        }
        const pathPart = path[i];
        if (hasDefaultValue && isObject(current) && !(pathPart in current)) {
          return options.defaultValue;
        }
        let next = unwrap(current[pathPart], options);
        if (!functionAsIs && isFunction(next)) {
          next = next.call(current);
        }
        current = next;
      }
      return current;
    };
  }
  if (Array.isArray(expr)) {
    return combineGetters(expr);
  }
  if (isFunction(expr)) {
    return expr;
  }
};
function combineGetters(getters) {
  const compiledGetters = {};
  for (let i = 0, l = getters.length; i < l; i++) {
    const getter = getters[i];
    compiledGetters[getter] = compileGetter(getter);
  }
  return function(obj, options) {
    let result;
    each(compiledGetters, function(name) {
      const value = this(obj, options);
      if (void 0 === value) {
        return;
      }
      let current = result || (result = {});
      const path = name.split(".");
      const last = path.length - 1;
      for (let i = 0; i < last; i++) {
        const pathItem = path[i];
        if (!(pathItem in current)) {
          current[pathItem] = {};
        }
        current = current[pathItem];
      }
      current[path[last]] = value;
    });
    return result;
  };
}
function toLowerCase(value, options) {
  return null !== options && void 0 !== options && options.locale ? value.toLocaleLowerCase(options.locale) : value.toLowerCase();
}
function toUpperCase(value, options) {
  return null !== options && void 0 !== options && options.locale ? value.toLocaleUpperCase(options.locale) : value.toUpperCase();
}
var ensurePropValueDefined = function(obj, propName, value, options) {
  if (isDefined(value)) {
    return value;
  }
  const newValue = {};
  assignPropValue(obj, propName, newValue, options);
  return newValue;
};
var compileSetter = function(expr) {
  expr = getPathParts(expr || "this");
  const lastLevelIndex = expr.length - 1;
  return function(obj, value, options) {
    options = prepareOptions(options);
    let currentValue = unwrap(obj, options);
    expr.forEach(function(propertyName, levelIndex) {
      let propertyValue = readPropValue(currentValue, propertyName, options);
      const isPropertyFunc = !options.functionsAsIs && isFunction(propertyValue) && !isWrapped(propertyValue);
      if (levelIndex === lastLevelIndex) {
        if (options.merge && isPlainObject(value) && (!isDefined(propertyValue) || isPlainObject(propertyValue))) {
          propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
          deepExtendArraySafe(propertyValue, value, false, true);
        } else if (isPropertyFunc) {
          currentValue[propertyName](value);
        } else {
          assignPropValue(currentValue, propertyName, value, options);
        }
      } else {
        propertyValue = ensurePropValueDefined(currentValue, propertyName, propertyValue, options);
        if (isPropertyFunc) {
          propertyValue = propertyValue.call(currentValue);
        }
        currentValue = propertyValue;
      }
    });
  };
};
var toComparable = function(value, caseSensitive) {
  var _options$collatorOpti;
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  if (value instanceof Date) {
    return value.getTime();
  }
  const collatorSensitivity = null === options || void 0 === options || null === (_options$collatorOpti = options.collatorOptions) || void 0 === _options$collatorOpti ? void 0 : _options$collatorOpti.sensitivity;
  if (value && value instanceof class_default && value.valueOf) {
    value = value.valueOf();
  } else if ("string" === typeof value && ("base" === collatorSensitivity || "case" === collatorSensitivity)) {
    const REMOVE_DIACRITICAL_MARKS_REGEXP = /[\u0300-\u036f]/g;
    if ("base" === collatorSensitivity) {
      value = toLowerCase(value, options);
    }
    value = value.normalize("NFD").replace(REMOVE_DIACRITICAL_MARKS_REGEXP, "");
  }
  const isCaseSensitive = caseSensitive || "case" === collatorSensitivity || "variant" === collatorSensitivity;
  if ("string" === typeof value && !isCaseSensitive) {
    var _options$locale;
    const locale = null === options || void 0 === options || null === (_options$locale = options.locale) || void 0 === _options$locale ? void 0 : _options$locale.toLowerCase();
    const useUpperCase = locale && !!["hy", "el"].find((code) => locale === code || locale.startsWith(`${code}-`));
    return (useUpperCase ? toUpperCase : toLowerCase)(value, options);
  }
  return value;
};

// node_modules/devextreme/esm/__internal/core/utils/m_callbacks.js
var Callback = function(options) {
  this._options = options || {};
  this._list = [];
  this._queue = [];
  this._firing = false;
  this._fired = false;
  this._firingIndexes = [];
};
Callback.prototype._fireCore = function(context, args) {
  const firingIndexes = this._firingIndexes;
  const list = this._list;
  const {
    stopOnFalse
  } = this._options;
  const step = firingIndexes.length;
  for (firingIndexes[step] = 0; firingIndexes[step] < list.length; firingIndexes[step]++) {
    const result = list[firingIndexes[step]].apply(context, args);
    if (false === result && stopOnFalse) {
      break;
    }
  }
  firingIndexes.pop();
};
Callback.prototype.add = function(fn) {
  if ("function" === typeof fn && (!this._options.unique || !this.has(fn))) {
    this._list.push(fn);
  }
  return this;
};
Callback.prototype.remove = function(fn) {
  const list = this._list;
  const firingIndexes = this._firingIndexes;
  const index = list.indexOf(fn);
  if (index > -1) {
    list.splice(index, 1);
    if (this._firing && firingIndexes.length) {
      for (let step = 0; step < firingIndexes.length; step++) {
        if (index <= firingIndexes[step]) {
          firingIndexes[step]--;
        }
      }
    }
  }
  return this;
};
Callback.prototype.has = function(fn) {
  const list = this._list;
  return fn ? list.indexOf(fn) > -1 : !!list.length;
};
Callback.prototype.empty = function(fn) {
  this._list = [];
  return this;
};
Callback.prototype.fireWith = function(context, args) {
  const queue = this._queue;
  args = args || [];
  args = args.slice ? args.slice() : args;
  if (this._options.syncStrategy) {
    this._firing = true;
    this._fireCore(context, args);
  } else {
    queue.push([context, args]);
    if (this._firing) {
      return;
    }
    this._firing = true;
    while (queue.length) {
      const memory = queue.shift();
      this._fireCore(memory[0], memory[1]);
    }
  }
  this._firing = false;
  this._fired = true;
  return this;
};
Callback.prototype.fire = function() {
  this.fireWith(this, arguments);
};
Callback.prototype.fired = function() {
  return this._fired;
};
var Callbacks = function(options) {
  return new Callback(options);
};
var m_callbacks_default = Callbacks;

// node_modules/devextreme/esm/core/utils/callbacks.js
var callbacks_default = Callbacks;

// node_modules/devextreme/esm/__internal/core/utils/m_deferred.js
var deferredConfig = [{
  method: "resolve",
  handler: "done",
  state: "resolved"
}, {
  method: "reject",
  handler: "fail",
  state: "rejected"
}, {
  method: "notify",
  handler: "progress"
}];
var DeferredObj = function() {
  const that = this;
  this._state = "pending";
  this._promise = {};
  deferredConfig.forEach(function(config2) {
    const methodName = config2.method;
    this[`${methodName}Callbacks`] = callbacks_default();
    this[methodName] = function() {
      return this[`${methodName}With`](this._promise, arguments);
    }.bind(this);
    this._promise[config2.handler] = function(handler) {
      if (!handler) {
        return this;
      }
      const callbacks2 = that[`${methodName}Callbacks`];
      if (callbacks2.fired()) {
        handler.apply(that[`${methodName}Context`], that[`${methodName}Args`]);
      } else {
        callbacks2.add(function(context, args) {
          handler.apply(context, args);
        });
      }
      return this;
    };
  }.bind(this));
  this._promise.always = function(handler) {
    return this.done(handler).fail(handler);
  };
  this._promise.catch = function(handler) {
    return this.then(null, handler);
  };
  this._promise.then = function(resolve, reject) {
    const result = new DeferredObj();
    ["done", "fail"].forEach(function(method) {
      const callback = "done" === method ? resolve : reject;
      this[method](function() {
        if (!callback) {
          result["done" === method ? "resolve" : "reject"].apply(this, arguments);
          return;
        }
        const callbackResult = callback && callback.apply(this, arguments);
        if (isDeferred(callbackResult)) {
          callbackResult.done(result.resolve).fail(result.reject);
        } else if (isPromise(callbackResult)) {
          callbackResult.then(result.resolve, result.reject);
        } else {
          result.resolve.apply(this, isDefined(callbackResult) ? [callbackResult] : arguments);
        }
      });
    }.bind(this));
    return result.promise();
  };
  this._promise.state = function() {
    return that._state;
  };
  this._promise.promise = function(args) {
    return args ? extend(args, that._promise) : that._promise;
  };
  this._promise.promise(this);
};
deferredConfig.forEach(function(config2) {
  const methodName = config2.method;
  const {
    state
  } = config2;
  DeferredObj.prototype[`${methodName}With`] = function(context, args) {
    const callbacks2 = this[`${methodName}Callbacks`];
    if ("pending" === this.state()) {
      this[`${methodName}Args`] = args;
      this[`${methodName}Context`] = context;
      if (state) {
        this._state = state;
      }
      callbacks2.fire(context, args);
      if ("pending" !== state) {
        this.resolveCallbacks.empty();
        this.rejectCallbacks.empty();
      }
    }
    return this;
  };
});
function fromPromise(promise, context) {
  if (isDeferred(promise)) {
    return promise;
  }
  if (isPromise(promise)) {
    const d = new DeferredObj();
    promise.then(function() {
      d.resolveWith.apply(d, [context].concat([[].slice.call(arguments)]));
    }, function() {
      d.rejectWith.apply(d, [context].concat([[].slice.call(arguments)]));
    });
    return d;
  }
  return new DeferredObj().resolveWith(context, [promise]);
}
var whenFunc = function() {
  if (1 === arguments.length) {
    return fromPromise(arguments[0]);
  }
  const values = [].slice.call(arguments);
  const contexts = [];
  let resolvedCount = 0;
  const deferred = new DeferredObj();
  const updateState = function(i) {
    return function(value) {
      contexts[i] = this;
      values[i] = arguments.length > 1 ? [].slice.call(arguments) : value;
      resolvedCount++;
      if (resolvedCount === values.length) {
        deferred.resolveWith(contexts, values);
      }
    };
  };
  for (let i = 0; i < values.length; i++) {
    if (isDeferred(values[i])) {
      values[i].promise().done(updateState(i)).fail(deferred.reject);
    } else {
      resolvedCount++;
    }
  }
  if (resolvedCount === values.length) {
    deferred.resolveWith(contexts, values);
  }
  return deferred.promise();
};
function Deferred() {
  return new DeferredObj();
}
function when() {
  return whenFunc.apply(this, arguments);
}

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// node_modules/devextreme/esm/core/guid.js
var guid_default2 = guid_default;

// node_modules/devextreme/esm/__internal/core/utils/m_common.js
var ensureDefined = function(value, defaultValue) {
  return isDefined(value) ? value : defaultValue;
};
var executeAsync = function(action, context) {
  const deferred = new Deferred();
  const normalizedContext = context || this;
  const task = {
    promise: deferred.promise(),
    abort() {
      clearTimeout(timerId);
      deferred.rejectWith(normalizedContext);
    }
  };
  const timerId = (arguments[2] || setTimeout)(function() {
    const result = action.call(normalizedContext);
    if (result && result.done && isFunction(result.done)) {
      result.done(function() {
        deferred.resolveWith(normalizedContext);
      });
    } else {
      deferred.resolveWith(normalizedContext);
    }
  }, "number" === typeof context ? context : 0);
  return task;
};
var delayedFuncs = [];
var delayedNames = [];
var delayedDeferreds = [];
var executingName;
var deferExecute = function(name, func, deferred) {
  if (executingName && executingName !== name) {
    delayedFuncs.push(func);
    delayedNames.push(name);
    deferred = deferred || new Deferred();
    delayedDeferreds.push(deferred);
    return deferred;
  }
  const oldExecutingName = executingName;
  const currentDelayedCount = delayedDeferreds.length;
  executingName = name;
  let result = func();
  if (!result) {
    if (delayedDeferreds.length > currentDelayedCount) {
      result = when.apply(this, delayedDeferreds.slice(currentDelayedCount));
    } else if (deferred) {
      deferred.resolve();
    }
  }
  executingName = oldExecutingName;
  if (deferred && result && result.done) {
    result.done(deferred.resolve).fail(deferred.reject);
  }
  if (!executingName && delayedFuncs.length) {
    ("render" === delayedNames.shift() ? deferRender : deferUpdate)(delayedFuncs.shift(), delayedDeferreds.shift());
  }
  return result || when();
};
var deferRender = function(func, deferred) {
  return deferExecute("render", func, deferred);
};
var deferUpdate = function(func, deferred) {
  return deferExecute("update", func, deferred);
};
var deferRenderer = function(func) {
  return function() {
    const that = this;
    return deferExecute("render", function() {
      return func.call(that);
    });
  };
};
var deferUpdater = function(func) {
  return function() {
    const that = this;
    return deferExecute("update", function() {
      return func.call(that);
    });
  };
};
var findBestMatches = (targetFilter, items, mapFn) => {
  const bestMatches = [];
  let maxMatchCount = 0;
  each(items, (index, itemSrc) => {
    let matchCount = 0;
    const item = mapFn ? mapFn(itemSrc) : itemSrc;
    each(targetFilter, (paramName, targetValue) => {
      const value = item[paramName];
      if (void 0 === value) {
        return;
      }
      if (match(value, targetValue)) {
        matchCount++;
        return;
      }
      matchCount = -1;
      return false;
    });
    if (matchCount < maxMatchCount) {
      return;
    }
    if (matchCount > maxMatchCount) {
      bestMatches.length = 0;
      maxMatchCount = matchCount;
    }
    bestMatches.push(itemSrc);
  });
  return bestMatches;
};
var match = function(value, targetValue) {
  if (Array.isArray(value) && Array.isArray(targetValue)) {
    let mismatch = false;
    each(value, (index, valueItem) => {
      if (valueItem !== targetValue[index]) {
        mismatch = true;
        return false;
      }
    });
    if (mismatch) {
      return false;
    }
    return true;
  }
  if (value === targetValue) {
    return true;
  }
  return false;
};
var splitPair = function(raw) {
  switch (type(raw)) {
    case "string":
      return raw.split(/\s+/, 2);
    case "object":
      return [raw.x ?? raw.h, raw.y ?? raw.v];
    case "number":
      return [raw];
    case "array":
      return raw;
    default:
      return null;
  }
};
var normalizeKey = function(id) {
  let key = isString(id) ? id : id.toString();
  const arr = key.match(/[^a-zA-Z0-9_]/g);
  arr && each(arr, (_, sign) => {
    key = key.replace(sign, `__${sign.charCodeAt()}__`);
  });
  return key;
};
var denormalizeKey = function(key) {
  const arr = key.match(/__\d+__/g);
  arr && arr.forEach((char) => {
    const charCode = parseInt(char.replace("__", ""));
    key = key.replace(char, String.fromCharCode(charCode));
  });
  return key;
};
var pairToObject = function(raw, preventRound) {
  const pair = splitPair(raw);
  let h = preventRound ? parseFloat(pair && pair[0]) : parseInt(pair && pair[0], 10);
  let v = preventRound ? parseFloat(pair && pair[1]) : parseInt(pair && pair[1], 10);
  if (!isFinite(h)) {
    h = 0;
  }
  if (!isFinite(v)) {
    v = h;
  }
  return {
    h,
    v
  };
};
var getKeyHash = function(key) {
  if (key instanceof guid_default2) {
    return key.toString();
  }
  if (isObject(key) || Array.isArray(key)) {
    try {
      const keyHash = JSON.stringify(key);
      return "{}" === keyHash ? key : keyHash;
    } catch (e) {
      return key;
    }
  }
  return key;
};
var escapeRegExp = function(string) {
  return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, "\\$&");
};
var applyServerDecimalSeparator = function(value) {
  const separator = config_default2().serverDecimalSeparator;
  if (isDefined(value)) {
    value = value.toString().replace(".", separator);
  }
  return value;
};
var noop2 = function() {
};
var asyncNoop = function() {
  return new Deferred().resolve().promise();
};
var grep = function(elements, checkFunction, invert) {
  const result = [];
  let check;
  const expectedCheck = !invert;
  for (let i = 0; i < elements.length; i++) {
    check = !!checkFunction(elements[i], i);
    if (check === expectedCheck) {
      result.push(elements[i]);
    }
  }
  return result;
};
var compareArrays = (array1, array2, depth, options) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return !array1.some((item, idx) => !compareByValue(item, array2[idx], depth + 1, _extends({}, options, {
    strict: true
  })));
};
var compareObjects = (object1, object2, depth, options) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  const keys2Set = new Set(keys2);
  return !keys1.some((key) => !keys2Set.has(key) || !compareByValue(object1[key], object2[key], depth + 1, options));
};
var DEFAULT_EQUAL_BY_VALUE_OPTS = {
  maxDepth: 3,
  strict: true
};
var compareByValue = (value1, value2, depth, options) => {
  const {
    strict,
    maxDepth
  } = options;
  const comparable1 = toComparable(value1, true);
  const comparable2 = toComparable(value2, true);
  const comparisonResult = strict ? comparable1 === comparable2 : comparable1 == comparable2;
  switch (true) {
    case comparisonResult:
    case depth >= maxDepth:
      return true;
    case (isObject(comparable1) && isObject(comparable2)):
      return compareObjects(comparable1, comparable2, depth, options);
    case (Array.isArray(comparable1) && Array.isArray(comparable2)):
      return compareArrays(comparable1, comparable2, depth, options);
    default:
      return false;
  }
};
var equalByValue = function(value1, value2) {
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : DEFAULT_EQUAL_BY_VALUE_OPTS;
  const compareOptions = _extends({}, DEFAULT_EQUAL_BY_VALUE_OPTS, options);
  return compareByValue(value1, value2, 0, compareOptions);
};
var m_common_default = {
  ensureDefined,
  executeAsync,
  deferRender,
  deferUpdate,
  deferRenderer,
  deferUpdater,
  findBestMatches,
  splitPair,
  normalizeKey,
  denormalizeKey,
  pairToObject,
  getKeyHash,
  escapeRegExp,
  applyServerDecimalSeparator,
  noop: noop2,
  asyncNoop,
  grep,
  equalByValue
};

// node_modules/devextreme/esm/__internal/core/utils/m_shadow_dom.js
var ownerDocumentStyleSheet = null;
function createConstructedStyleSheet(rootNode) {
  try {
    return new CSSStyleSheet();
  } catch (err) {
    const styleElement = rootNode.ownerDocument.createElement("style");
    rootNode.appendChild(styleElement);
    return styleElement.sheet;
  }
}
function processRules(targetStyleSheet, styleSheets, needApplyAllStyles) {
  for (let i = 0; i < styleSheets.length; i++) {
    const sheet = styleSheets[i];
    try {
      for (let j = 0; j < sheet.cssRules.length; j++) {
        insertRule(targetStyleSheet, sheet.cssRules[j], needApplyAllStyles);
      }
    } catch (err) {
    }
  }
}
function insertRule(targetStyleSheet, rule, needApplyAllStyles) {
  var _rule$selectorText, _rule$cssRules, _rule$name, _rule$style;
  const isDxRule = needApplyAllStyles || (null === (_rule$selectorText = rule.selectorText) || void 0 === _rule$selectorText ? void 0 : _rule$selectorText.includes("dx-")) || (null === (_rule$cssRules = rule.cssRules) || void 0 === _rule$cssRules || null === (_rule$cssRules = _rule$cssRules[0]) || void 0 === _rule$cssRules || null === (_rule$cssRules = _rule$cssRules.selectorText) || void 0 === _rule$cssRules ? void 0 : _rule$cssRules.includes("dx-")) || (null === (_rule$name = rule.name) || void 0 === _rule$name ? void 0 : _rule$name.startsWith("dx-")) || "DXIcons" === (null === (_rule$style = rule.style) || void 0 === _rule$style ? void 0 : _rule$style.fontFamily);
  if (isDxRule) {
    targetStyleSheet.insertRule(rule.cssText, targetStyleSheet.cssRules.length);
  }
}
function addShadowDomStyles($element) {
  var _el$getRootNode;
  const el = $element.get(0);
  const root = null === (_el$getRootNode = el.getRootNode) || void 0 === _el$getRootNode ? void 0 : _el$getRootNode.call(el);
  if (!(null !== root && void 0 !== root && root.host)) {
    return;
  }
  if (!ownerDocumentStyleSheet) {
    ownerDocumentStyleSheet = createConstructedStyleSheet(root);
    processRules(ownerDocumentStyleSheet, el.ownerDocument.styleSheets, false);
  }
  const currentShadowDomStyleSheet = createConstructedStyleSheet(root);
  processRules(currentShadowDomStyleSheet, root.styleSheets, true);
  root.adoptedStyleSheets = [ownerDocumentStyleSheet, currentShadowDomStyleSheet];
}
function isPositionInElementRectangle(element, x, y) {
  var _element$getBoundingC;
  const rect = null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
  return rect && x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
}
function createQueue() {
  let shiftIndex = 0;
  const items = [];
  return {
    push(item) {
      items.push(item);
      return this;
    },
    shift() {
      shiftIndex++;
      return items[shiftIndex - 1];
    },
    get length() {
      return items.length - shiftIndex;
    },
    get items() {
      return items;
    }
  };
}
function getShadowElementsFromPoint(x, y, root) {
  const elementQueue = createQueue().push(root);
  while (elementQueue.length) {
    const el = elementQueue.shift();
    for (let i = 0; i < el.childNodes.length; i++) {
      const childNode = el.childNodes[i];
      if (childNode.nodeType === Node.ELEMENT_NODE && isPositionInElementRectangle(childNode, x, y) && "none" !== getComputedStyle(childNode).pointerEvents) {
        elementQueue.push(childNode);
      }
    }
  }
  const result = elementQueue.items.reverse();
  result.pop();
  return result;
}

// node_modules/devextreme/esm/__internal/core/m_dom_adapter.js
var nativeDOMAdapterStrategy = {
  querySelectorAll: (element, selector) => element.querySelectorAll(selector),
  elementMatches(element, selector) {
    const matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || ((selector2) => {
      const doc = element.document || element.ownerDocument;
      if (!doc) {
        return false;
      }
      const items = this.querySelectorAll(doc, selector2);
      for (let i = 0; i < items.length; i++) {
        if (items[i] === element) {
          return true;
        }
      }
    });
    return matches.call(element, selector);
  },
  createElement(tagName, context) {
    context = context ?? this._document;
    return context.createElement(tagName);
  },
  createElementNS(ns, tagName, context) {
    context = context || this._document;
    return context.createElementNS(ns, tagName);
  },
  createTextNode(text, context) {
    context = context || this._document;
    return context.createTextNode(text);
  },
  createAttribute(text, context) {
    context = context || this._document;
    return context.createAttribute(text);
  },
  isNode: (element) => !!element && "object" === typeof element && "nodeType" in element && "nodeName" in element,
  isElementNode: (element) => !!element && 1 === element.nodeType,
  isTextNode: (element) => element && 3 === element.nodeType,
  isDocument: (element) => element && 9 === element.nodeType,
  isDocumentFragment: (element) => element && 11 === element.nodeType,
  removeElement(element) {
    const parentNode = element && element.parentNode;
    if (parentNode) {
      parentNode.removeChild(element);
    }
  },
  insertElement(parentElement, newElement, nextSiblingElement) {
    if (parentElement && newElement && parentElement !== newElement) {
      if (nextSiblingElement) {
        parentElement.insertBefore(newElement, nextSiblingElement);
      } else {
        parentElement.appendChild(newElement);
      }
    }
  },
  getAttribute: (element, name) => element.getAttribute(name),
  setAttribute(element, name, value) {
    if ("style" === name) {
      element.style.cssText = value;
    } else {
      element.setAttribute(name, value);
    }
  },
  removeAttribute(element, name) {
    element.removeAttribute(name);
  },
  setProperty(element, name, value) {
    element[name] = value;
  },
  setText(element, text) {
    if (element) {
      element.textContent = text;
    }
  },
  setClass(element, className, isAdd) {
    if (1 === element.nodeType && className) {
      isAdd ? element.classList.add(className) : element.classList.remove(className);
    }
  },
  setStyle(element, name, value) {
    element.style[name] = value || "";
  },
  _document: "undefined" === typeof document ? void 0 : document,
  getDocument() {
    return this._document;
  },
  getActiveElement(element) {
    const activeElementHolder = this.getRootNode(element);
    return activeElementHolder.activeElement;
  },
  getRootNode(element) {
    var _element$getRootNode;
    return (null === element || void 0 === element || null === (_element$getRootNode = element.getRootNode) || void 0 === _element$getRootNode ? void 0 : _element$getRootNode.call(element)) ?? this._document;
  },
  getBody() {
    return this._document.body;
  },
  createDocumentFragment() {
    return this._document.createDocumentFragment();
  },
  getDocumentElement() {
    return this._document.documentElement;
  },
  getLocation() {
    return this._document.location;
  },
  getSelection() {
    return this._document.selection;
  },
  getReadyState() {
    return this._document.readyState;
  },
  getHead() {
    return this._document.head;
  },
  hasDocumentProperty(property) {
    return property in this._document;
  },
  listen(element, event, callback, options) {
    if (!element || !("addEventListener" in element)) {
      return noop2;
    }
    element.addEventListener(event, callback, options);
    return () => {
      element.removeEventListener(event, callback);
    };
  },
  elementsFromPoint(x, y, element) {
    const activeElementHolder = this.getRootNode(element);
    if (activeElementHolder.host) {
      return getShadowElementsFromPoint(x, y, activeElementHolder);
    }
    return activeElementHolder.elementsFromPoint(x, y);
  }
};
var domAdapter = dependency_injector_default(nativeDOMAdapterStrategy);
var m_dom_adapter_default = domAdapter;

// node_modules/devextreme/esm/core/dom_adapter.js
var dom_adapter_default = domAdapter;

// node_modules/devextreme/esm/__internal/core/m_memorized_callbacks.js
var MemorizedCallbacks = class {
  constructor() {
    this.memory = [];
    this.callbacks = callbacks_default();
  }
  add(fn) {
    each(this.memory, (_, item) => fn.apply(fn, item));
    this.callbacks.add(fn);
  }
  remove(fn) {
    this.callbacks.remove(fn);
  }
  fire() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    this.memory.push(args);
    this.callbacks.fire.apply(this.callbacks, args);
  }
};

// node_modules/devextreme/esm/core/memorized_callbacks.js
var memorized_callbacks_default = MemorizedCallbacks;

// node_modules/devextreme/esm/common/core/events/core/event_registrator_callbacks.js
var event_registrator_callbacks_default = new memorized_callbacks_default();

// node_modules/devextreme/esm/__internal/events/core/m_hook_touch_props.js
var touchPropsToHook = ["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"];
var touchPropHook = function(name, event) {
  if (event[name] && !event.touches || !event.touches) {
    return event[name];
  }
  const touches = event.touches.length ? event.touches : event.changedTouches;
  if (!touches.length) {
    return;
  }
  return touches[0][name];
};
function m_hook_touch_props_default(callback) {
  touchPropsToHook.forEach((name) => {
    callback(name, (event) => touchPropHook(name, event));
  }, this);
}

// node_modules/devextreme/esm/__internal/events/utils/m_event_target.js
var getEventTarget = (event) => {
  var _originalEvent$target, _originalEvent$compos;
  const {
    originalEvent
  } = event;
  if (!originalEvent) {
    return event.target;
  }
  const isShadowDOMUsed = Boolean(null === (_originalEvent$target = originalEvent.target) || void 0 === _originalEvent$target ? void 0 : _originalEvent$target.shadowRoot);
  if (!isShadowDOMUsed) {
    return originalEvent.target;
  }
  const path = originalEvent.path ?? (null === (_originalEvent$compos = originalEvent.composedPath) || void 0 === _originalEvent$compos ? void 0 : _originalEvent$compos.call(originalEvent));
  const target = (null === path || void 0 === path ? void 0 : path[0]) ?? event.target;
  return target;
};

// node_modules/devextreme/esm/__internal/core/utils/m_call_once.js
var callOnce = function(handler) {
  let result;
  let wrappedHandler = function() {
    result = handler.apply(this, arguments);
    wrappedHandler = function() {
      return result;
    };
    return result;
  };
  return function() {
    return wrappedHandler.apply(this, arguments);
  };
};

// node_modules/devextreme/esm/core/utils/call_once.js
var call_once_default = callOnce;

// node_modules/devextreme/esm/__internal/core/utils/m_window.js
var hasWindowValue = "undefined" !== typeof window;
var hasWindow = () => hasWindowValue;
var windowObject = hasWindow() ? window : void 0;
if (!windowObject) {
  windowObject = {};
  windowObject.window = windowObject;
}
var getWindow = () => windowObject;
var setWindow = (newWindowObject, hasWindow2) => {
  if (void 0 === hasWindow2) {
    hasWindowValue = "undefined" !== typeof window && window === newWindowObject;
  } else {
    hasWindowValue = hasWindow2;
  }
  windowObject = newWindowObject;
};
var hasProperty = (prop) => hasWindow() && prop in windowObject;
var defaultScreenFactorFunc = (width) => {
  if (width < 768) {
    return "xs";
  }
  if (width < 992) {
    return "sm";
  }
  if (width < 1200) {
    return "md";
  }
  return "lg";
};
var getCurrentScreenFactor = (screenFactorCallback) => {
  const screenFactorFunc = screenFactorCallback || defaultScreenFactorFunc;
  const windowWidth = dom_adapter_default.getDocumentElement().clientWidth;
  return screenFactorFunc(windowWidth);
};
var getNavigator = () => {
  var _windowObject;
  return hasWindow() ? null === (_windowObject = windowObject) || void 0 === _windowObject ? void 0 : _windowObject.navigator : {
    userAgent: ""
  };
};
var m_window_default = {
  defaultScreenFactorFunc,
  getCurrentScreenFactor,
  getNavigator,
  getWindow,
  hasProperty,
  hasWindow,
  setWindow
};

// node_modules/devextreme/esm/__internal/events/core/m_events_engine.js
var window2 = getWindow();
var EMPTY_EVENT_NAME = "dxEmptyEventType";
var NATIVE_EVENTS_TO_SUBSCRIBE = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
};
var NATIVE_EVENTS_TO_TRIGGER = {
  focusin: "focus",
  focusout: "blur"
};
var NO_BUBBLE_EVENTS = ["blur", "focus", "load"];
var forcePassiveFalseEventNames = ["touchmove", "wheel", "mousewheel", "touchstart"];
var EVENT_PROPERTIES = ["target", "relatedTarget", "delegateTarget", "altKey", "bubbles", "cancelable", "changedTouches", "ctrlKey", "detail", "eventPhase", "metaKey", "shiftKey", "view", "char", "code", "charCode", "key", "keyCode", "button", "buttons", "offsetX", "offsetY", "pointerId", "pointerType", "targetTouches", "toElement", "touches"];
function matchesSafe(target, selector) {
  return !isWindow(target) && "#document" !== target.nodeName && dom_adapter_default.elementMatches(target, selector);
}
var elementDataMap = /* @__PURE__ */ new WeakMap();
var guid = 0;
var skipEvent;
var special = function() {
  const specialData = {};
  event_registrator_callbacks_default.add((eventName, eventObject) => {
    specialData[eventName] = eventObject;
  });
  return {
    getField: (eventName, field) => specialData[eventName] && specialData[eventName][field],
    callMethod: (eventName, methodName, context, args) => specialData[eventName] && specialData[eventName][methodName] && specialData[eventName][methodName].apply(context, args)
  };
}();
var eventsEngine = dependency_injector_default({
  on: getHandler(normalizeOnArguments(iterate((element, eventName, selector, data2, handler) => {
    const handlersController = getHandlersController(element, eventName);
    handlersController.addHandler(handler, selector, data2);
  }))),
  one: getHandler(normalizeOnArguments((element, eventName, selector, data2, handler) => {
    const oneTimeHandler = function() {
      eventsEngine.off(element, eventName, selector, oneTimeHandler);
      handler.apply(this, arguments);
    };
    eventsEngine.on(element, eventName, selector, data2, oneTimeHandler);
  })),
  off: getHandler(normalizeOffArguments(iterate((element, eventName, selector, handler) => {
    const handlersController = getHandlersController(element, eventName);
    handlersController.removeHandler(handler, selector);
  }))),
  trigger: getHandler(normalizeTriggerArguments((element, event, extraParameters) => {
    const eventName = event.type;
    const handlersController = getHandlersController(element, event.type);
    special.callMethod(eventName, "trigger", element, [event, extraParameters]);
    handlersController.callHandlers(event, extraParameters);
    const noBubble = special.getField(eventName, "noBubble") || event.isPropagationStopped() || NO_BUBBLE_EVENTS.includes(eventName);
    if (!noBubble) {
      const parents = [];
      const getParents = function(element2) {
        const parent = element2.parentNode ?? (isObject(element2.host) ? element2.host : null);
        if (parent) {
          parents.push(parent);
          getParents(parent);
        }
      };
      getParents(element);
      parents.push(window2);
      let i = 0;
      while (parents[i] && !event.isPropagationStopped()) {
        const parentDataByEvent = getHandlersController(parents[i], event.type);
        parentDataByEvent.callHandlers(extend(event, {
          currentTarget: parents[i]
        }), extraParameters);
        i++;
      }
    }
    if (element.nodeType || isWindow(element)) {
      special.callMethod(eventName, "_default", element, [event, extraParameters]);
      callNativeMethod(eventName, element);
    }
  })),
  triggerHandler: getHandler(normalizeTriggerArguments((element, event, extraParameters) => {
    const handlersController = getHandlersController(element, event.type);
    handlersController.callHandlers(event, extraParameters);
  }))
});
function applyForEach(args, method) {
  const element = args[0];
  if (!element) {
    return;
  }
  if (dom_adapter_default.isNode(element) || isWindow(element)) {
    method.apply(eventsEngine, args);
  } else if (!isString(element) && "length" in element) {
    const itemArgs = Array.prototype.slice.call(args, 0);
    Array.prototype.forEach.call(element, (itemElement) => {
      itemArgs[0] = itemElement;
      applyForEach(itemArgs, method);
    });
  } else {
    throw errors_default.Error("E0025");
  }
}
function getHandler(method) {
  return function() {
    applyForEach(arguments, method);
  };
}
function detectPassiveEventHandlersSupport() {
  let isSupported = false;
  try {
    const options = Object.defineProperty({}, "passive", {
      get() {
        isSupported = true;
        return true;
      }
    });
    window2.addEventListener("test", null, options);
  } catch (e) {
  }
  return isSupported;
}
var passiveEventHandlersSupported = call_once_default(detectPassiveEventHandlersSupport);
var contains = (container, element) => {
  if (isWindow(container)) {
    return contains(container.document, element);
  }
  return container.contains ? container.contains(element) : !!(element.compareDocumentPosition(container) & element.DOCUMENT_POSITION_CONTAINS);
};
function getHandlersController(element, eventName) {
  let elementData = elementDataMap.get(element);
  eventName = eventName || "";
  const eventNameParts = eventName.split(".");
  const namespaces = eventNameParts.slice(1);
  const eventNameIsDefined = !!eventNameParts[0];
  eventName = eventNameParts[0] || EMPTY_EVENT_NAME;
  if (!elementData) {
    elementData = {};
    elementDataMap.set(element, elementData);
  }
  if (!elementData[eventName]) {
    elementData[eventName] = {
      handleObjects: [],
      nativeHandler: null
    };
  }
  const eventData = elementData[eventName];
  return {
    addHandler(handler, selector, data2) {
      const callHandler = function(e, extraParameters) {
        const handlerArgs = [e];
        const target = e.currentTarget;
        const {
          relatedTarget
        } = e;
        let secondaryTargetIsInside;
        let result;
        if (eventName in NATIVE_EVENTS_TO_SUBSCRIBE) {
          secondaryTargetIsInside = relatedTarget && target && (relatedTarget === target || contains(target, relatedTarget));
        }
        if (void 0 !== extraParameters) {
          handlerArgs.push(extraParameters);
        }
        special.callMethod(eventName, "handle", element, [e, data2]);
        if (!secondaryTargetIsInside) {
          result = handler.apply(target, handlerArgs);
        }
        if (false === result) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      const handleObject = {
        handler,
        wrappedHandler: function(e, extraParameters) {
          if (skipEvent && e.type === skipEvent) {
            return;
          }
          e.data = data2;
          e.delegateTarget = element;
          if (selector) {
            let currentTarget = e.target;
            while (currentTarget && currentTarget !== element) {
              if (matchesSafe(currentTarget, selector)) {
                e.currentTarget = currentTarget;
                callHandler(e, extraParameters);
              }
              currentTarget = currentTarget.parentNode;
            }
          } else {
            var _e$target;
            e.currentTarget = e.delegateTarget || e.target;
            const isTargetInShadowDOM = Boolean(null === (_e$target = e.target) || void 0 === _e$target ? void 0 : _e$target.shadowRoot);
            if (isTargetInShadowDOM) {
              const target = getEventTarget(e);
              e.target = target;
            }
            callHandler(e, extraParameters);
          }
        },
        selector,
        type: eventName,
        data: data2,
        namespace: namespaces.join("."),
        namespaces,
        guid: ++guid
      };
      eventData.handleObjects.push(handleObject);
      const firstHandlerForTheType = 1 === eventData.handleObjects.length;
      let shouldAddNativeListener = firstHandlerForTheType && eventNameIsDefined;
      let nativeListenerOptions;
      if (shouldAddNativeListener) {
        shouldAddNativeListener = !special.callMethod(eventName, "setup", element, [data2, namespaces, handler]);
      }
      if (shouldAddNativeListener) {
        eventData.nativeHandler = getNativeHandler(eventName);
        if (passiveEventHandlersSupported() && forcePassiveFalseEventNames.includes(eventName)) {
          nativeListenerOptions = {
            passive: false
          };
        }
        eventData.removeListener = dom_adapter_default.listen(element, NATIVE_EVENTS_TO_SUBSCRIBE[eventName] || eventName, eventData.nativeHandler, nativeListenerOptions);
      }
      special.callMethod(eventName, "add", element, [handleObject]);
    },
    removeHandler(handler, selector) {
      const removeByEventName = function(eventName2) {
        const eventData2 = elementData[eventName2];
        if (!eventData2.handleObjects.length) {
          delete elementData[eventName2];
          return;
        }
        let removedHandler;
        eventData2.handleObjects = eventData2.handleObjects.filter((handleObject) => {
          const skip = namespaces.length && !isSubset(handleObject.namespaces, namespaces) || handler && handleObject.handler !== handler || selector && handleObject.selector !== selector;
          if (!skip) {
            removedHandler = handleObject.handler;
            special.callMethod(eventName2, "remove", element, [handleObject]);
          }
          return skip;
        });
        const lastHandlerForTheType = !eventData2.handleObjects.length;
        const shouldRemoveNativeListener = lastHandlerForTheType && eventName2 !== EMPTY_EVENT_NAME;
        if (shouldRemoveNativeListener) {
          special.callMethod(eventName2, "teardown", element, [namespaces, removedHandler]);
          if (eventData2.nativeHandler) {
            eventData2.removeListener();
          }
          delete elementData[eventName2];
        }
      };
      if (eventNameIsDefined) {
        removeByEventName(eventName);
      } else {
        for (const name in elementData) {
          removeByEventName(name);
        }
      }
      const elementDataIsEmpty = 0 === Object.keys(elementData).length;
      if (elementDataIsEmpty) {
        elementDataMap.delete(element);
      }
    },
    callHandlers(event, extraParameters) {
      let forceStop = false;
      const handleCallback = function(handleObject) {
        if (forceStop) {
          return;
        }
        if (!namespaces.length || isSubset(handleObject.namespaces, namespaces)) {
          handleObject.wrappedHandler(event, extraParameters);
          forceStop = event.isImmediatePropagationStopped();
        }
      };
      eventData.handleObjects.forEach(handleCallback);
      if (namespaces.length && elementData[EMPTY_EVENT_NAME]) {
        elementData[EMPTY_EVENT_NAME].handleObjects.forEach(handleCallback);
      }
    }
  };
}
function getNativeHandler(subscribeName) {
  return function(event, extraParameters) {
    const handlersController = getHandlersController(this, subscribeName);
    event = eventsEngine.Event(event);
    handlersController.callHandlers(event, extraParameters);
  };
}
function isSubset(original, checked) {
  for (let i = 0; i < checked.length; i++) {
    if (original.indexOf(checked[i]) < 0) {
      return false;
    }
  }
  return true;
}
function normalizeOnArguments(callback) {
  return function(element, eventName, selector, data2, handler) {
    if (!handler) {
      handler = data2;
      data2 = void 0;
    }
    if ("string" !== typeof selector) {
      data2 = selector;
      selector = void 0;
    }
    if (!handler && "string" === typeof eventName) {
      handler = data2 || selector;
      selector = void 0;
      data2 = void 0;
    }
    callback(element, eventName, selector, data2, handler);
  };
}
function normalizeOffArguments(callback) {
  return function(element, eventName, selector, handler) {
    if ("function" === typeof selector) {
      handler = selector;
      selector = void 0;
    }
    callback(element, eventName, selector, handler);
  };
}
function normalizeTriggerArguments(callback) {
  return function(element, src, extraParameters) {
    if ("string" === typeof src) {
      src = {
        type: src
      };
    }
    if (!src.target) {
      src.target = element;
    }
    src.currentTarget = element;
    if (!src.delegateTarget) {
      src.delegateTarget = element;
    }
    if (!src.type && src.originalEvent) {
      src.type = src.originalEvent.type;
    }
    callback(element, src instanceof eventsEngine.Event ? src : eventsEngine.Event(src), extraParameters);
  };
}
function normalizeEventArguments(callback) {
  eventsEngine.Event = function(src, config2) {
    if (!(this instanceof eventsEngine.Event)) {
      return new eventsEngine.Event(src, config2);
    }
    if (!src) {
      src = {};
    }
    if ("string" === typeof src) {
      src = {
        type: src
      };
    }
    if (!config2) {
      config2 = {};
    }
    callback.call(this, src, config2);
  };
  Object.assign(eventsEngine.Event.prototype, {
    _propagationStopped: false,
    _immediatePropagationStopped: false,
    _defaultPrevented: false,
    isPropagationStopped() {
      return !!(this._propagationStopped || this.originalEvent && this.originalEvent.propagationStopped);
    },
    stopPropagation() {
      this._propagationStopped = true;
      this.originalEvent && this.originalEvent.stopPropagation();
    },
    isImmediatePropagationStopped() {
      return this._immediatePropagationStopped;
    },
    stopImmediatePropagation() {
      this.stopPropagation();
      this._immediatePropagationStopped = true;
      this.originalEvent && this.originalEvent.stopImmediatePropagation();
    },
    isDefaultPrevented() {
      return !!(this._defaultPrevented || this.originalEvent && this.originalEvent.defaultPrevented);
    },
    preventDefault() {
      this._defaultPrevented = true;
      this.originalEvent && this.originalEvent.preventDefault();
    }
  });
  return eventsEngine.Event;
}
function iterate(callback) {
  const iterateEventNames = function(element, eventName) {
    if (eventName && eventName.indexOf(" ") > -1) {
      const args = Array.prototype.slice.call(arguments, 0);
      eventName.split(" ").forEach(function(eventName2) {
        args[1] = eventName2;
        callback.apply(this, args);
      });
    } else {
      callback.apply(this, arguments);
    }
  };
  return function(element, eventName) {
    if ("object" === typeof eventName) {
      const args = Array.prototype.slice.call(arguments, 0);
      for (const name in eventName) {
        args[1] = name;
        args[args.length - 1] = eventName[name];
        iterateEventNames.apply(this, args);
      }
    } else {
      iterateEventNames.apply(this, arguments);
    }
  };
}
function callNativeMethod(eventName, element) {
  const nativeMethodName = NATIVE_EVENTS_TO_TRIGGER[eventName] || eventName;
  if (function(eventName2, element2) {
    return "click" === eventName2 && "a" === element2.localName;
  }(eventName, element)) {
    return;
  }
  if (isFunction(element[nativeMethodName])) {
    skipEvent = eventName;
    element[nativeMethodName]();
    skipEvent = void 0;
  }
}
function calculateWhich(event) {
  if (function(event2) {
    return null == event2.which && 0 === event2.type.indexOf("key");
  }(event)) {
    return null != event.charCode ? event.charCode : event.keyCode;
  }
  if (function(event2) {
    return !event2.which && void 0 !== event2.button && /^(?:mouse|pointer|contextmenu|drag|drop)|click/.test(event2.type);
  }(event)) {
    const whichByButton = {
      1: 1,
      2: 3,
      3: 1,
      4: 2
    };
    return whichByButton[event.button];
  }
  return event.which;
}
function initEvent(EventClass) {
  if (EventClass) {
    eventsEngine.Event = EventClass;
    eventsEngine.Event.prototype = EventClass.prototype;
  }
}
initEvent(normalizeEventArguments(function(src, config2) {
  var _src$view;
  const srcIsEvent = src instanceof eventsEngine.Event || hasWindow() && src instanceof window2.Event || (null === (_src$view = src.view) || void 0 === _src$view ? void 0 : _src$view.Event) && src instanceof src.view.Event;
  if (srcIsEvent) {
    this.originalEvent = src;
    this.type = src.type;
    this.currentTarget = void 0;
    if (Object.prototype.hasOwnProperty.call(src, "isTrusted")) {
      this.isTrusted = src.isTrusted;
    }
    this.timeStamp = src.timeStamp || Date.now();
  } else {
    Object.assign(this, src);
  }
  addProperty("which", calculateWhich, this);
  if (0 === src.type.indexOf("touch")) {
    delete config2.pageX;
    delete config2.pageY;
  }
  Object.assign(this, config2);
  this.guid = ++guid;
}));
function addProperty(propName, hook, eventInstance) {
  Object.defineProperty(eventInstance || eventsEngine.Event.prototype, propName, {
    enumerable: true,
    configurable: true,
    get() {
      return this.originalEvent && hook(this.originalEvent);
    },
    set(value) {
      Object.defineProperty(this, propName, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
      });
    }
  });
}
EVENT_PROPERTIES.forEach((prop) => addProperty(prop, (event) => event[prop]));
m_hook_touch_props_default(addProperty);
var beforeSetStrategy = callbacks_default();
var afterSetStrategy = callbacks_default();
eventsEngine.set = function(engine) {
  beforeSetStrategy.fire();
  eventsEngine.inject(engine);
  initEvent(engine.Event);
  afterSetStrategy.fire();
};
eventsEngine.subscribeGlobal = function() {
  applyForEach(arguments, normalizeOnArguments(function() {
    const args = arguments;
    eventsEngine.on.apply(this, args);
    beforeSetStrategy.add(function() {
      const offArgs = Array.prototype.slice.call(args, 0);
      offArgs.splice(3, 1);
      eventsEngine.off.apply(this, offArgs);
    });
    afterSetStrategy.add(function() {
      eventsEngine.on.apply(this, args);
    });
  }));
};
eventsEngine.forcePassiveFalseEventNames = forcePassiveFalseEventNames;
eventsEngine.passiveEventHandlersSupported = passiveEventHandlersSupported;
var m_events_engine_default = eventsEngine;

// node_modules/devextreme/esm/__internal/core/m_element_data.js
var dataMap = /* @__PURE__ */ new WeakMap();
var strategy;
var strategyChanging = new memorized_callbacks_default();
var beforeCleanDataFunc = function() {
};
var afterCleanDataFunc = function() {
};
var setDataStrategy = function(value) {
  strategyChanging.fire(value);
  strategy = value;
  const {
    cleanData: cleanData2
  } = strategy;
  strategy.cleanData = function(nodes) {
    beforeCleanDataFunc(nodes);
    const result = cleanData2.call(this, nodes);
    afterCleanDataFunc(nodes);
    return result;
  };
};
setDataStrategy({
  data: function() {
    const element = arguments.length <= 0 ? void 0 : arguments[0];
    const key = arguments.length <= 1 ? void 0 : arguments[1];
    const value = arguments.length <= 2 ? void 0 : arguments[2];
    if (!element) {
      return;
    }
    let elementData = dataMap.get(element);
    if (!elementData) {
      elementData = {};
      dataMap.set(element, elementData);
    }
    if (void 0 === key) {
      return elementData;
    }
    if (2 === arguments.length) {
      return elementData[key];
    }
    elementData[key] = value;
    return value;
  },
  removeData: function(element, key) {
    if (!element) {
      return;
    }
    if (void 0 === key) {
      dataMap.delete(element);
    } else {
      const elementData = dataMap.get(element);
      if (elementData) {
        delete elementData[key];
      }
    }
  },
  cleanData: function(elements) {
    for (let i = 0; i < elements.length; i++) {
      m_events_engine_default.off(elements[i]);
      dataMap.delete(elements[i]);
    }
  }
});
function data() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return strategy.data.apply(this, args);
}
function beforeCleanData(callback) {
  beforeCleanDataFunc = callback;
}
function removeData(element, key) {
  return strategy.removeData.call(this, element, key);
}
function cleanDataRecursive(element, cleanSelf) {
  if (!dom_adapter_default.isElementNode(element)) {
    return;
  }
  const childElements = element.getElementsByTagName("*");
  strategy.cleanData(childElements);
  if (cleanSelf) {
    strategy.cleanData([element]);
  }
}

// node_modules/devextreme/esm/__internal/core/utils/m_html_parser.js
var isTagName = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
var tagWrappers = {
  default: {
    tagsCount: 0,
    startTags: "",
    endTags: ""
  },
  thead: {
    tagsCount: 1,
    startTags: "<table>",
    endTags: "</table>"
  },
  td: {
    tagsCount: 3,
    startTags: "<table><tbody><tr>",
    endTags: "</tr></tbody></table>"
  },
  col: {
    tagsCount: 2,
    startTags: "<table><colgroup>",
    endTags: "</colgroup></table>"
  },
  tr: {
    tagsCount: 2,
    startTags: "<table><tbody>",
    endTags: "</tbody></table>"
  }
};
tagWrappers.tbody = tagWrappers.colgroup = tagWrappers.caption = tagWrappers.tfoot = tagWrappers.thead;
tagWrappers.th = tagWrappers.td;
var parseHTML = function(html) {
  if ("string" !== typeof html) {
    return null;
  }
  const fragment = dom_adapter_default.createDocumentFragment();
  let container = fragment.appendChild(dom_adapter_default.createElement("div"));
  const tags = isTagName.exec(html);
  const firstRootTag = null === tags || void 0 === tags ? void 0 : tags[1].toLowerCase();
  const tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
  container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
  for (let i = 0; i < tagWrapper.tagsCount; i++) {
    container = container.lastChild;
  }
  return [...container.childNodes];
};
var isTablePart = function(html) {
  const tags = isTagName.exec(html);
  return tags && tags[1] in tagWrappers;
};

// node_modules/devextreme/esm/__internal/core/utils/m_size.js
var window3 = getWindow();
var SPECIAL_HEIGHT_VALUES = ["auto", "none", "inherit", "initial"];
var getSizeByStyles = function(elementStyles, styles) {
  let result = 0;
  styles.forEach(function(style) {
    result += parseFloat(elementStyles[style]) || 0;
  });
  return result;
};
var getElementBoxParams = function(name, elementStyles) {
  const beforeName = "width" === name ? "Left" : "Top";
  const afterName = "width" === name ? "Right" : "Bottom";
  return {
    padding: getSizeByStyles(elementStyles, [`padding${beforeName}`, `padding${afterName}`]),
    border: getSizeByStyles(elementStyles, [`border${beforeName}Width`, `border${afterName}Width`]),
    margin: getSizeByStyles(elementStyles, [`margin${beforeName}`, `margin${afterName}`])
  };
};
var getElementComputedStyle = function(element) {
  var _element$ownerDocumen;
  const view = (null === element || void 0 === element || null === (_element$ownerDocumen = element.ownerDocument) || void 0 === _element$ownerDocumen ? void 0 : _element$ownerDocumen.defaultView) || window3;
  return view.getComputedStyle && view.getComputedStyle(element);
};
var getCSSProperty = function(element, styles, name, defaultValue) {
  var _element$style;
  return (null === styles || void 0 === styles ? void 0 : styles[name]) || (null === (_element$style = element.style) || void 0 === _element$style ? void 0 : _element$style[name]) || defaultValue;
};
var boxIndices = {
  content: 0,
  padding: 1,
  border: 2,
  margin: 3,
  "content-box": 0,
  "border-box": 2
};
var dimensionComponents = {
  width: ["left", "right"],
  height: ["top", "bottom"]
};
function getComponentThickness(elem, dimension, component, styles) {
  const get = (elem2, styles2, field) => parseFloat(getCSSProperty(elem2, styles2, field, "0")) || 0;
  const suffix = "border" === component ? "-width" : "";
  return get(elem, styles, `${component}-${dimensionComponents[dimension][0]}${suffix}`) + get(elem, styles, `${component}-${dimensionComponents[dimension][1]}${suffix}`);
}
var getSize = function(element, dimension, box) {
  const offsetFieldName = "width" === dimension ? "offsetWidth" : "offsetHeight";
  const styles = getElementComputedStyle(element);
  let result = getCSSProperty(element, styles, dimension);
  if ("" === result || "auto" === result) {
    result = element[offsetFieldName];
  }
  result = parseFloat(result) || 0;
  const currentBox = getCSSProperty(element, styles, "boxSizing", "content-box");
  const targetBox = box || currentBox;
  let targetBoxIndex = boxIndices[targetBox];
  let currentBoxIndex = boxIndices[currentBox];
  if (void 0 === targetBoxIndex || void 0 === currentBoxIndex) {
    throw new Error();
  }
  if (currentBoxIndex === targetBoxIndex) {
    return result;
  }
  const coeff = Math.sign(targetBoxIndex - currentBoxIndex);
  let padding = false;
  let border = false;
  let margin = false;
  let scrollThickness = false;
  if (1 === coeff) {
    targetBoxIndex += 1;
    currentBoxIndex += 1;
  }
  for (let boxPart = currentBoxIndex; boxPart !== targetBoxIndex; boxPart += coeff) {
    switch (boxPart) {
      case boxIndices.content:
        break;
      case boxIndices.padding:
        padding = coeff * getComponentThickness(element, dimension, "padding", styles);
        break;
      case boxIndices.border:
        border = coeff * getComponentThickness(element, dimension, "border", styles);
        break;
      case boxIndices.margin:
        margin = coeff * getComponentThickness(element, dimension, "margin", styles);
    }
  }
  if (padding || border) {
    const paddingAndBorder = (false === padding ? coeff * getComponentThickness(element, dimension, "padding", styles) : padding) + (false === border ? coeff * getComponentThickness(element, dimension, "border", styles) : border);
    scrollThickness = coeff * Math.max(0, Math.floor(element[offsetFieldName] - result - coeff * paddingAndBorder)) || 0;
  }
  return result + margin + padding + border + scrollThickness;
};
var getContainerHeight = function(container) {
  return isWindow(container) ? container.innerHeight : container.offsetHeight;
};
var parseHeight = function(value, container, element) {
  if (value.indexOf("px") > 0) {
    value = parseInt(value.replace("px", ""));
  } else if (value.indexOf("%") > 0) {
    value = parseInt(value.replace("%", "")) * getContainerHeight(container) / 100;
  } else if (!isNaN(value)) {
    value = parseInt(value);
  } else if (value.indexOf("vh") > 0) {
    value = window3.innerHeight / 100 * parseInt(value.replace("vh", ""));
  } else if (element && value.indexOf("em") > 0) {
    value = parseFloat(value.replace("em", "")) * parseFloat(window3.getComputedStyle(element).fontSize);
  }
  return value;
};
var getHeightWithOffset = function(value, offset, container) {
  if (!value) {
    return null;
  }
  if (SPECIAL_HEIGHT_VALUES.includes(value)) {
    return offset ? null : value;
  }
  if (isString(value)) {
    value = parseHeight(value, container);
  }
  if (isNumeric(value)) {
    return Math.max(0, value + offset);
  }
  const operationString = offset < 0 ? " - " : " ";
  return `calc(${value}${operationString}${Math.abs(offset)}px)`;
};
var addOffsetToMaxHeight = function(value, offset, container) {
  const maxHeight = getHeightWithOffset(value, offset, container);
  return null !== maxHeight ? maxHeight : "none";
};
var addOffsetToMinHeight = function(value, offset, container) {
  const minHeight = getHeightWithOffset(value, offset, container);
  return null !== minHeight ? minHeight : 0;
};
var getVerticalOffsets = function(element, withMargins) {
  if (!element) {
    return 0;
  }
  const boxParams = getElementBoxParams("height", window3.getComputedStyle(element));
  return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0);
};
var getVisibleHeight = function(element) {
  if (element) {
    var _element$getBoundingC;
    const boundingClientRect = null === (_element$getBoundingC = element.getBoundingClientRect) || void 0 === _element$getBoundingC ? void 0 : _element$getBoundingC.call(element);
    if (null !== boundingClientRect && void 0 !== boundingClientRect && boundingClientRect.height) {
      return boundingClientRect.height;
    }
  }
  return 0;
};
var implementationsMap = {
  getWidth: function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return elementSizeHelper("width", ...args);
  },
  setWidth: function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return elementSizeHelper("width", ...args);
  },
  getHeight: function() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return elementSizeHelper("height", ...args);
  },
  setHeight: function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return elementSizeHelper("height", ...args);
  },
  getOuterWidth: function() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return elementSizeHelper("outerWidth", ...args);
  },
  setOuterWidth: function() {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return elementSizeHelper("outerWidth", ...args);
  },
  getOuterHeight: function() {
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    return elementSizeHelper("outerHeight", ...args);
  },
  setOuterHeight: function() {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    return elementSizeHelper("outerHeight", ...args);
  },
  getInnerWidth: function() {
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    return elementSizeHelper("innerWidth", ...args);
  },
  setInnerWidth: function() {
    for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }
    return elementSizeHelper("innerWidth", ...args);
  },
  getInnerHeight: function() {
    for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }
    return elementSizeHelper("innerHeight", ...args);
  },
  setInnerHeight: function() {
    for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      args[_key12] = arguments[_key12];
    }
    return elementSizeHelper("innerHeight", ...args);
  }
};
function elementSizeHelper(sizeProperty, el, value) {
  return 2 === arguments.length ? elementSize(el, sizeProperty) : elementSize(el, sizeProperty, value);
}
var getWidth = (el) => implementationsMap.getWidth(el);
var setWidth = (el, value) => implementationsMap.setWidth(el, value);
var getHeight = (el) => implementationsMap.getHeight(el);
var setHeight = (el, value) => implementationsMap.setHeight(el, value);
var getOuterWidth = (el, includeMargin) => implementationsMap.getOuterWidth(el, includeMargin || false);
var setOuterWidth = (el, value) => implementationsMap.setOuterWidth(el, value);
var getOuterHeight = (el, includeMargin) => implementationsMap.getOuterHeight(el, includeMargin || false);
var setOuterHeight = (el, value) => implementationsMap.setOuterHeight(el, value);
var getInnerWidth = (el) => implementationsMap.getInnerWidth(el);
var getInnerHeight = (el) => implementationsMap.getInnerHeight(el);
var elementSize = function(el, sizeProperty, value) {
  const partialName = sizeProperty.toLowerCase().indexOf("width") >= 0 ? "Width" : "Height";
  const propName = partialName.toLowerCase();
  const isOuter = 0 === sizeProperty.indexOf("outer");
  const isInner = 0 === sizeProperty.indexOf("inner");
  const isGetter = 2 === arguments.length || "boolean" === typeof value;
  if (isRenderer(el)) {
    if (el.length > 1 && !isGetter) {
      for (let i = 0; i < el.length; i++) {
        elementSize(el[i], sizeProperty, value);
      }
      return;
    }
    el = el[0];
  }
  if (!el) {
    return;
  }
  if (isWindow(el)) {
    return isOuter ? el[`inner${partialName}`] : dom_adapter_default.getDocumentElement()[`client${partialName}`];
  }
  if (dom_adapter_default.isDocument(el)) {
    const documentElement = dom_adapter_default.getDocumentElement();
    const body = dom_adapter_default.getBody();
    return Math.max(body[`scroll${partialName}`], body[`offset${partialName}`], documentElement[`scroll${partialName}`], documentElement[`offset${partialName}`], documentElement[`client${partialName}`]);
  }
  if (isGetter) {
    let box = "content";
    if (isOuter) {
      box = value ? "margin" : "border";
    }
    if (isInner) {
      box = "padding";
    }
    return getSize(el, propName, box);
  }
  if (isNumeric(value)) {
    const elementStyles = getElementComputedStyle(el);
    const sizeAdjustment = getElementBoxParams(propName, elementStyles);
    const isBorderBox = "border-box" === elementStyles.boxSizing;
    value = Number(value);
    if (isOuter) {
      value -= isBorderBox ? 0 : sizeAdjustment.border + sizeAdjustment.padding;
    } else if (isInner) {
      value += isBorderBox ? sizeAdjustment.border : -sizeAdjustment.padding;
    } else if (isBorderBox) {
      value += sizeAdjustment.border + sizeAdjustment.padding;
    }
  }
  value += isNumeric(value) ? "px" : "";
  dom_adapter_default.setStyle(el, propName, value);
  return null;
};
var getWindowByElement = (el) => isWindow(el) ? el : el.defaultView;
var getOffset = (el) => {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }
  const rect = el.getBoundingClientRect();
  const win = getWindowByElement(el.ownerDocument);
  const docElem = el.ownerDocument.documentElement;
  return {
    top: rect.top + win.pageYOffset - docElem.clientTop,
    left: rect.left + win.pageXOffset - docElem.clientLeft
  };
};

// node_modules/devextreme/esm/__internal/core/utils/m_inflector.js
var _normalize = function(text) {
  if (void 0 === text || null === text) {
    return "";
  }
  return String(text);
};
var _upperCaseFirst = function(text) {
  return _normalize(text).charAt(0).toUpperCase() + text.substr(1);
};
var _chop = function(text) {
  return _normalize(text).replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[\s_-]+/);
};
var dasherize = function(text) {
  return map(_chop(text), function(p) {
    return p.toLowerCase();
  }).join("-");
};
var underscore = function(text) {
  return dasherize(text).replace(/-/g, "_");
};
var camelize = function(text, upperFirst) {
  return map(_chop(text), function(p, i) {
    p = p.toLowerCase();
    if (upperFirst || i > 0) {
      p = _upperCaseFirst(p);
    }
    return p;
  }).join("");
};
var humanize = function(text) {
  return _upperCaseFirst(dasherize(text).replace(/-/g, " "));
};
var titleize = function(text) {
  return map(_chop(text), function(p) {
    return _upperCaseFirst(p.toLowerCase());
  }).join(" ");
};
var DIGIT_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var captionize = function(name) {
  const captionList = [];
  let i;
  let char;
  let isPrevCharNewWord = false;
  let isNewWord = false;
  for (i = 0; i < name.length; i++) {
    char = name.charAt(i);
    isNewWord = char === char.toUpperCase() && "-" !== char && ")" !== char && "/" !== char || char in DIGIT_CHARS;
    if ("_" === char || "." === char) {
      char = " ";
      isNewWord = true;
    } else if (0 === i) {
      char = char.toUpperCase();
      isNewWord = true;
    } else if (!isPrevCharNewWord && isNewWord) {
      if (captionList.length > 0) {
        captionList.push(" ");
      }
    }
    captionList.push(char);
    isPrevCharNewWord = isNewWord;
  }
  return captionList.join("");
};
var m_inflector_default = {
  dasherize,
  underscore,
  camelize,
  humanize,
  titleize,
  captionize
};

// node_modules/devextreme/esm/__internal/core/utils/m_style.js
var jsPrefixes = ["", "Webkit", "Moz", "O", "Ms"];
var cssPrefixes = {
  "": "",
  Webkit: "-webkit-",
  Moz: "-moz-",
  O: "-o-",
  ms: "-ms-"
};
var getStyles = call_once_default(function() {
  return dom_adapter_default.createElement("dx").style;
});
var forEachPrefixes = function(prop, callBack) {
  prop = camelize(prop, true);
  let result;
  for (let i = 0, cssPrefixesCount = jsPrefixes.length; i < cssPrefixesCount; i++) {
    const jsPrefix = jsPrefixes[i];
    const prefixedProp = jsPrefix + prop;
    const lowerPrefixedProp = camelize(prefixedProp);
    result = callBack(lowerPrefixedProp, jsPrefix);
    if (void 0 === result) {
      result = callBack(prefixedProp, jsPrefix);
    }
    if (void 0 !== result) {
      break;
    }
  }
  return result || "";
};
var styleProp = function(name) {
  if (name in getStyles()) {
    return name;
  }
  const originalName = name;
  name = name.charAt(0).toUpperCase() + name.substr(1);
  for (let i = 1; i < jsPrefixes.length; i++) {
    const prefixedProp = jsPrefixes[i].toLowerCase() + name;
    if (prefixedProp in getStyles()) {
      return prefixedProp;
    }
  }
  return originalName;
};
var stylePropPrefix = function(prop) {
  return forEachPrefixes(prop, function(specific, jsPrefix) {
    if (specific in getStyles()) {
      return cssPrefixes[jsPrefix];
    }
  });
};
var pxExceptions = ["fillOpacity", "columnCount", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "zIndex", "zoom"];
var normalizeStyleProp = function(prop, value) {
  if (isNumeric(value) && !pxExceptions.includes(prop)) {
    value += "px";
  }
  return value;
};
var setDimensionProperty = function(elements, propertyName, value) {
  if (elements) {
    value = isNumeric(value) ? value += "px" : value;
    for (let i = 0; i < elements.length; ++i) {
      elements[i].style[propertyName] = value;
    }
  }
};
var setWidth2 = function(elements, value) {
  setDimensionProperty(elements, "width", value);
};
var setHeight2 = function(elements, value) {
  setDimensionProperty(elements, "height", value);
};
var setStyle = function(element, styleString) {
  let resetStyle = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : true;
  if (resetStyle) {
    const styleList = [].slice.call(element.style);
    styleList.forEach((propertyName) => {
      element.style.removeProperty(propertyName);
    });
  }
  styleString.split(";").forEach((style) => {
    const parts = style.split(":").map((stylePart) => stylePart.trim());
    if (2 === parts.length) {
      const [property, value] = parts;
      element.style[property] = value;
    }
  });
};

// node_modules/devextreme/esm/__internal/core/m_renderer_base.js
var window4 = getWindow();
var renderer;
var initRender = function(selector, context) {
  if (!selector) {
    this.length = 0;
    return this;
  }
  if ("string" === typeof selector) {
    if ("body" === selector) {
      this[0] = context ? context.body : dom_adapter_default.getBody();
      this.length = 1;
      return this;
    }
    context = context || dom_adapter_default.getDocument();
    if (selector.startsWith("<")) {
      this[0] = dom_adapter_default.createElement(selector.slice(1, -1), context);
      this.length = 1;
      return this;
    }
    [].push.apply(this, dom_adapter_default.querySelectorAll(context, selector));
    return this;
  }
  if (dom_adapter_default.isNode(selector) || isWindow(selector)) {
    this[0] = selector;
    this.length = 1;
    return this;
  }
  if (Array.isArray(selector)) {
    [].push.apply(this, selector);
    return this;
  }
  return renderer(selector.toArray ? selector.toArray() : [selector]);
};
renderer = function(selector, context) {
  return new initRender(selector, context);
};
renderer.fn = {
  dxRenderer: true
};
initRender.prototype = renderer.fn;
var repeatMethod = function(methodName, args) {
  for (let i = 0; i < this.length; i++) {
    const item = renderer(this[i]);
    item[methodName].apply(item, args);
  }
  return this;
};
var setAttributeValue = function(element, attrName, value) {
  if (void 0 !== value && null !== value && false !== value) {
    dom_adapter_default.setAttribute(element, attrName, value);
  } else {
    dom_adapter_default.removeAttribute(element, attrName);
  }
};
initRender.prototype.show = function() {
  return this.toggle(true);
};
initRender.prototype.hide = function() {
  return this.toggle(false);
};
initRender.prototype.toggle = function(value) {
  if (this[0]) {
    this.toggleClass("dx-state-invisible", !value);
  }
  return this;
};
initRender.prototype.attr = function(attrName, value) {
  if (this.length > 1 && arguments.length > 1) {
    return repeatMethod.call(this, "attr", arguments);
  }
  if (!this[0]) {
    if (isObject(attrName) || void 0 !== value) {
      return this;
    }
    return;
  }
  if (!this[0].getAttribute) {
    return this.prop(attrName, value);
  }
  if ("string" === typeof attrName && 1 === arguments.length) {
    const result = this[0].getAttribute(attrName);
    return null == result ? void 0 : result;
  }
  if (isPlainObject(attrName)) {
    for (const key in attrName) {
      this.attr(key, attrName[key]);
    }
  } else {
    setAttributeValue(this[0], attrName, value);
  }
  return this;
};
initRender.prototype.removeAttr = function(attrName) {
  this[0] && dom_adapter_default.removeAttribute(this[0], attrName);
  return this;
};
initRender.prototype.prop = function(propName, value) {
  if (!this[0]) {
    return this;
  }
  if ("string" === typeof propName && 1 === arguments.length) {
    return this[0][propName];
  }
  if (isPlainObject(propName)) {
    for (const key in propName) {
      this.prop(key, propName[key]);
    }
  } else {
    dom_adapter_default.setProperty(this[0], propName, value);
  }
  return this;
};
initRender.prototype.addClass = function(className) {
  return this.toggleClass(className, true);
};
initRender.prototype.removeClass = function(className) {
  return this.toggleClass(className, false);
};
initRender.prototype.hasClass = function(className) {
  if (!this[0] || void 0 === this[0].className) {
    return false;
  }
  const classNames = className.split(" ");
  for (let i = 0; i < classNames.length; i++) {
    if (this[0].classList) {
      if (this[0].classList.contains(classNames[i])) {
        return true;
      }
    } else {
      const className2 = isString(this[0].className) ? this[0].className : dom_adapter_default.getAttribute(this[0], "class");
      if ((className2 || "").split(" ").indexOf(classNames[i]) >= 0) {
        return true;
      }
    }
  }
  return false;
};
initRender.prototype.toggleClass = function(className, value) {
  if (this.length > 1) {
    return repeatMethod.call(this, "toggleClass", arguments);
  }
  if (!this[0] || !className) {
    return this;
  }
  value = void 0 === value ? !this.hasClass(className) : value;
  const classNames = className.split(" ");
  for (let i = 0; i < classNames.length; i++) {
    dom_adapter_default.setClass(this[0], classNames[i], value);
  }
  return this;
};
initRender.prototype.html = function(value) {
  if (!arguments.length) {
    return this[0].innerHTML;
  }
  this.empty();
  if ("string" === typeof value && !isTablePart(value) || "number" === typeof value) {
    this[0].innerHTML = value;
    return this;
  }
  return this.append(parseHTML(value));
};
var appendElements = function(element, nextSibling) {
  if (!this[0] || !element) {
    return;
  }
  if ("string" === typeof element) {
    element = parseHTML(element);
  } else if (element.nodeType) {
    element = [element];
  } else if (isNumeric(element)) {
    element = [dom_adapter_default.createTextNode(element)];
  }
  for (let i = 0; i < element.length; i++) {
    const item = element[i];
    let container = this[0];
    const wrapTR = "TABLE" === container.tagName && "TR" === item.tagName;
    if (wrapTR && container.tBodies && container.tBodies.length) {
      container = container.tBodies[0];
    }
    dom_adapter_default.insertElement(container, item.nodeType ? item : item[0], nextSibling);
  }
};
var setCss = function(name, value) {
  if (!this[0] || !this[0].style) {
    return;
  }
  if (null === value || "number" === typeof value && isNaN(value)) {
    return;
  }
  name = styleProp(name);
  for (let i = 0; i < this.length; i++) {
    this[i].style[name] = normalizeStyleProp(name, value);
  }
};
initRender.prototype.css = function(name, value) {
  if (isString(name)) {
    if (2 === arguments.length) {
      setCss.call(this, name, value);
    } else {
      if (!this[0]) {
        return;
      }
      name = styleProp(name);
      const result = window4.getComputedStyle(this[0])[name] || this[0].style[name];
      return isNumeric(result) ? result.toString() : result;
    }
  } else if (isPlainObject(name)) {
    for (const key in name) {
      setCss.call(this, key, name[key]);
    }
  }
  return this;
};
initRender.prototype.prepend = function(element) {
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.prepend(arguments[i]);
    }
    return this;
  }
  appendElements.apply(this, [element, this[0].firstChild]);
  return this;
};
initRender.prototype.append = function(element) {
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.append(arguments[i]);
    }
    return this;
  }
  appendElements.apply(this, [element]);
  return this;
};
initRender.prototype.prependTo = function(element) {
  if (this.length > 1) {
    for (let i = this.length - 1; i >= 0; i--) {
      renderer(this[i]).prependTo(element);
    }
    return this;
  }
  element = renderer(element);
  if (element[0]) {
    dom_adapter_default.insertElement(element[0], this[0], element[0].firstChild);
  }
  return this;
};
initRender.prototype.appendTo = function(element) {
  if (this.length > 1) {
    return repeatMethod.call(this, "appendTo", arguments);
  }
  dom_adapter_default.insertElement(renderer(element)[0], this[0]);
  return this;
};
initRender.prototype.insertBefore = function(element) {
  if (element && element[0]) {
    dom_adapter_default.insertElement(element[0].parentNode, this[0], element[0]);
  }
  return this;
};
initRender.prototype.insertAfter = function(element) {
  if (element && element[0]) {
    dom_adapter_default.insertElement(element[0].parentNode, this[0], element[0].nextSibling);
  }
  return this;
};
initRender.prototype.before = function(element) {
  if (this[0]) {
    dom_adapter_default.insertElement(this[0].parentNode, element[0], this[0]);
  }
  return this;
};
initRender.prototype.after = function(element) {
  if (this[0]) {
    dom_adapter_default.insertElement(this[0].parentNode, element[0], this[0].nextSibling);
  }
  return this;
};
initRender.prototype.wrap = function(wrapper) {
  if (this[0]) {
    const wrap = renderer(wrapper);
    wrap.insertBefore(this);
    wrap.append(this);
  }
  return this;
};
initRender.prototype.wrapInner = function(wrapper) {
  const contents = this.contents();
  if (contents.length) {
    contents.wrap(wrapper);
  } else {
    this.append(wrapper);
  }
  return this;
};
initRender.prototype.replaceWith = function(element) {
  if (!(element && element[0])) {
    return;
  }
  if (element.is(this)) {
    return this;
  }
  element.insertBefore(this);
  this.remove();
  return element;
};
initRender.prototype.remove = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "remove", arguments);
  }
  cleanDataRecursive(this[0], true);
  dom_adapter_default.removeElement(this[0]);
  return this;
};
initRender.prototype.detach = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "detach", arguments);
  }
  dom_adapter_default.removeElement(this[0]);
  return this;
};
initRender.prototype.empty = function() {
  if (this.length > 1) {
    return repeatMethod.call(this, "empty", arguments);
  }
  cleanDataRecursive(this[0]);
  dom_adapter_default.setText(this[0], "");
  return this;
};
initRender.prototype.clone = function() {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(this[i].cloneNode(true));
  }
  return renderer(result);
};
initRender.prototype.text = function(value) {
  if (!arguments.length) {
    let result = "";
    for (let i = 0; i < this.length; i++) {
      result += this[i] && this[i].textContent || "";
    }
    return result;
  }
  const text = isFunction(value) ? value() : value;
  cleanDataRecursive(this[0], false);
  dom_adapter_default.setText(this[0], isDefined(text) ? text : "");
  return this;
};
initRender.prototype.val = function(value) {
  if (1 === arguments.length) {
    return this.prop("value", isDefined(value) ? value : "");
  }
  return this.prop("value");
};
initRender.prototype.contents = function() {
  if (!this[0]) {
    return renderer();
  }
  const result = [];
  result.push.apply(result, this[0].childNodes);
  return renderer(result);
};
initRender.prototype.find = function(selector) {
  const result = renderer();
  if (!selector) {
    return result;
  }
  const nodes = [];
  let i;
  if ("string" === typeof selector) {
    selector = selector.trim();
    for (i = 0; i < this.length; i++) {
      const element = this[i];
      if (dom_adapter_default.isElementNode(element)) {
        const elementId = element.getAttribute("id");
        let queryId = elementId || "dx-query-children";
        if (!elementId) {
          setAttributeValue(element, "id", queryId);
        }
        queryId = `[id='${queryId}'] `;
        const querySelector = queryId + selector.replace(/([^\\])(,)/g, `$1, ${queryId}`);
        nodes.push.apply(nodes, dom_adapter_default.querySelectorAll(element, querySelector));
        setAttributeValue(element, "id", elementId);
      } else if (dom_adapter_default.isDocument(element) || dom_adapter_default.isDocumentFragment(element)) {
        nodes.push.apply(nodes, dom_adapter_default.querySelectorAll(element, selector));
      }
    }
  } else {
    for (i = 0; i < this.length; i++) {
      selector = dom_adapter_default.isNode(selector) ? selector : selector[0];
      if (this[i] !== selector && this[i].contains(selector)) {
        nodes.push(selector);
      }
    }
  }
  return result.add(nodes);
};
var isVisible = function(_, element) {
  var _element$getClientRec, _element;
  element = element.host ?? element;
  if (!element.nodeType) {
    return true;
  }
  return !!(element.offsetWidth || element.offsetHeight || null !== (_element$getClientRec = (_element = element).getClientRects) && void 0 !== _element$getClientRec && _element$getClientRec.call(_element).length);
};
initRender.prototype.filter = function(selector) {
  if (!selector) {
    return renderer();
  }
  if (":visible" === selector) {
    return this.filter(isVisible);
  }
  if (":hidden" === selector) {
    return this.filter(function(_, element) {
      return !isVisible(0, element);
    });
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    const item = this[i];
    if (dom_adapter_default.isElementNode(item) && "string" === type(selector)) {
      dom_adapter_default.elementMatches(item, selector) && result.push(item);
    } else if (dom_adapter_default.isNode(selector) || isWindow(selector)) {
      selector === item && result.push(item);
    } else if (isFunction(selector)) {
      selector.call(item, i, item) && result.push(item);
    } else {
      for (let j = 0; j < selector.length; j++) {
        selector[j] === item && result.push(item);
      }
    }
  }
  return renderer(result);
};
initRender.prototype.not = function(selector) {
  const result = [];
  const nodes = this.filter(selector).toArray();
  for (let i = 0; i < this.length; i++) {
    if (-1 === nodes.indexOf(this[i])) {
      result.push(this[i]);
    }
  }
  return renderer(result);
};
initRender.prototype.is = function(selector) {
  return !!this.filter(selector).length;
};
initRender.prototype.children = function(selector) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    const nodes = this[i] ? this[i].childNodes : [];
    for (let j = 0; j < nodes.length; j++) {
      if (dom_adapter_default.isElementNode(nodes[j])) {
        result.push(nodes[j]);
      }
    }
  }
  result = renderer(result);
  return selector ? result.filter(selector) : result;
};
initRender.prototype.siblings = function() {
  const element = this[0];
  if (!element || !element.parentNode) {
    return renderer();
  }
  const result = [];
  const parentChildNodes = element.parentNode.childNodes || [];
  for (let i = 0; i < parentChildNodes.length; i++) {
    const node = parentChildNodes[i];
    if (dom_adapter_default.isElementNode(node) && node !== element) {
      result.push(node);
    }
  }
  return renderer(result);
};
initRender.prototype.each = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (false === callback.call(this[i], i, this[i])) {
      break;
    }
  }
};
initRender.prototype.index = function(element) {
  if (!element) {
    return this.parent().children().index(this);
  }
  element = renderer(element);
  return this.toArray().indexOf(element[0]);
};
initRender.prototype.get = function(index) {
  return this[index < 0 ? this.length + index : index];
};
initRender.prototype.eq = function(index) {
  index = index < 0 ? this.length + index : index;
  return renderer(this[index]);
};
initRender.prototype.first = function() {
  return this.eq(0);
};
initRender.prototype.last = function() {
  return this.eq(-1);
};
initRender.prototype.select = function() {
  for (let i = 0; i < this.length; i += 1) {
    this[i].select && this[i].select();
  }
  return this;
};
initRender.prototype.parent = function(selector) {
  if (!this[0]) {
    return renderer();
  }
  const result = renderer(this[0].parentNode);
  return !selector || result.is(selector) ? result : renderer();
};
initRender.prototype.parents = function(selector) {
  const result = [];
  let parent = this.parent();
  while (parent && parent[0] && !dom_adapter_default.isDocument(parent[0])) {
    if (dom_adapter_default.isElementNode(parent[0])) {
      if (!selector || parent.is(selector)) {
        result.push(parent.get(0));
      }
    }
    parent = parent.parent();
  }
  return renderer(result);
};
initRender.prototype.closest = function(selector) {
  if (this.is(selector)) {
    return this;
  }
  let parent = this.parent();
  while (parent && parent.length) {
    if (parent.is(selector)) {
      return parent;
    }
    parent = parent.parent();
  }
  return renderer();
};
initRender.prototype.next = function(selector) {
  if (!this[0]) {
    return renderer();
  }
  let next = renderer(this[0].nextSibling);
  if (!arguments.length) {
    return next;
  }
  while (next && next.length) {
    if (next.is(selector)) {
      return next;
    }
    next = next.next();
  }
  return renderer();
};
initRender.prototype.prev = function() {
  if (!this[0]) {
    return renderer();
  }
  return renderer(this[0].previousSibling);
};
initRender.prototype.add = function(selector) {
  const targets = renderer(selector);
  const result = this.toArray();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (-1 === result.indexOf(target)) {
      result.push(target);
    }
  }
  return renderer(result);
};
var emptyArray = [];
initRender.prototype.splice = function() {
  return renderer(emptyArray.splice.apply(this, arguments));
};
initRender.prototype.slice = function() {
  return renderer(emptyArray.slice.apply(this, arguments));
};
initRender.prototype.toArray = function() {
  return emptyArray.slice.call(this);
};
initRender.prototype.offset = function() {
  if (!this[0]) {
    return;
  }
  return getOffset(this[0]);
};
initRender.prototype.offsetParent = function() {
  if (!this[0]) {
    return renderer();
  }
  let offsetParent = renderer(this[0].offsetParent);
  while (offsetParent[0] && "static" === offsetParent.css("position")) {
    offsetParent = renderer(offsetParent[0].offsetParent);
  }
  offsetParent = offsetParent[0] ? offsetParent : renderer(dom_adapter_default.getDocumentElement());
  return offsetParent;
};
initRender.prototype.position = function() {
  if (!this[0]) {
    return;
  }
  let offset;
  const marginTop = parseFloat(this.css("marginTop"));
  const marginLeft = parseFloat(this.css("marginLeft"));
  if ("fixed" === this.css("position")) {
    offset = this[0].getBoundingClientRect();
    return {
      top: offset.top - marginTop,
      left: offset.left - marginLeft
    };
  }
  offset = this.offset();
  const offsetParent = this.offsetParent();
  let parentOffset = {
    top: 0,
    left: 0
  };
  if ("HTML" !== offsetParent[0].nodeName) {
    parentOffset = offsetParent.offset();
  }
  parentOffset = {
    top: parentOffset.top + parseFloat(offsetParent.css("borderTopWidth")),
    left: parentOffset.left + parseFloat(offsetParent.css("borderLeftWidth"))
  };
  return {
    top: offset.top - parentOffset.top - marginTop,
    left: offset.left - parentOffset.left - marginLeft
  };
};
[{
  name: "scrollLeft",
  offsetProp: "pageXOffset",
  scrollWindow: function(win, value) {
    win.scrollTo(value, win.pageYOffset);
  }
}, {
  name: "scrollTop",
  offsetProp: "pageYOffset",
  scrollWindow: function(win, value) {
    win.scrollTo(win.pageXOffset, value);
  }
}].forEach(function(directionStrategy) {
  const propName = directionStrategy.name;
  initRender.prototype[propName] = function(value) {
    if (!this[0]) {
      return;
    }
    const window8 = getWindowByElement(this[0]);
    if (void 0 === value) {
      return window8 ? window8[directionStrategy.offsetProp] : this[0][propName];
    }
    if (window8) {
      directionStrategy.scrollWindow(window8, value);
    } else {
      this[0][propName] = value;
    }
    return this;
  };
});
initRender.prototype.data = function(key, value) {
  if (!this[0]) {
    return;
  }
  if (arguments.length < 2) {
    return data.call(renderer, this[0], key);
  }
  data.call(renderer, this[0], key, value);
  return this;
};
initRender.prototype.removeData = function(key) {
  this[0] && removeData(this[0], key);
  return this;
};
var rendererWrapper = function() {
  return renderer.apply(this, arguments);
};
Object.defineProperty(rendererWrapper, "fn", {
  enumerable: true,
  configurable: true,
  get: function() {
    return renderer.fn;
  },
  set: function(value) {
    renderer.fn = value;
  }
});
var m_renderer_base_default = {
  set: function(strategy2) {
    renderer = strategy2;
  },
  get: function() {
    return rendererWrapper;
  }
};

// node_modules/devextreme/esm/__internal/core/m_renderer.js
var renderer2 = m_renderer_base_default.get();

// node_modules/devextreme/esm/core/renderer.js
var renderer_default = renderer2;

// node_modules/devextreme/esm/__internal/core/utils/m_ready_callbacks.js
var callbacks = [];
var subscribeReady = call_once_default(() => {
  const removeListener = dom_adapter_default.listen(dom_adapter_default.getDocument(), "DOMContentLoaded", () => {
    readyCallbacks.fire();
    removeListener();
  });
});
var readyCallbacks = {
  add: (callback) => {
    const windowExists = hasWindow();
    if (windowExists && "loading" !== dom_adapter_default.getReadyState()) {
      callback();
    } else {
      callbacks.push(callback);
      windowExists && subscribeReady();
    }
  },
  fire: () => {
    callbacks.forEach((callback) => callback());
    callbacks = [];
  }
};
var readyCallbacksModule = dependency_injector_default(readyCallbacks);
var m_ready_callbacks_default = readyCallbacksModule;

// node_modules/devextreme/esm/core/utils/ready_callbacks.js
var ready_callbacks_default = readyCallbacksModule;

// node_modules/devextreme/esm/__internal/core/m_http_request.js
var window5 = getWindow();
var nativeXMLHttpRequest = {
  getXhr: () => new window5.XMLHttpRequest()
};
var httpRequest = dependency_injector_default(nativeXMLHttpRequest);

// node_modules/devextreme/esm/core/http_request.js
var http_request_default = httpRequest;

// node_modules/devextreme/esm/__internal/core/utils/m_ajax_utils.js
var window6 = getWindow();
var createScript = function(options) {
  const script = dom_adapter_default.createElement("script");
  for (const name in options) {
    script[name] = options[name];
  }
  return script;
};
var appendToHead = function(element) {
  return dom_adapter_default.getHead().appendChild(element);
};
var removeScript = function(scriptNode) {
  scriptNode.parentNode.removeChild(scriptNode);
};
var evalScript = function(code) {
  const script = createScript({
    text: code
  });
  appendToHead(script);
  removeScript(script);
};
var evalCrossDomainScript = function(url) {
  const script = createScript({
    src: url
  });
  return new Promise((resolve, reject) => {
    const events = {
      load: resolve,
      error: reject
    };
    const loadHandler = function(e) {
      events[e.type]();
      removeScript(script);
    };
    for (const event in events) {
      dom_adapter_default.listen(script, event, loadHandler);
    }
    appendToHead(script);
  });
};
function getMethod(options) {
  return (options.method || "GET").toUpperCase();
}
var paramsConvert = function(params) {
  const result = [];
  for (const name in params) {
    let value = params[name];
    if (void 0 === value) {
      continue;
    }
    if (null === value) {
      value = "";
    }
    if ("function" === typeof value) {
      value = value();
    }
    result.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }
  return result.join("&");
};
var getContentTypeHeader = function(options) {
  let defaultContentType;
  if (options.data && !options.upload && "GET" !== getMethod(options)) {
    defaultContentType = "application/x-www-form-urlencoded;charset=utf-8";
  }
  return options.contentType || defaultContentType;
};
var getAcceptHeader = function(options) {
  const dataType = options.dataType || "*";
  const scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
  const accepts = {
    "*": "*/*",
    text: "text/plain",
    html: "text/html",
    xml: "application/xml, text/xml",
    json: "application/json, text/javascript",
    jsonp: scriptAccept,
    script: scriptAccept
  };
  extendFromObject(accepts, options.accepts, true);
  return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"];
};
var getRequestHeaders = function(options) {
  const headers = options.headers || {};
  headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
  headers.Accept = headers.Accept || getAcceptHeader(options);
  if (!options.crossDomain && !headers["X-Requested-With"]) {
    headers["X-Requested-With"] = "XMLHttpRequest";
  }
  return headers;
};
var getJsonpOptions = function(options) {
  if ("jsonp" === options.dataType) {
    const random = Math.random().toString().replace(/\D/g, "");
    const callbackName = options.jsonpCallback || `dxCallback${Date.now()}_${random}`;
    const callbackParameter = options.jsonp || "callback";
    options.data = options.data || {};
    options.data[callbackParameter] = callbackName;
    return callbackName;
  }
};
var getRequestOptions = function(options, headers) {
  let params = options.data;
  const paramsAlreadyString = "string" === typeof params;
  let url = options.url || window6.location.href;
  if (!paramsAlreadyString && !options.cache) {
    params = params || {};
    params._ = Date.now();
  }
  if (params && !options.upload) {
    if (!paramsAlreadyString) {
      params = paramsConvert(params);
    }
    if ("GET" === getMethod(options)) {
      if ("" !== params) {
        url += (url.indexOf("?") > -1 ? "&" : "?") + params;
      }
      params = null;
    } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
      params = params.replace(/%20/g, "+");
    }
  }
  return {
    url,
    parameters: params
  };
};
var isCrossDomain = function(url) {
  if (!hasWindow()) {
    return true;
  }
  let crossDomain = false;
  const originAnchor = dom_adapter_default.createElement("a");
  const urlAnchor = dom_adapter_default.createElement("a");
  originAnchor.href = window6.location.href;
  try {
    urlAnchor.href = url;
    urlAnchor.href = urlAnchor.href;
    crossDomain = `${originAnchor.protocol}//${originAnchor.host}` !== `${urlAnchor.protocol}//${urlAnchor.host}`;
  } catch (e) {
    crossDomain = true;
  }
  return crossDomain;
};

// node_modules/devextreme/esm/__internal/core/utils/m_ajax.js
var window7 = getWindow();
var SUCCESS = "success";
var ERROR = "error";
var TIMEOUT = "timeout";
var NO_CONTENT = "nocontent";
var PARSER_ERROR = "parsererror";
var isStatusSuccess = function(status) {
  return status >= 200 && status < 300;
};
var hasContent = function(status) {
  return 204 !== status;
};
var getDataFromResponse = function(xhr) {
  return xhr.responseType && "text" !== xhr.responseType || "string" !== typeof xhr.responseText ? xhr.response : xhr.responseText;
};
var postProcess = function(deferred, xhr, dataType) {
  const data2 = getDataFromResponse(xhr);
  switch (dataType) {
    case "jsonp":
      evalScript(data2);
      break;
    case "script":
      evalScript(data2);
      deferred.resolve(data2, SUCCESS, xhr);
      break;
    case "json":
      try {
        deferred.resolve(JSON.parse(data2), SUCCESS, xhr);
      } catch (e) {
        deferred.reject(xhr, PARSER_ERROR, e);
      }
      break;
    default:
      deferred.resolve(data2, SUCCESS, xhr);
  }
};
var setHttpTimeout = function(timeout, xhr) {
  return timeout && setTimeout(function() {
    xhr.customStatus = TIMEOUT;
    xhr.abort();
  }, timeout);
};
var sendRequest = function(options) {
  const xhr = http_request_default.getXhr();
  const d = new Deferred();
  const result = d.promise();
  const async = isDefined(options.async) ? options.async : true;
  const {
    dataType
  } = options;
  const timeout = options.timeout || 0;
  let timeoutId;
  options.crossDomain = isCrossDomain(options.url);
  const needScriptEvaluation = "jsonp" === dataType || "script" === dataType;
  if (void 0 === options.cache) {
    options.cache = !needScriptEvaluation;
  }
  const callbackName = getJsonpOptions(options);
  const headers = getRequestHeaders(options);
  const requestOptions = getRequestOptions(options, headers);
  const {
    url
  } = requestOptions;
  const {
    parameters
  } = requestOptions;
  if (callbackName) {
    window7[callbackName] = function(data2) {
      d.resolve(data2, SUCCESS, xhr);
    };
  }
  if (options.crossDomain && needScriptEvaluation) {
    const reject = function() {
      d.reject(xhr, ERROR);
    };
    const resolve = function() {
      if ("jsonp" === dataType) {
        return;
      }
      d.resolve(null, SUCCESS, xhr);
    };
    evalCrossDomainScript(url).then(resolve, reject);
    return result;
  }
  if (options.crossDomain && !("withCredentials" in xhr)) {
    d.reject(xhr, ERROR);
    return result;
  }
  xhr.open(getMethod(options), url, async, options.username, options.password);
  if (async) {
    xhr.timeout = timeout;
    timeoutId = setHttpTimeout(timeout, xhr);
  }
  xhr.onreadystatechange = function(e) {
    if (4 === xhr.readyState) {
      clearTimeout(timeoutId);
      if (isStatusSuccess(xhr.status)) {
        if (hasContent(xhr.status)) {
          postProcess(d, xhr, dataType);
        } else {
          d.resolve(null, NO_CONTENT, xhr);
        }
      } else {
        d.reject(xhr, xhr.customStatus || ERROR);
      }
    }
  };
  if (options.upload) {
    xhr.upload.onprogress = options.upload.onprogress;
    xhr.upload.onloadstart = options.upload.onloadstart;
    xhr.upload.onabort = options.upload.onabort;
  }
  if (options.xhrFields) {
    for (const field in options.xhrFields) {
      xhr[field] = options.xhrFields[field];
    }
  }
  if ("arraybuffer" === options.responseType) {
    xhr.responseType = options.responseType;
  }
  for (const name in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, name) && isDefined(headers[name])) {
      xhr.setRequestHeader(name, headers[name]);
    }
  }
  if (options.beforeSend) {
    options.beforeSend(xhr);
  }
  xhr.send(parameters);
  result.abort = function() {
    xhr.abort();
  };
  return result;
};
var Ajax = dependency_injector_default({
  sendRequest
});

// node_modules/devextreme/esm/core/utils/ajax.js
var ajax_default = Ajax;

export {
  m_callbacks_default,
  callbacks_default,
  map,
  each,
  reverseEach,
  memorized_callbacks_default,
  event_registrator_callbacks_default,
  getEventTarget,
  _extends,
  type,
  isBoolean,
  isExponential,
  isDate,
  isDefined,
  isFunction,
  isString,
  isNumeric,
  isObject,
  isEmptyObject,
  isPlainObject,
  isPrimitive,
  isWindow,
  isRenderer,
  isPromise,
  isDeferred,
  isEvent,
  m_type_default,
  extendFromObject,
  extend,
  encodeHtml,
  quadToObject,
  format,
  isEmpty,
  version,
  fullVersion,
  logger,
  error_default,
  errors_default,
  config_default,
  class_default,
  guid_default,
  registerTemplateEngine,
  setTemplateEngine,
  getCurrentTemplateEngine,
  set_template_engine_default,
  config_default2,
  guid_default2,
  dependency_injector_default,
  variable_wrapper_default,
  clone,
  orderEach,
  deepExtendArraySafe,
  getPathParts,
  compileGetter,
  compileSetter,
  toComparable,
  fromPromise,
  Deferred,
  when,
  ensureDefined,
  executeAsync,
  deferRender,
  deferUpdate,
  deferRenderer,
  deferUpdater,
  findBestMatches,
  splitPair,
  normalizeKey,
  pairToObject,
  getKeyHash,
  escapeRegExp,
  applyServerDecimalSeparator,
  noop2 as noop,
  asyncNoop,
  grep,
  equalByValue,
  m_common_default,
  addShadowDomStyles,
  m_dom_adapter_default,
  dom_adapter_default,
  call_once_default,
  hasWindow,
  getWindow,
  hasProperty,
  defaultScreenFactorFunc,
  getCurrentScreenFactor,
  getNavigator,
  m_window_default,
  m_events_engine_default,
  dasherize,
  camelize,
  humanize,
  titleize,
  captionize,
  m_inflector_default,
  data,
  beforeCleanData,
  removeData,
  cleanDataRecursive,
  parseHTML,
  getElementBoxParams,
  parseHeight,
  addOffsetToMaxHeight,
  addOffsetToMinHeight,
  getVerticalOffsets,
  getVisibleHeight,
  getWidth,
  setWidth,
  getHeight,
  setHeight,
  getOuterWidth,
  setOuterWidth,
  getOuterHeight,
  setOuterHeight,
  getInnerWidth,
  getInnerHeight,
  getOffset,
  styleProp,
  stylePropPrefix,
  normalizeStyleProp,
  setWidth2,
  setHeight2,
  setStyle,
  renderer_default,
  m_ready_callbacks_default,
  ready_callbacks_default,
  http_request_default,
  ajax_default
};
//# sourceMappingURL=chunk-TDFMJWXB.js.map
