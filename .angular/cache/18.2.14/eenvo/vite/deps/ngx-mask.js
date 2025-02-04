import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from "./chunk-4IAMNEXC.js";
import {
  DOCUMENT
} from "./chunk-G2FHBYCL.js";
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  InjectionToken,
  Input,
  Output,
  Pipe,
  Renderer2,
  inject,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵgetInheritedFactory,
  ɵɵlistener
} from "./chunk-SZFXRLZD.js";
import "./chunk-UG3XN6F5.js";
import "./chunk-K3IIKLCY.js";
import "./chunk-WISTXZPE.js";
import {
  __async,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-RXHPGQPJ.js";

// node_modules/ngx-mask/fesm2022/ngx-mask.mjs
var MaskExpression;
(function(MaskExpression2) {
  MaskExpression2["SEPARATOR"] = "separator";
  MaskExpression2["PERCENT"] = "percent";
  MaskExpression2["IP"] = "IP";
  MaskExpression2["CPF_CNPJ"] = "CPF_CNPJ";
  MaskExpression2["MONTH"] = "M";
  MaskExpression2["MONTHS"] = "M0";
  MaskExpression2["MINUTE"] = "m";
  MaskExpression2["HOUR"] = "h";
  MaskExpression2["HOURS"] = "H";
  MaskExpression2["MINUTES"] = "m0";
  MaskExpression2["HOURS_HOUR"] = "Hh";
  MaskExpression2["SECONDS"] = "s0";
  MaskExpression2["HOURS_MINUTES_SECONDS"] = "Hh:m0:s0";
  MaskExpression2["EMAIL_MASK"] = "A*@A*.A*";
  MaskExpression2["HOURS_MINUTES"] = "Hh:m0";
  MaskExpression2["MINUTES_SECONDS"] = "m0:s0";
  MaskExpression2["DAYS_MONTHS_YEARS"] = "d0/M0/0000";
  MaskExpression2["DAYS_MONTHS"] = "d0/M0";
  MaskExpression2["DAYS"] = "d0";
  MaskExpression2["DAY"] = "d";
  MaskExpression2["SECOND"] = "s";
  MaskExpression2["LETTER_S"] = "S";
  MaskExpression2["DOT"] = ".";
  MaskExpression2["COMMA"] = ",";
  MaskExpression2["CURLY_BRACKETS_LEFT"] = "{";
  MaskExpression2["CURLY_BRACKETS_RIGHT"] = "}";
  MaskExpression2["MINUS"] = "-";
  MaskExpression2["OR"] = "||";
  MaskExpression2["HASH"] = "#";
  MaskExpression2["EMPTY_STRING"] = "";
  MaskExpression2["SYMBOL_STAR"] = "*";
  MaskExpression2["SYMBOL_QUESTION"] = "?";
  MaskExpression2["SLASH"] = "/";
  MaskExpression2["WHITE_SPACE"] = " ";
  MaskExpression2["NUMBER_ZERO"] = "0";
  MaskExpression2["NUMBER_NINE"] = "9";
  MaskExpression2["BACKSPACE"] = "Backspace";
  MaskExpression2["DELETE"] = "Delete";
  MaskExpression2["ARROW_LEFT"] = "ArrowLeft";
  MaskExpression2["ARROW_UP"] = "ArrowUp";
  MaskExpression2["DOUBLE_ZERO"] = "00";
})(MaskExpression || (MaskExpression = {}));
var NGX_MASK_CONFIG = new InjectionToken("ngx-mask config");
var NEW_CONFIG = new InjectionToken("new ngx-mask config");
var INITIAL_CONFIG = new InjectionToken("initial ngx-mask config");
var initialConfig = {
  suffix: "",
  prefix: "",
  thousandSeparator: " ",
  decimalMarker: [".", ","],
  clearIfNotMatch: false,
  showTemplate: false,
  showMaskTyped: false,
  placeHolderCharacter: "_",
  dropSpecialCharacters: true,
  hiddenInput: null,
  shownMaskExpression: "",
  separatorLimit: "",
  allowNegativeNumbers: false,
  validation: true,
  specialCharacters: ["-", "/", "(", ")", ".", ":", " ", "+", ",", "@", "[", "]", '"', "'"],
  leadZeroDateTime: false,
  apm: false,
  leadZero: false,
  keepCharacterPositions: false,
  triggerOnMaskChange: false,
  inputTransformFn: (value) => value,
  outputTransformFn: (value) => value,
  maskFilled: new EventEmitter(),
  patterns: {
    "0": {
      pattern: new RegExp("\\d")
    },
    "9": {
      pattern: new RegExp("\\d"),
      optional: true
    },
    X: {
      pattern: new RegExp("\\d"),
      symbol: "*"
    },
    A: {
      pattern: new RegExp("[a-zA-Z0-9]")
    },
    S: {
      pattern: new RegExp("[a-zA-Z]")
    },
    U: {
      pattern: new RegExp("[A-Z]")
    },
    L: {
      pattern: new RegExp("[a-z]")
    },
    d: {
      pattern: new RegExp("\\d")
    },
    m: {
      pattern: new RegExp("\\d")
    },
    M: {
      pattern: new RegExp("\\d")
    },
    H: {
      pattern: new RegExp("\\d")
    },
    h: {
      pattern: new RegExp("\\d")
    },
    s: {
      pattern: new RegExp("\\d")
    }
  }
};
var timeMasks = [MaskExpression.HOURS_MINUTES_SECONDS, MaskExpression.HOURS_MINUTES, MaskExpression.MINUTES_SECONDS];
var withoutValidation = [MaskExpression.PERCENT, MaskExpression.HOURS_HOUR, MaskExpression.SECONDS, MaskExpression.MINUTES, MaskExpression.SEPARATOR, MaskExpression.DAYS_MONTHS_YEARS, MaskExpression.DAYS_MONTHS, MaskExpression.DAYS, MaskExpression.MONTHS];
var NgxMaskApplierService = class _NgxMaskApplierService {
  _config = inject(NGX_MASK_CONFIG);
  dropSpecialCharacters = this._config.dropSpecialCharacters;
  hiddenInput = this._config.hiddenInput;
  showTemplate;
  clearIfNotMatch = this._config.clearIfNotMatch;
  specialCharacters = this._config.specialCharacters;
  patterns = this._config.patterns;
  prefix = this._config.prefix;
  suffix = this._config.suffix;
  thousandSeparator = this._config.thousandSeparator;
  decimalMarker = this._config.decimalMarker;
  customPattern;
  showMaskTyped = this._config.showMaskTyped;
  placeHolderCharacter = this._config.placeHolderCharacter;
  validation = this._config.validation;
  separatorLimit = this._config.separatorLimit;
  allowNegativeNumbers = this._config.allowNegativeNumbers;
  leadZeroDateTime = this._config.leadZeroDateTime;
  leadZero = this._config.leadZero;
  apm = this._config.apm;
  inputTransformFn = this._config.inputTransformFn;
  outputTransformFn = this._config.outputTransformFn;
  keepCharacterPositions = this._config.keepCharacterPositions;
  _shift = /* @__PURE__ */ new Set();
  plusOnePosition = false;
  maskExpression = "";
  actualValue = "";
  showKeepCharacterExp = "";
  shownMaskExpression = "";
  deletedSpecialCharacter = false;
  ipError;
  cpfCnpjError;
  applyMaskWithPattern(inputValue, maskAndPattern) {
    const [mask, customPattern] = maskAndPattern;
    this.customPattern = customPattern;
    return this.applyMask(inputValue, mask);
  }
  applyMask(inputValue, maskExpression, position = 0, justPasted = false, backspaced = false, cb = () => {
  }) {
    if (!maskExpression || typeof inputValue !== "string") {
      return MaskExpression.EMPTY_STRING;
    }
    let cursor = 0;
    let result = "";
    let multi = false;
    let backspaceShift = false;
    let shift = 1;
    let stepBack = false;
    let processedValue = inputValue;
    let processedPosition = position;
    if (processedValue.slice(0, this.prefix.length) === this.prefix) {
      processedValue = processedValue.slice(this.prefix.length, processedValue.length);
    }
    if (!!this.suffix && processedValue.length > 0) {
      processedValue = this.checkAndRemoveSuffix(processedValue);
    }
    if (processedValue === "(" && this.prefix) {
      processedValue = "";
    }
    const inputArray = processedValue.toString().split(MaskExpression.EMPTY_STRING);
    if (this.allowNegativeNumbers && processedValue.slice(cursor, cursor + 1) === MaskExpression.MINUS) {
      result += processedValue.slice(cursor, cursor + 1);
    }
    if (maskExpression === MaskExpression.IP) {
      const valuesIP = processedValue.split(MaskExpression.DOT);
      this.ipError = this._validIP(valuesIP);
      maskExpression = "099.099.099.099";
    }
    const arr = [];
    for (let i = 0; i < processedValue.length; i++) {
      if (processedValue[i]?.match("\\d")) {
        arr.push(processedValue[i] ?? MaskExpression.EMPTY_STRING);
      }
    }
    if (maskExpression === MaskExpression.CPF_CNPJ) {
      this.cpfCnpjError = arr.length !== 11 && arr.length !== 14;
      if (arr.length > 11) {
        maskExpression = "00.000.000/0000-00";
      } else {
        maskExpression = "000.000.000-00";
      }
    }
    if (maskExpression.startsWith(MaskExpression.PERCENT)) {
      if (processedValue.match("[a-z]|[A-Z]") || processedValue.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/.]/) && !backspaced) {
        processedValue = this._stripToDecimal(processedValue);
        const precision = this.getPrecision(maskExpression);
        processedValue = this.checkInputPrecision(processedValue, precision, this.decimalMarker);
      }
      const decimalMarker = typeof this.decimalMarker === "string" ? this.decimalMarker : MaskExpression.DOT;
      if (processedValue.indexOf(decimalMarker) > 0 && !this.percentage(processedValue.substring(0, processedValue.indexOf(decimalMarker)))) {
        let base = processedValue.substring(0, processedValue.indexOf(decimalMarker) - 1);
        if (this.allowNegativeNumbers && processedValue.slice(cursor, cursor + 1) === MaskExpression.MINUS && !backspaced) {
          base = processedValue.substring(0, processedValue.indexOf(decimalMarker));
        }
        processedValue = `${base}${processedValue.substring(processedValue.indexOf(decimalMarker), processedValue.length)}`;
      }
      let value = "";
      this.allowNegativeNumbers && processedValue.slice(cursor, cursor + 1) === MaskExpression.MINUS ? value = `${MaskExpression.MINUS}${processedValue.slice(cursor + 1, cursor + processedValue.length)}` : value = processedValue;
      if (this.percentage(value)) {
        result = this._splitPercentZero(processedValue);
      } else {
        result = this._splitPercentZero(processedValue.substring(0, processedValue.length - 1));
      }
    } else if (maskExpression.startsWith(MaskExpression.SEPARATOR)) {
      if (processedValue.match("[wа-яА-Я]") || processedValue.match("[ЁёА-я]") || processedValue.match("[a-z]|[A-Z]") || processedValue.match(/[-@#!$%\\^&*()_£¬'+|~=`{}\]:";<>.?/]/) || processedValue.match("[^A-Za-z0-9,]")) {
        processedValue = this._stripToDecimal(processedValue);
      }
      const precision = this.getPrecision(maskExpression);
      const decimalMarker = Array.isArray(this.decimalMarker) ? this.thousandSeparator === MaskExpression.DOT ? MaskExpression.COMMA : MaskExpression.DOT : this.decimalMarker;
      if (precision === 0) {
        processedValue = this.allowNegativeNumbers ? processedValue.length > 2 && processedValue[0] === MaskExpression.MINUS && processedValue[1] === MaskExpression.NUMBER_ZERO && processedValue[2] !== this.thousandSeparator && processedValue[2] !== MaskExpression.COMMA && processedValue[2] !== MaskExpression.DOT ? "-" + processedValue.slice(2, processedValue.length) : processedValue[0] === MaskExpression.NUMBER_ZERO && processedValue.length > 1 && processedValue[1] !== this.thousandSeparator && processedValue[1] !== MaskExpression.COMMA && processedValue[1] !== MaskExpression.DOT ? processedValue.slice(1, processedValue.length) : processedValue : processedValue.length > 1 && processedValue[0] === MaskExpression.NUMBER_ZERO && processedValue[1] !== this.thousandSeparator && processedValue[1] !== MaskExpression.COMMA && processedValue[1] !== MaskExpression.DOT ? processedValue.slice(1, processedValue.length) : processedValue;
      } else {
        if (processedValue[0] === decimalMarker && processedValue.length > 1) {
          processedValue = MaskExpression.NUMBER_ZERO + processedValue.slice(0, processedValue.length + 1);
          this.plusOnePosition = true;
        }
        if (processedValue[0] === MaskExpression.NUMBER_ZERO && processedValue[1] !== decimalMarker && processedValue[1] !== this.thousandSeparator) {
          processedValue = processedValue.length > 1 ? processedValue.slice(0, 1) + decimalMarker + processedValue.slice(1, processedValue.length + 1) : processedValue;
          this.plusOnePosition = true;
        }
        if (this.allowNegativeNumbers && processedValue[0] === MaskExpression.MINUS && (processedValue[1] === decimalMarker || processedValue[1] === MaskExpression.NUMBER_ZERO)) {
          processedValue = processedValue[1] === decimalMarker && processedValue.length > 2 ? processedValue.slice(0, 1) + MaskExpression.NUMBER_ZERO + processedValue.slice(1, processedValue.length) : processedValue[1] === MaskExpression.NUMBER_ZERO && processedValue.length > 2 && processedValue[2] !== decimalMarker ? processedValue.slice(0, 2) + decimalMarker + processedValue.slice(2, processedValue.length) : processedValue;
          this.plusOnePosition = true;
        }
      }
      if (backspaced) {
        const inputValueAfterZero = processedValue.slice(this._findFirstNonZeroDigitIndex(processedValue), processedValue.length);
        const positionOfZeroOrDecimalMarker = processedValue[processedPosition] === MaskExpression.NUMBER_ZERO || processedValue[processedPosition] === decimalMarker;
        const zeroIndexNumberZero = processedValue[0] === MaskExpression.NUMBER_ZERO;
        const zeroIndexMinus = processedValue[0] === MaskExpression.MINUS;
        const zeroIndexThousand = processedValue[0] === this.thousandSeparator;
        const firstIndexDecimalMarker = processedValue[1] === decimalMarker;
        const firstIndexNumberZero = processedValue[1] === MaskExpression.NUMBER_ZERO;
        const secondIndexDecimalMarker = processedValue[2] === decimalMarker;
        if (zeroIndexNumberZero && firstIndexDecimalMarker && positionOfZeroOrDecimalMarker && processedPosition < 2) {
          processedValue = inputValueAfterZero;
        }
        if (zeroIndexMinus && firstIndexNumberZero && secondIndexDecimalMarker && positionOfZeroOrDecimalMarker && processedPosition < 3) {
          processedValue = MaskExpression.MINUS + inputValueAfterZero;
        }
        if (inputValueAfterZero !== MaskExpression.MINUS && (processedPosition === 0 && (zeroIndexNumberZero || zeroIndexThousand) || this.allowNegativeNumbers && processedPosition === 1 && zeroIndexMinus && !firstIndexNumberZero)) {
          processedValue = zeroIndexMinus ? MaskExpression.MINUS + inputValueAfterZero : inputValueAfterZero;
        }
      }
      const thousandSeparatorCharEscaped = this._charToRegExpExpression(this.thousandSeparator);
      let invalidChars = '@#!$%^&*()_+|~=`{}\\[\\]:\\s,\\.";<>?\\/'.replace(thousandSeparatorCharEscaped, "");
      if (Array.isArray(this.decimalMarker)) {
        for (const marker of this.decimalMarker) {
          invalidChars = invalidChars.replace(this._charToRegExpExpression(marker), MaskExpression.EMPTY_STRING);
        }
      } else {
        invalidChars = invalidChars.replace(this._charToRegExpExpression(this.decimalMarker), "");
      }
      const invalidCharRegexp = new RegExp("[" + invalidChars + "]");
      if (processedValue.match(invalidCharRegexp)) {
        processedValue = processedValue.substring(0, processedValue.length - 1);
      }
      processedValue = this.checkInputPrecision(processedValue, precision, this.decimalMarker);
      const strForSep = processedValue.replace(new RegExp(thousandSeparatorCharEscaped, "g"), "");
      result = this._formatWithSeparators(strForSep, this.thousandSeparator, this.decimalMarker, precision);
      const commaShift = result.indexOf(MaskExpression.COMMA) - processedValue.indexOf(MaskExpression.COMMA);
      const shiftStep = result.length - processedValue.length;
      const backspacedDecimalMarkerWithSeparatorLimit = backspaced && result.length < inputValue.length && this.separatorLimit;
      if ((result[processedPosition - 1] === this.thousandSeparator || result[processedPosition - this.prefix.length]) && this.prefix && backspaced) {
        processedPosition = processedPosition - 1;
      } else if (shiftStep > 0 && result[processedPosition] !== this.thousandSeparator || backspacedDecimalMarkerWithSeparatorLimit) {
        backspaceShift = true;
        let _shift = 0;
        do {
          this._shift.add(processedPosition + _shift);
          _shift++;
        } while (_shift < shiftStep);
      } else if (result[processedPosition - 1] === this.thousandSeparator || shiftStep === -4 || shiftStep === -3 || result[processedPosition] === this.thousandSeparator) {
        this._shift.clear();
        this._shift.add(processedPosition - 1);
      } else if (commaShift !== 0 && processedPosition > 0 && !(result.indexOf(MaskExpression.COMMA) >= processedPosition && processedPosition > 3) || !(result.indexOf(MaskExpression.DOT) >= processedPosition && processedPosition > 3) && shiftStep <= 0) {
        this._shift.clear();
        backspaceShift = true;
        shift = shiftStep;
        processedPosition += shiftStep;
        this._shift.add(processedPosition);
      } else {
        this._shift.clear();
      }
    } else {
      for (let i = 0, inputSymbol = inputArray[0]; i < inputArray.length; i++, inputSymbol = inputArray[i] ?? MaskExpression.EMPTY_STRING) {
        if (cursor === maskExpression.length) {
          break;
        }
        const symbolStarInPattern = MaskExpression.SYMBOL_STAR in this.patterns;
        if (this._checkSymbolMask(inputSymbol, maskExpression[cursor] ?? MaskExpression.EMPTY_STRING) && maskExpression[cursor + 1] === MaskExpression.SYMBOL_QUESTION) {
          result += inputSymbol;
          cursor += 2;
        } else if (maskExpression[cursor + 1] === MaskExpression.SYMBOL_STAR && multi && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2] ?? MaskExpression.EMPTY_STRING)) {
          result += inputSymbol;
          cursor += 3;
          multi = false;
        } else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor] ?? MaskExpression.EMPTY_STRING) && maskExpression[cursor + 1] === MaskExpression.SYMBOL_STAR && !symbolStarInPattern) {
          result += inputSymbol;
          multi = true;
        } else if (maskExpression[cursor + 1] === MaskExpression.SYMBOL_QUESTION && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2] ?? MaskExpression.EMPTY_STRING)) {
          result += inputSymbol;
          cursor += 3;
        } else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor] ?? MaskExpression.EMPTY_STRING)) {
          if (maskExpression[cursor] === MaskExpression.HOURS) {
            if (this.apm ? Number(inputSymbol) > 9 : Number(inputSymbol) > 2) {
              processedPosition = !this.leadZeroDateTime ? processedPosition + 1 : processedPosition;
              cursor += 1;
              this._shiftStep(maskExpression, cursor, inputArray.length);
              i--;
              if (this.leadZeroDateTime) {
                result += "0";
              }
              continue;
            }
          }
          if (maskExpression[cursor] === MaskExpression.HOUR) {
            if (this.apm ? result.length === 1 && Number(result) > 1 || result === "1" && Number(inputSymbol) > 2 || processedValue.slice(cursor - 1, cursor).length === 1 && Number(processedValue.slice(cursor - 1, cursor)) > 2 || processedValue.slice(cursor - 1, cursor) === "1" && Number(inputSymbol) > 2 : result === "2" && Number(inputSymbol) > 3 || (result.slice(cursor - 2, cursor) === "2" || result.slice(cursor - 3, cursor) === "2" || result.slice(cursor - 4, cursor) === "2" || result.slice(cursor - 1, cursor) === "2") && Number(inputSymbol) > 3 && cursor > 10) {
              processedPosition = processedPosition + 1;
              cursor += 1;
              i--;
              continue;
            }
          }
          if (maskExpression[cursor] === MaskExpression.MINUTE || maskExpression[cursor] === MaskExpression.SECOND) {
            if (Number(inputSymbol) > 5) {
              processedPosition = !this.leadZeroDateTime ? processedPosition + 1 : processedPosition;
              cursor += 1;
              this._shiftStep(maskExpression, cursor, inputArray.length);
              i--;
              if (this.leadZeroDateTime) {
                result += "0";
              }
              continue;
            }
          }
          const daysCount = 31;
          const inputValueCursor = processedValue[cursor];
          const inputValueCursorPlusOne = processedValue[cursor + 1];
          const inputValueCursorPlusTwo = processedValue[cursor + 2];
          const inputValueCursorMinusOne = processedValue[cursor - 1];
          const inputValueCursorMinusTwo = processedValue[cursor - 2];
          const inputValueSliceMinusThreeMinusOne = processedValue.slice(cursor - 3, cursor - 1);
          const inputValueSliceMinusOnePlusOne = processedValue.slice(cursor - 1, cursor + 1);
          const inputValueSliceCursorPlusTwo = processedValue.slice(cursor, cursor + 2);
          const inputValueSliceMinusTwoCursor = processedValue.slice(cursor - 2, cursor);
          if (maskExpression[cursor] === MaskExpression.DAY) {
            const maskStartWithMonth = maskExpression.slice(0, 2) === MaskExpression.MONTHS;
            const startWithMonthInput = maskExpression.slice(0, 2) === MaskExpression.MONTHS && this.specialCharacters.includes(inputValueCursorMinusTwo);
            if (Number(inputSymbol) > 3 && this.leadZeroDateTime || !maskStartWithMonth && (Number(inputValueSliceCursorPlusTwo) > daysCount || Number(inputValueSliceMinusOnePlusOne) > daysCount || this.specialCharacters.includes(inputValueCursorPlusOne)) || (startWithMonthInput ? Number(inputValueSliceMinusOnePlusOne) > daysCount || !this.specialCharacters.includes(inputValueCursor) && this.specialCharacters.includes(inputValueCursorPlusTwo) || this.specialCharacters.includes(inputValueCursor) : Number(inputValueSliceCursorPlusTwo) > daysCount || this.specialCharacters.includes(inputValueCursorPlusOne) && !backspaced)) {
              processedPosition = !this.leadZeroDateTime ? processedPosition + 1 : processedPosition;
              cursor += 1;
              this._shiftStep(maskExpression, cursor, inputArray.length);
              i--;
              if (this.leadZeroDateTime) {
                result += "0";
              }
              continue;
            }
          }
          if (maskExpression[cursor] === MaskExpression.MONTH) {
            const monthsCount = 12;
            const withoutDays = cursor === 0 && (Number(inputSymbol) > 2 || Number(inputValueSliceCursorPlusTwo) > monthsCount || this.specialCharacters.includes(inputValueCursorPlusOne) && !backspaced);
            const specialChart = maskExpression.slice(cursor + 2, cursor + 3);
            const day1monthInput = inputValueSliceMinusThreeMinusOne.includes(specialChart) && maskExpression.includes("d0") && (this.specialCharacters.includes(inputValueCursorMinusTwo) && Number(inputValueSliceMinusOnePlusOne) > monthsCount && !this.specialCharacters.includes(inputValueCursor) || this.specialCharacters.includes(inputValueCursor));
            const day2monthInput = Number(inputValueSliceMinusThreeMinusOne) <= daysCount && !this.specialCharacters.includes(inputValueSliceMinusThreeMinusOne) && this.specialCharacters.includes(inputValueCursorMinusOne) && (Number(inputValueSliceCursorPlusTwo) > monthsCount || this.specialCharacters.includes(inputValueCursorPlusOne));
            const day2monthInputDot = Number(inputValueSliceCursorPlusTwo) > monthsCount && cursor === 5 || this.specialCharacters.includes(inputValueCursorPlusOne) && cursor === 5;
            const day1monthPaste = Number(inputValueSliceMinusThreeMinusOne) > daysCount && !this.specialCharacters.includes(inputValueSliceMinusThreeMinusOne) && !this.specialCharacters.includes(inputValueSliceMinusTwoCursor) && Number(inputValueSliceMinusTwoCursor) > monthsCount && maskExpression.includes("d0");
            const day2monthPaste = Number(inputValueSliceMinusThreeMinusOne) <= daysCount && !this.specialCharacters.includes(inputValueSliceMinusThreeMinusOne) && !this.specialCharacters.includes(inputValueCursorMinusOne) && Number(inputValueSliceMinusOnePlusOne) > monthsCount;
            if (Number(inputSymbol) > 1 && this.leadZeroDateTime || withoutDays || day1monthInput || day2monthPaste || day1monthPaste || day2monthInput || day2monthInputDot && !this.leadZeroDateTime) {
              processedPosition = !this.leadZeroDateTime ? processedPosition + 1 : processedPosition;
              cursor += 1;
              this._shiftStep(maskExpression, cursor, inputArray.length);
              i--;
              if (this.leadZeroDateTime) {
                result += "0";
              }
              continue;
            }
          }
          result += inputSymbol;
          cursor++;
        } else if (this.specialCharacters.includes(inputSymbol) && maskExpression[cursor] === inputSymbol) {
          result += inputSymbol;
          cursor++;
        } else if (this.specialCharacters.indexOf(maskExpression[cursor] ?? MaskExpression.EMPTY_STRING) !== -1) {
          result += maskExpression[cursor];
          cursor++;
          this._shiftStep(maskExpression, cursor, inputArray.length);
          i--;
        } else if (maskExpression[cursor] === MaskExpression.NUMBER_NINE && this.showMaskTyped) {
          this._shiftStep(maskExpression, cursor, inputArray.length);
        } else if (this.patterns[maskExpression[cursor] ?? MaskExpression.EMPTY_STRING] && this.patterns[maskExpression[cursor] ?? MaskExpression.EMPTY_STRING]?.optional) {
          if (!!inputArray[cursor] && maskExpression !== "099.099.099.099" && maskExpression !== "000.000.000-00" && maskExpression !== "00.000.000/0000-00" && !maskExpression.match(/^9+\.0+$/) && !this.patterns[maskExpression[cursor] ?? MaskExpression.EMPTY_STRING]?.optional) {
            result += inputArray[cursor];
          }
          if (maskExpression.includes(MaskExpression.NUMBER_NINE + MaskExpression.SYMBOL_STAR) && maskExpression.includes(MaskExpression.NUMBER_ZERO + MaskExpression.SYMBOL_STAR)) {
            cursor++;
          }
          cursor++;
          i--;
        } else if (this.maskExpression[cursor + 1] === MaskExpression.SYMBOL_STAR && this._findSpecialChar(this.maskExpression[cursor + 2] ?? MaskExpression.EMPTY_STRING) && this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] && multi) {
          cursor += 3;
          result += inputSymbol;
        } else if (this.maskExpression[cursor + 1] === MaskExpression.SYMBOL_QUESTION && this._findSpecialChar(this.maskExpression[cursor + 2] ?? MaskExpression.EMPTY_STRING) && this._findSpecialChar(inputSymbol) === this.maskExpression[cursor + 2] && multi) {
          cursor += 3;
          result += inputSymbol;
        } else if (this.showMaskTyped && this.specialCharacters.indexOf(inputSymbol) < 0 && inputSymbol !== this.placeHolderCharacter && this.placeHolderCharacter.length === 1) {
          stepBack = true;
        }
      }
    }
    if (result.length + 1 === maskExpression.length && this.specialCharacters.indexOf(maskExpression[maskExpression.length - 1] ?? MaskExpression.EMPTY_STRING) !== -1) {
      result += maskExpression[maskExpression.length - 1];
    }
    let newPosition = processedPosition + 1;
    while (this._shift.has(newPosition)) {
      shift++;
      newPosition++;
    }
    let actualShift = justPasted && !maskExpression.startsWith(MaskExpression.SEPARATOR) ? cursor : this._shift.has(processedPosition) ? shift : 0;
    if (stepBack) {
      actualShift--;
    }
    cb(actualShift, backspaceShift);
    if (shift < 0) {
      this._shift.clear();
    }
    let onlySpecial = false;
    if (backspaced) {
      onlySpecial = inputArray.every((char) => this.specialCharacters.includes(char));
    }
    let res = `${this.prefix}${onlySpecial ? MaskExpression.EMPTY_STRING : result}${this.showMaskTyped ? "" : this.suffix}`;
    if (result.length === 0) {
      res = !this.dropSpecialCharacters ? `${this.prefix}${result}` : `${result}`;
    }
    const isSpecialCharacterMaskFirstSymbol = processedValue.length === 1 && this.specialCharacters.includes(maskExpression[0]) && processedValue !== maskExpression[0];
    if (!this._checkSymbolMask(processedValue, maskExpression[1]) && isSpecialCharacterMaskFirstSymbol) {
      return "";
    }
    if (result.includes(MaskExpression.MINUS) && this.prefix && this.allowNegativeNumbers) {
      if (backspaced && result === MaskExpression.MINUS) {
        return "";
      }
      res = `${MaskExpression.MINUS}${this.prefix}${result.split(MaskExpression.MINUS).join(MaskExpression.EMPTY_STRING)}${this.suffix}`;
    }
    return res;
  }
  _findDropSpecialChar(inputSymbol) {
    if (Array.isArray(this.dropSpecialCharacters)) {
      return this.dropSpecialCharacters.find((val) => val === inputSymbol);
    }
    return this._findSpecialChar(inputSymbol);
  }
  _findSpecialChar(inputSymbol) {
    return this.specialCharacters.find((val) => val === inputSymbol);
  }
  _checkSymbolMask(inputSymbol, maskSymbol) {
    this.patterns = this.customPattern ? this.customPattern : this.patterns;
    return (this.patterns[maskSymbol]?.pattern && this.patterns[maskSymbol]?.pattern.test(inputSymbol)) ?? false;
  }
  _formatWithSeparators = (str, thousandSeparatorChar, decimalChars, precision) => {
    let x = [];
    let decimalChar = "";
    if (Array.isArray(decimalChars)) {
      const regExp = new RegExp(decimalChars.map((v) => "[\\^$.|?*+()".indexOf(v) >= 0 ? `\\${v}` : v).join("|"));
      x = str.split(regExp);
      decimalChar = str.match(regExp)?.[0] ?? MaskExpression.EMPTY_STRING;
    } else {
      x = str.split(decimalChars);
      decimalChar = decimalChars;
    }
    const decimals = x.length > 1 ? `${decimalChar}${x[1]}` : MaskExpression.EMPTY_STRING;
    let res = x[0] ?? MaskExpression.EMPTY_STRING;
    const separatorLimit = this.separatorLimit.replace(/\s/g, MaskExpression.EMPTY_STRING);
    if (separatorLimit && +separatorLimit) {
      if (res[0] === MaskExpression.MINUS) {
        res = `-${res.slice(1, res.length).slice(0, separatorLimit.length)}`;
      } else {
        res = res.slice(0, separatorLimit.length);
      }
    }
    const rgx = /(\d+)(\d{3})/;
    while (thousandSeparatorChar && rgx.test(res)) {
      res = res.replace(rgx, "$1" + thousandSeparatorChar + "$2");
    }
    if (typeof precision === "undefined") {
      return res + decimals;
    } else if (precision === 0) {
      return res;
    }
    return res + decimals.substring(0, precision + 1);
  };
  percentage = (str) => {
    const sanitizedStr = str.replace(",", ".");
    const value = Number(this.allowNegativeNumbers && str.includes(MaskExpression.MINUS) ? sanitizedStr.slice(1, str.length) : sanitizedStr);
    return !isNaN(value) && value >= 0 && value <= 100;
  };
  getPrecision = (maskExpression) => {
    const x = maskExpression.split(MaskExpression.DOT);
    if (x.length > 1) {
      return Number(x[x.length - 1]);
    }
    return Infinity;
  };
  checkAndRemoveSuffix = (inputValue) => {
    for (let i = this.suffix?.length - 1; i >= 0; i--) {
      const substr = this.suffix.substring(i, this.suffix?.length);
      if (inputValue.includes(substr) && i !== this.suffix?.length - 1 && (i - 1 < 0 || !inputValue.includes(this.suffix.substring(i - 1, this.suffix?.length)))) {
        return inputValue.replace(substr, MaskExpression.EMPTY_STRING);
      }
    }
    return inputValue;
  };
  checkInputPrecision = (inputValue, precision, decimalMarker) => {
    let processedInputValue = inputValue;
    let processedDecimalMarker = decimalMarker;
    if (precision < Infinity) {
      if (Array.isArray(processedDecimalMarker)) {
        const marker = processedDecimalMarker.find((dm) => dm !== this.thousandSeparator);
        processedDecimalMarker = marker ? marker : processedDecimalMarker[0];
      }
      const precisionRegEx = new RegExp(this._charToRegExpExpression(processedDecimalMarker) + `\\d{${precision}}.*$`);
      const precisionMatch = processedInputValue.match(precisionRegEx);
      const precisionMatchLength = (precisionMatch && precisionMatch[0]?.length) ?? 0;
      if (precisionMatchLength - 1 > precision) {
        const diff = precisionMatchLength - 1 - precision;
        processedInputValue = processedInputValue.substring(0, processedInputValue.length - diff);
      }
      if (precision === 0 && this._compareOrIncludes(processedInputValue[processedInputValue.length - 1], processedDecimalMarker, this.thousandSeparator)) {
        processedInputValue = processedInputValue.substring(0, processedInputValue.length - 1);
      }
    }
    return processedInputValue;
  };
  _stripToDecimal(str) {
    return str.split(MaskExpression.EMPTY_STRING).filter((i, idx) => {
      const isDecimalMarker = typeof this.decimalMarker === "string" ? i === this.decimalMarker : this.decimalMarker.includes(i);
      return i.match("^-?\\d") || i === this.thousandSeparator || isDecimalMarker || i === MaskExpression.MINUS && idx === 0 && this.allowNegativeNumbers;
    }).join(MaskExpression.EMPTY_STRING);
  }
  _charToRegExpExpression(char) {
    if (char) {
      const charsToEscape = "[\\^$.|?*+()";
      return char === " " ? "\\s" : charsToEscape.indexOf(char) >= 0 ? `\\${char}` : char;
    }
    return char;
  }
  _shiftStep(maskExpression, cursor, inputLength) {
    const shiftStep = /[*?]/g.test(maskExpression.slice(0, cursor)) ? inputLength : cursor;
    this._shift.add(shiftStep + this.prefix.length || 0);
  }
  _compareOrIncludes(value, comparedValue, excludedValue) {
    return Array.isArray(comparedValue) ? comparedValue.filter((v) => v !== excludedValue).includes(value) : value === comparedValue;
  }
  _validIP(valuesIP) {
    return !(valuesIP.length === 4 && !valuesIP.some((value, index) => {
      if (valuesIP.length !== index + 1) {
        return value === MaskExpression.EMPTY_STRING || Number(value) > 255;
      }
      return value === MaskExpression.EMPTY_STRING || Number(value.substring(0, 3)) > 255;
    }));
  }
  _splitPercentZero(value) {
    if (value === MaskExpression.MINUS && this.allowNegativeNumbers) {
      return value;
    }
    const decimalIndex = typeof this.decimalMarker === "string" ? value.indexOf(this.decimalMarker) : value.indexOf(MaskExpression.DOT);
    const emptyOrMinus = this.allowNegativeNumbers && value.includes(MaskExpression.MINUS) ? "-" : "";
    if (decimalIndex === -1) {
      const parsedValue = parseInt(emptyOrMinus ? value.slice(1, value.length) : value, 10);
      return isNaN(parsedValue) ? MaskExpression.EMPTY_STRING : `${emptyOrMinus}${parsedValue}`;
    } else {
      const integerPart = parseInt(value.replace("-", "").substring(0, decimalIndex), 10);
      const decimalPart = value.substring(decimalIndex + 1);
      const integerString = isNaN(integerPart) ? "" : integerPart.toString();
      const decimal = typeof this.decimalMarker === "string" ? this.decimalMarker : MaskExpression.DOT;
      return integerString === MaskExpression.EMPTY_STRING ? MaskExpression.EMPTY_STRING : `${emptyOrMinus}${integerString}${decimal}${decimalPart}`;
    }
  }
  _findFirstNonZeroDigitIndex(inputString) {
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      if (char && char >= "1" && char <= "9") {
        return i;
      }
    }
    return -1;
  }
  static ɵfac = function NgxMaskApplierService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgxMaskApplierService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NgxMaskApplierService,
    factory: _NgxMaskApplierService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaskApplierService, [{
    type: Injectable
  }], null, null);
})();
var NgxMaskService = class _NgxMaskService extends NgxMaskApplierService {
  isNumberValue = false;
  maskIsShown = "";
  selStart = null;
  selEnd = null;
  writingValue = false;
  maskChanged = false;
  _maskExpressionArray = [];
  triggerOnMaskChange = false;
  _previousValue = "";
  _currentValue = "";
  _emitValue = false;
  _start;
  _end;
  onChange = (_) => {
  };
  _elementRef = inject(ElementRef, {
    optional: true
  });
  document = inject(DOCUMENT);
  _config = inject(NGX_MASK_CONFIG);
  _renderer = inject(Renderer2, {
    optional: true
  });
  applyMask(inputValue, maskExpression, position = 0, justPasted = false, backspaced = false, cb = () => {
  }) {
    if (!maskExpression) {
      return inputValue !== this.actualValue ? this.actualValue : inputValue;
    }
    this.maskIsShown = this.showMaskTyped ? this.showMaskInInput() : MaskExpression.EMPTY_STRING;
    if (this.maskExpression === MaskExpression.IP && this.showMaskTyped) {
      this.maskIsShown = this.showMaskInInput(inputValue || MaskExpression.HASH);
    }
    if (this.maskExpression === MaskExpression.CPF_CNPJ && this.showMaskTyped) {
      this.maskIsShown = this.showMaskInInput(inputValue || MaskExpression.HASH);
    }
    if (!inputValue && this.showMaskTyped) {
      this.formControlResult(this.prefix);
      return `${this.prefix}${this.maskIsShown}${this.suffix}`;
    }
    const getSymbol = !!inputValue && typeof this.selStart === "number" ? inputValue[this.selStart] ?? MaskExpression.EMPTY_STRING : MaskExpression.EMPTY_STRING;
    let newInputValue = "";
    let newPosition = position;
    if (this.hiddenInput !== null && !this.writingValue) {
      let actualResult = inputValue && inputValue.length === 1 ? inputValue.split(MaskExpression.EMPTY_STRING) : this.actualValue.split(MaskExpression.EMPTY_STRING);
      if (typeof this.selStart === "object" && typeof this.selEnd === "object") {
        this.selStart = Number(this.selStart);
        this.selEnd = Number(this.selEnd);
      } else {
        inputValue !== MaskExpression.EMPTY_STRING && actualResult.length ? typeof this.selStart === "number" && typeof this.selEnd === "number" ? inputValue.length > actualResult.length ? actualResult.splice(this.selStart, 0, getSymbol) : inputValue.length < actualResult.length ? actualResult.length - inputValue.length === 1 ? backspaced ? actualResult.splice(this.selStart - 1, 1) : actualResult.splice(inputValue.length - 1, 1) : actualResult.splice(this.selStart, this.selEnd - this.selStart) : null : null : actualResult = [];
      }
      if (this.showMaskTyped && !this.hiddenInput) {
        newInputValue = this.removeMask(inputValue);
      }
      newInputValue = this.actualValue.length && actualResult.length <= inputValue.length ? this.shiftTypedSymbols(actualResult.join(MaskExpression.EMPTY_STRING)) : inputValue;
    }
    if (justPasted && (this.hiddenInput || !this.hiddenInput)) {
      newInputValue = inputValue;
    }
    if (backspaced && this.specialCharacters.indexOf(this.maskExpression[newPosition] ?? MaskExpression.EMPTY_STRING) !== -1 && this.showMaskTyped && !this.prefix) {
      newInputValue = this._currentValue;
    }
    if (this.deletedSpecialCharacter && newPosition) {
      if (this.specialCharacters.includes(this.actualValue.slice(newPosition, newPosition + 1))) {
        newPosition = newPosition + 1;
      } else if (maskExpression.slice(newPosition - 1, newPosition + 1) !== MaskExpression.MONTHS) {
        newPosition = newPosition - 2;
      }
      this.deletedSpecialCharacter = false;
    }
    if (this.showMaskTyped && this.placeHolderCharacter.length === 1 && !this.leadZeroDateTime) {
      newInputValue = this.removeMask(inputValue);
    }
    if (this.maskChanged) {
      newInputValue = inputValue;
    } else {
      newInputValue = Boolean(newInputValue) && newInputValue.length ? newInputValue : inputValue;
    }
    if (this.showMaskTyped && this.keepCharacterPositions && this.actualValue && !justPasted && !this.writingValue) {
      const value = this.dropSpecialCharacters ? this.removeMask(this.actualValue) : this.actualValue;
      this.formControlResult(value);
      return this.actualValue ? this.actualValue : `${this.prefix}${this.maskIsShown}${this.suffix}`;
    }
    const result = super.applyMask(newInputValue, maskExpression, newPosition, justPasted, backspaced, cb);
    this.actualValue = this.getActualValue(result);
    if (this.thousandSeparator === MaskExpression.DOT && this.decimalMarker === MaskExpression.DOT) {
      this.decimalMarker = MaskExpression.COMMA;
    }
    if (this.maskExpression.startsWith(MaskExpression.SEPARATOR) && this.dropSpecialCharacters === true) {
      this.specialCharacters = this.specialCharacters.filter((item) => !this._compareOrIncludes(item, this.decimalMarker, this.thousandSeparator));
    }
    if (result || result === "") {
      this._previousValue = this._currentValue;
      this._currentValue = result;
      this._emitValue = this._previousValue !== this._currentValue || this.maskChanged || this.writingValue || this._previousValue === this._currentValue && justPasted;
    }
    this._emitValue ? this.writingValue && this.triggerOnMaskChange ? requestAnimationFrame(() => this.formControlResult(result)) : this.formControlResult(result) : "";
    if (!this.showMaskTyped || this.showMaskTyped && this.hiddenInput) {
      if (this.hiddenInput) {
        if (backspaced) {
          return this.hideInput(result, this.maskExpression);
        }
        return `${this.hideInput(result, this.maskExpression)}${this.maskIsShown.slice(result.length)}`;
      }
      return result;
    }
    const resLen = result.length;
    const prefNmask = `${this.prefix}${this.maskIsShown}${this.suffix}`;
    if (this.maskExpression.includes(MaskExpression.HOURS)) {
      const countSkipedSymbol = this._numberSkipedSymbols(result);
      return `${result}${prefNmask.slice(resLen + countSkipedSymbol)}`;
    } else if (this.maskExpression === MaskExpression.IP || this.maskExpression === MaskExpression.CPF_CNPJ) {
      return `${result}${prefNmask}`;
    }
    return `${result}${prefNmask.slice(resLen)}`;
  }
  _numberSkipedSymbols(value) {
    const regex = /(^|\D)(\d\D)/g;
    let match = regex.exec(value);
    let countSkipedSymbol = 0;
    while (match != null) {
      countSkipedSymbol += 1;
      match = regex.exec(value);
    }
    return countSkipedSymbol;
  }
  applyValueChanges(position, justPasted, backspaced, cb = () => {
  }) {
    const formElement = this._elementRef?.nativeElement;
    if (!formElement) {
      return;
    }
    formElement.value = this.applyMask(formElement.value, this.maskExpression, position, justPasted, backspaced, cb);
    if (formElement === this._getActiveElement()) {
      return;
    }
    this.clearIfNotMatchFn();
  }
  hideInput(inputValue, maskExpression) {
    return inputValue.split(MaskExpression.EMPTY_STRING).map((curr, index) => {
      if (this.patterns && this.patterns[maskExpression[index] ?? MaskExpression.EMPTY_STRING] && this.patterns[maskExpression[index] ?? MaskExpression.EMPTY_STRING]?.symbol) {
        return this.patterns[maskExpression[index] ?? MaskExpression.EMPTY_STRING]?.symbol;
      }
      return curr;
    }).join(MaskExpression.EMPTY_STRING);
  }
  getActualValue(res) {
    const compare = res.split(MaskExpression.EMPTY_STRING).filter((symbol, i) => {
      const maskChar = this.maskExpression[i] ?? MaskExpression.EMPTY_STRING;
      return this._checkSymbolMask(symbol, maskChar) || this.specialCharacters.includes(maskChar) && symbol === maskChar;
    });
    if (compare.join(MaskExpression.EMPTY_STRING) === res) {
      return compare.join(MaskExpression.EMPTY_STRING);
    }
    return res;
  }
  shiftTypedSymbols(inputValue) {
    let symbolToReplace = "";
    const newInputValue = inputValue && inputValue.split(MaskExpression.EMPTY_STRING).map((currSymbol, index) => {
      if (this.specialCharacters.includes(inputValue[index + 1] ?? MaskExpression.EMPTY_STRING) && inputValue[index + 1] !== this.maskExpression[index + 1]) {
        symbolToReplace = currSymbol;
        return inputValue[index + 1];
      }
      if (symbolToReplace.length) {
        const replaceSymbol = symbolToReplace;
        symbolToReplace = MaskExpression.EMPTY_STRING;
        return replaceSymbol;
      }
      return currSymbol;
    }) || [];
    return newInputValue.join(MaskExpression.EMPTY_STRING);
  }
  numberToString(value) {
    if (!value && value !== 0 || this.maskExpression.startsWith(MaskExpression.SEPARATOR) && (this.leadZero || !this.dropSpecialCharacters) || this.maskExpression.startsWith(MaskExpression.SEPARATOR) && this.separatorLimit.length > 14 && String(value).length > 14) {
      return String(value);
    }
    return Number(value).toLocaleString("fullwide", {
      useGrouping: false,
      maximumFractionDigits: 20
    }).replace(`/${MaskExpression.MINUS}/`, MaskExpression.MINUS);
  }
  showMaskInInput(inputVal) {
    if (this.showMaskTyped && !!this.shownMaskExpression) {
      if (this.maskExpression.length !== this.shownMaskExpression.length) {
        throw new Error("Mask expression must match mask placeholder length");
      } else {
        return this.shownMaskExpression;
      }
    } else if (this.showMaskTyped) {
      if (inputVal) {
        if (this.maskExpression === MaskExpression.IP) {
          return this._checkForIp(inputVal);
        }
        if (this.maskExpression === MaskExpression.CPF_CNPJ) {
          return this._checkForCpfCnpj(inputVal);
        }
      }
      if (this.placeHolderCharacter.length === this.maskExpression.length) {
        return this.placeHolderCharacter;
      }
      return this.maskExpression.replace(/\w/g, this.placeHolderCharacter);
    }
    return "";
  }
  clearIfNotMatchFn() {
    const formElement = this._elementRef?.nativeElement;
    if (!formElement) {
      return;
    }
    if (this.clearIfNotMatch && this.prefix.length + this.maskExpression.length + this.suffix.length !== formElement.value.replace(this.placeHolderCharacter, MaskExpression.EMPTY_STRING).length) {
      this.formElementProperty = ["value", MaskExpression.EMPTY_STRING];
      this.applyMask("", this.maskExpression);
    }
  }
  set formElementProperty([name, value]) {
    if (!this._renderer || !this._elementRef) {
      return;
    }
    Promise.resolve().then(() => this._renderer?.setProperty(this._elementRef?.nativeElement, name, value));
  }
  checkDropSpecialCharAmount(mask) {
    const chars = mask.split(MaskExpression.EMPTY_STRING).filter((item) => this._findDropSpecialChar(item));
    return chars.length;
  }
  removeMask(inputValue) {
    return this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.specialCharacters.concat("_").concat(this.placeHolderCharacter));
  }
  _checkForIp(inputVal) {
    if (inputVal === MaskExpression.HASH) {
      return `${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
    }
    const arr = [];
    for (let i = 0; i < inputVal.length; i++) {
      const value = inputVal[i] ?? MaskExpression.EMPTY_STRING;
      if (!value) {
        continue;
      }
      if (value.match("\\d")) {
        arr.push(value);
      }
    }
    if (arr.length <= 3) {
      return `${this.placeHolderCharacter}.${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
    }
    if (arr.length > 3 && arr.length <= 6) {
      return `${this.placeHolderCharacter}.${this.placeHolderCharacter}`;
    }
    if (arr.length > 6 && arr.length <= 9) {
      return this.placeHolderCharacter;
    }
    if (arr.length > 9 && arr.length <= 12) {
      return "";
    }
    return "";
  }
  _checkForCpfCnpj(inputVal) {
    const cpf = `${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}.${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}.${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}-${this.placeHolderCharacter}${this.placeHolderCharacter}`;
    const cnpj = `${this.placeHolderCharacter}${this.placeHolderCharacter}.${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}.${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}/${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}${this.placeHolderCharacter}-${this.placeHolderCharacter}${this.placeHolderCharacter}`;
    if (inputVal === MaskExpression.HASH) {
      return cpf;
    }
    const arr = [];
    for (let i = 0; i < inputVal.length; i++) {
      const value = inputVal[i] ?? MaskExpression.EMPTY_STRING;
      if (!value) {
        continue;
      }
      if (value.match("\\d")) {
        arr.push(value);
      }
    }
    if (arr.length <= 3) {
      return cpf.slice(arr.length, cpf.length);
    }
    if (arr.length > 3 && arr.length <= 6) {
      return cpf.slice(arr.length + 1, cpf.length);
    }
    if (arr.length > 6 && arr.length <= 9) {
      return cpf.slice(arr.length + 2, cpf.length);
    }
    if (arr.length > 9 && arr.length < 11) {
      return cpf.slice(arr.length + 3, cpf.length);
    }
    if (arr.length === 11) {
      return "";
    }
    if (arr.length === 12) {
      if (inputVal.length === 17) {
        return cnpj.slice(16, cnpj.length);
      }
      return cnpj.slice(15, cnpj.length);
    }
    if (arr.length > 12 && arr.length <= 14) {
      return cnpj.slice(arr.length + 4, cnpj.length);
    }
    return "";
  }
  _getActiveElement(document = this.document) {
    const shadowRootEl = document?.activeElement?.shadowRoot;
    if (!shadowRootEl?.activeElement) {
      return document.activeElement;
    } else {
      return this._getActiveElement(shadowRootEl);
    }
  }
  formControlResult(inputValue) {
    if (this.writingValue && !inputValue) {
      this.onChange("");
      return;
    }
    if (this.writingValue || !this.triggerOnMaskChange && this.maskChanged) {
      this.triggerOnMaskChange && this.maskChanged ? this.onChange(this.outputTransformFn(this._toNumber(this._checkSymbols(this._removeSuffix(this._removePrefix(inputValue)))))) : "";
      this.maskChanged = false;
      return;
    }
    if (Array.isArray(this.dropSpecialCharacters)) {
      this.onChange(this.outputTransformFn(this._toNumber(this._checkSymbols(this._removeMask(this._removeSuffix(this._removePrefix(inputValue)), this.dropSpecialCharacters)))));
    } else if (this.dropSpecialCharacters || !this.dropSpecialCharacters && this.prefix === inputValue) {
      this.onChange(this.outputTransformFn(this._toNumber(this._checkSymbols(this._removeSuffix(this._removePrefix(inputValue))))));
    } else {
      this.onChange(this.outputTransformFn(this._toNumber(inputValue)));
    }
  }
  _toNumber(value) {
    if (!this.isNumberValue || value === MaskExpression.EMPTY_STRING) {
      return value;
    }
    if (this.maskExpression.startsWith(MaskExpression.SEPARATOR) && (this.leadZero || !this.dropSpecialCharacters)) {
      return value;
    }
    if (String(value).length > 14 && this.maskExpression.startsWith(MaskExpression.SEPARATOR)) {
      return String(value);
    }
    const num = Number(value);
    if (this.maskExpression.startsWith(MaskExpression.SEPARATOR) && Number.isNaN(num)) {
      const val = String(value).replace(",", ".");
      return Number(val);
    }
    return Number.isNaN(num) ? value : num;
  }
  _removeMask(value, specialCharactersForRemove) {
    if (this.maskExpression.startsWith(MaskExpression.PERCENT) && value.includes(MaskExpression.DOT)) {
      return value;
    }
    return value ? value.replace(this._regExpForRemove(specialCharactersForRemove), MaskExpression.EMPTY_STRING) : value;
  }
  _removePrefix(value) {
    if (!this.prefix) {
      return value;
    }
    return value ? value.replace(this.prefix, MaskExpression.EMPTY_STRING) : value;
  }
  _removeSuffix(value) {
    if (!this.suffix) {
      return value;
    }
    return value ? value.replace(this.suffix, MaskExpression.EMPTY_STRING) : value;
  }
  _retrieveSeparatorValue(result) {
    let specialCharacters = Array.isArray(this.dropSpecialCharacters) ? this.specialCharacters.filter((v) => {
      return this.dropSpecialCharacters.includes(v);
    }) : this.specialCharacters;
    if (!this.deletedSpecialCharacter && this._checkPatternForSpace() && result.includes(MaskExpression.WHITE_SPACE) && this.maskExpression.includes(MaskExpression.SYMBOL_STAR)) {
      specialCharacters = specialCharacters.filter((char) => char !== MaskExpression.WHITE_SPACE);
    }
    return this._removeMask(result, specialCharacters);
  }
  _regExpForRemove(specialCharactersForRemove) {
    return new RegExp(specialCharactersForRemove.map((item) => `\\${item}`).join("|"), "gi");
  }
  _replaceDecimalMarkerToDot(value) {
    const markers = Array.isArray(this.decimalMarker) ? this.decimalMarker : [this.decimalMarker];
    return value.replace(this._regExpForRemove(markers), MaskExpression.DOT);
  }
  _checkSymbols(result) {
    let processedResult = result;
    if (processedResult === MaskExpression.EMPTY_STRING) {
      return processedResult;
    }
    if (this.maskExpression.startsWith(MaskExpression.PERCENT) && this.decimalMarker === MaskExpression.COMMA) {
      processedResult = processedResult.replace(MaskExpression.COMMA, MaskExpression.DOT);
    }
    const separatorPrecision = this._retrieveSeparatorPrecision(this.maskExpression);
    const separatorValue = this._replaceDecimalMarkerToDot(this._retrieveSeparatorValue(processedResult));
    if (!this.isNumberValue) {
      return separatorValue;
    }
    if (separatorPrecision) {
      if (processedResult === this.decimalMarker) {
        return null;
      }
      if (separatorValue.length > 14) {
        return String(separatorValue);
      }
      return this._checkPrecision(this.maskExpression, separatorValue);
    } else {
      return separatorValue;
    }
  }
  _checkPatternForSpace() {
    for (const key in this.patterns) {
      if (this.patterns[key] && this.patterns[key]?.hasOwnProperty("pattern")) {
        const patternString = this.patterns[key]?.pattern.toString();
        const pattern = this.patterns[key]?.pattern;
        if (patternString?.includes(MaskExpression.WHITE_SPACE) && pattern?.test(this.maskExpression)) {
          return true;
        }
      }
    }
    return false;
  }
  _retrieveSeparatorPrecision(maskExpretion) {
    const matcher = maskExpretion.match(new RegExp(`^separator\\.([^d]*)`));
    return matcher ? Number(matcher[1]) : null;
  }
  _checkPrecision(separatorExpression, separatorValue) {
    const separatorPrecision = this.getPrecision(separatorExpression);
    let value = separatorValue;
    if (separatorExpression.indexOf("2") > 0 || this.leadZero && Number(separatorPrecision) > 0) {
      if (this.decimalMarker === MaskExpression.COMMA && this.leadZero) {
        value = value.replace(",", ".");
      }
      return this.leadZero ? Number(value).toFixed(Number(separatorPrecision)) : Number(value).toFixed(2);
    }
    return this.numberToString(value);
  }
  _repeatPatternSymbols(maskExp) {
    return maskExp.match(/{[0-9]+}/) && maskExp.split(MaskExpression.EMPTY_STRING).reduce((accum, currVal, index) => {
      this._start = currVal === MaskExpression.CURLY_BRACKETS_LEFT ? index : this._start;
      if (currVal !== MaskExpression.CURLY_BRACKETS_RIGHT) {
        return this._findSpecialChar(currVal) ? accum + currVal : accum;
      }
      this._end = index;
      const repeatNumber = Number(maskExp.slice(this._start + 1, this._end));
      const replaceWith = new Array(repeatNumber + 1).join(maskExp[this._start - 1]);
      if (maskExp.slice(0, this._start).length > 1 && maskExp.includes(MaskExpression.LETTER_S)) {
        const symbols = maskExp.slice(0, this._start - 1);
        return symbols.includes(MaskExpression.CURLY_BRACKETS_LEFT) ? accum + replaceWith : symbols + accum + replaceWith;
      } else {
        return accum + replaceWith;
      }
    }, "") || maskExp;
  }
  currentLocaleDecimalMarker() {
    return 1.1.toLocaleString().substring(1, 2);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵNgxMaskService_BaseFactory;
    return function NgxMaskService_Factory(__ngFactoryType__) {
      return (ɵNgxMaskService_BaseFactory || (ɵNgxMaskService_BaseFactory = ɵɵgetInheritedFactory(_NgxMaskService)))(__ngFactoryType__ || _NgxMaskService);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _NgxMaskService,
    factory: _NgxMaskService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaskService, [{
    type: Injectable
  }], null, null);
})();
function _configFactory() {
  const initConfig = inject(INITIAL_CONFIG);
  const configValue = inject(NEW_CONFIG);
  return configValue instanceof Function ? __spreadValues(__spreadValues({}, initConfig), configValue()) : __spreadValues(__spreadValues({}, initConfig), configValue);
}
function provideNgxMask(configValue) {
  return [{
    provide: NEW_CONFIG,
    useValue: configValue
  }, {
    provide: INITIAL_CONFIG,
    useValue: initialConfig
  }, {
    provide: NGX_MASK_CONFIG,
    useFactory: _configFactory
  }, NgxMaskService];
}
function provideEnvironmentNgxMask(configValue) {
  return makeEnvironmentProviders(provideNgxMask(configValue));
}
var NgxMaskDirective = class _NgxMaskDirective {
  maskExpression = "";
  specialCharacters = [];
  patterns = {};
  prefix = "";
  suffix = "";
  thousandSeparator = " ";
  decimalMarker = ".";
  dropSpecialCharacters = null;
  hiddenInput = null;
  showMaskTyped = null;
  placeHolderCharacter = null;
  shownMaskExpression = null;
  showTemplate = null;
  clearIfNotMatch = null;
  validation = null;
  separatorLimit = null;
  allowNegativeNumbers = null;
  leadZeroDateTime = null;
  leadZero = null;
  triggerOnMaskChange = null;
  apm = null;
  inputTransformFn = null;
  outputTransformFn = null;
  keepCharacterPositions = null;
  maskFilled = new EventEmitter();
  _maskValue = "";
  _inputValue;
  _position = null;
  _code;
  _maskExpressionArray = [];
  _allowFewMaskChangeMask = false;
  _justPasted = false;
  _isFocused = false;
  _isComposing = false;
  document = inject(DOCUMENT);
  _maskService = inject(NgxMaskService, {
    self: true
  });
  _config = inject(NGX_MASK_CONFIG);
  onChange = (_) => {
  };
  onTouch = () => {
  };
  ngOnChanges(changes) {
    const {
      maskExpression,
      specialCharacters,
      patterns,
      prefix,
      suffix,
      thousandSeparator,
      decimalMarker,
      dropSpecialCharacters,
      hiddenInput,
      showMaskTyped,
      placeHolderCharacter,
      shownMaskExpression,
      showTemplate,
      clearIfNotMatch,
      validation,
      separatorLimit,
      allowNegativeNumbers,
      leadZeroDateTime,
      leadZero,
      triggerOnMaskChange,
      apm,
      inputTransformFn,
      outputTransformFn,
      keepCharacterPositions
    } = changes;
    if (maskExpression) {
      if (maskExpression.currentValue !== maskExpression.previousValue && !maskExpression.firstChange) {
        this._maskService.maskChanged = true;
      }
      if (maskExpression.currentValue && maskExpression.currentValue.split(MaskExpression.OR).length > 1) {
        this._maskExpressionArray = maskExpression.currentValue.split(MaskExpression.OR).sort((a, b) => {
          return a.length - b.length;
        });
        this._setMask();
      } else {
        this._maskExpressionArray = [];
        this._maskValue = maskExpression.currentValue || MaskExpression.EMPTY_STRING;
        this._maskService.maskExpression = this._maskValue;
      }
    }
    if (specialCharacters) {
      if (!specialCharacters.currentValue || !Array.isArray(specialCharacters.currentValue)) {
        return;
      } else {
        this._maskService.specialCharacters = specialCharacters.currentValue || [];
      }
    }
    if (allowNegativeNumbers) {
      this._maskService.allowNegativeNumbers = allowNegativeNumbers.currentValue;
      if (this._maskService.allowNegativeNumbers) {
        this._maskService.specialCharacters = this._maskService.specialCharacters.filter((c) => c !== MaskExpression.MINUS);
      }
    }
    if (patterns && patterns.currentValue) {
      this._maskService.patterns = patterns.currentValue;
    }
    if (apm && apm.currentValue) {
      this._maskService.apm = apm.currentValue;
    }
    if (prefix) {
      this._maskService.prefix = prefix.currentValue;
    }
    if (suffix) {
      this._maskService.suffix = suffix.currentValue;
    }
    if (thousandSeparator) {
      this._maskService.thousandSeparator = thousandSeparator.currentValue;
    }
    if (decimalMarker) {
      this._maskService.decimalMarker = decimalMarker.currentValue;
    }
    if (dropSpecialCharacters) {
      this._maskService.dropSpecialCharacters = dropSpecialCharacters.currentValue;
    }
    if (hiddenInput) {
      this._maskService.hiddenInput = hiddenInput.currentValue;
    }
    if (showMaskTyped) {
      this._maskService.showMaskTyped = showMaskTyped.currentValue;
      if (showMaskTyped.previousValue === false && showMaskTyped.currentValue === true && this._isFocused) {
        requestAnimationFrame(() => {
          this._maskService._elementRef?.nativeElement.click();
        });
      }
    }
    if (placeHolderCharacter) {
      this._maskService.placeHolderCharacter = placeHolderCharacter.currentValue;
    }
    if (shownMaskExpression) {
      this._maskService.shownMaskExpression = shownMaskExpression.currentValue;
    }
    if (showTemplate) {
      this._maskService.showTemplate = showTemplate.currentValue;
    }
    if (clearIfNotMatch) {
      this._maskService.clearIfNotMatch = clearIfNotMatch.currentValue;
    }
    if (validation) {
      this._maskService.validation = validation.currentValue;
    }
    if (separatorLimit) {
      this._maskService.separatorLimit = separatorLimit.currentValue;
    }
    if (leadZeroDateTime) {
      this._maskService.leadZeroDateTime = leadZeroDateTime.currentValue;
    }
    if (leadZero) {
      this._maskService.leadZero = leadZero.currentValue;
    }
    if (triggerOnMaskChange) {
      this._maskService.triggerOnMaskChange = triggerOnMaskChange.currentValue;
    }
    if (inputTransformFn) {
      this._maskService.inputTransformFn = inputTransformFn.currentValue;
    }
    if (outputTransformFn) {
      this._maskService.outputTransformFn = outputTransformFn.currentValue;
    }
    if (keepCharacterPositions) {
      this._maskService.keepCharacterPositions = keepCharacterPositions.currentValue;
    }
    this._applyMask();
  }
  validate({
    value
  }) {
    const processedValue = typeof value === "number" ? String(value) : value;
    if (!this._maskService.validation || !this._maskValue) {
      return null;
    }
    if (this._maskService.ipError) {
      return this._createValidationError(processedValue);
    }
    if (this._maskService.cpfCnpjError) {
      return this._createValidationError(processedValue);
    }
    if (this._maskValue.startsWith(MaskExpression.SEPARATOR)) {
      return null;
    }
    if (withoutValidation.includes(this._maskValue)) {
      return null;
    }
    if (this._maskService.clearIfNotMatch) {
      return null;
    }
    if (timeMasks.includes(this._maskValue)) {
      return this._validateTime(processedValue);
    }
    if (this._maskValue === MaskExpression.EMAIL_MASK) {
      const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailPattern.test(processedValue) && processedValue) {
        return this._createValidationError(processedValue);
      } else {
        return null;
      }
    }
    if (processedValue && processedValue.length >= 1) {
      let counterOfOpt = 0;
      if (this._maskValue.includes(MaskExpression.CURLY_BRACKETS_LEFT) && this._maskValue.includes(MaskExpression.CURLY_BRACKETS_RIGHT)) {
        const lengthInsideCurlyBrackets = this._maskValue.slice(this._maskValue.indexOf(MaskExpression.CURLY_BRACKETS_LEFT) + 1, this._maskValue.indexOf(MaskExpression.CURLY_BRACKETS_RIGHT));
        return lengthInsideCurlyBrackets === String(processedValue.length) ? null : this._createValidationError(processedValue);
      }
      if (this._maskValue.startsWith(MaskExpression.PERCENT)) {
        return null;
      }
      for (const key in this._maskService.patterns) {
        if (this._maskService.patterns[key]?.optional) {
          if (this._maskValue.indexOf(key) !== this._maskValue.lastIndexOf(key)) {
            const opt = this._maskValue.split(MaskExpression.EMPTY_STRING).filter((i) => i === key).join(MaskExpression.EMPTY_STRING);
            counterOfOpt += opt.length;
          } else if (this._maskValue.indexOf(key) !== -1) {
            counterOfOpt++;
          }
          if (this._maskValue.indexOf(key) !== -1 && processedValue.length >= this._maskValue.indexOf(key)) {
            return null;
          }
          if (counterOfOpt === this._maskValue.length) {
            return null;
          }
        }
      }
      if (this._maskValue.indexOf(MaskExpression.SYMBOL_STAR) > 1 && processedValue.length < this._maskValue.indexOf(MaskExpression.SYMBOL_STAR) || this._maskValue.indexOf(MaskExpression.SYMBOL_QUESTION) > 1 && processedValue.length < this._maskValue.indexOf(MaskExpression.SYMBOL_QUESTION)) {
        return this._createValidationError(processedValue);
      }
      if (this._maskValue.indexOf(MaskExpression.SYMBOL_STAR) === -1 || this._maskValue.indexOf(MaskExpression.SYMBOL_QUESTION) === -1) {
        const array = this._maskValue.split("*");
        const length = this._maskService.dropSpecialCharacters ? this._maskValue.length - this._maskService.checkDropSpecialCharAmount(this._maskValue) - counterOfOpt : this.prefix ? this._maskValue.length + this.prefix.length - counterOfOpt : this._maskValue.length - counterOfOpt;
        if (array.length === 1) {
          if (processedValue.length < length) {
            return this._createValidationError(processedValue);
          }
        }
        if (array.length > 1) {
          const lastIndexArray = array[array.length - 1];
          if (lastIndexArray && this._maskService.specialCharacters.includes(lastIndexArray[0]) && String(processedValue).includes(lastIndexArray[0] ?? "") && !this.dropSpecialCharacters) {
            const special = value.split(lastIndexArray[0]);
            return special[special.length - 1].length === lastIndexArray.length - 1 ? null : this._createValidationError(processedValue);
          } else if ((lastIndexArray && !this._maskService.specialCharacters.includes(lastIndexArray[0]) || !lastIndexArray || this._maskService.dropSpecialCharacters) && processedValue.length >= length - 1) {
            return null;
          } else {
            return this._createValidationError(processedValue);
          }
        }
      }
      if (this._maskValue.indexOf(MaskExpression.SYMBOL_STAR) === 1 || this._maskValue.indexOf(MaskExpression.SYMBOL_QUESTION) === 1) {
        return null;
      }
    }
    if (value) {
      this.maskFilled.emit();
      return null;
    }
    return null;
  }
  onPaste() {
    this._justPasted = true;
  }
  onFocus() {
    this._isFocused = true;
  }
  onModelChange(value) {
    if ((value === MaskExpression.EMPTY_STRING || value === null || typeof value === "undefined") && this._maskService.actualValue) {
      this._maskService.actualValue = this._maskService.getActualValue(MaskExpression.EMPTY_STRING);
    }
  }
  onInput(e) {
    if (this._isComposing) {
      return;
    }
    const el = e.target;
    const transformedValue = this._maskService.inputTransformFn(el.value);
    if (el.type !== "number") {
      if (typeof transformedValue === "string" || typeof transformedValue === "number") {
        el.value = transformedValue.toString();
        this._inputValue = el.value;
        this._setMask();
        if (!this._maskValue) {
          this.onChange(el.value);
          return;
        }
        let position = el.selectionStart === 1 ? el.selectionStart + this._maskService.prefix.length : el.selectionStart;
        if (this.showMaskTyped && this.keepCharacterPositions && this._maskService.placeHolderCharacter.length === 1) {
          const inputSymbol = el.value.slice(position - 1, position);
          const prefixLength = this.prefix.length;
          const checkSymbols = this._maskService._checkSymbolMask(inputSymbol, this._maskService.maskExpression[position - 1 - prefixLength] ?? MaskExpression.EMPTY_STRING);
          const checkSpecialCharacter = this._maskService._checkSymbolMask(inputSymbol, this._maskService.maskExpression[position + 1 - prefixLength] ?? MaskExpression.EMPTY_STRING);
          const selectRangeBackspace = this._maskService.selStart === this._maskService.selEnd;
          const selStart = Number(this._maskService.selStart) - prefixLength;
          const selEnd = Number(this._maskService.selEnd) - prefixLength;
          const backspaceOrDelete = this._code === MaskExpression.BACKSPACE || this._code === MaskExpression.DELETE;
          if (backspaceOrDelete) {
            if (!selectRangeBackspace) {
              if (this._maskService.selStart === prefixLength) {
                this._maskService.actualValue = `${this.prefix}${this._maskService.maskIsShown.slice(0, selEnd)}${this._inputValue.split(this.prefix).join("")}`;
              } else if (this._maskService.selStart === this._maskService.maskIsShown.length + prefixLength) {
                this._maskService.actualValue = `${this._inputValue}${this._maskService.maskIsShown.slice(selStart, selEnd)}`;
              } else {
                this._maskService.actualValue = `${this.prefix}${this._inputValue.split(this.prefix).join("").slice(0, selStart)}${this._maskService.maskIsShown.slice(selStart, selEnd)}${this._maskService.actualValue.slice(selEnd + prefixLength, this._maskService.maskIsShown.length + prefixLength)}${this.suffix}`;
              }
            } else if (!this._maskService.specialCharacters.includes(this._maskService.maskExpression.slice(position - this.prefix.length, position + 1 - this.prefix.length)) && selectRangeBackspace) {
              if (selStart === 1 && this.prefix) {
                this._maskService.actualValue = `${this.prefix}${this._maskService.placeHolderCharacter}${el.value.split(this.prefix).join("").split(this.suffix).join("")}${this.suffix}`;
                position = position - 1;
              } else {
                const part1 = el.value.substring(0, position);
                const part2 = el.value.substring(position);
                this._maskService.actualValue = `${part1}${this._maskService.placeHolderCharacter}${part2}`;
              }
            }
            position = this._code === MaskExpression.DELETE ? position + 1 : position;
          }
          if (!backspaceOrDelete) {
            if (!checkSymbols && !checkSpecialCharacter && selectRangeBackspace) {
              position = Number(el.selectionStart) - 1;
            } else if (this._maskService.specialCharacters.includes(el.value.slice(position, position + 1)) && checkSpecialCharacter && !this._maskService.specialCharacters.includes(el.value.slice(position + 1, position + 2))) {
              this._maskService.actualValue = `${el.value.slice(0, position - 1)}${el.value.slice(position, position + 1)}${inputSymbol}${el.value.slice(position + 2)}`;
              position = position + 1;
            } else if (checkSymbols) {
              if (el.value.length === 1 && position === 1) {
                this._maskService.actualValue = `${this.prefix}${inputSymbol}${this._maskService.maskIsShown.slice(1, this._maskService.maskIsShown.length)}${this.suffix}`;
              } else {
                this._maskService.actualValue = `${el.value.slice(0, position - 1)}${inputSymbol}${el.value.slice(position + 1).split(this.suffix).join("")}${this.suffix}`;
              }
            } else if (this.prefix && el.value.length === 1 && position - prefixLength === 1 && this._maskService._checkSymbolMask(el.value, this._maskService.maskExpression[position - 1 - prefixLength] ?? MaskExpression.EMPTY_STRING)) {
              this._maskService.actualValue = `${this.prefix}${el.value}${this._maskService.maskIsShown.slice(1, this._maskService.maskIsShown.length)}${this.suffix}`;
            }
          }
        }
        let caretShift = 0;
        let backspaceShift = false;
        if (this._code === MaskExpression.DELETE && MaskExpression.SEPARATOR) {
          this._maskService.deletedSpecialCharacter = true;
        }
        if (this._inputValue.length >= this._maskService.maskExpression.length - 1 && this._code !== MaskExpression.BACKSPACE && this._maskService.maskExpression === MaskExpression.DAYS_MONTHS_YEARS && position < 10) {
          const inputSymbol = this._inputValue.slice(position - 1, position);
          el.value = this._inputValue.slice(0, position - 1) + inputSymbol + this._inputValue.slice(position + 1);
        }
        if (this._maskService.maskExpression === MaskExpression.DAYS_MONTHS_YEARS && this.leadZeroDateTime) {
          if (position < 3 && Number(el.value) > 31 && Number(el.value) < 40 || position === 5 && Number(el.value.slice(3, 5)) > 12) {
            position = position + 2;
          }
        }
        if (this._maskService.maskExpression === MaskExpression.HOURS_MINUTES_SECONDS && this.apm) {
          if (this._justPasted && el.value.slice(0, 2) === MaskExpression.DOUBLE_ZERO) {
            el.value = el.value.slice(1, 2) + el.value.slice(2, el.value.length);
          }
          el.value = el.value === MaskExpression.DOUBLE_ZERO ? MaskExpression.NUMBER_ZERO : el.value;
        }
        this._maskService.applyValueChanges(position, this._justPasted, this._code === MaskExpression.BACKSPACE || this._code === MaskExpression.DELETE, (shift, _backspaceShift) => {
          this._justPasted = false;
          caretShift = shift;
          backspaceShift = _backspaceShift;
        });
        if (this._getActiveElement() !== el) {
          return;
        }
        if (this._maskService.plusOnePosition) {
          position = position + 1;
          this._maskService.plusOnePosition = false;
        }
        if (this._maskExpressionArray.length) {
          if (this._code === MaskExpression.BACKSPACE) {
            const specialChartMinusOne = this.specialCharacters.includes(this._maskService.actualValue.slice(position - 1, position));
            const specialChartPlusOne = this.specialCharacters.includes(this._maskService.actualValue.slice(position, position + 1));
            if (this._allowFewMaskChangeMask && !specialChartPlusOne) {
              position = el.selectionStart + 1;
              this._allowFewMaskChangeMask = false;
            } else {
              position = specialChartMinusOne ? position - 1 : position;
            }
          } else {
            position = el.selectionStart === 1 ? el.selectionStart + this._maskService.prefix.length : el.selectionStart;
          }
        }
        this._position = this._position === 1 && this._inputValue.length === 1 ? null : this._position;
        let positionToApply = this._position ? this._inputValue.length + position + caretShift : position + (this._code === MaskExpression.BACKSPACE && !backspaceShift ? 0 : caretShift);
        if (positionToApply > this._getActualInputLength()) {
          positionToApply = el.value === this._maskService.decimalMarker && el.value.length === 1 ? this._getActualInputLength() + 1 : this._getActualInputLength();
        }
        if (positionToApply < 0) {
          positionToApply = 0;
        }
        el.setSelectionRange(positionToApply, positionToApply);
        this._position = null;
      } else {
        console.warn("Ngx-mask writeValue work with string | number, your current value:", typeof transformedValue);
      }
    } else {
      if (!this._maskValue) {
        this.onChange(el.value);
        return;
      }
      this._maskService.applyValueChanges(el.value.length, this._justPasted, this._code === MaskExpression.BACKSPACE || this._code === MaskExpression.DELETE);
    }
  }
  onCompositionStart() {
    this._isComposing = true;
  }
  onCompositionEnd(e) {
    this._isComposing = false;
    this._justPasted = true;
    this.onInput(e);
  }
  onBlur(e) {
    if (this._maskValue) {
      const el = e.target;
      if (this._maskService.leadZero && el.value.length > 0 && typeof this._maskService.decimalMarker === "string") {
        const maskExpression = this._maskService.maskExpression;
        const precision = Number(this._maskService.maskExpression.slice(maskExpression.length - 1, maskExpression.length));
        if (precision > 0) {
          el.value = this._maskService.suffix ? el.value.split(this._maskService.suffix).join("") : el.value;
          const decimalPart = el.value.split(this._maskService.decimalMarker)[1];
          el.value = el.value.includes(this._maskService.decimalMarker) ? el.value + MaskExpression.NUMBER_ZERO.repeat(precision - decimalPart.length) + this._maskService.suffix : el.value + this._maskService.decimalMarker + MaskExpression.NUMBER_ZERO.repeat(precision) + this._maskService.suffix;
          this._maskService.actualValue = el.value;
        }
      }
      this._maskService.clearIfNotMatchFn();
    }
    this._isFocused = false;
    this.onTouch();
  }
  onClick(e) {
    if (!this._maskValue) {
      return;
    }
    const el = e.target;
    const posStart = 0;
    const posEnd = 0;
    if (el !== null && el.selectionStart !== null && el.selectionStart === el.selectionEnd && el.selectionStart > this._maskService.prefix.length && e.keyCode !== 38) {
      if (this._maskService.showMaskTyped && !this.keepCharacterPositions) {
        this._maskService.maskIsShown = this._maskService.showMaskInInput();
        if (el.setSelectionRange && this._maskService.prefix + this._maskService.maskIsShown === el.value) {
          el.focus();
          el.setSelectionRange(posStart, posEnd);
        } else {
          if (el.selectionStart > this._maskService.actualValue.length) {
            el.setSelectionRange(this._maskService.actualValue.length, this._maskService.actualValue.length);
          }
        }
      }
    }
    const nextValue = el && (el.value === this._maskService.prefix ? this._maskService.prefix + this._maskService.maskIsShown : el.value);
    if (el && el.value !== nextValue) {
      el.value = nextValue;
    }
    if (el && el.type !== "number" && (el.selectionStart || el.selectionEnd) <= this._maskService.prefix.length) {
      const specialCharactersAtTheStart = this._maskService.maskExpression.match(new RegExp(`^[${this._maskService.specialCharacters.map((c) => `\\${c}`).join("")}]+`))?.[0].length || 0;
      el.selectionStart = this._maskService.prefix.length + specialCharactersAtTheStart;
      return;
    }
    if (el && el.selectionEnd > this._getActualInputLength()) {
      el.selectionEnd = this._getActualInputLength();
    }
  }
  onKeyDown(e) {
    if (!this._maskValue) {
      return;
    }
    if (this._isComposing) {
      if (e.key === "Enter") {
        this.onCompositionEnd(e);
      }
      return;
    }
    this._code = e.code ? e.code : e.key;
    const el = e.target;
    this._inputValue = el.value;
    this._setMask();
    if (el.type !== "number") {
      if (e.key === MaskExpression.ARROW_UP) {
        e.preventDefault();
      }
      if (e.key === MaskExpression.ARROW_LEFT || e.key === MaskExpression.BACKSPACE || e.key === MaskExpression.DELETE) {
        if (e.key === MaskExpression.BACKSPACE && el.value.length === 0) {
          el.selectionStart = el.selectionEnd;
        }
        if (e.key === MaskExpression.BACKSPACE && el.selectionStart !== 0) {
          this.specialCharacters = this.specialCharacters?.length ? this.specialCharacters : this._config.specialCharacters;
          if (this.prefix.length > 1 && el.selectionStart <= this.prefix.length) {
            el.setSelectionRange(this.prefix.length, el.selectionEnd);
          } else {
            if (this._inputValue.length !== el.selectionStart && el.selectionStart !== 1) {
              while (this.specialCharacters.includes((this._inputValue[el.selectionStart - 1] ?? MaskExpression.EMPTY_STRING).toString()) && (this.prefix.length >= 1 && el.selectionStart > this.prefix.length || this.prefix.length === 0)) {
                el.setSelectionRange(el.selectionStart - 1, el.selectionEnd);
              }
            }
          }
        }
        this.checkSelectionOnDeletion(el);
        if (this._maskService.prefix.length && el.selectionStart <= this._maskService.prefix.length && el.selectionEnd <= this._maskService.prefix.length) {
          e.preventDefault();
        }
        const cursorStart = el.selectionStart;
        if (e.key === MaskExpression.BACKSPACE && !el.readOnly && cursorStart === 0 && el.selectionEnd === el.value.length && el.value.length !== 0) {
          this._position = this._maskService.prefix ? this._maskService.prefix.length : 0;
          this._maskService.applyMask(this._maskService.prefix, this._maskService.maskExpression, this._position);
        }
      }
      if (!!this.suffix && this.suffix.length > 1 && this._inputValue.length - this.suffix.length < el.selectionStart) {
        el.setSelectionRange(this._inputValue.length - this.suffix.length, this._inputValue.length);
      } else if (e.code === "KeyA" && e.ctrlKey || e.code === "KeyA" && e.metaKey) {
        el.setSelectionRange(0, this._getActualInputLength());
        e.preventDefault();
      }
      this._maskService.selStart = el.selectionStart;
      this._maskService.selEnd = el.selectionEnd;
    }
  }
  writeValue(controlValue) {
    return __async(this, null, function* () {
      let value = controlValue;
      if (typeof value === "object" && value !== null && "value" in value) {
        if ("disable" in value) {
          this.setDisabledState(Boolean(value.disable));
        }
        value = value.value;
      }
      if (value !== null) {
        value = this.inputTransformFn ? this.inputTransformFn(value) : value;
      }
      if (typeof value === "string" || typeof value === "number" || value === null || typeof value === "undefined") {
        if (value === null || typeof value === "undefined" || value === "") {
          this._maskService._currentValue = "";
          this._maskService._previousValue = "";
        }
        let inputValue = value;
        if (typeof inputValue === "number" || this._maskValue.startsWith(MaskExpression.SEPARATOR)) {
          inputValue = String(inputValue);
          const localeDecimalMarker = this._maskService.currentLocaleDecimalMarker();
          if (!Array.isArray(this._maskService.decimalMarker)) {
            inputValue = this._maskService.decimalMarker !== localeDecimalMarker ? inputValue.replace(localeDecimalMarker, this._maskService.decimalMarker) : inputValue;
          }
          if (this._maskService.leadZero && inputValue && this.maskExpression && this.dropSpecialCharacters !== false) {
            inputValue = this._maskService._checkPrecision(this._maskService.maskExpression, inputValue);
          }
          if (this._maskService.decimalMarker === MaskExpression.COMMA || Array.isArray(this._maskService.decimalMarker) && this._maskService.thousandSeparator === MaskExpression.DOT) {
            inputValue = inputValue.toString().replace(MaskExpression.DOT, MaskExpression.COMMA);
          }
          if (this.maskExpression?.startsWith(MaskExpression.SEPARATOR) && this.leadZero) {
            requestAnimationFrame(() => {
              this._maskService.applyMask(inputValue?.toString() ?? "", this._maskService.maskExpression);
            });
          }
          this._maskService.isNumberValue = true;
        }
        if (typeof inputValue !== "string") {
          inputValue = "";
        }
        this._inputValue = inputValue;
        this._setMask();
        if (inputValue && this._maskService.maskExpression || this._maskService.maskExpression && (this._maskService.prefix || this._maskService.showMaskTyped)) {
          if (typeof this.inputTransformFn !== "function") {
            this._maskService.writingValue = true;
          }
          this._maskService.formElementProperty = ["value", this._maskService.applyMask(inputValue, this._maskService.maskExpression)];
          if (typeof this.inputTransformFn !== "function") {
            this._maskService.writingValue = false;
          }
        } else {
          this._maskService.formElementProperty = ["value", inputValue];
        }
        this._inputValue = inputValue;
      } else {
        console.warn("Ngx-mask writeValue work with string | number, your current value:", typeof value);
      }
    });
  }
  registerOnChange(fn) {
    this._maskService.onChange = this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }
  _getActiveElement(document = this.document) {
    const shadowRootEl = document?.activeElement?.shadowRoot;
    if (!shadowRootEl?.activeElement) {
      return document.activeElement;
    } else {
      return this._getActiveElement(shadowRootEl);
    }
  }
  checkSelectionOnDeletion(el) {
    el.selectionStart = Math.min(Math.max(this.prefix.length, el.selectionStart), this._inputValue.length - this.suffix.length);
    el.selectionEnd = Math.min(Math.max(this.prefix.length, el.selectionEnd), this._inputValue.length - this.suffix.length);
  }
  setDisabledState(isDisabled) {
    this._maskService.formElementProperty = ["disabled", isDisabled];
  }
  _applyMask() {
    this._maskService.maskExpression = this._maskService._repeatPatternSymbols(this._maskValue || "");
    this._maskService.formElementProperty = ["value", this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)];
  }
  _validateTime(value) {
    const rowMaskLen = this._maskValue.split(MaskExpression.EMPTY_STRING).filter((s) => s !== ":").length;
    if (!value) {
      return null;
    }
    if (+(value[value.length - 1] ?? -1) === 0 && value.length < rowMaskLen || value.length <= rowMaskLen - 2) {
      return this._createValidationError(value);
    }
    return null;
  }
  _getActualInputLength() {
    return this._maskService.actualValue.length || this._maskService.actualValue.length + this._maskService.prefix.length;
  }
  _createValidationError(actualValue) {
    return {
      mask: {
        requiredMask: this._maskValue,
        actualValue
      }
    };
  }
  _setMask() {
    this._maskExpressionArray.some((mask) => {
      const specialChart = mask.split(MaskExpression.EMPTY_STRING).some((char) => this._maskService.specialCharacters.includes(char));
      if (specialChart && this._inputValue && this._areAllCharactersInEachStringSame(this._maskExpressionArray) || mask.includes(MaskExpression.CURLY_BRACKETS_LEFT)) {
        const test = this._maskService.removeMask(this._inputValue)?.length <= this._maskService.removeMask(mask)?.length;
        if (test) {
          this._maskValue = this.maskExpression = this._maskService.maskExpression = mask.includes(MaskExpression.CURLY_BRACKETS_LEFT) ? this._maskService._repeatPatternSymbols(mask) : mask;
          return test;
        } else {
          if (this._code === MaskExpression.BACKSPACE) {
            this._allowFewMaskChangeMask = true;
          }
          const expression = this._maskExpressionArray[this._maskExpressionArray.length - 1] ?? MaskExpression.EMPTY_STRING;
          this._maskValue = this.maskExpression = this._maskService.maskExpression = expression.includes(MaskExpression.CURLY_BRACKETS_LEFT) ? this._maskService._repeatPatternSymbols(expression) : expression;
        }
      } else {
        const check = this._maskService.removeMask(this._inputValue)?.split(MaskExpression.EMPTY_STRING).every((character, index) => {
          const indexMask = mask.charAt(index);
          return this._maskService._checkSymbolMask(character, indexMask);
        });
        if (check || this._justPasted) {
          this._maskValue = this.maskExpression = this._maskService.maskExpression = mask;
          return check;
        }
      }
    });
  }
  _areAllCharactersInEachStringSame(array) {
    const specialCharacters = this._maskService.specialCharacters;
    function removeSpecialCharacters(str) {
      const regex = new RegExp(`[${specialCharacters.map((ch) => `\\${ch}`).join("")}]`, "g");
      return str.replace(regex, "");
    }
    const processedArr = array.map(removeSpecialCharacters);
    return processedArr.every((str) => {
      const uniqueCharacters = new Set(str);
      return uniqueCharacters.size === 1;
    });
  }
  static ɵfac = function NgxMaskDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgxMaskDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NgxMaskDirective,
    selectors: [["input", "mask", ""], ["textarea", "mask", ""]],
    hostBindings: function NgxMaskDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("paste", function NgxMaskDirective_paste_HostBindingHandler() {
          return ctx.onPaste();
        })("focus", function NgxMaskDirective_focus_HostBindingHandler($event) {
          return ctx.onFocus($event);
        })("ngModelChange", function NgxMaskDirective_ngModelChange_HostBindingHandler($event) {
          return ctx.onModelChange($event);
        })("input", function NgxMaskDirective_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        })("compositionstart", function NgxMaskDirective_compositionstart_HostBindingHandler($event) {
          return ctx.onCompositionStart($event);
        })("compositionend", function NgxMaskDirective_compositionend_HostBindingHandler($event) {
          return ctx.onCompositionEnd($event);
        })("blur", function NgxMaskDirective_blur_HostBindingHandler($event) {
          return ctx.onBlur($event);
        })("click", function NgxMaskDirective_click_HostBindingHandler($event) {
          return ctx.onClick($event);
        })("keydown", function NgxMaskDirective_keydown_HostBindingHandler($event) {
          return ctx.onKeyDown($event);
        });
      }
    },
    inputs: {
      maskExpression: [0, "mask", "maskExpression"],
      specialCharacters: "specialCharacters",
      patterns: "patterns",
      prefix: "prefix",
      suffix: "suffix",
      thousandSeparator: "thousandSeparator",
      decimalMarker: "decimalMarker",
      dropSpecialCharacters: "dropSpecialCharacters",
      hiddenInput: "hiddenInput",
      showMaskTyped: "showMaskTyped",
      placeHolderCharacter: "placeHolderCharacter",
      shownMaskExpression: "shownMaskExpression",
      showTemplate: "showTemplate",
      clearIfNotMatch: "clearIfNotMatch",
      validation: "validation",
      separatorLimit: "separatorLimit",
      allowNegativeNumbers: "allowNegativeNumbers",
      leadZeroDateTime: "leadZeroDateTime",
      leadZero: "leadZero",
      triggerOnMaskChange: "triggerOnMaskChange",
      apm: "apm",
      inputTransformFn: "inputTransformFn",
      outputTransformFn: "outputTransformFn",
      keepCharacterPositions: "keepCharacterPositions"
    },
    outputs: {
      maskFilled: "maskFilled"
    },
    exportAs: ["mask", "ngxMask"],
    standalone: true,
    features: [ɵɵProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: _NgxMaskDirective,
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _NgxMaskDirective,
      multi: true
    }, NgxMaskService]), ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaskDirective, [{
    type: Directive,
    args: [{
      selector: "input[mask], textarea[mask]",
      standalone: true,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: NgxMaskDirective,
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: NgxMaskDirective,
        multi: true
      }, NgxMaskService],
      exportAs: "mask,ngxMask"
    }]
  }], null, {
    maskExpression: [{
      type: Input,
      args: ["mask"]
    }],
    specialCharacters: [{
      type: Input
    }],
    patterns: [{
      type: Input
    }],
    prefix: [{
      type: Input
    }],
    suffix: [{
      type: Input
    }],
    thousandSeparator: [{
      type: Input
    }],
    decimalMarker: [{
      type: Input
    }],
    dropSpecialCharacters: [{
      type: Input
    }],
    hiddenInput: [{
      type: Input
    }],
    showMaskTyped: [{
      type: Input
    }],
    placeHolderCharacter: [{
      type: Input
    }],
    shownMaskExpression: [{
      type: Input
    }],
    showTemplate: [{
      type: Input
    }],
    clearIfNotMatch: [{
      type: Input
    }],
    validation: [{
      type: Input
    }],
    separatorLimit: [{
      type: Input
    }],
    allowNegativeNumbers: [{
      type: Input
    }],
    leadZeroDateTime: [{
      type: Input
    }],
    leadZero: [{
      type: Input
    }],
    triggerOnMaskChange: [{
      type: Input
    }],
    apm: [{
      type: Input
    }],
    inputTransformFn: [{
      type: Input
    }],
    outputTransformFn: [{
      type: Input
    }],
    keepCharacterPositions: [{
      type: Input
    }],
    maskFilled: [{
      type: Output
    }],
    onPaste: [{
      type: HostListener,
      args: ["paste"]
    }],
    onFocus: [{
      type: HostListener,
      args: ["focus", ["$event"]]
    }],
    onModelChange: [{
      type: HostListener,
      args: ["ngModelChange", ["$event"]]
    }],
    onInput: [{
      type: HostListener,
      args: ["input", ["$event"]]
    }],
    onCompositionStart: [{
      type: HostListener,
      args: ["compositionstart", ["$event"]]
    }],
    onCompositionEnd: [{
      type: HostListener,
      args: ["compositionend", ["$event"]]
    }],
    onBlur: [{
      type: HostListener,
      args: ["blur", ["$event"]]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var NgxMaskPipe = class _NgxMaskPipe {
  defaultOptions = inject(NGX_MASK_CONFIG);
  _maskService = inject(NgxMaskService);
  _maskExpressionArray = [];
  mask = "";
  transform(value, mask, _a = {}) {
    var _b = _a, {
      patterns
    } = _b, config = __objRest(_b, [
      "patterns"
    ]);
    let processedValue = value;
    const currentConfig = __spreadProps(__spreadValues(__spreadValues({
      maskExpression: mask
    }, this.defaultOptions), config), {
      patterns: __spreadValues(__spreadValues({}, this._maskService.patterns), patterns)
    });
    Object.entries(currentConfig).forEach(([key, val]) => {
      this._maskService[key] = val;
    });
    if (mask.includes("||")) {
      const maskParts = mask.split("||");
      if (maskParts.length > 1) {
        this._maskExpressionArray = maskParts.sort((a, b) => a.length - b.length);
        this._setMask(processedValue);
        return this._maskService.applyMask(`${processedValue}`, this.mask);
      } else {
        this._maskExpressionArray = [];
        return this._maskService.applyMask(`${processedValue}`, this.mask);
      }
    }
    if (mask.includes(MaskExpression.CURLY_BRACKETS_LEFT)) {
      return this._maskService.applyMask(`${processedValue}`, this._maskService._repeatPatternSymbols(mask));
    }
    if (mask.startsWith(MaskExpression.SEPARATOR)) {
      if (config.decimalMarker) {
        this._maskService.decimalMarker = config.decimalMarker;
      }
      if (config.thousandSeparator) {
        this._maskService.thousandSeparator = config.thousandSeparator;
      }
      if (config.leadZero) {
        this._maskService.leadZero = config.leadZero;
      }
      processedValue = String(processedValue);
      const localeDecimalMarker = this._maskService.currentLocaleDecimalMarker();
      if (!Array.isArray(this._maskService.decimalMarker)) {
        processedValue = this._maskService.decimalMarker !== localeDecimalMarker ? processedValue.replace(localeDecimalMarker, this._maskService.decimalMarker) : processedValue;
      }
      if (this._maskService.leadZero && processedValue && this._maskService.dropSpecialCharacters !== false) {
        processedValue = this._maskService._checkPrecision(mask, processedValue);
      }
      if (this._maskService.decimalMarker === MaskExpression.COMMA) {
        processedValue = processedValue.replace(MaskExpression.DOT, MaskExpression.COMMA);
      }
      this._maskService.isNumberValue = true;
    }
    if (processedValue === null || typeof processedValue === "undefined") {
      return this._maskService.applyMask("", mask);
    }
    return this._maskService.applyMask(`${processedValue}`, mask);
  }
  _setMask(value) {
    if (this._maskExpressionArray.length > 0) {
      this._maskExpressionArray.some((mask) => {
        const test = this._maskService.removeMask(value)?.length <= this._maskService.removeMask(mask)?.length;
        if (value && test) {
          this.mask = mask;
          return test;
        } else {
          const expression = this._maskExpressionArray[this._maskExpressionArray.length - 1] ?? MaskExpression.EMPTY_STRING;
          this.mask = expression;
        }
      });
    }
  }
  static ɵfac = function NgxMaskPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgxMaskPipe)();
  };
  static ɵpipe = ɵɵdefinePipe({
    name: "mask",
    type: _NgxMaskPipe,
    pure: true,
    standalone: true
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaskPipe, [{
    type: Pipe,
    args: [{
      name: "mask",
      pure: true,
      standalone: true
    }]
  }], null, null);
})();
export {
  INITIAL_CONFIG,
  NEW_CONFIG,
  NGX_MASK_CONFIG,
  NgxMaskDirective,
  NgxMaskPipe,
  NgxMaskService,
  initialConfig,
  provideEnvironmentNgxMask,
  provideNgxMask,
  timeMasks,
  withoutValidation
};
//# sourceMappingURL=ngx-mask.js.map
