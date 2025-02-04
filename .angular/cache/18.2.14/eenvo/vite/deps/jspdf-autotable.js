import {
  init_jspdf_es_min,
  jspdf_es_min_exports
} from "./chunk-R264B35A.js";
import "./chunk-VFMFQSZS.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-RXHPGQPJ.js";

// node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js
var require_jspdf_plugin_autotable = __commonJS({
  "node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object") module.exports = factory(function webpackLoadOptionalExternalModule() {
        try {
          return init_jspdf_es_min(), __toCommonJS(jspdf_es_min_exports);
        } catch (e) {
        }
      }());
      else if (typeof define === "function" && define.amd) define(["jspdf"], factory);
      else {
        var a = typeof exports === "object" ? factory(function webpackLoadOptionalExternalModule() {
          try {
            return init_jspdf_es_min(), __toCommonJS(jspdf_es_min_exports);
          } catch (e) {
          }
        }()) : factory(root["jspdf"]);
        for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof exports !== "undefined" ? exports : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : global, function(__WEBPACK_EXTERNAL_MODULE__964__) {
      return (
        /******/
        function() {
          "use strict";
          var __webpack_modules__ = {
            /***/
            172: (
              /***/
              function(__unused_webpack_module, exports2) {
                var __extends = this && this.__extends || /* @__PURE__ */ function() {
                  var extendStatics = function(d, b) {
                    extendStatics = Object.setPrototypeOf || {
                      __proto__: []
                    } instanceof Array && function(d2, b2) {
                      d2.__proto__ = b2;
                    } || function(d2, b2) {
                      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                    };
                    return extendStatics(d, b);
                  };
                  return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    extendStatics(d, b);
                    function __() {
                      this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                  };
                }();
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.CellHookData = exports2.HookData = void 0;
                var HookData = (
                  /** @class */
                  /* @__PURE__ */ function() {
                    function HookData2(doc, table, cursor) {
                      this.table = table;
                      this.pageNumber = table.pageNumber;
                      this.pageCount = this.pageNumber;
                      this.settings = table.settings;
                      this.cursor = cursor;
                      this.doc = doc.getDocument();
                    }
                    return HookData2;
                  }()
                );
                exports2.HookData = HookData;
                var CellHookData = (
                  /** @class */
                  function(_super) {
                    __extends(CellHookData2, _super);
                    function CellHookData2(doc, table, cell, row, column, cursor) {
                      var _this = _super.call(this, doc, table, cursor) || this;
                      _this.cell = cell;
                      _this.row = row;
                      _this.column = column;
                      _this.section = row.section;
                      return _this;
                    }
                    return CellHookData2;
                  }(HookData)
                );
                exports2.CellHookData = CellHookData;
              }
            ),
            /***/
            340: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                var htmlParser_1 = __webpack_require__2(4);
                var autoTableText_1 = __webpack_require__2(136);
                var documentHandler_1 = __webpack_require__2(744);
                var inputParser_1 = __webpack_require__2(776);
                var tableDrawer_1 = __webpack_require__2(664);
                var tableCalculator_1 = __webpack_require__2(972);
                function default_1(jsPDF) {
                  jsPDF.API.autoTable = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    var options;
                    if (args.length === 1) {
                      options = args[0];
                    } else {
                      console.error("Use of deprecated autoTable initiation");
                      options = args[2] || {};
                      options.columns = args[0];
                      options.body = args[1];
                    }
                    var input = (0, inputParser_1.parseInput)(this, options);
                    var table = (0, tableCalculator_1.createTable)(this, input);
                    (0, tableDrawer_1.drawTable)(this, table);
                    return this;
                  };
                  jsPDF.API.lastAutoTable = false;
                  jsPDF.API.previousAutoTable = false;
                  jsPDF.API.autoTable.previous = false;
                  jsPDF.API.autoTableText = function(text, x, y, styles) {
                    (0, autoTableText_1.default)(text, x, y, styles, this);
                  };
                  jsPDF.API.autoTableSetDefaults = function(defaults) {
                    documentHandler_1.DocHandler.setDefaults(defaults, this);
                    return this;
                  };
                  jsPDF.autoTableSetDefaults = function(defaults, doc) {
                    documentHandler_1.DocHandler.setDefaults(defaults, doc);
                  };
                  jsPDF.API.autoTableHtmlToJson = function(tableElem, includeHiddenElements) {
                    var _a;
                    if (includeHiddenElements === void 0) {
                      includeHiddenElements = false;
                    }
                    if (typeof window === "undefined") {
                      console.error("Cannot run autoTableHtmlToJson in non browser environment");
                      return null;
                    }
                    var doc = new documentHandler_1.DocHandler(this);
                    var _b = (0, htmlParser_1.parseHtml)(doc, tableElem, window, includeHiddenElements, false), head = _b.head, body = _b.body;
                    var columns = ((_a = head[0]) === null || _a === void 0 ? void 0 : _a.map(function(c) {
                      return c.content;
                    })) || [];
                    return {
                      columns,
                      rows: body,
                      data: body
                    };
                  };
                  jsPDF.API.autoTableEndPosY = function() {
                    console.error("Use of deprecated function: autoTableEndPosY. Use doc.lastAutoTable.finalY instead.");
                    var prev = this.lastAutoTable;
                    if (prev && prev.finalY) {
                      return prev.finalY;
                    } else {
                      return 0;
                    }
                  };
                  jsPDF.API.autoTableAddPageContent = function(hook) {
                    console.error("Use of deprecated function: autoTableAddPageContent. Use jsPDF.autoTableSetDefaults({didDrawPage: () => {}}) instead.");
                    if (!jsPDF.API.autoTable.globalDefaults) {
                      jsPDF.API.autoTable.globalDefaults = {};
                    }
                    jsPDF.API.autoTable.globalDefaults.addPageContent = hook;
                    return this;
                  };
                  jsPDF.API.autoTableAddPage = function() {
                    console.error("Use of deprecated function: autoTableAddPage. Use doc.addPage()");
                    this.addPage();
                    return this;
                  };
                }
                exports2["default"] = default_1;
              }
            ),
            /***/
            136: (
              /***/
              function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                function default_1(text, x, y, styles, doc) {
                  styles = styles || {};
                  var PHYSICAL_LINE_HEIGHT = 1.15;
                  var k = doc.internal.scaleFactor;
                  var fontSize = doc.internal.getFontSize() / k;
                  var lineHeightFactor = doc.getLineHeightFactor ? doc.getLineHeightFactor() : PHYSICAL_LINE_HEIGHT;
                  var lineHeight = fontSize * lineHeightFactor;
                  var splitRegex = /\r\n|\r|\n/g;
                  var splitText = "";
                  var lineCount = 1;
                  if (styles.valign === "middle" || styles.valign === "bottom" || styles.halign === "center" || styles.halign === "right") {
                    splitText = typeof text === "string" ? text.split(splitRegex) : text;
                    lineCount = splitText.length || 1;
                  }
                  y += fontSize * (2 - PHYSICAL_LINE_HEIGHT);
                  if (styles.valign === "middle") y -= lineCount / 2 * lineHeight;
                  else if (styles.valign === "bottom") y -= lineCount * lineHeight;
                  if (styles.halign === "center" || styles.halign === "right") {
                    var alignSize = fontSize;
                    if (styles.halign === "center") alignSize *= 0.5;
                    if (splitText && lineCount >= 1) {
                      for (var iLine = 0; iLine < splitText.length; iLine++) {
                        doc.text(splitText[iLine], x - doc.getStringUnitWidth(splitText[iLine]) * alignSize, y);
                        y += lineHeight;
                      }
                      return doc;
                    }
                    x -= doc.getStringUnitWidth(text) * alignSize;
                  }
                  if (styles.halign === "justify") {
                    doc.text(text, x, y, {
                      maxWidth: styles.maxWidth || 100,
                      align: "justify"
                    });
                  } else {
                    doc.text(text, x, y);
                  }
                  return doc;
                }
                exports2["default"] = default_1;
              }
            ),
            /***/
            420: (
              /***/
              function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.getPageAvailableWidth = exports2.parseSpacing = exports2.getFillStyle = exports2.addTableBorder = exports2.getStringWidth = void 0;
                function getStringWidth(text, styles, doc) {
                  doc.applyStyles(styles, true);
                  var textArr = Array.isArray(text) ? text : [text];
                  var widestLineWidth = textArr.map(function(text2) {
                    return doc.getTextWidth(text2);
                  }).reduce(function(a, b) {
                    return Math.max(a, b);
                  }, 0);
                  return widestLineWidth;
                }
                exports2.getStringWidth = getStringWidth;
                function addTableBorder(doc, table, startPos, cursor) {
                  var lineWidth = table.settings.tableLineWidth;
                  var lineColor = table.settings.tableLineColor;
                  doc.applyStyles({
                    lineWidth,
                    lineColor
                  });
                  var fillStyle = getFillStyle(lineWidth, false);
                  if (fillStyle) {
                    doc.rect(startPos.x, startPos.y, table.getWidth(doc.pageSize().width), cursor.y - startPos.y, fillStyle);
                  }
                }
                exports2.addTableBorder = addTableBorder;
                function getFillStyle(lineWidth, fillColor) {
                  var drawLine = lineWidth > 0;
                  var drawBackground = fillColor || fillColor === 0;
                  if (drawLine && drawBackground) {
                    return "DF";
                  } else if (drawLine) {
                    return "S";
                  } else if (drawBackground) {
                    return "F";
                  } else {
                    return null;
                  }
                }
                exports2.getFillStyle = getFillStyle;
                function parseSpacing(value, defaultValue) {
                  var _a, _b, _c, _d;
                  value = value || defaultValue;
                  if (Array.isArray(value)) {
                    if (value.length >= 4) {
                      return {
                        top: value[0],
                        right: value[1],
                        bottom: value[2],
                        left: value[3]
                      };
                    } else if (value.length === 3) {
                      return {
                        top: value[0],
                        right: value[1],
                        bottom: value[2],
                        left: value[1]
                      };
                    } else if (value.length === 2) {
                      return {
                        top: value[0],
                        right: value[1],
                        bottom: value[0],
                        left: value[1]
                      };
                    } else if (value.length === 1) {
                      value = value[0];
                    } else {
                      value = defaultValue;
                    }
                  }
                  if (typeof value === "object") {
                    if (typeof value.vertical === "number") {
                      value.top = value.vertical;
                      value.bottom = value.vertical;
                    }
                    if (typeof value.horizontal === "number") {
                      value.right = value.horizontal;
                      value.left = value.horizontal;
                    }
                    return {
                      left: (_a = value.left) !== null && _a !== void 0 ? _a : defaultValue,
                      top: (_b = value.top) !== null && _b !== void 0 ? _b : defaultValue,
                      right: (_c = value.right) !== null && _c !== void 0 ? _c : defaultValue,
                      bottom: (_d = value.bottom) !== null && _d !== void 0 ? _d : defaultValue
                    };
                  }
                  if (typeof value !== "number") {
                    value = defaultValue;
                  }
                  return {
                    top: value,
                    right: value,
                    bottom: value,
                    left: value
                  };
                }
                exports2.parseSpacing = parseSpacing;
                function getPageAvailableWidth(doc, table) {
                  var margins = parseSpacing(table.settings.margin, 0);
                  return doc.pageSize().width - (margins.left + margins.right);
                }
                exports2.getPageAvailableWidth = getPageAvailableWidth;
              }
            ),
            /***/
            796: (
              /***/
              function(__unused_webpack_module, exports2) {
                var __extends = this && this.__extends || /* @__PURE__ */ function() {
                  var extendStatics = function(d, b) {
                    extendStatics = Object.setPrototypeOf || {
                      __proto__: []
                    } instanceof Array && function(d2, b2) {
                      d2.__proto__ = b2;
                    } || function(d2, b2) {
                      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                    };
                    return extendStatics(d, b);
                  };
                  return function(d, b) {
                    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                    extendStatics(d, b);
                    function __() {
                      this.constructor = d;
                    }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                  };
                }();
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.getTheme = exports2.defaultStyles = exports2.HtmlRowInput = void 0;
                var HtmlRowInput = (
                  /** @class */
                  function(_super) {
                    __extends(HtmlRowInput2, _super);
                    function HtmlRowInput2(element) {
                      var _this = _super.call(this) || this;
                      _this._element = element;
                      return _this;
                    }
                    return HtmlRowInput2;
                  }(Array)
                );
                exports2.HtmlRowInput = HtmlRowInput;
                function defaultStyles(scaleFactor) {
                  return {
                    font: "helvetica",
                    // helvetica, times, courier
                    fontStyle: "normal",
                    // normal, bold, italic, bolditalic
                    overflow: "linebreak",
                    // linebreak, ellipsize, visible or hidden
                    fillColor: false,
                    // Either false for transparent, rbg array e.g. [255, 255, 255] or gray level e.g 200
                    textColor: 20,
                    halign: "left",
                    // left, center, right, justify
                    valign: "top",
                    // top, middle, bottom
                    fontSize: 10,
                    cellPadding: 5 / scaleFactor,
                    // number or {top,left,right,left,vertical,horizontal}
                    lineColor: 200,
                    lineWidth: 0,
                    cellWidth: "auto",
                    // 'auto'|'wrap'|number
                    minCellHeight: 0,
                    minCellWidth: 0
                  };
                }
                exports2.defaultStyles = defaultStyles;
                function getTheme(name) {
                  var themes = {
                    striped: {
                      table: {
                        fillColor: 255,
                        textColor: 80,
                        fontStyle: "normal"
                      },
                      head: {
                        textColor: 255,
                        fillColor: [41, 128, 185],
                        fontStyle: "bold"
                      },
                      body: {},
                      foot: {
                        textColor: 255,
                        fillColor: [41, 128, 185],
                        fontStyle: "bold"
                      },
                      alternateRow: {
                        fillColor: 245
                      }
                    },
                    grid: {
                      table: {
                        fillColor: 255,
                        textColor: 80,
                        fontStyle: "normal",
                        lineWidth: 0.1
                      },
                      head: {
                        textColor: 255,
                        fillColor: [26, 188, 156],
                        fontStyle: "bold",
                        lineWidth: 0
                      },
                      body: {},
                      foot: {
                        textColor: 255,
                        fillColor: [26, 188, 156],
                        fontStyle: "bold",
                        lineWidth: 0
                      },
                      alternateRow: {}
                    },
                    plain: {
                      head: {
                        fontStyle: "bold"
                      },
                      foot: {
                        fontStyle: "bold"
                      }
                    }
                  };
                  return themes[name];
                }
                exports2.getTheme = getTheme;
              }
            ),
            /***/
            903: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.parseCss = void 0;
                var common_1 = __webpack_require__2(420);
                function parseCss(supportedFonts, element, scaleFactor, style, window2) {
                  var result = {};
                  var pxScaleFactor = 96 / 72;
                  var backgroundColor = parseColor(element, function(elem) {
                    return window2.getComputedStyle(elem)["backgroundColor"];
                  });
                  if (backgroundColor != null) result.fillColor = backgroundColor;
                  var textColor = parseColor(element, function(elem) {
                    return window2.getComputedStyle(elem)["color"];
                  });
                  if (textColor != null) result.textColor = textColor;
                  var padding = parsePadding(style, scaleFactor);
                  if (padding) result.cellPadding = padding;
                  var borderColorSide = "borderTopColor";
                  var finalScaleFactor = pxScaleFactor * scaleFactor;
                  var btw = style.borderTopWidth;
                  if (style.borderBottomWidth === btw && style.borderRightWidth === btw && style.borderLeftWidth === btw) {
                    var borderWidth = (parseFloat(btw) || 0) / finalScaleFactor;
                    if (borderWidth) result.lineWidth = borderWidth;
                  } else {
                    result.lineWidth = {
                      top: (parseFloat(style.borderTopWidth) || 0) / finalScaleFactor,
                      right: (parseFloat(style.borderRightWidth) || 0) / finalScaleFactor,
                      bottom: (parseFloat(style.borderBottomWidth) || 0) / finalScaleFactor,
                      left: (parseFloat(style.borderLeftWidth) || 0) / finalScaleFactor
                    };
                    if (!result.lineWidth.top) {
                      if (result.lineWidth.right) {
                        borderColorSide = "borderRightColor";
                      } else if (result.lineWidth.bottom) {
                        borderColorSide = "borderBottomColor";
                      } else if (result.lineWidth.left) {
                        borderColorSide = "borderLeftColor";
                      }
                    }
                  }
                  var borderColor = parseColor(element, function(elem) {
                    return window2.getComputedStyle(elem)[borderColorSide];
                  });
                  if (borderColor != null) result.lineColor = borderColor;
                  var accepted = ["left", "right", "center", "justify"];
                  if (accepted.indexOf(style.textAlign) !== -1) {
                    result.halign = style.textAlign;
                  }
                  accepted = ["middle", "bottom", "top"];
                  if (accepted.indexOf(style.verticalAlign) !== -1) {
                    result.valign = style.verticalAlign;
                  }
                  var res = parseInt(style.fontSize || "");
                  if (!isNaN(res)) result.fontSize = res / pxScaleFactor;
                  var fontStyle = parseFontStyle(style);
                  if (fontStyle) result.fontStyle = fontStyle;
                  var font = (style.fontFamily || "").toLowerCase();
                  if (supportedFonts.indexOf(font) !== -1) {
                    result.font = font;
                  }
                  return result;
                }
                exports2.parseCss = parseCss;
                function parseFontStyle(style) {
                  var res = "";
                  if (style.fontWeight === "bold" || style.fontWeight === "bolder" || parseInt(style.fontWeight) >= 700) {
                    res = "bold";
                  }
                  if (style.fontStyle === "italic" || style.fontStyle === "oblique") {
                    res += "italic";
                  }
                  return res;
                }
                function parseColor(element, styleGetter) {
                  var cssColor = realColor(element, styleGetter);
                  if (!cssColor) return null;
                  var rgba = cssColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d*))?\)$/);
                  if (!rgba || !Array.isArray(rgba)) {
                    return null;
                  }
                  var color = [parseInt(rgba[1]), parseInt(rgba[2]), parseInt(rgba[3])];
                  var alpha = parseInt(rgba[4]);
                  if (alpha === 0 || isNaN(color[0]) || isNaN(color[1]) || isNaN(color[2])) {
                    return null;
                  }
                  return color;
                }
                function realColor(elem, styleGetter) {
                  var bg = styleGetter(elem);
                  if (bg === "rgba(0, 0, 0, 0)" || bg === "transparent" || bg === "initial" || bg === "inherit") {
                    if (elem.parentElement == null) {
                      return null;
                    }
                    return realColor(elem.parentElement, styleGetter);
                  } else {
                    return bg;
                  }
                }
                function parsePadding(style, scaleFactor) {
                  var val = [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft];
                  var pxScaleFactor = 96 / (72 / scaleFactor);
                  var linePadding = (parseInt(style.lineHeight) - parseInt(style.fontSize)) / scaleFactor / 2;
                  var inputPadding = val.map(function(n) {
                    return parseInt(n || "0") / pxScaleFactor;
                  });
                  var padding = (0, common_1.parseSpacing)(inputPadding, 0);
                  if (linePadding > padding.top) {
                    padding.top = linePadding;
                  }
                  if (linePadding > padding.bottom) {
                    padding.bottom = linePadding;
                  }
                  return padding;
                }
              }
            ),
            /***/
            744: (
              /***/
              function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.DocHandler = void 0;
                var globalDefaults = {};
                var DocHandler = (
                  /** @class */
                  function() {
                    function DocHandler2(jsPDFDocument) {
                      this.jsPDFDocument = jsPDFDocument;
                      this.userStyles = {
                        // Black for versions of jspdf without getTextColor
                        textColor: jsPDFDocument.getTextColor ? this.jsPDFDocument.getTextColor() : 0,
                        fontSize: jsPDFDocument.internal.getFontSize(),
                        fontStyle: jsPDFDocument.internal.getFont().fontStyle,
                        font: jsPDFDocument.internal.getFont().fontName,
                        // 0 for versions of jspdf without getLineWidth
                        lineWidth: jsPDFDocument.getLineWidth ? this.jsPDFDocument.getLineWidth() : 0,
                        // Black for versions of jspdf without getDrawColor
                        lineColor: jsPDFDocument.getDrawColor ? this.jsPDFDocument.getDrawColor() : 0
                      };
                    }
                    DocHandler2.setDefaults = function(defaults, doc) {
                      if (doc === void 0) {
                        doc = null;
                      }
                      if (doc) {
                        doc.__autoTableDocumentDefaults = defaults;
                      } else {
                        globalDefaults = defaults;
                      }
                    };
                    DocHandler2.unifyColor = function(c) {
                      if (Array.isArray(c)) {
                        return c;
                      } else if (typeof c === "number") {
                        return [c, c, c];
                      } else if (typeof c === "string") {
                        return [c];
                      } else {
                        return null;
                      }
                    };
                    DocHandler2.prototype.applyStyles = function(styles, fontOnly) {
                      var _a, _b, _c;
                      if (fontOnly === void 0) {
                        fontOnly = false;
                      }
                      if (styles.fontStyle) this.jsPDFDocument.setFontStyle && this.jsPDFDocument.setFontStyle(styles.fontStyle);
                      var _d = this.jsPDFDocument.internal.getFont(), fontStyle = _d.fontStyle, fontName = _d.fontName;
                      if (styles.font) fontName = styles.font;
                      if (styles.fontStyle) {
                        fontStyle = styles.fontStyle;
                        var availableFontStyles = this.getFontList()[fontName];
                        if (availableFontStyles && availableFontStyles.indexOf(fontStyle) === -1) {
                          this.jsPDFDocument.setFontStyle && this.jsPDFDocument.setFontStyle(availableFontStyles[0]);
                          fontStyle = availableFontStyles[0];
                        }
                      }
                      this.jsPDFDocument.setFont(fontName, fontStyle);
                      if (styles.fontSize) this.jsPDFDocument.setFontSize(styles.fontSize);
                      if (fontOnly) {
                        return;
                      }
                      var color = DocHandler2.unifyColor(styles.fillColor);
                      if (color) (_a = this.jsPDFDocument).setFillColor.apply(_a, color);
                      color = DocHandler2.unifyColor(styles.textColor);
                      if (color) (_b = this.jsPDFDocument).setTextColor.apply(_b, color);
                      color = DocHandler2.unifyColor(styles.lineColor);
                      if (color) (_c = this.jsPDFDocument).setDrawColor.apply(_c, color);
                      if (typeof styles.lineWidth === "number") {
                        this.jsPDFDocument.setLineWidth(styles.lineWidth);
                      }
                    };
                    DocHandler2.prototype.splitTextToSize = function(text, size, opts) {
                      return this.jsPDFDocument.splitTextToSize(text, size, opts);
                    };
                    DocHandler2.prototype.rect = function(x, y, width, height, fillStyle) {
                      return this.jsPDFDocument.rect(x, y, width, height, fillStyle);
                    };
                    DocHandler2.prototype.getLastAutoTable = function() {
                      return this.jsPDFDocument.lastAutoTable || null;
                    };
                    DocHandler2.prototype.getTextWidth = function(text) {
                      return this.jsPDFDocument.getTextWidth(text);
                    };
                    DocHandler2.prototype.getDocument = function() {
                      return this.jsPDFDocument;
                    };
                    DocHandler2.prototype.setPage = function(page) {
                      this.jsPDFDocument.setPage(page);
                    };
                    DocHandler2.prototype.addPage = function() {
                      return this.jsPDFDocument.addPage();
                    };
                    DocHandler2.prototype.getFontList = function() {
                      return this.jsPDFDocument.getFontList();
                    };
                    DocHandler2.prototype.getGlobalOptions = function() {
                      return globalDefaults || {};
                    };
                    DocHandler2.prototype.getDocumentOptions = function() {
                      return this.jsPDFDocument.__autoTableDocumentDefaults || {};
                    };
                    DocHandler2.prototype.pageSize = function() {
                      var pageSize = this.jsPDFDocument.internal.pageSize;
                      if (pageSize.width == null) {
                        pageSize = {
                          width: pageSize.getWidth(),
                          height: pageSize.getHeight()
                        };
                      }
                      return pageSize;
                    };
                    DocHandler2.prototype.scaleFactor = function() {
                      return this.jsPDFDocument.internal.scaleFactor;
                    };
                    DocHandler2.prototype.getLineHeightFactor = function() {
                      var doc = this.jsPDFDocument;
                      return doc.getLineHeightFactor ? doc.getLineHeightFactor() : 1.15;
                    };
                    DocHandler2.prototype.getLineHeight = function(fontSize) {
                      return fontSize / this.scaleFactor() * this.getLineHeightFactor();
                    };
                    DocHandler2.prototype.pageNumber = function() {
                      var pageInfo = this.jsPDFDocument.internal.getCurrentPageInfo();
                      if (!pageInfo) {
                        return this.jsPDFDocument.internal.getNumberOfPages();
                      }
                      return pageInfo.pageNumber;
                    };
                    return DocHandler2;
                  }()
                );
                exports2.DocHandler = DocHandler;
              }
            ),
            /***/
            4: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.parseHtml = void 0;
                var cssParser_1 = __webpack_require__2(903);
                var config_1 = __webpack_require__2(796);
                function parseHtml(doc, input, window2, includeHiddenHtml, useCss) {
                  var _a, _b;
                  if (includeHiddenHtml === void 0) {
                    includeHiddenHtml = false;
                  }
                  if (useCss === void 0) {
                    useCss = false;
                  }
                  var tableElement;
                  if (typeof input === "string") {
                    tableElement = window2.document.querySelector(input);
                  } else {
                    tableElement = input;
                  }
                  var supportedFonts = Object.keys(doc.getFontList());
                  var scaleFactor = doc.scaleFactor();
                  var head = [], body = [], foot = [];
                  if (!tableElement) {
                    console.error("Html table could not be found with input: ", input);
                    return {
                      head,
                      body,
                      foot
                    };
                  }
                  for (var i = 0; i < tableElement.rows.length; i++) {
                    var element = tableElement.rows[i];
                    var tagName = (_b = (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                    var row = parseRowContent(supportedFonts, scaleFactor, window2, element, includeHiddenHtml, useCss);
                    if (!row) continue;
                    if (tagName === "thead") {
                      head.push(row);
                    } else if (tagName === "tfoot") {
                      foot.push(row);
                    } else {
                      body.push(row);
                    }
                  }
                  return {
                    head,
                    body,
                    foot
                  };
                }
                exports2.parseHtml = parseHtml;
                function parseRowContent(supportedFonts, scaleFactor, window2, row, includeHidden, useCss) {
                  var resultRow = new config_1.HtmlRowInput(row);
                  for (var i = 0; i < row.cells.length; i++) {
                    var cell = row.cells[i];
                    var style_1 = window2.getComputedStyle(cell);
                    if (includeHidden || style_1.display !== "none") {
                      var cellStyles = void 0;
                      if (useCss) {
                        cellStyles = (0, cssParser_1.parseCss)(supportedFonts, cell, scaleFactor, style_1, window2);
                      }
                      resultRow.push({
                        rowSpan: cell.rowSpan,
                        colSpan: cell.colSpan,
                        styles: cellStyles,
                        _element: cell,
                        content: parseCellContent(cell)
                      });
                    }
                  }
                  var style = window2.getComputedStyle(row);
                  if (resultRow.length > 0 && (includeHidden || style.display !== "none")) {
                    return resultRow;
                  }
                }
                function parseCellContent(orgCell) {
                  var cell = orgCell.cloneNode(true);
                  cell.innerHTML = cell.innerHTML.replace(/\n/g, "").replace(/ +/g, " ");
                  cell.innerHTML = cell.innerHTML.split(/<br.*?>/).map(function(part) {
                    return part.trim();
                  }).join("\n");
                  return cell.innerText || cell.textContent || "";
                }
              }
            ),
            /***/
            776: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.parseInput = void 0;
                var htmlParser_1 = __webpack_require__2(4);
                var polyfills_1 = __webpack_require__2(356);
                var common_1 = __webpack_require__2(420);
                var documentHandler_1 = __webpack_require__2(744);
                var inputValidator_1 = __webpack_require__2(792);
                function parseInput(d, current) {
                  var doc = new documentHandler_1.DocHandler(d);
                  var document = doc.getDocumentOptions();
                  var global2 = doc.getGlobalOptions();
                  (0, inputValidator_1.default)(doc, global2, document, current);
                  var options = (0, polyfills_1.assign)({}, global2, document, current);
                  var win;
                  if (typeof window !== "undefined") {
                    win = window;
                  }
                  var styles = parseStyles(global2, document, current);
                  var hooks = parseHooks(global2, document, current);
                  var settings = parseSettings(doc, options);
                  var content = parseContent(doc, options, win);
                  return {
                    id: current.tableId,
                    content,
                    hooks,
                    styles,
                    settings
                  };
                }
                exports2.parseInput = parseInput;
                function parseStyles(gInput, dInput, cInput) {
                  var styleOptions = {
                    styles: {},
                    headStyles: {},
                    bodyStyles: {},
                    footStyles: {},
                    alternateRowStyles: {},
                    columnStyles: {}
                  };
                  var _loop_1 = function(prop2) {
                    if (prop2 === "columnStyles") {
                      var global_1 = gInput[prop2];
                      var document_1 = dInput[prop2];
                      var current = cInput[prop2];
                      styleOptions.columnStyles = (0, polyfills_1.assign)({}, global_1, document_1, current);
                    } else {
                      var allOptions = [gInput, dInput, cInput];
                      var styles = allOptions.map(function(opts) {
                        return opts[prop2] || {};
                      });
                      styleOptions[prop2] = (0, polyfills_1.assign)({}, styles[0], styles[1], styles[2]);
                    }
                  };
                  for (var _i = 0, _a = Object.keys(styleOptions); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    _loop_1(prop);
                  }
                  return styleOptions;
                }
                function parseHooks(global2, document, current) {
                  var allOptions = [global2, document, current];
                  var result = {
                    didParseCell: [],
                    willDrawCell: [],
                    didDrawCell: [],
                    willDrawPage: [],
                    didDrawPage: []
                  };
                  for (var _i = 0, allOptions_1 = allOptions; _i < allOptions_1.length; _i++) {
                    var options = allOptions_1[_i];
                    if (options.didParseCell) result.didParseCell.push(options.didParseCell);
                    if (options.willDrawCell) result.willDrawCell.push(options.willDrawCell);
                    if (options.didDrawCell) result.didDrawCell.push(options.didDrawCell);
                    if (options.willDrawPage) result.willDrawPage.push(options.willDrawPage);
                    if (options.didDrawPage) result.didDrawPage.push(options.didDrawPage);
                  }
                  return result;
                }
                function parseSettings(doc, options) {
                  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                  var margin = (0, common_1.parseSpacing)(options.margin, 40 / doc.scaleFactor());
                  var startY = (_a = getStartY(doc, options.startY)) !== null && _a !== void 0 ? _a : margin.top;
                  var showFoot;
                  if (options.showFoot === true) {
                    showFoot = "everyPage";
                  } else if (options.showFoot === false) {
                    showFoot = "never";
                  } else {
                    showFoot = (_b = options.showFoot) !== null && _b !== void 0 ? _b : "everyPage";
                  }
                  var showHead;
                  if (options.showHead === true) {
                    showHead = "everyPage";
                  } else if (options.showHead === false) {
                    showHead = "never";
                  } else {
                    showHead = (_c = options.showHead) !== null && _c !== void 0 ? _c : "everyPage";
                  }
                  var useCss = (_d = options.useCss) !== null && _d !== void 0 ? _d : false;
                  var theme = options.theme || (useCss ? "plain" : "striped");
                  var horizontalPageBreak = !!options.horizontalPageBreak;
                  var horizontalPageBreakRepeat = (_e = options.horizontalPageBreakRepeat) !== null && _e !== void 0 ? _e : null;
                  return {
                    includeHiddenHtml: (_f = options.includeHiddenHtml) !== null && _f !== void 0 ? _f : false,
                    useCss,
                    theme,
                    startY,
                    margin,
                    pageBreak: (_g = options.pageBreak) !== null && _g !== void 0 ? _g : "auto",
                    rowPageBreak: (_h = options.rowPageBreak) !== null && _h !== void 0 ? _h : "auto",
                    tableWidth: (_j = options.tableWidth) !== null && _j !== void 0 ? _j : "auto",
                    showHead,
                    showFoot,
                    tableLineWidth: (_k = options.tableLineWidth) !== null && _k !== void 0 ? _k : 0,
                    tableLineColor: (_l = options.tableLineColor) !== null && _l !== void 0 ? _l : 200,
                    horizontalPageBreak,
                    horizontalPageBreakRepeat,
                    horizontalPageBreakBehaviour: (_m = options.horizontalPageBreakBehaviour) !== null && _m !== void 0 ? _m : "afterAllRows"
                  };
                }
                function getStartY(doc, userStartY) {
                  var previous = doc.getLastAutoTable();
                  var sf = doc.scaleFactor();
                  var currentPage = doc.pageNumber();
                  var isSamePageAsPreviousTable = false;
                  if (previous && previous.startPageNumber) {
                    var endingPage = previous.startPageNumber + previous.pageNumber - 1;
                    isSamePageAsPreviousTable = endingPage === currentPage;
                  }
                  if (typeof userStartY === "number") {
                    return userStartY;
                  } else if (userStartY == null || userStartY === false) {
                    if (isSamePageAsPreviousTable && (previous === null || previous === void 0 ? void 0 : previous.finalY) != null) {
                      return previous.finalY + 20 / sf;
                    }
                  }
                  return null;
                }
                function parseContent(doc, options, window2) {
                  var head = options.head || [];
                  var body = options.body || [];
                  var foot = options.foot || [];
                  if (options.html) {
                    var hidden = options.includeHiddenHtml;
                    if (window2) {
                      var htmlContent = (0, htmlParser_1.parseHtml)(doc, options.html, window2, hidden, options.useCss) || {};
                      head = htmlContent.head || head;
                      body = htmlContent.body || head;
                      foot = htmlContent.foot || head;
                    } else {
                      console.error("Cannot parse html in non browser environment");
                    }
                  }
                  var columns = options.columns || parseColumns(head, body, foot);
                  return {
                    columns,
                    head,
                    body,
                    foot
                  };
                }
                function parseColumns(head, body, foot) {
                  var firstRow = head[0] || body[0] || foot[0] || [];
                  var result = [];
                  Object.keys(firstRow).filter(function(key) {
                    return key !== "_element";
                  }).forEach(function(key) {
                    var colSpan = 1;
                    var input;
                    if (Array.isArray(firstRow)) {
                      input = firstRow[parseInt(key)];
                    } else {
                      input = firstRow[key];
                    }
                    if (typeof input === "object" && !Array.isArray(input)) {
                      colSpan = (input === null || input === void 0 ? void 0 : input.colSpan) || 1;
                    }
                    for (var i = 0; i < colSpan; i++) {
                      var id = void 0;
                      if (Array.isArray(firstRow)) {
                        id = result.length;
                      } else {
                        id = key + (i > 0 ? "_".concat(i) : "");
                      }
                      var rowResult = {
                        dataKey: id
                      };
                      result.push(rowResult);
                    }
                  });
                  return result;
                }
              }
            ),
            /***/
            792: (
              /***/
              function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                function default_1(doc, global2, document, current) {
                  var _loop_1 = function(options2) {
                    if (options2 && typeof options2 !== "object") {
                      console.error("The options parameter should be of type object, is: " + typeof options2);
                    }
                    if (typeof options2.extendWidth !== "undefined") {
                      options2.tableWidth = options2.extendWidth ? "auto" : "wrap";
                      console.error("Use of deprecated option: extendWidth, use tableWidth instead.");
                    }
                    if (typeof options2.margins !== "undefined") {
                      if (typeof options2.margin === "undefined") options2.margin = options2.margins;
                      console.error("Use of deprecated option: margins, use margin instead.");
                    }
                    if (options2.startY && typeof options2.startY !== "number") {
                      console.error("Invalid value for startY option", options2.startY);
                      delete options2.startY;
                    }
                    if (!options2.didDrawPage && (options2.afterPageContent || options2.beforePageContent || options2.afterPageAdd)) {
                      console.error("The afterPageContent, beforePageContent and afterPageAdd hooks are deprecated. Use didDrawPage instead");
                      options2.didDrawPage = function(data) {
                        doc.applyStyles(doc.userStyles);
                        if (options2.beforePageContent) options2.beforePageContent(data);
                        doc.applyStyles(doc.userStyles);
                        if (options2.afterPageContent) options2.afterPageContent(data);
                        doc.applyStyles(doc.userStyles);
                        if (options2.afterPageAdd && data.pageNumber > 1) {
                          ;
                          data.afterPageAdd(data);
                        }
                        doc.applyStyles(doc.userStyles);
                      };
                    }
                    ;
                    ["createdHeaderCell", "drawHeaderRow", "drawRow", "drawHeaderCell"].forEach(function(name) {
                      if (options2[name]) {
                        console.error('The "'.concat(name, '" hook has changed in version 3.0, check the changelog for how to migrate.'));
                      }
                    });
                    [["showFoot", "showFooter"], ["showHead", "showHeader"], ["didDrawPage", "addPageContent"], ["didParseCell", "createdCell"], ["headStyles", "headerStyles"]].forEach(function(_a2) {
                      var current2 = _a2[0], deprecated = _a2[1];
                      if (options2[deprecated]) {
                        console.error("Use of deprecated option ".concat(deprecated, ". Use ").concat(current2, " instead"));
                        options2[current2] = options2[deprecated];
                      }
                    });
                    [["padding", "cellPadding"], ["lineHeight", "rowHeight"], "fontSize", "overflow"].forEach(function(o) {
                      var deprecatedOption = typeof o === "string" ? o : o[0];
                      var style = typeof o === "string" ? o : o[1];
                      if (typeof options2[deprecatedOption] !== "undefined") {
                        if (typeof options2.styles[style] === "undefined") {
                          options2.styles[style] = options2[deprecatedOption];
                        }
                        console.error("Use of deprecated option: " + deprecatedOption + ", use the style " + style + " instead.");
                      }
                    });
                    for (var _b = 0, _c = ["styles", "bodyStyles", "headStyles", "footStyles"]; _b < _c.length; _b++) {
                      var styleProp = _c[_b];
                      checkStyles(options2[styleProp] || {});
                    }
                    var columnStyles = options2["columnStyles"] || {};
                    for (var _d = 0, _e = Object.keys(columnStyles); _d < _e.length; _d++) {
                      var key = _e[_d];
                      checkStyles(columnStyles[key] || {});
                    }
                  };
                  for (var _i = 0, _a = [global2, document, current]; _i < _a.length; _i++) {
                    var options = _a[_i];
                    _loop_1(options);
                  }
                }
                exports2["default"] = default_1;
                function checkStyles(styles) {
                  if (styles.rowHeight) {
                    console.error("Use of deprecated style rowHeight. It is renamed to minCellHeight.");
                    if (!styles.minCellHeight) {
                      styles.minCellHeight = styles.rowHeight;
                    }
                  } else if (styles.columnWidth) {
                    console.error("Use of deprecated style columnWidth. It is renamed to cellWidth.");
                    if (!styles.cellWidth) {
                      styles.cellWidth = styles.columnWidth;
                    }
                  }
                }
              }
            ),
            /***/
            260: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.Column = exports2.Cell = exports2.Row = exports2.Table = void 0;
                var config_1 = __webpack_require__2(796);
                var HookData_1 = __webpack_require__2(172);
                var common_1 = __webpack_require__2(420);
                var Table = (
                  /** @class */
                  function() {
                    function Table2(input, content) {
                      this.pageNumber = 1;
                      this.pageCount = 1;
                      this.id = input.id;
                      this.settings = input.settings;
                      this.styles = input.styles;
                      this.hooks = input.hooks;
                      this.columns = content.columns;
                      this.head = content.head;
                      this.body = content.body;
                      this.foot = content.foot;
                    }
                    Table2.prototype.getHeadHeight = function(columns) {
                      return this.head.reduce(function(acc, row) {
                        return acc + row.getMaxCellHeight(columns);
                      }, 0);
                    };
                    Table2.prototype.getFootHeight = function(columns) {
                      return this.foot.reduce(function(acc, row) {
                        return acc + row.getMaxCellHeight(columns);
                      }, 0);
                    };
                    Table2.prototype.allRows = function() {
                      return this.head.concat(this.body).concat(this.foot);
                    };
                    Table2.prototype.callCellHooks = function(doc, handlers, cell, row, column, cursor) {
                      for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                        var handler = handlers_1[_i];
                        var data = new HookData_1.CellHookData(doc, this, cell, row, column, cursor);
                        var result = handler(data) === false;
                        cell.text = Array.isArray(cell.text) ? cell.text : [cell.text];
                        if (result) {
                          return false;
                        }
                      }
                      return true;
                    };
                    Table2.prototype.callEndPageHooks = function(doc, cursor) {
                      doc.applyStyles(doc.userStyles);
                      for (var _i = 0, _a = this.hooks.didDrawPage; _i < _a.length; _i++) {
                        var handler = _a[_i];
                        handler(new HookData_1.HookData(doc, this, cursor));
                      }
                    };
                    Table2.prototype.callWillDrawPageHooks = function(doc, cursor) {
                      for (var _i = 0, _a = this.hooks.willDrawPage; _i < _a.length; _i++) {
                        var handler = _a[_i];
                        handler(new HookData_1.HookData(doc, this, cursor));
                      }
                    };
                    Table2.prototype.getWidth = function(pageWidth) {
                      if (typeof this.settings.tableWidth === "number") {
                        return this.settings.tableWidth;
                      } else if (this.settings.tableWidth === "wrap") {
                        var wrappedWidth = this.columns.reduce(function(total, col) {
                          return total + col.wrappedWidth;
                        }, 0);
                        return wrappedWidth;
                      } else {
                        var margin = this.settings.margin;
                        return pageWidth - margin.left - margin.right;
                      }
                    };
                    return Table2;
                  }()
                );
                exports2.Table = Table;
                var Row = (
                  /** @class */
                  function() {
                    function Row2(raw, index, section, cells, spansMultiplePages) {
                      if (spansMultiplePages === void 0) {
                        spansMultiplePages = false;
                      }
                      this.height = 0;
                      this.raw = raw;
                      if (raw instanceof config_1.HtmlRowInput) {
                        this.raw = raw._element;
                        this.element = raw._element;
                      }
                      this.index = index;
                      this.section = section;
                      this.cells = cells;
                      this.spansMultiplePages = spansMultiplePages;
                    }
                    Row2.prototype.getMaxCellHeight = function(columns) {
                      var _this = this;
                      return columns.reduce(function(acc, column) {
                        var _a;
                        return Math.max(acc, ((_a = _this.cells[column.index]) === null || _a === void 0 ? void 0 : _a.height) || 0);
                      }, 0);
                    };
                    Row2.prototype.hasRowSpan = function(columns) {
                      var _this = this;
                      return columns.filter(function(column) {
                        var cell = _this.cells[column.index];
                        if (!cell) return false;
                        return cell.rowSpan > 1;
                      }).length > 0;
                    };
                    Row2.prototype.canEntireRowFit = function(height, columns) {
                      return this.getMaxCellHeight(columns) <= height;
                    };
                    Row2.prototype.getMinimumRowHeight = function(columns, doc) {
                      var _this = this;
                      return columns.reduce(function(acc, column) {
                        var cell = _this.cells[column.index];
                        if (!cell) return 0;
                        var lineHeight = doc.getLineHeight(cell.styles.fontSize);
                        var vPadding = cell.padding("vertical");
                        var oneRowHeight = vPadding + lineHeight;
                        return oneRowHeight > acc ? oneRowHeight : acc;
                      }, 0);
                    };
                    return Row2;
                  }()
                );
                exports2.Row = Row;
                var Cell = (
                  /** @class */
                  function() {
                    function Cell2(raw, styles, section) {
                      var _a, _b;
                      this.contentHeight = 0;
                      this.contentWidth = 0;
                      this.wrappedWidth = 0;
                      this.minReadableWidth = 0;
                      this.minWidth = 0;
                      this.width = 0;
                      this.height = 0;
                      this.x = 0;
                      this.y = 0;
                      this.styles = styles;
                      this.section = section;
                      this.raw = raw;
                      var content = raw;
                      if (raw != null && typeof raw === "object" && !Array.isArray(raw)) {
                        this.rowSpan = raw.rowSpan || 1;
                        this.colSpan = raw.colSpan || 1;
                        content = (_b = (_a = raw.content) !== null && _a !== void 0 ? _a : raw.title) !== null && _b !== void 0 ? _b : raw;
                        if (raw._element) {
                          this.raw = raw._element;
                        }
                      } else {
                        this.rowSpan = 1;
                        this.colSpan = 1;
                      }
                      var text = content != null ? "" + content : "";
                      var splitRegex = /\r\n|\r|\n/g;
                      this.text = text.split(splitRegex);
                    }
                    Cell2.prototype.getTextPos = function() {
                      var y;
                      if (this.styles.valign === "top") {
                        y = this.y + this.padding("top");
                      } else if (this.styles.valign === "bottom") {
                        y = this.y + this.height - this.padding("bottom");
                      } else {
                        var netHeight = this.height - this.padding("vertical");
                        y = this.y + netHeight / 2 + this.padding("top");
                      }
                      var x;
                      if (this.styles.halign === "right") {
                        x = this.x + this.width - this.padding("right");
                      } else if (this.styles.halign === "center") {
                        var netWidth = this.width - this.padding("horizontal");
                        x = this.x + netWidth / 2 + this.padding("left");
                      } else {
                        x = this.x + this.padding("left");
                      }
                      return {
                        x,
                        y
                      };
                    };
                    Cell2.prototype.getContentHeight = function(scaleFactor, lineHeightFactor) {
                      if (lineHeightFactor === void 0) {
                        lineHeightFactor = 1.15;
                      }
                      var lineCount = Array.isArray(this.text) ? this.text.length : 1;
                      var lineHeight = this.styles.fontSize / scaleFactor * lineHeightFactor;
                      var height = lineCount * lineHeight + this.padding("vertical");
                      return Math.max(height, this.styles.minCellHeight);
                    };
                    Cell2.prototype.padding = function(name) {
                      var padding = (0, common_1.parseSpacing)(this.styles.cellPadding, 0);
                      if (name === "vertical") {
                        return padding.top + padding.bottom;
                      } else if (name === "horizontal") {
                        return padding.left + padding.right;
                      } else {
                        return padding[name];
                      }
                    };
                    return Cell2;
                  }()
                );
                exports2.Cell = Cell;
                var Column = (
                  /** @class */
                  function() {
                    function Column2(dataKey, raw, index) {
                      this.wrappedWidth = 0;
                      this.minReadableWidth = 0;
                      this.minWidth = 0;
                      this.width = 0;
                      this.dataKey = dataKey;
                      this.raw = raw;
                      this.index = index;
                    }
                    Column2.prototype.getMaxCustomCellWidth = function(table) {
                      var max = 0;
                      for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
                        var row = _a[_i];
                        var cell = row.cells[this.index];
                        if (cell && typeof cell.styles.cellWidth === "number") {
                          max = Math.max(max, cell.styles.cellWidth);
                        }
                      }
                      return max;
                    };
                    return Column2;
                  }()
                );
                exports2.Column = Column;
              }
            ),
            /***/
            356: (
              /***/
              function(__unused_webpack_module, exports2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.assign = void 0;
                function assign(target, s, s1, s2, s3) {
                  if (target == null) {
                    throw new TypeError("Cannot convert undefined or null to object");
                  }
                  var to = Object(target);
                  for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    if (nextSource != null) {
                      for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                          to[nextKey] = nextSource[nextKey];
                        }
                      }
                    }
                  }
                  return to;
                }
                exports2.assign = assign;
              }
            ),
            /***/
            972: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.createTable = void 0;
                var documentHandler_1 = __webpack_require__2(744);
                var models_1 = __webpack_require__2(260);
                var widthCalculator_1 = __webpack_require__2(324);
                var config_1 = __webpack_require__2(796);
                var polyfills_1 = __webpack_require__2(356);
                function createTable(jsPDFDoc, input) {
                  var doc = new documentHandler_1.DocHandler(jsPDFDoc);
                  var content = parseContent(input, doc.scaleFactor());
                  var table = new models_1.Table(input, content);
                  (0, widthCalculator_1.calculateWidths)(doc, table);
                  doc.applyStyles(doc.userStyles);
                  return table;
                }
                exports2.createTable = createTable;
                function parseContent(input, sf) {
                  var content = input.content;
                  var columns = createColumns(content.columns);
                  if (content.head.length === 0) {
                    var sectionRow = generateSectionRow(columns, "head");
                    if (sectionRow) content.head.push(sectionRow);
                  }
                  if (content.foot.length === 0) {
                    var sectionRow = generateSectionRow(columns, "foot");
                    if (sectionRow) content.foot.push(sectionRow);
                  }
                  var theme = input.settings.theme;
                  var styles = input.styles;
                  return {
                    columns,
                    head: parseSection("head", content.head, columns, styles, theme, sf),
                    body: parseSection("body", content.body, columns, styles, theme, sf),
                    foot: parseSection("foot", content.foot, columns, styles, theme, sf)
                  };
                }
                function parseSection(sectionName, sectionRows, columns, styleProps, theme, scaleFactor) {
                  var rowSpansLeftForColumn = {};
                  var result = sectionRows.map(function(rawRow, rowIndex) {
                    var skippedRowForRowSpans = 0;
                    var cells = {};
                    var colSpansAdded = 0;
                    var columnSpansLeft = 0;
                    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                      var column = columns_1[_i];
                      if (rowSpansLeftForColumn[column.index] == null || rowSpansLeftForColumn[column.index].left === 0) {
                        if (columnSpansLeft === 0) {
                          var rawCell = void 0;
                          if (Array.isArray(rawRow)) {
                            rawCell = rawRow[column.index - colSpansAdded - skippedRowForRowSpans];
                          } else {
                            rawCell = rawRow[column.dataKey];
                          }
                          var cellInputStyles = {};
                          if (typeof rawCell === "object" && !Array.isArray(rawCell)) {
                            cellInputStyles = (rawCell === null || rawCell === void 0 ? void 0 : rawCell.styles) || {};
                          }
                          var styles = cellStyles(sectionName, column, rowIndex, theme, styleProps, scaleFactor, cellInputStyles);
                          var cell = new models_1.Cell(rawCell, styles, sectionName);
                          cells[column.dataKey] = cell;
                          cells[column.index] = cell;
                          columnSpansLeft = cell.colSpan - 1;
                          rowSpansLeftForColumn[column.index] = {
                            left: cell.rowSpan - 1,
                            times: columnSpansLeft
                          };
                        } else {
                          columnSpansLeft--;
                          colSpansAdded++;
                        }
                      } else {
                        rowSpansLeftForColumn[column.index].left--;
                        columnSpansLeft = rowSpansLeftForColumn[column.index].times;
                        skippedRowForRowSpans++;
                      }
                    }
                    return new models_1.Row(rawRow, rowIndex, sectionName, cells);
                  });
                  return result;
                }
                function generateSectionRow(columns, section) {
                  var sectionRow = {};
                  columns.forEach(function(col) {
                    if (col.raw != null) {
                      var title = getSectionTitle(section, col.raw);
                      if (title != null) sectionRow[col.dataKey] = title;
                    }
                  });
                  return Object.keys(sectionRow).length > 0 ? sectionRow : null;
                }
                function getSectionTitle(section, column) {
                  if (section === "head") {
                    if (typeof column === "object") {
                      return column.header || column.title || null;
                    } else if (typeof column === "string" || typeof column === "number") {
                      return column;
                    }
                  } else if (section === "foot" && typeof column === "object") {
                    return column.footer;
                  }
                  return null;
                }
                function createColumns(columns) {
                  return columns.map(function(input, index) {
                    var _a, _b;
                    var key;
                    if (typeof input === "object") {
                      key = (_b = (_a = input.dataKey) !== null && _a !== void 0 ? _a : input.key) !== null && _b !== void 0 ? _b : index;
                    } else {
                      key = index;
                    }
                    return new models_1.Column(key, input, index);
                  });
                }
                function cellStyles(sectionName, column, rowIndex, themeName, styles, scaleFactor, cellInputStyles) {
                  var theme = (0, config_1.getTheme)(themeName);
                  var sectionStyles;
                  if (sectionName === "head") {
                    sectionStyles = styles.headStyles;
                  } else if (sectionName === "body") {
                    sectionStyles = styles.bodyStyles;
                  } else if (sectionName === "foot") {
                    sectionStyles = styles.footStyles;
                  }
                  var otherStyles = (0, polyfills_1.assign)({}, theme.table, theme[sectionName], styles.styles, sectionStyles);
                  var columnStyles = styles.columnStyles[column.dataKey] || styles.columnStyles[column.index] || {};
                  var colStyles = sectionName === "body" ? columnStyles : {};
                  var rowStyles = sectionName === "body" && rowIndex % 2 === 0 ? (0, polyfills_1.assign)({}, theme.alternateRow, styles.alternateRowStyles) : {};
                  var defaultStyle = (0, config_1.defaultStyles)(scaleFactor);
                  var themeStyles = (0, polyfills_1.assign)({}, defaultStyle, otherStyles, rowStyles, colStyles);
                  return (0, polyfills_1.assign)(themeStyles, cellInputStyles);
                }
              }
            ),
            /***/
            664: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.addPage = exports2.drawTable = void 0;
                var common_1 = __webpack_require__2(420);
                var models_1 = __webpack_require__2(260);
                var documentHandler_1 = __webpack_require__2(744);
                var polyfills_1 = __webpack_require__2(356);
                var autoTableText_1 = __webpack_require__2(136);
                var tablePrinter_1 = __webpack_require__2(224);
                function drawTable(jsPDFDoc, table) {
                  var settings = table.settings;
                  var startY = settings.startY;
                  var margin = settings.margin;
                  var cursor = {
                    x: margin.left,
                    y: startY
                  };
                  var sectionsHeight = table.getHeadHeight(table.columns) + table.getFootHeight(table.columns);
                  var minTableBottomPos = startY + margin.bottom + sectionsHeight;
                  if (settings.pageBreak === "avoid") {
                    var rows = table.body;
                    var tableHeight = rows.reduce(function(acc, row) {
                      return acc + row.height;
                    }, 0);
                    minTableBottomPos += tableHeight;
                  }
                  var doc = new documentHandler_1.DocHandler(jsPDFDoc);
                  if (settings.pageBreak === "always" || settings.startY != null && minTableBottomPos > doc.pageSize().height) {
                    nextPage(doc);
                    cursor.y = margin.top;
                  }
                  table.callWillDrawPageHooks(doc, cursor);
                  var startPos = (0, polyfills_1.assign)({}, cursor);
                  table.startPageNumber = doc.pageNumber();
                  if (settings.horizontalPageBreak) {
                    printTableWithHorizontalPageBreak(doc, table, startPos, cursor);
                  } else {
                    doc.applyStyles(doc.userStyles);
                    if (settings.showHead === "firstPage" || settings.showHead === "everyPage") {
                      table.head.forEach(function(row) {
                        return printRow(doc, table, row, cursor, table.columns);
                      });
                    }
                    doc.applyStyles(doc.userStyles);
                    table.body.forEach(function(row, index) {
                      var isLastRow = index === table.body.length - 1;
                      printFullRow(doc, table, row, isLastRow, startPos, cursor, table.columns);
                    });
                    doc.applyStyles(doc.userStyles);
                    if (settings.showFoot === "lastPage" || settings.showFoot === "everyPage") {
                      table.foot.forEach(function(row) {
                        return printRow(doc, table, row, cursor, table.columns);
                      });
                    }
                  }
                  (0, common_1.addTableBorder)(doc, table, startPos, cursor);
                  table.callEndPageHooks(doc, cursor);
                  table.finalY = cursor.y;
                  jsPDFDoc.lastAutoTable = table;
                  jsPDFDoc.previousAutoTable = table;
                  if (jsPDFDoc.autoTable) jsPDFDoc.autoTable.previous = table;
                  doc.applyStyles(doc.userStyles);
                }
                exports2.drawTable = drawTable;
                function printTableWithHorizontalPageBreak(doc, table, startPos, cursor) {
                  var allColumnsCanFitResult = (0, tablePrinter_1.calculateAllColumnsCanFitInPage)(doc, table);
                  var settings = table.settings;
                  if (settings.horizontalPageBreakBehaviour === "afterAllRows") {
                    allColumnsCanFitResult.forEach(function(colsAndIndexes, index) {
                      doc.applyStyles(doc.userStyles);
                      if (index > 0) {
                        addPage(doc, table, startPos, cursor, colsAndIndexes.columns, true);
                      } else {
                        printHead(doc, table, cursor, colsAndIndexes.columns);
                      }
                      printBody(doc, table, startPos, cursor, colsAndIndexes.columns);
                      printFoot(doc, table, cursor, colsAndIndexes.columns);
                    });
                  } else {
                    var lastRowIndexOfLastPage_1 = -1;
                    var firstColumnsToFitResult = allColumnsCanFitResult[0];
                    var _loop_1 = function() {
                      var lastPrintedRowIndex = lastRowIndexOfLastPage_1;
                      if (firstColumnsToFitResult) {
                        doc.applyStyles(doc.userStyles);
                        var firstColumnsToFit = firstColumnsToFitResult.columns;
                        if (lastRowIndexOfLastPage_1 >= 0) {
                          addPage(doc, table, startPos, cursor, firstColumnsToFit, true);
                        } else {
                          printHead(doc, table, cursor, firstColumnsToFit);
                        }
                        lastPrintedRowIndex = printBodyWithoutPageBreaks(doc, table, lastRowIndexOfLastPage_1 + 1, cursor, firstColumnsToFit);
                        printFoot(doc, table, cursor, firstColumnsToFit);
                      }
                      var maxNumberOfRows = lastPrintedRowIndex - lastRowIndexOfLastPage_1;
                      allColumnsCanFitResult.slice(1).forEach(function(colsAndIndexes) {
                        doc.applyStyles(doc.userStyles);
                        addPage(doc, table, startPos, cursor, colsAndIndexes.columns, true);
                        printBodyWithoutPageBreaks(doc, table, lastRowIndexOfLastPage_1 + 1, cursor, colsAndIndexes.columns, maxNumberOfRows);
                        printFoot(doc, table, cursor, colsAndIndexes.columns);
                      });
                      lastRowIndexOfLastPage_1 = lastPrintedRowIndex;
                    };
                    while (lastRowIndexOfLastPage_1 < table.body.length - 1) {
                      _loop_1();
                    }
                  }
                }
                function printHead(doc, table, cursor, columns) {
                  var settings = table.settings;
                  doc.applyStyles(doc.userStyles);
                  if (settings.showHead === "firstPage" || settings.showHead === "everyPage") {
                    table.head.forEach(function(row) {
                      return printRow(doc, table, row, cursor, columns);
                    });
                  }
                }
                function printBody(doc, table, startPos, cursor, columns) {
                  doc.applyStyles(doc.userStyles);
                  table.body.forEach(function(row, index) {
                    var isLastRow = index === table.body.length - 1;
                    printFullRow(doc, table, row, isLastRow, startPos, cursor, columns);
                  });
                }
                function printBodyWithoutPageBreaks(doc, table, startRowIndex, cursor, columns, maxNumberOfRows) {
                  doc.applyStyles(doc.userStyles);
                  maxNumberOfRows = maxNumberOfRows !== null && maxNumberOfRows !== void 0 ? maxNumberOfRows : table.body.length;
                  var endRowIndex = Math.min(startRowIndex + maxNumberOfRows, table.body.length);
                  var lastPrintedRowIndex = -1;
                  table.body.slice(startRowIndex, endRowIndex).forEach(function(row, index) {
                    var isLastRow = startRowIndex + index === table.body.length - 1;
                    var remainingSpace = getRemainingPageSpace(doc, table, isLastRow, cursor);
                    if (row.canEntireRowFit(remainingSpace, columns)) {
                      printRow(doc, table, row, cursor, columns);
                      lastPrintedRowIndex = startRowIndex + index;
                    }
                  });
                  return lastPrintedRowIndex;
                }
                function printFoot(doc, table, cursor, columns) {
                  var settings = table.settings;
                  doc.applyStyles(doc.userStyles);
                  if (settings.showFoot === "lastPage" || settings.showFoot === "everyPage") {
                    table.foot.forEach(function(row) {
                      return printRow(doc, table, row, cursor, columns);
                    });
                  }
                }
                function getRemainingLineCount(cell, remainingPageSpace, doc) {
                  var lineHeight = doc.getLineHeight(cell.styles.fontSize);
                  var vPadding = cell.padding("vertical");
                  var remainingLines = Math.floor((remainingPageSpace - vPadding) / lineHeight);
                  return Math.max(0, remainingLines);
                }
                function modifyRowToFit(row, remainingPageSpace, table, doc) {
                  var cells = {};
                  row.spansMultiplePages = true;
                  row.height = 0;
                  var rowHeight = 0;
                  for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
                    var column = _a[_i];
                    var cell = row.cells[column.index];
                    if (!cell) continue;
                    if (!Array.isArray(cell.text)) {
                      cell.text = [cell.text];
                    }
                    var remainderCell = new models_1.Cell(cell.raw, cell.styles, cell.section);
                    remainderCell = (0, polyfills_1.assign)(remainderCell, cell);
                    remainderCell.text = [];
                    var remainingLineCount = getRemainingLineCount(cell, remainingPageSpace, doc);
                    if (cell.text.length > remainingLineCount) {
                      remainderCell.text = cell.text.splice(remainingLineCount, cell.text.length);
                    }
                    var scaleFactor = doc.scaleFactor();
                    var lineHeightFactor = doc.getLineHeightFactor();
                    cell.contentHeight = cell.getContentHeight(scaleFactor, lineHeightFactor);
                    if (cell.contentHeight >= remainingPageSpace) {
                      cell.contentHeight = remainingPageSpace;
                      remainderCell.styles.minCellHeight -= remainingPageSpace;
                    }
                    if (cell.contentHeight > row.height) {
                      row.height = cell.contentHeight;
                    }
                    remainderCell.contentHeight = remainderCell.getContentHeight(scaleFactor, lineHeightFactor);
                    if (remainderCell.contentHeight > rowHeight) {
                      rowHeight = remainderCell.contentHeight;
                    }
                    cells[column.index] = remainderCell;
                  }
                  var remainderRow = new models_1.Row(row.raw, -1, row.section, cells, true);
                  remainderRow.height = rowHeight;
                  for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
                    var column = _c[_b];
                    var remainderCell = remainderRow.cells[column.index];
                    if (remainderCell) {
                      remainderCell.height = remainderRow.height;
                    }
                    var cell = row.cells[column.index];
                    if (cell) {
                      cell.height = row.height;
                    }
                  }
                  return remainderRow;
                }
                function shouldPrintOnCurrentPage(doc, row, remainingPageSpace, table) {
                  var pageHeight = doc.pageSize().height;
                  var margin = table.settings.margin;
                  var marginHeight = margin.top + margin.bottom;
                  var maxRowHeight = pageHeight - marginHeight;
                  if (row.section === "body") {
                    maxRowHeight -= table.getHeadHeight(table.columns) + table.getFootHeight(table.columns);
                  }
                  var minRowHeight = row.getMinimumRowHeight(table.columns, doc);
                  var minRowFits = minRowHeight < remainingPageSpace;
                  if (minRowHeight > maxRowHeight) {
                    console.error("Will not be able to print row ".concat(row.index, " correctly since it's minimum height is larger than page height"));
                    return true;
                  }
                  if (!minRowFits) {
                    return false;
                  }
                  var rowHasRowSpanCell = row.hasRowSpan(table.columns);
                  var rowHigherThanPage = row.getMaxCellHeight(table.columns) > maxRowHeight;
                  if (rowHigherThanPage) {
                    if (rowHasRowSpanCell) {
                      console.error("The content of row ".concat(row.index, " will not be drawn correctly since drawing rows with a height larger than the page height and has cells with rowspans is not supported."));
                    }
                    return true;
                  }
                  if (rowHasRowSpanCell) {
                    return false;
                  }
                  if (table.settings.rowPageBreak === "avoid") {
                    return false;
                  }
                  return true;
                }
                function printFullRow(doc, table, row, isLastRow, startPos, cursor, columns) {
                  var remainingSpace = getRemainingPageSpace(doc, table, isLastRow, cursor);
                  if (row.canEntireRowFit(remainingSpace, columns)) {
                    printRow(doc, table, row, cursor, columns);
                  } else if (shouldPrintOnCurrentPage(doc, row, remainingSpace, table)) {
                    var remainderRow = modifyRowToFit(row, remainingSpace, table, doc);
                    printRow(doc, table, row, cursor, columns);
                    addPage(doc, table, startPos, cursor, columns);
                    printFullRow(doc, table, remainderRow, isLastRow, startPos, cursor, columns);
                  } else {
                    addPage(doc, table, startPos, cursor, columns);
                    printFullRow(doc, table, row, isLastRow, startPos, cursor, columns);
                  }
                }
                function printRow(doc, table, row, cursor, columns) {
                  cursor.x = table.settings.margin.left;
                  for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                    var column = columns_1[_i];
                    var cell = row.cells[column.index];
                    if (!cell) {
                      cursor.x += column.width;
                      continue;
                    }
                    doc.applyStyles(cell.styles);
                    cell.x = cursor.x;
                    cell.y = cursor.y;
                    var result = table.callCellHooks(doc, table.hooks.willDrawCell, cell, row, column, cursor);
                    if (result === false) {
                      cursor.x += column.width;
                      continue;
                    }
                    drawCellRect(doc, cell, cursor);
                    var textPos = cell.getTextPos();
                    (0, autoTableText_1.default)(cell.text, textPos.x, textPos.y, {
                      halign: cell.styles.halign,
                      valign: cell.styles.valign,
                      maxWidth: Math.ceil(cell.width - cell.padding("left") - cell.padding("right"))
                    }, doc.getDocument());
                    table.callCellHooks(doc, table.hooks.didDrawCell, cell, row, column, cursor);
                    cursor.x += column.width;
                  }
                  cursor.y += row.height;
                }
                function drawCellRect(doc, cell, cursor) {
                  var cellStyles = cell.styles;
                  doc.getDocument().setFillColor(doc.getDocument().getFillColor());
                  if (typeof cellStyles.lineWidth === "number") {
                    var fillStyle = (0, common_1.getFillStyle)(cellStyles.lineWidth, cellStyles.fillColor);
                    if (fillStyle) {
                      doc.rect(cell.x, cursor.y, cell.width, cell.height, fillStyle);
                    }
                  } else if (typeof cellStyles.lineWidth === "object") {
                    if (cellStyles.fillColor) {
                      doc.rect(cell.x, cursor.y, cell.width, cell.height, "F");
                    }
                    drawCellBorders(doc, cell, cursor, cellStyles.lineWidth);
                  }
                }
                function drawCellBorders(doc, cell, cursor, lineWidth) {
                  var x1, y1, x2, y2;
                  if (lineWidth.top) {
                    x1 = cursor.x;
                    y1 = cursor.y;
                    x2 = cursor.x + cell.width;
                    y2 = cursor.y;
                    if (lineWidth.right) {
                      x2 += 0.5 * lineWidth.right;
                    }
                    if (lineWidth.left) {
                      x1 -= 0.5 * lineWidth.left;
                    }
                    drawLine(lineWidth.top, x1, y1, x2, y2);
                  }
                  if (lineWidth.bottom) {
                    x1 = cursor.x;
                    y1 = cursor.y + cell.height;
                    x2 = cursor.x + cell.width;
                    y2 = cursor.y + cell.height;
                    if (lineWidth.right) {
                      x2 += 0.5 * lineWidth.right;
                    }
                    if (lineWidth.left) {
                      x1 -= 0.5 * lineWidth.left;
                    }
                    drawLine(lineWidth.bottom, x1, y1, x2, y2);
                  }
                  if (lineWidth.left) {
                    x1 = cursor.x;
                    y1 = cursor.y;
                    x2 = cursor.x;
                    y2 = cursor.y + cell.height;
                    if (lineWidth.top) {
                      y1 -= 0.5 * lineWidth.top;
                    }
                    if (lineWidth.bottom) {
                      y2 += 0.5 * lineWidth.bottom;
                    }
                    drawLine(lineWidth.left, x1, y1, x2, y2);
                  }
                  if (lineWidth.right) {
                    x1 = cursor.x + cell.width;
                    y1 = cursor.y;
                    x2 = cursor.x + cell.width;
                    y2 = cursor.y + cell.height;
                    if (lineWidth.top) {
                      y1 -= 0.5 * lineWidth.top;
                    }
                    if (lineWidth.bottom) {
                      y2 += 0.5 * lineWidth.bottom;
                    }
                    drawLine(lineWidth.right, x1, y1, x2, y2);
                  }
                  function drawLine(width, x12, y12, x22, y22) {
                    doc.getDocument().setLineWidth(width);
                    doc.getDocument().line(x12, y12, x22, y22, "S");
                  }
                }
                function getRemainingPageSpace(doc, table, isLastRow, cursor) {
                  var bottomContentHeight = table.settings.margin.bottom;
                  var showFoot = table.settings.showFoot;
                  if (showFoot === "everyPage" || showFoot === "lastPage" && isLastRow) {
                    bottomContentHeight += table.getFootHeight(table.columns);
                  }
                  return doc.pageSize().height - cursor.y - bottomContentHeight;
                }
                function addPage(doc, table, startPos, cursor, columns, suppressFooter) {
                  if (columns === void 0) {
                    columns = [];
                  }
                  if (suppressFooter === void 0) {
                    suppressFooter = false;
                  }
                  doc.applyStyles(doc.userStyles);
                  if (table.settings.showFoot === "everyPage" && !suppressFooter) {
                    table.foot.forEach(function(row) {
                      return printRow(doc, table, row, cursor, columns);
                    });
                  }
                  table.callEndPageHooks(doc, cursor);
                  var margin = table.settings.margin;
                  (0, common_1.addTableBorder)(doc, table, startPos, cursor);
                  nextPage(doc);
                  table.pageNumber++;
                  table.pageCount++;
                  cursor.x = margin.left;
                  cursor.y = margin.top;
                  startPos.y = margin.top;
                  table.callWillDrawPageHooks(doc, cursor);
                  if (table.settings.showHead === "everyPage") {
                    table.head.forEach(function(row) {
                      return printRow(doc, table, row, cursor, columns);
                    });
                    doc.applyStyles(doc.userStyles);
                  }
                }
                exports2.addPage = addPage;
                function nextPage(doc) {
                  var current = doc.pageNumber();
                  doc.setPage(current + 1);
                  var newCurrent = doc.pageNumber();
                  if (newCurrent === current) {
                    doc.addPage();
                    return true;
                  }
                  return false;
                }
              }
            ),
            /***/
            224: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.calculateAllColumnsCanFitInPage = void 0;
                var common_1 = __webpack_require__2(420);
                function getColumnsCanFitInPage(doc, table, config) {
                  var _a;
                  if (config === void 0) {
                    config = {};
                  }
                  var remainingWidth = (0, common_1.getPageAvailableWidth)(doc, table);
                  var repeatColumnsMap = /* @__PURE__ */ new Map();
                  var colIndexes = [];
                  var columns = [];
                  var horizontalPageBreakRepeat = [];
                  table.settings.horizontalPageBreakRepeat;
                  if (Array.isArray(table.settings.horizontalPageBreakRepeat)) {
                    horizontalPageBreakRepeat = table.settings.horizontalPageBreakRepeat;
                  } else if (typeof table.settings.horizontalPageBreakRepeat === "string" || typeof table.settings.horizontalPageBreakRepeat === "number") {
                    horizontalPageBreakRepeat = [table.settings.horizontalPageBreakRepeat];
                  }
                  horizontalPageBreakRepeat.forEach(function(field) {
                    var col = table.columns.find(function(item) {
                      return item.dataKey === field || item.index === field;
                    });
                    if (col && !repeatColumnsMap.has(col.index)) {
                      repeatColumnsMap.set(col.index, true);
                      colIndexes.push(col.index);
                      columns.push(table.columns[col.index]);
                      remainingWidth -= col.wrappedWidth;
                    }
                  });
                  var first = true;
                  var i = (_a = config === null || config === void 0 ? void 0 : config.start) !== null && _a !== void 0 ? _a : 0;
                  while (i < table.columns.length) {
                    if (repeatColumnsMap.has(i)) {
                      i++;
                      continue;
                    }
                    var colWidth = table.columns[i].wrappedWidth;
                    if (first || remainingWidth >= colWidth) {
                      first = false;
                      colIndexes.push(i);
                      columns.push(table.columns[i]);
                      remainingWidth -= colWidth;
                    } else {
                      break;
                    }
                    i++;
                  }
                  return {
                    colIndexes,
                    columns,
                    lastIndex: i - 1
                  };
                }
                function calculateAllColumnsCanFitInPage(doc, table) {
                  var allResults = [];
                  for (var i = 0; i < table.columns.length; i++) {
                    var result = getColumnsCanFitInPage(doc, table, {
                      start: i
                    });
                    if (result.columns.length) {
                      allResults.push(result);
                      i = result.lastIndex;
                    }
                  }
                  return allResults;
                }
                exports2.calculateAllColumnsCanFitInPage = calculateAllColumnsCanFitInPage;
              }
            ),
            /***/
            324: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                Object.defineProperty(exports2, "__esModule", {
                  value: true
                });
                exports2.ellipsize = exports2.resizeColumns = exports2.calculateWidths = void 0;
                var common_1 = __webpack_require__2(420);
                function calculateWidths(doc, table) {
                  calculate(doc, table);
                  var resizableColumns = [];
                  var initialTableWidth = 0;
                  table.columns.forEach(function(column) {
                    var customWidth = column.getMaxCustomCellWidth(table);
                    if (customWidth) {
                      column.width = customWidth;
                    } else {
                      column.width = column.wrappedWidth;
                      resizableColumns.push(column);
                    }
                    initialTableWidth += column.width;
                  });
                  var resizeWidth = table.getWidth(doc.pageSize().width) - initialTableWidth;
                  if (resizeWidth) {
                    resizeWidth = resizeColumns(resizableColumns, resizeWidth, function(column) {
                      return Math.max(column.minReadableWidth, column.minWidth);
                    });
                  }
                  if (resizeWidth) {
                    resizeWidth = resizeColumns(resizableColumns, resizeWidth, function(column) {
                      return column.minWidth;
                    });
                  }
                  resizeWidth = Math.abs(resizeWidth);
                  if (!table.settings.horizontalPageBreak && resizeWidth > 0.1 / doc.scaleFactor()) {
                    resizeWidth = resizeWidth < 1 ? resizeWidth : Math.round(resizeWidth);
                    console.warn("Of the table content, ".concat(resizeWidth, " units width could not fit page"));
                  }
                  applyColSpans(table);
                  fitContent(table, doc);
                  applyRowSpans(table);
                }
                exports2.calculateWidths = calculateWidths;
                function calculate(doc, table) {
                  var sf = doc.scaleFactor();
                  var horizontalPageBreak = table.settings.horizontalPageBreak;
                  var availablePageWidth = (0, common_1.getPageAvailableWidth)(doc, table);
                  table.allRows().forEach(function(row) {
                    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
                      var column = _a[_i];
                      var cell = row.cells[column.index];
                      if (!cell) continue;
                      var hooks = table.hooks.didParseCell;
                      table.callCellHooks(doc, hooks, cell, row, column, null);
                      var padding = cell.padding("horizontal");
                      cell.contentWidth = (0, common_1.getStringWidth)(cell.text, cell.styles, doc) + padding;
                      var longestWordWidth = (0, common_1.getStringWidth)(cell.text.join(" ").split(/[^\S\u00A0]+/), cell.styles, doc);
                      cell.minReadableWidth = longestWordWidth + cell.padding("horizontal");
                      if (typeof cell.styles.cellWidth === "number") {
                        cell.minWidth = cell.styles.cellWidth;
                        cell.wrappedWidth = cell.styles.cellWidth;
                      } else if (cell.styles.cellWidth === "wrap" || horizontalPageBreak === true) {
                        if (cell.contentWidth > availablePageWidth) {
                          cell.minWidth = availablePageWidth;
                          cell.wrappedWidth = availablePageWidth;
                        } else {
                          cell.minWidth = cell.contentWidth;
                          cell.wrappedWidth = cell.contentWidth;
                        }
                      } else {
                        var defaultMinWidth = 10 / sf;
                        cell.minWidth = cell.styles.minCellWidth || defaultMinWidth;
                        cell.wrappedWidth = cell.contentWidth;
                        if (cell.minWidth > cell.wrappedWidth) {
                          cell.wrappedWidth = cell.minWidth;
                        }
                      }
                    }
                  });
                  table.allRows().forEach(function(row) {
                    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
                      var column = _a[_i];
                      var cell = row.cells[column.index];
                      if (cell && cell.colSpan === 1) {
                        column.wrappedWidth = Math.max(column.wrappedWidth, cell.wrappedWidth);
                        column.minWidth = Math.max(column.minWidth, cell.minWidth);
                        column.minReadableWidth = Math.max(column.minReadableWidth, cell.minReadableWidth);
                      } else {
                        var columnStyles = table.styles.columnStyles[column.dataKey] || table.styles.columnStyles[column.index] || {};
                        var cellWidth = columnStyles.cellWidth || columnStyles.minCellWidth;
                        if (cellWidth && typeof cellWidth === "number") {
                          column.minWidth = cellWidth;
                          column.wrappedWidth = cellWidth;
                        }
                      }
                      if (cell) {
                        if (cell.colSpan > 1 && !column.minWidth) {
                          column.minWidth = cell.minWidth;
                        }
                        if (cell.colSpan > 1 && !column.wrappedWidth) {
                          column.wrappedWidth = cell.minWidth;
                        }
                      }
                    }
                  });
                }
                function resizeColumns(columns, resizeWidth, getMinWidth) {
                  var initialResizeWidth = resizeWidth;
                  var sumWrappedWidth = columns.reduce(function(acc, column2) {
                    return acc + column2.wrappedWidth;
                  }, 0);
                  for (var i = 0; i < columns.length; i++) {
                    var column = columns[i];
                    var ratio = column.wrappedWidth / sumWrappedWidth;
                    var suggestedChange = initialResizeWidth * ratio;
                    var suggestedWidth = column.width + suggestedChange;
                    var minWidth = getMinWidth(column);
                    var newWidth = suggestedWidth < minWidth ? minWidth : suggestedWidth;
                    resizeWidth -= newWidth - column.width;
                    column.width = newWidth;
                  }
                  resizeWidth = Math.round(resizeWidth * 1e10) / 1e10;
                  if (resizeWidth) {
                    var resizableColumns = columns.filter(function(column2) {
                      return resizeWidth < 0 ? column2.width > getMinWidth(column2) : true;
                    });
                    if (resizableColumns.length) {
                      resizeWidth = resizeColumns(resizableColumns, resizeWidth, getMinWidth);
                    }
                  }
                  return resizeWidth;
                }
                exports2.resizeColumns = resizeColumns;
                function applyRowSpans(table) {
                  var rowSpanCells = {};
                  var colRowSpansLeft = 1;
                  var all = table.allRows();
                  for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
                    var row = all[rowIndex];
                    for (var _i = 0, _a = table.columns; _i < _a.length; _i++) {
                      var column = _a[_i];
                      var data = rowSpanCells[column.index];
                      if (colRowSpansLeft > 1) {
                        colRowSpansLeft--;
                        delete row.cells[column.index];
                      } else if (data) {
                        data.cell.height += row.height;
                        colRowSpansLeft = data.cell.colSpan;
                        delete row.cells[column.index];
                        data.left--;
                        if (data.left <= 1) {
                          delete rowSpanCells[column.index];
                        }
                      } else {
                        var cell = row.cells[column.index];
                        if (!cell) {
                          continue;
                        }
                        cell.height = row.height;
                        if (cell.rowSpan > 1) {
                          var remaining = all.length - rowIndex;
                          var left = cell.rowSpan > remaining ? remaining : cell.rowSpan;
                          rowSpanCells[column.index] = {
                            cell,
                            left,
                            row
                          };
                        }
                      }
                    }
                  }
                }
                function applyColSpans(table) {
                  var all = table.allRows();
                  for (var rowIndex = 0; rowIndex < all.length; rowIndex++) {
                    var row = all[rowIndex];
                    var colSpanCell = null;
                    var combinedColSpanWidth = 0;
                    var colSpansLeft = 0;
                    for (var columnIndex = 0; columnIndex < table.columns.length; columnIndex++) {
                      var column = table.columns[columnIndex];
                      colSpansLeft -= 1;
                      if (colSpansLeft > 1 && table.columns[columnIndex + 1]) {
                        combinedColSpanWidth += column.width;
                        delete row.cells[column.index];
                      } else if (colSpanCell) {
                        var cell = colSpanCell;
                        delete row.cells[column.index];
                        colSpanCell = null;
                        cell.width = column.width + combinedColSpanWidth;
                      } else {
                        var cell = row.cells[column.index];
                        if (!cell) continue;
                        colSpansLeft = cell.colSpan;
                        combinedColSpanWidth = 0;
                        if (cell.colSpan > 1) {
                          colSpanCell = cell;
                          combinedColSpanWidth += column.width;
                          continue;
                        }
                        cell.width = column.width + combinedColSpanWidth;
                      }
                    }
                  }
                }
                function fitContent(table, doc) {
                  var rowSpanHeight = {
                    count: 0,
                    height: 0
                  };
                  for (var _i = 0, _a = table.allRows(); _i < _a.length; _i++) {
                    var row = _a[_i];
                    for (var _b = 0, _c = table.columns; _b < _c.length; _b++) {
                      var column = _c[_b];
                      var cell = row.cells[column.index];
                      if (!cell) continue;
                      doc.applyStyles(cell.styles, true);
                      var textSpace = cell.width - cell.padding("horizontal");
                      if (cell.styles.overflow === "linebreak") {
                        cell.text = doc.splitTextToSize(cell.text, textSpace + 1 / doc.scaleFactor(), {
                          fontSize: cell.styles.fontSize
                        });
                      } else if (cell.styles.overflow === "ellipsize") {
                        cell.text = ellipsize(cell.text, textSpace, cell.styles, doc, "...");
                      } else if (cell.styles.overflow === "hidden") {
                        cell.text = ellipsize(cell.text, textSpace, cell.styles, doc, "");
                      } else if (typeof cell.styles.overflow === "function") {
                        var result = cell.styles.overflow(cell.text, textSpace);
                        if (typeof result === "string") {
                          cell.text = [result];
                        } else {
                          cell.text = result;
                        }
                      }
                      cell.contentHeight = cell.getContentHeight(doc.scaleFactor(), doc.getLineHeightFactor());
                      var realContentHeight = cell.contentHeight / cell.rowSpan;
                      if (cell.rowSpan > 1 && rowSpanHeight.count * rowSpanHeight.height < realContentHeight * cell.rowSpan) {
                        rowSpanHeight = {
                          height: realContentHeight,
                          count: cell.rowSpan
                        };
                      } else if (rowSpanHeight && rowSpanHeight.count > 0) {
                        if (rowSpanHeight.height > realContentHeight) {
                          realContentHeight = rowSpanHeight.height;
                        }
                      }
                      if (realContentHeight > row.height) {
                        row.height = realContentHeight;
                      }
                    }
                    rowSpanHeight.count--;
                  }
                }
                function ellipsize(text, width, styles, doc, overflow) {
                  return text.map(function(str) {
                    return ellipsizeStr(str, width, styles, doc, overflow);
                  });
                }
                exports2.ellipsize = ellipsize;
                function ellipsizeStr(text, width, styles, doc, overflow) {
                  var precision = 1e4 * doc.scaleFactor();
                  width = Math.ceil(width * precision) / precision;
                  if (width >= (0, common_1.getStringWidth)(text, styles, doc)) {
                    return text;
                  }
                  while (width < (0, common_1.getStringWidth)(text + overflow, styles, doc)) {
                    if (text.length <= 1) {
                      break;
                    }
                    text = text.substring(0, text.length - 1);
                  }
                  return text.trim() + overflow;
                }
              }
            ),
            /***/
            964: (
              /***/
              function(module2) {
                if (typeof __WEBPACK_EXTERNAL_MODULE__964__ === "undefined") {
                  var e = new Error("Cannot find module 'undefined'");
                  e.code = "MODULE_NOT_FOUND";
                  throw e;
                }
                module2.exports = __WEBPACK_EXTERNAL_MODULE__964__;
              }
            )
            /******/
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              /******/
              // no module.id needed
              /******/
              // no module.loaded needed
              /******/
              exports: {}
              /******/
            };
            __webpack_modules__[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          var __webpack_exports__ = {};
          !function() {
            var exports2 = __webpack_exports__;
            Object.defineProperty(exports2, "__esModule", {
              value: true
            });
            exports2.Cell = exports2.Column = exports2.Row = exports2.Table = exports2.CellHookData = exports2.__drawTable = exports2.__createTable = exports2.applyPlugin = void 0;
            var applyPlugin_1 = __webpack_require__(340);
            var inputParser_1 = __webpack_require__(776);
            var tableDrawer_1 = __webpack_require__(664);
            var tableCalculator_1 = __webpack_require__(972);
            var models_1 = __webpack_require__(260);
            Object.defineProperty(exports2, "Table", {
              enumerable: true,
              get: function() {
                return models_1.Table;
              }
            });
            var HookData_1 = __webpack_require__(172);
            Object.defineProperty(exports2, "CellHookData", {
              enumerable: true,
              get: function() {
                return HookData_1.CellHookData;
              }
            });
            var models_2 = __webpack_require__(260);
            Object.defineProperty(exports2, "Cell", {
              enumerable: true,
              get: function() {
                return models_2.Cell;
              }
            });
            Object.defineProperty(exports2, "Column", {
              enumerable: true,
              get: function() {
                return models_2.Column;
              }
            });
            Object.defineProperty(exports2, "Row", {
              enumerable: true,
              get: function() {
                return models_2.Row;
              }
            });
            function applyPlugin(jsPDF2) {
              (0, applyPlugin_1.default)(jsPDF2);
            }
            exports2.applyPlugin = applyPlugin;
            function autoTable(d, options) {
              var input = (0, inputParser_1.parseInput)(d, options);
              var table = (0, tableCalculator_1.createTable)(d, input);
              (0, tableDrawer_1.drawTable)(d, table);
            }
            function __createTable(d, options) {
              var input = (0, inputParser_1.parseInput)(d, options);
              return (0, tableCalculator_1.createTable)(d, input);
            }
            exports2.__createTable = __createTable;
            function __drawTable(d, table) {
              (0, tableDrawer_1.drawTable)(d, table);
            }
            exports2.__drawTable = __drawTable;
            try {
              var jsPDF = __webpack_require__(964);
              if (jsPDF.jsPDF) jsPDF = jsPDF.jsPDF;
              applyPlugin(jsPDF);
            } catch (error) {
            }
            exports2["default"] = autoTable;
          }();
          return __webpack_exports__;
        }()
      );
    });
  }
});
export default require_jspdf_plugin_autotable();
/*! Bundled license information:

jspdf-autotable/dist/jspdf.plugin.autotable.js:
  (*!
   * 
   *               jsPDF AutoTable plugin v3.8.4
   *
   *               Copyright (c) 2024 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable
   *               Licensed under the MIT License.
   *               http://opensource.org/licenses/mit-license
   *
   *)
*/
//# sourceMappingURL=jspdf-autotable.js.map
