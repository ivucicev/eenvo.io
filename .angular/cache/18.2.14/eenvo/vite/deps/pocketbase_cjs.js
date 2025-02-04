import {
  __async,
  __commonJS,
  __spreadValues,
  __superGet
} from "./chunk-RXHPGQPJ.js";

// node_modules/pocketbase/dist/pocketbase.cjs.js
var require_pocketbase_cjs = __commonJS({
  "node_modules/pocketbase/dist/pocketbase.cjs.js"(exports, module) {
    var ClientResponseError = class _ClientResponseError extends Error {
      constructor(e2) {
        super("ClientResponseError"), this.url = "", this.status = 0, this.response = {}, this.isAbort = false, this.originalError = null, Object.setPrototypeOf(this, _ClientResponseError.prototype), null !== e2 && "object" == typeof e2 && (this.url = "string" == typeof e2.url ? e2.url : "", this.status = "number" == typeof e2.status ? e2.status : 0, this.isAbort = !!e2.isAbort, this.originalError = e2.originalError, null !== e2.response && "object" == typeof e2.response ? this.response = e2.response : null !== e2.data && "object" == typeof e2.data ? this.response = e2.data : this.response = {}), this.originalError || e2 instanceof _ClientResponseError || (this.originalError = e2), "undefined" != typeof DOMException && e2 instanceof DOMException && (this.isAbort = true), this.name = "ClientResponseError " + this.status, this.message = this.response?.message, this.message || (this.isAbort ? this.message = "The request was autocancelled. You can find more info in https://github.com/pocketbase/js-sdk#auto-cancellation." : this.originalError?.cause?.message?.includes("ECONNREFUSED ::1") ? this.message = "Failed to connect to the PocketBase server. Try changing the SDK URL from localhost to 127.0.0.1 (https://github.com/pocketbase/js-sdk/issues/21)." : this.message = "Something went wrong while processing your request.");
      }
      get data() {
        return this.response;
      }
      toJSON() {
        return __spreadValues({}, this);
      }
    };
    var e = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function cookieSerialize(t2, s2, i2) {
      const n2 = Object.assign({}, i2 || {}), r2 = n2.encode || defaultEncode;
      if (!e.test(t2)) throw new TypeError("argument name is invalid");
      const o = r2(s2);
      if (o && !e.test(o)) throw new TypeError("argument val is invalid");
      let a = t2 + "=" + o;
      if (null != n2.maxAge) {
        const e2 = n2.maxAge - 0;
        if (isNaN(e2) || !isFinite(e2)) throw new TypeError("option maxAge is invalid");
        a += "; Max-Age=" + Math.floor(e2);
      }
      if (n2.domain) {
        if (!e.test(n2.domain)) throw new TypeError("option domain is invalid");
        a += "; Domain=" + n2.domain;
      }
      if (n2.path) {
        if (!e.test(n2.path)) throw new TypeError("option path is invalid");
        a += "; Path=" + n2.path;
      }
      if (n2.expires) {
        if (!function isDate(e2) {
          return "[object Date]" === Object.prototype.toString.call(e2) || e2 instanceof Date;
        }(n2.expires) || isNaN(n2.expires.valueOf())) throw new TypeError("option expires is invalid");
        a += "; Expires=" + n2.expires.toUTCString();
      }
      if (n2.httpOnly && (a += "; HttpOnly"), n2.secure && (a += "; Secure"), n2.priority) {
        switch ("string" == typeof n2.priority ? n2.priority.toLowerCase() : n2.priority) {
          case "low":
            a += "; Priority=Low";
            break;
          case "medium":
            a += "; Priority=Medium";
            break;
          case "high":
            a += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (n2.sameSite) {
        switch ("string" == typeof n2.sameSite ? n2.sameSite.toLowerCase() : n2.sameSite) {
          case true:
            a += "; SameSite=Strict";
            break;
          case "lax":
            a += "; SameSite=Lax";
            break;
          case "strict":
            a += "; SameSite=Strict";
            break;
          case "none":
            a += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return a;
    }
    function defaultDecode(e2) {
      return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
    }
    function defaultEncode(e2) {
      return encodeURIComponent(e2);
    }
    var t = "undefined" != typeof navigator && "ReactNative" === navigator.product || "undefined" != typeof global && global.HermesInternal;
    var s;
    function getTokenPayload(e2) {
      if (e2) try {
        const t2 = decodeURIComponent(s(e2.split(".")[1]).split("").map(function(e3) {
          return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        return JSON.parse(t2) || {};
      } catch (e3) {
      }
      return {};
    }
    function isTokenExpired(e2, t2 = 0) {
      let s2 = getTokenPayload(e2);
      return !(Object.keys(s2).length > 0 && (!s2.exp || s2.exp - t2 > Date.now() / 1e3));
    }
    s = "function" != typeof atob || t ? (e2) => {
      let t2 = String(e2).replace(/=+$/, "");
      if (t2.length % 4 == 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
      for (var s2, i2, n2 = 0, r2 = 0, o = ""; i2 = t2.charAt(r2++); ~i2 && (s2 = n2 % 4 ? 64 * s2 + i2 : i2, n2++ % 4) ? o += String.fromCharCode(255 & s2 >> (-2 * n2 & 6)) : 0) i2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i2);
      return o;
    } : atob;
    var i = "pb_auth";
    var BaseAuthStore = class {
      constructor() {
        this.baseToken = "", this.baseModel = null, this._onChangeCallbacks = [];
      }
      get token() {
        return this.baseToken;
      }
      get record() {
        return this.baseModel;
      }
      get model() {
        return this.baseModel;
      }
      get isValid() {
        return !isTokenExpired(this.token);
      }
      get isSuperuser() {
        let e2 = getTokenPayload(this.token);
        return "auth" == e2.type && ("_superusers" == this.record?.collectionName || !this.record?.collectionName && "pbc_3142635823" == e2.collectionId);
      }
      get isAdmin() {
        return console.warn("Please replace pb.authStore.isAdmin with pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName"), this.isSuperuser;
      }
      get isAuthRecord() {
        return console.warn("Please replace pb.authStore.isAuthRecord with !pb.authStore.isSuperuser OR simply check the value of pb.authStore.record?.collectionName"), "auth" == getTokenPayload(this.token).type && !this.isSuperuser;
      }
      save(e2, t2) {
        this.baseToken = e2 || "", this.baseModel = t2 || null, this.triggerChange();
      }
      clear() {
        this.baseToken = "", this.baseModel = null, this.triggerChange();
      }
      loadFromCookie(e2, t2 = i) {
        const s2 = function cookieParse(e3, t3) {
          const s3 = {};
          if ("string" != typeof e3) return s3;
          const i2 = Object.assign({}, {}).decode || defaultDecode;
          let n3 = 0;
          for (; n3 < e3.length; ) {
            const t4 = e3.indexOf("=", n3);
            if (-1 === t4) break;
            let r2 = e3.indexOf(";", n3);
            if (-1 === r2) r2 = e3.length;
            else if (r2 < t4) {
              n3 = e3.lastIndexOf(";", t4 - 1) + 1;
              continue;
            }
            const o = e3.slice(n3, t4).trim();
            if (void 0 === s3[o]) {
              let n4 = e3.slice(t4 + 1, r2).trim();
              34 === n4.charCodeAt(0) && (n4 = n4.slice(1, -1));
              try {
                s3[o] = i2(n4);
              } catch (e4) {
                s3[o] = n4;
              }
            }
            n3 = r2 + 1;
          }
          return s3;
        }(e2 || "")[t2] || "";
        let n2 = {};
        try {
          n2 = JSON.parse(s2), (null === typeof n2 || "object" != typeof n2 || Array.isArray(n2)) && (n2 = {});
        } catch (e3) {
        }
        this.save(n2.token || "", n2.record || n2.model || null);
      }
      exportToCookie(e2, t2 = i) {
        const s2 = {
          secure: true,
          sameSite: true,
          httpOnly: true,
          path: "/"
        }, n2 = getTokenPayload(this.token);
        s2.expires = n2?.exp ? new Date(1e3 * n2.exp) : /* @__PURE__ */ new Date("1970-01-01"), e2 = Object.assign({}, s2, e2);
        const r2 = {
          token: this.token,
          record: this.record ? JSON.parse(JSON.stringify(this.record)) : null
        };
        let o = cookieSerialize(t2, JSON.stringify(r2), e2);
        const a = "undefined" != typeof Blob ? new Blob([o]).size : o.length;
        if (r2.record && a > 4096) {
          r2.record = {
            id: r2.record?.id,
            email: r2.record?.email
          };
          const s3 = ["collectionId", "collectionName", "verified"];
          for (const e3 in this.record) s3.includes(e3) && (r2.record[e3] = this.record[e3]);
          o = cookieSerialize(t2, JSON.stringify(r2), e2);
        }
        return o;
      }
      onChange(e2, t2 = false) {
        return this._onChangeCallbacks.push(e2), t2 && e2(this.token, this.record), () => {
          for (let t3 = this._onChangeCallbacks.length - 1; t3 >= 0; t3--) if (this._onChangeCallbacks[t3] == e2) return delete this._onChangeCallbacks[t3], void this._onChangeCallbacks.splice(t3, 1);
        };
      }
      triggerChange() {
        for (const e2 of this._onChangeCallbacks) e2 && e2(this.token, this.record);
      }
    };
    var LocalAuthStore = class extends BaseAuthStore {
      constructor(e2 = "pocketbase_auth") {
        super(), this.storageFallback = {}, this.storageKey = e2, this._bindStorageEvent();
      }
      get token() {
        return (this._storageGet(this.storageKey) || {}).token || "";
      }
      get record() {
        const e2 = this._storageGet(this.storageKey) || {};
        return e2.record || e2.model || null;
      }
      get model() {
        return this.record;
      }
      save(e2, t2) {
        this._storageSet(this.storageKey, {
          token: e2,
          record: t2
        }), super.save(e2, t2);
      }
      clear() {
        this._storageRemove(this.storageKey), super.clear();
      }
      _storageGet(e2) {
        if ("undefined" != typeof window && window?.localStorage) {
          const t2 = window.localStorage.getItem(e2) || "";
          try {
            return JSON.parse(t2);
          } catch (e3) {
            return t2;
          }
        }
        return this.storageFallback[e2];
      }
      _storageSet(e2, t2) {
        if ("undefined" != typeof window && window?.localStorage) {
          let s2 = t2;
          "string" != typeof t2 && (s2 = JSON.stringify(t2)), window.localStorage.setItem(e2, s2);
        } else this.storageFallback[e2] = t2;
      }
      _storageRemove(e2) {
        "undefined" != typeof window && window?.localStorage && window.localStorage?.removeItem(e2), delete this.storageFallback[e2];
      }
      _bindStorageEvent() {
        "undefined" != typeof window && window?.localStorage && window.addEventListener && window.addEventListener("storage", (e2) => {
          if (e2.key != this.storageKey) return;
          const t2 = this._storageGet(this.storageKey) || {};
          super.save(t2.token || "", t2.record || t2.model || null);
        });
      }
    };
    var BaseService = class {
      constructor(e2) {
        this.client = e2;
      }
    };
    var SettingsService = class extends BaseService {
      getAll(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET"
          }, e2), this.client.send("/api/settings", e2);
        });
      }
      update(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "PATCH",
            body: e2
          }, t2), this.client.send("/api/settings", t2);
        });
      }
      testS3(e2 = "storage", t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST",
            body: {
              filesystem: e2
            }
          }, t2), this.client.send("/api/settings/test/s3", t2).then(() => true);
        });
      }
      testEmail(e2, t2, s2, i2) {
        return __async(this, null, function* () {
          return i2 = Object.assign({
            method: "POST",
            body: {
              email: t2,
              template: s2,
              collection: e2
            }
          }, i2), this.client.send("/api/settings/test/email", i2).then(() => true);
        });
      }
      generateAppleClientSecret(e2, t2, s2, i2, n2, r2) {
        return __async(this, null, function* () {
          return r2 = Object.assign({
            method: "POST",
            body: {
              clientId: e2,
              teamId: t2,
              keyId: s2,
              privateKey: i2,
              duration: n2
            }
          }, r2), this.client.send("/api/settings/apple/generate-client-secret", r2);
        });
      }
    };
    var n = ["requestKey", "$cancelKey", "$autoCancel", "fetch", "headers", "body", "query", "params", "cache", "credentials", "headers", "integrity", "keepalive", "method", "mode", "redirect", "referrer", "referrerPolicy", "signal", "window"];
    function normalizeUnknownQueryParams(e2) {
      if (e2) {
        e2.query = e2.query || {};
        for (let t2 in e2) n.includes(t2) || (e2.query[t2] = e2[t2], delete e2[t2]);
      }
    }
    function serializeQueryParams(e2) {
      const t2 = [];
      for (const s2 in e2) {
        if (null === e2[s2] || void 0 === e2[s2]) continue;
        const i2 = e2[s2], n2 = encodeURIComponent(s2);
        if (Array.isArray(i2)) for (const e3 of i2) t2.push(n2 + "=" + encodeURIComponent(e3));
        else i2 instanceof Date ? t2.push(n2 + "=" + encodeURIComponent(i2.toISOString())) : null !== typeof i2 && "object" == typeof i2 ? t2.push(n2 + "=" + encodeURIComponent(JSON.stringify(i2))) : t2.push(n2 + "=" + encodeURIComponent(i2));
      }
      return t2.join("&");
    }
    var RealtimeService = class extends BaseService {
      constructor() {
        super(...arguments), this.clientId = "", this.eventSource = null, this.subscriptions = {}, this.lastSentSubscriptions = [], this.maxConnectTimeout = 15e3, this.reconnectAttempts = 0, this.maxReconnectAttempts = 1 / 0, this.predefinedReconnectIntervals = [200, 300, 500, 1e3, 1200, 1500, 2e3], this.pendingConnects = [];
      }
      get isConnected() {
        return !!this.eventSource && !!this.clientId && !this.pendingConnects.length;
      }
      subscribe(e2, t2, s2) {
        return __async(this, null, function* () {
          if (!e2) throw new Error("topic must be set.");
          let i2 = e2;
          if (s2) {
            normalizeUnknownQueryParams(s2 = Object.assign({}, s2));
            const e3 = "options=" + encodeURIComponent(JSON.stringify({
              query: s2.query,
              headers: s2.headers
            }));
            i2 += (i2.includes("?") ? "&" : "?") + e3;
          }
          const listener = function(e3) {
            const s3 = e3;
            let i3;
            try {
              i3 = JSON.parse(s3?.data);
            } catch {
            }
            t2(i3 || {});
          };
          return this.subscriptions[i2] || (this.subscriptions[i2] = []), this.subscriptions[i2].push(listener), this.isConnected ? 1 === this.subscriptions[i2].length ? yield this.submitSubscriptions() : this.eventSource?.addEventListener(i2, listener) : yield this.connect(), () => __async(this, null, function* () {
            return this.unsubscribeByTopicAndListener(e2, listener);
          });
        });
      }
      unsubscribe(e2) {
        return __async(this, null, function* () {
          let t2 = false;
          if (e2) {
            const s2 = this.getSubscriptionsByTopic(e2);
            for (let e3 in s2) if (this.hasSubscriptionListeners(e3)) {
              for (let t3 of this.subscriptions[e3]) this.eventSource?.removeEventListener(e3, t3);
              delete this.subscriptions[e3], t2 || (t2 = true);
            }
          } else this.subscriptions = {};
          this.hasSubscriptionListeners() ? t2 && (yield this.submitSubscriptions()) : this.disconnect();
        });
      }
      unsubscribeByPrefix(e2) {
        return __async(this, null, function* () {
          let t2 = false;
          for (let s2 in this.subscriptions) if ((s2 + "?").startsWith(e2)) {
            t2 = true;
            for (let e3 of this.subscriptions[s2]) this.eventSource?.removeEventListener(s2, e3);
            delete this.subscriptions[s2];
          }
          t2 && (this.hasSubscriptionListeners() ? yield this.submitSubscriptions() : this.disconnect());
        });
      }
      unsubscribeByTopicAndListener(e2, t2) {
        return __async(this, null, function* () {
          let s2 = false;
          const i2 = this.getSubscriptionsByTopic(e2);
          for (let e3 in i2) {
            if (!Array.isArray(this.subscriptions[e3]) || !this.subscriptions[e3].length) continue;
            let i3 = false;
            for (let s3 = this.subscriptions[e3].length - 1; s3 >= 0; s3--) this.subscriptions[e3][s3] === t2 && (i3 = true, delete this.subscriptions[e3][s3], this.subscriptions[e3].splice(s3, 1), this.eventSource?.removeEventListener(e3, t2));
            i3 && (this.subscriptions[e3].length || delete this.subscriptions[e3], s2 || this.hasSubscriptionListeners(e3) || (s2 = true));
          }
          this.hasSubscriptionListeners() ? s2 && (yield this.submitSubscriptions()) : this.disconnect();
        });
      }
      hasSubscriptionListeners(e2) {
        if (this.subscriptions = this.subscriptions || {}, e2) return !!this.subscriptions[e2]?.length;
        for (let e3 in this.subscriptions) if (this.subscriptions[e3]?.length) return true;
        return false;
      }
      submitSubscriptions() {
        return __async(this, null, function* () {
          if (this.clientId) return this.addAllSubscriptionListeners(), this.lastSentSubscriptions = this.getNonEmptySubscriptionKeys(), this.client.send("/api/realtime", {
            method: "POST",
            body: {
              clientId: this.clientId,
              subscriptions: this.lastSentSubscriptions
            },
            requestKey: this.getSubscriptionsCancelKey()
          }).catch((e2) => {
            if (!e2?.isAbort) throw e2;
          });
        });
      }
      getSubscriptionsCancelKey() {
        return "realtime_" + this.clientId;
      }
      getSubscriptionsByTopic(e2) {
        const t2 = {};
        e2 = e2.includes("?") ? e2 : e2 + "?";
        for (let s2 in this.subscriptions) (s2 + "?").startsWith(e2) && (t2[s2] = this.subscriptions[s2]);
        return t2;
      }
      getNonEmptySubscriptionKeys() {
        const e2 = [];
        for (let t2 in this.subscriptions) this.subscriptions[t2].length && e2.push(t2);
        return e2;
      }
      addAllSubscriptionListeners() {
        if (this.eventSource) {
          this.removeAllSubscriptionListeners();
          for (let e2 in this.subscriptions) for (let t2 of this.subscriptions[e2]) this.eventSource.addEventListener(e2, t2);
        }
      }
      removeAllSubscriptionListeners() {
        if (this.eventSource) for (let e2 in this.subscriptions) for (let t2 of this.subscriptions[e2]) this.eventSource.removeEventListener(e2, t2);
      }
      connect() {
        return __async(this, null, function* () {
          if (!(this.reconnectAttempts > 0)) return new Promise((e2, t2) => {
            this.pendingConnects.push({
              resolve: e2,
              reject: t2
            }), this.pendingConnects.length > 1 || this.initConnect();
          });
        });
      }
      initConnect() {
        this.disconnect(true), clearTimeout(this.connectTimeoutId), this.connectTimeoutId = setTimeout(() => {
          this.connectErrorHandler(new Error("EventSource connect took too long."));
        }, this.maxConnectTimeout), this.eventSource = new EventSource(this.client.buildURL("/api/realtime")), this.eventSource.onerror = (e2) => {
          this.connectErrorHandler(new Error("Failed to establish realtime connection."));
        }, this.eventSource.addEventListener("PB_CONNECT", (e2) => {
          const t2 = e2;
          this.clientId = t2?.lastEventId, this.submitSubscriptions().then(() => __async(this, null, function* () {
            let e3 = 3;
            for (; this.hasUnsentSubscriptions() && e3 > 0; ) e3--, yield this.submitSubscriptions();
          })).then(() => {
            for (let e3 of this.pendingConnects) e3.resolve();
            this.pendingConnects = [], this.reconnectAttempts = 0, clearTimeout(this.reconnectTimeoutId), clearTimeout(this.connectTimeoutId);
            const t3 = this.getSubscriptionsByTopic("PB_CONNECT");
            for (let s2 in t3) for (let i2 of t3[s2]) i2(e2);
          }).catch((e3) => {
            this.clientId = "", this.connectErrorHandler(e3);
          });
        });
      }
      hasUnsentSubscriptions() {
        const e2 = this.getNonEmptySubscriptionKeys();
        if (e2.length != this.lastSentSubscriptions.length) return true;
        for (const t2 of e2) if (!this.lastSentSubscriptions.includes(t2)) return true;
        return false;
      }
      connectErrorHandler(e2) {
        if (clearTimeout(this.connectTimeoutId), clearTimeout(this.reconnectTimeoutId), !this.clientId && !this.reconnectAttempts || this.reconnectAttempts > this.maxReconnectAttempts) {
          for (let t3 of this.pendingConnects) t3.reject(new ClientResponseError(e2));
          return this.pendingConnects = [], void this.disconnect();
        }
        this.disconnect(true);
        const t2 = this.predefinedReconnectIntervals[this.reconnectAttempts] || this.predefinedReconnectIntervals[this.predefinedReconnectIntervals.length - 1];
        this.reconnectAttempts++, this.reconnectTimeoutId = setTimeout(() => {
          this.initConnect();
        }, t2);
      }
      disconnect(e2 = false) {
        if (this.clientId && this.onDisconnect && this.onDisconnect(Object.keys(this.subscriptions)), clearTimeout(this.connectTimeoutId), clearTimeout(this.reconnectTimeoutId), this.removeAllSubscriptionListeners(), this.client.cancelRequest(this.getSubscriptionsCancelKey()), this.eventSource?.close(), this.eventSource = null, this.clientId = "", !e2) {
          this.reconnectAttempts = 0;
          for (let e3 of this.pendingConnects) e3.resolve();
          this.pendingConnects = [];
        }
      }
    };
    var CrudService = class extends BaseService {
      decode(e2) {
        return e2;
      }
      getFullList(e2, t2) {
        return __async(this, null, function* () {
          if ("number" == typeof e2) return this._getFullList(e2, t2);
          let s2 = 500;
          return (t2 = Object.assign({}, e2, t2)).batch && (s2 = t2.batch, delete t2.batch), this._getFullList(s2, t2);
        });
      }
      getList(e2 = 1, t2 = 30, s2) {
        return __async(this, null, function* () {
          return (s2 = Object.assign({
            method: "GET"
          }, s2)).query = Object.assign({
            page: e2,
            perPage: t2
          }, s2.query), this.client.send(this.baseCrudPath, s2).then((e3) => (e3.items = e3.items?.map((e4) => this.decode(e4)) || [], e3));
        });
      }
      getFirstListItem(e2, t2) {
        return __async(this, null, function* () {
          return (t2 = Object.assign({
            requestKey: "one_by_filter_" + this.baseCrudPath + "_" + e2
          }, t2)).query = Object.assign({
            filter: e2,
            skipTotal: 1
          }, t2.query), this.getList(1, 1, t2).then((e3) => {
            if (!e3?.items?.length) throw new ClientResponseError({
              status: 404,
              response: {
                code: 404,
                message: "The requested resource wasn't found.",
                data: {}
              }
            });
            return e3.items[0];
          });
        });
      }
      getOne(e2, t2) {
        return __async(this, null, function* () {
          if (!e2) throw new ClientResponseError({
            url: this.client.buildURL(this.baseCrudPath + "/"),
            status: 404,
            response: {
              code: 404,
              message: "Missing required record id.",
              data: {}
            }
          });
          return t2 = Object.assign({
            method: "GET"
          }, t2), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2), t2).then((e3) => this.decode(e3));
        });
      }
      create(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST",
            body: e2
          }, t2), this.client.send(this.baseCrudPath, t2).then((e3) => this.decode(e3));
        });
      }
      update(e2, t2, s2) {
        return __async(this, null, function* () {
          return s2 = Object.assign({
            method: "PATCH",
            body: t2
          }, s2), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2), s2).then((e3) => this.decode(e3));
        });
      }
      delete(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "DELETE"
          }, t2), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2), t2).then(() => true);
        });
      }
      _getFullList(e2 = 500, t2) {
        (t2 = t2 || {}).query = Object.assign({
          skipTotal: 1
        }, t2.query);
        let s2 = [], request = (i2) => __async(this, null, function* () {
          return this.getList(i2, e2 || 500, t2).then((e3) => {
            const t3 = e3.items;
            return s2 = s2.concat(t3), t3.length == e3.perPage ? request(i2 + 1) : s2;
          });
        });
        return request(1);
      }
    };
    function normalizeLegacyOptionsArgs(e2, t2, s2, i2) {
      const n2 = void 0 !== i2;
      return n2 || void 0 !== s2 ? n2 ? (console.warn(e2), t2.body = Object.assign({}, t2.body, s2), t2.query = Object.assign({}, t2.query, i2), t2) : Object.assign(t2, s2) : t2;
    }
    function resetAutoRefresh(e2) {
      e2._resetAutoRefresh?.();
    }
    var RecordService = class _RecordService extends CrudService {
      constructor(e2, t2) {
        super(e2), this.collectionIdOrName = t2;
      }
      get baseCrudPath() {
        return this.baseCollectionPath + "/records";
      }
      get baseCollectionPath() {
        return "/api/collections/" + encodeURIComponent(this.collectionIdOrName);
      }
      get isSuperusers() {
        return "_superusers" == this.collectionIdOrName || "_pbc_2773867675" == this.collectionIdOrName;
      }
      subscribe(e2, t2, s2) {
        return __async(this, null, function* () {
          if (!e2) throw new Error("Missing topic.");
          if (!t2) throw new Error("Missing subscription callback.");
          return this.client.realtime.subscribe(this.collectionIdOrName + "/" + e2, t2, s2);
        });
      }
      unsubscribe(e2) {
        return __async(this, null, function* () {
          return e2 ? this.client.realtime.unsubscribe(this.collectionIdOrName + "/" + e2) : this.client.realtime.unsubscribeByPrefix(this.collectionIdOrName);
        });
      }
      getFullList(e2, t2) {
        return __async(this, null, function* () {
          if ("number" == typeof e2) return __superGet(_RecordService.prototype, this, "getFullList").call(this, e2, t2);
          const s2 = Object.assign({}, e2, t2);
          return __superGet(_RecordService.prototype, this, "getFullList").call(this, s2);
        });
      }
      getList(e2 = 1, t2 = 30, s2) {
        return __async(this, null, function* () {
          return __superGet(_RecordService.prototype, this, "getList").call(this, e2, t2, s2);
        });
      }
      getFirstListItem(e2, t2) {
        return __async(this, null, function* () {
          return __superGet(_RecordService.prototype, this, "getFirstListItem").call(this, e2, t2);
        });
      }
      getOne(e2, t2) {
        return __async(this, null, function* () {
          return __superGet(_RecordService.prototype, this, "getOne").call(this, e2, t2);
        });
      }
      create(e2, t2) {
        return __async(this, null, function* () {
          return __superGet(_RecordService.prototype, this, "create").call(this, e2, t2);
        });
      }
      update(e2, t2, s2) {
        return __async(this, null, function* () {
          return __superGet(_RecordService.prototype, this, "update").call(this, e2, t2, s2).then((e3) => {
            if (this.client.authStore.record?.id === e3?.id && (this.client.authStore.record?.collectionId === this.collectionIdOrName || this.client.authStore.record?.collectionName === this.collectionIdOrName)) {
              let t3 = Object.assign({}, this.client.authStore.record.expand), s3 = Object.assign({}, this.client.authStore.record, e3);
              t3 && (s3.expand = Object.assign(t3, e3.expand)), this.client.authStore.save(this.client.authStore.token, s3);
            }
            return e3;
          });
        });
      }
      delete(e2, t2) {
        return __async(this, null, function* () {
          return __superGet(_RecordService.prototype, this, "delete").call(this, e2, t2).then((t3) => (!t3 || this.client.authStore.record?.id !== e2 || this.client.authStore.record?.collectionId !== this.collectionIdOrName && this.client.authStore.record?.collectionName !== this.collectionIdOrName || this.client.authStore.clear(), t3));
        });
      }
      authResponse(e2) {
        const t2 = this.decode(e2?.record || {});
        return this.client.authStore.save(e2?.token, t2), Object.assign({}, e2, {
          token: e2?.token || "",
          record: t2
        });
      }
      listAuthMethods(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET",
            fields: "mfa,otp,password,oauth2"
          }, e2), this.client.send(this.baseCollectionPath + "/auth-methods", e2);
        });
      }
      authWithPassword(e2, t2, s2) {
        return __async(this, null, function* () {
          let i2;
          s2 = Object.assign({
            method: "POST",
            body: {
              identity: e2,
              password: t2
            }
          }, s2), this.isSuperusers && (i2 = s2.autoRefreshThreshold, delete s2.autoRefreshThreshold, s2.autoRefresh || resetAutoRefresh(this.client));
          let n2 = yield this.client.send(this.baseCollectionPath + "/auth-with-password", s2);
          return n2 = this.authResponse(n2), i2 && this.isSuperusers && function registerAutoRefresh(e3, t3, s3, i3) {
            resetAutoRefresh(e3);
            const n3 = e3.beforeSend, r2 = e3.authStore.record, o = e3.authStore.onChange((t4, s4) => {
              (!t4 || s4?.id != r2?.id || (s4?.collectionId || r2?.collectionId) && s4?.collectionId != r2?.collectionId) && resetAutoRefresh(e3);
            });
            e3._resetAutoRefresh = function() {
              o(), e3.beforeSend = n3, delete e3._resetAutoRefresh;
            }, e3.beforeSend = (r3, o2) => __async(this, null, function* () {
              const a = e3.authStore.token;
              if (o2.query?.autoRefresh) return n3 ? n3(r3, o2) : {
                url: r3,
                sendOptions: o2
              };
              let c = e3.authStore.isValid;
              if (c && isTokenExpired(e3.authStore.token, t3)) try {
                yield s3();
              } catch (e4) {
                c = false;
              }
              c || (yield i3());
              const l = o2.headers || {};
              for (let t4 in l) if ("authorization" == t4.toLowerCase() && a == l[t4] && e3.authStore.token) {
                l[t4] = e3.authStore.token;
                break;
              }
              return o2.headers = l, n3 ? n3(r3, o2) : {
                url: r3,
                sendOptions: o2
              };
            });
          }(this.client, i2, () => this.authRefresh({
            autoRefresh: true
          }), () => this.authWithPassword(e2, t2, Object.assign({
            autoRefresh: true
          }, s2))), n2;
        });
      }
      authWithOAuth2Code(e2, t2, s2, i2, n2, r2, o) {
        return __async(this, null, function* () {
          let a = {
            method: "POST",
            body: {
              provider: e2,
              code: t2,
              codeVerifier: s2,
              redirectURL: i2,
              createData: n2
            }
          };
          return a = normalizeLegacyOptionsArgs("This form of authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, body?, query?) is deprecated. Consider replacing it with authWithOAuth2Code(provider, code, codeVerifier, redirectURL, createData?, options?).", a, r2, o), this.client.send(this.baseCollectionPath + "/auth-with-oauth2", a).then((e3) => this.authResponse(e3));
        });
      }
      authWithOAuth2(...e2) {
        if (e2.length > 1 || "string" == typeof e2?.[0]) return console.warn("PocketBase: This form of authWithOAuth2() is deprecated and may get removed in the future. Please replace with authWithOAuth2Code() OR use the authWithOAuth2() realtime form as shown in https://pocketbase.io/docs/authentication/#oauth2-integration."), this.authWithOAuth2Code(e2?.[0] || "", e2?.[1] || "", e2?.[2] || "", e2?.[3] || "", e2?.[4] || {}, e2?.[5] || {}, e2?.[6] || {});
        const t2 = e2?.[0] || {};
        let s2 = null;
        t2.urlCallback || (s2 = openBrowserPopup(void 0));
        const i2 = new RealtimeService(this.client);
        function cleanup() {
          s2?.close(), i2.unsubscribe();
        }
        const n2 = {}, r2 = t2.requestKey;
        return r2 && (n2.requestKey = r2), this.listAuthMethods(n2).then((e3) => {
          const n3 = e3.oauth2.providers.find((e4) => e4.name === t2.provider);
          if (!n3) throw new ClientResponseError(new Error(`Missing or invalid provider "${t2.provider}".`));
          const o = this.client.buildURL("/api/oauth2-redirect"), a = r2 ? this.client.cancelControllers?.[r2] : void 0;
          return a && (a.signal.onabort = () => {
            cleanup();
          }), new Promise((e4, r3) => __async(this, null, function* () {
            try {
              yield i2.subscribe("@oauth2", (s3) => __async(this, null, function* () {
                const c2 = i2.clientId;
                try {
                  if (!s3.state || c2 !== s3.state) throw new Error("State parameters don't match.");
                  if (s3.error || !s3.code) throw new Error("OAuth2 redirect error or missing code: " + s3.error);
                  const i3 = Object.assign({}, t2);
                  delete i3.provider, delete i3.scopes, delete i3.createData, delete i3.urlCallback, a?.signal?.onabort && (a.signal.onabort = null);
                  const r4 = yield this.authWithOAuth2Code(n3.name, s3.code, n3.codeVerifier, o, t2.createData, i3);
                  e4(r4);
                } catch (e5) {
                  r3(new ClientResponseError(e5));
                }
                cleanup();
              }));
              const c = {
                state: i2.clientId
              };
              t2.scopes?.length && (c.scope = t2.scopes.join(" "));
              const l = this._replaceQueryParams(n3.authURL + o, c);
              let h = t2.urlCallback || function(e5) {
                s2 ? s2.location.href = e5 : s2 = openBrowserPopup(e5);
              };
              yield h(l);
            } catch (e5) {
              cleanup(), r3(new ClientResponseError(e5));
            }
          }));
        }).catch((e3) => {
          throw cleanup(), e3;
        });
      }
      authRefresh(e2, t2) {
        return __async(this, null, function* () {
          let s2 = {
            method: "POST"
          };
          return s2 = normalizeLegacyOptionsArgs("This form of authRefresh(body?, query?) is deprecated. Consider replacing it with authRefresh(options?).", s2, e2, t2), this.client.send(this.baseCollectionPath + "/auth-refresh", s2).then((e3) => this.authResponse(e3));
        });
      }
      requestPasswordReset(e2, t2, s2) {
        return __async(this, null, function* () {
          let i2 = {
            method: "POST",
            body: {
              email: e2
            }
          };
          return i2 = normalizeLegacyOptionsArgs("This form of requestPasswordReset(email, body?, query?) is deprecated. Consider replacing it with requestPasswordReset(email, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/request-password-reset", i2).then(() => true);
        });
      }
      confirmPasswordReset(e2, t2, s2, i2, n2) {
        return __async(this, null, function* () {
          let r2 = {
            method: "POST",
            body: {
              token: e2,
              password: t2,
              passwordConfirm: s2
            }
          };
          return r2 = normalizeLegacyOptionsArgs("This form of confirmPasswordReset(token, password, passwordConfirm, body?, query?) is deprecated. Consider replacing it with confirmPasswordReset(token, password, passwordConfirm, options?).", r2, i2, n2), this.client.send(this.baseCollectionPath + "/confirm-password-reset", r2).then(() => true);
        });
      }
      requestVerification(e2, t2, s2) {
        return __async(this, null, function* () {
          let i2 = {
            method: "POST",
            body: {
              email: e2
            }
          };
          return i2 = normalizeLegacyOptionsArgs("This form of requestVerification(email, body?, query?) is deprecated. Consider replacing it with requestVerification(email, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/request-verification", i2).then(() => true);
        });
      }
      confirmVerification(e2, t2, s2) {
        return __async(this, null, function* () {
          let i2 = {
            method: "POST",
            body: {
              token: e2
            }
          };
          return i2 = normalizeLegacyOptionsArgs("This form of confirmVerification(token, body?, query?) is deprecated. Consider replacing it with confirmVerification(token, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/confirm-verification", i2).then(() => {
            const t3 = getTokenPayload(e2), s3 = this.client.authStore.record;
            return s3 && !s3.verified && s3.id === t3.id && s3.collectionId === t3.collectionId && (s3.verified = true, this.client.authStore.save(this.client.authStore.token, s3)), true;
          });
        });
      }
      requestEmailChange(e2, t2, s2) {
        return __async(this, null, function* () {
          let i2 = {
            method: "POST",
            body: {
              newEmail: e2
            }
          };
          return i2 = normalizeLegacyOptionsArgs("This form of requestEmailChange(newEmail, body?, query?) is deprecated. Consider replacing it with requestEmailChange(newEmail, options?).", i2, t2, s2), this.client.send(this.baseCollectionPath + "/request-email-change", i2).then(() => true);
        });
      }
      confirmEmailChange(e2, t2, s2, i2) {
        return __async(this, null, function* () {
          let n2 = {
            method: "POST",
            body: {
              token: e2,
              password: t2
            }
          };
          return n2 = normalizeLegacyOptionsArgs("This form of confirmEmailChange(token, password, body?, query?) is deprecated. Consider replacing it with confirmEmailChange(token, password, options?).", n2, s2, i2), this.client.send(this.baseCollectionPath + "/confirm-email-change", n2).then(() => {
            const t3 = getTokenPayload(e2), s3 = this.client.authStore.record;
            return s3 && s3.id === t3.id && s3.collectionId === t3.collectionId && this.client.authStore.clear(), true;
          });
        });
      }
      listExternalAuths(e2, t2) {
        return __async(this, null, function* () {
          return this.client.collection("_externalAuths").getFullList(Object.assign({}, t2, {
            filter: this.client.filter("recordRef = {:id}", {
              id: e2
            })
          }));
        });
      }
      unlinkExternalAuth(e2, t2, s2) {
        return __async(this, null, function* () {
          const i2 = yield this.client.collection("_externalAuths").getFirstListItem(this.client.filter("recordRef = {:recordId} && provider = {:provider}", {
            recordId: e2,
            provider: t2
          }));
          return this.client.collection("_externalAuths").delete(i2.id, s2).then(() => true);
        });
      }
      requestOTP(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST",
            body: {
              email: e2
            }
          }, t2), this.client.send(this.baseCollectionPath + "/request-otp", t2);
        });
      }
      authWithOTP(e2, t2, s2) {
        return __async(this, null, function* () {
          return s2 = Object.assign({
            method: "POST",
            body: {
              otpId: e2,
              password: t2
            }
          }, s2), this.client.send(this.baseCollectionPath + "/auth-with-otp", s2).then((e3) => this.authResponse(e3));
        });
      }
      impersonate(e2, t2, s2) {
        return __async(this, null, function* () {
          (s2 = Object.assign({
            method: "POST",
            body: {
              duration: t2
            }
          }, s2)).headers = s2.headers || {}, s2.headers.Authorization || (s2.headers.Authorization = this.client.authStore.token);
          const i2 = new Client(this.client.baseURL, new BaseAuthStore(), this.client.lang), n2 = yield i2.send(this.baseCollectionPath + "/impersonate/" + encodeURIComponent(e2), s2);
          return i2.authStore.save(n2?.token, this.decode(n2?.record || {})), i2;
        });
      }
      _replaceQueryParams(e2, t2 = {}) {
        let s2 = e2, i2 = "";
        e2.indexOf("?") >= 0 && (s2 = e2.substring(0, e2.indexOf("?")), i2 = e2.substring(e2.indexOf("?") + 1));
        const n2 = {}, r2 = i2.split("&");
        for (const e3 of r2) {
          if ("" == e3) continue;
          const t3 = e3.split("=");
          n2[decodeURIComponent(t3[0].replace(/\+/g, " "))] = decodeURIComponent((t3[1] || "").replace(/\+/g, " "));
        }
        for (let e3 in t2) t2.hasOwnProperty(e3) && (null == t2[e3] ? delete n2[e3] : n2[e3] = t2[e3]);
        i2 = "";
        for (let e3 in n2) n2.hasOwnProperty(e3) && ("" != i2 && (i2 += "&"), i2 += encodeURIComponent(e3.replace(/%20/g, "+")) + "=" + encodeURIComponent(n2[e3].replace(/%20/g, "+")));
        return "" != i2 ? s2 + "?" + i2 : s2;
      }
    };
    function openBrowserPopup(e2) {
      if ("undefined" == typeof window || !window?.open) throw new ClientResponseError(new Error("Not in a browser context - please pass a custom urlCallback function."));
      let t2 = 1024, s2 = 768, i2 = window.innerWidth, n2 = window.innerHeight;
      t2 = t2 > i2 ? i2 : t2, s2 = s2 > n2 ? n2 : s2;
      let r2 = i2 / 2 - t2 / 2, o = n2 / 2 - s2 / 2;
      return window.open(e2, "popup_window", "width=" + t2 + ",height=" + s2 + ",top=" + o + ",left=" + r2 + ",resizable,menubar=no");
    }
    var CollectionService = class extends CrudService {
      get baseCrudPath() {
        return "/api/collections";
      }
      import(e2, t2 = false, s2) {
        return __async(this, null, function* () {
          return s2 = Object.assign({
            method: "PUT",
            body: {
              collections: e2,
              deleteMissing: t2
            }
          }, s2), this.client.send(this.baseCrudPath + "/import", s2).then(() => true);
        });
      }
      getScaffolds(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET"
          }, e2), this.client.send(this.baseCrudPath + "/meta/scaffolds", e2);
        });
      }
      truncate(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "DELETE"
          }, t2), this.client.send(this.baseCrudPath + "/" + encodeURIComponent(e2) + "/truncate", t2).then(() => true);
        });
      }
    };
    var LogService = class extends BaseService {
      getList(e2 = 1, t2 = 30, s2) {
        return __async(this, null, function* () {
          return (s2 = Object.assign({
            method: "GET"
          }, s2)).query = Object.assign({
            page: e2,
            perPage: t2
          }, s2.query), this.client.send("/api/logs", s2);
        });
      }
      getOne(e2, t2) {
        return __async(this, null, function* () {
          if (!e2) throw new ClientResponseError({
            url: this.client.buildURL("/api/logs/"),
            status: 404,
            response: {
              code: 404,
              message: "Missing required log id.",
              data: {}
            }
          });
          return t2 = Object.assign({
            method: "GET"
          }, t2), this.client.send("/api/logs/" + encodeURIComponent(e2), t2);
        });
      }
      getStats(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET"
          }, e2), this.client.send("/api/logs/stats", e2);
        });
      }
    };
    var HealthService = class extends BaseService {
      check(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET"
          }, e2), this.client.send("/api/health", e2);
        });
      }
    };
    var FileService = class extends BaseService {
      getUrl(e2, t2, s2 = {}) {
        return console.warn("Please replace pb.files.getUrl() with pb.files.getURL()"), this.getURL(e2, t2, s2);
      }
      getURL(e2, t2, s2 = {}) {
        if (!t2 || !e2?.id || !e2?.collectionId && !e2?.collectionName) return "";
        const i2 = [];
        i2.push("api"), i2.push("files"), i2.push(encodeURIComponent(e2.collectionId || e2.collectionName)), i2.push(encodeURIComponent(e2.id)), i2.push(encodeURIComponent(t2));
        let n2 = this.client.buildURL(i2.join("/"));
        if (Object.keys(s2).length) {
          false === s2.download && delete s2.download;
          const e3 = new URLSearchParams(s2);
          n2 += (n2.includes("?") ? "&" : "?") + e3;
        }
        return n2;
      }
      getToken(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "POST"
          }, e2), this.client.send("/api/files/token", e2).then((e3) => e3?.token || "");
        });
      }
    };
    var BackupService = class extends BaseService {
      getFullList(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET"
          }, e2), this.client.send("/api/backups", e2);
        });
      }
      create(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST",
            body: {
              name: e2
            }
          }, t2), this.client.send("/api/backups", t2).then(() => true);
        });
      }
      upload(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST",
            body: e2
          }, t2), this.client.send("/api/backups/upload", t2).then(() => true);
        });
      }
      delete(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "DELETE"
          }, t2), this.client.send(`/api/backups/${encodeURIComponent(e2)}`, t2).then(() => true);
        });
      }
      restore(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST"
          }, t2), this.client.send(`/api/backups/${encodeURIComponent(e2)}/restore`, t2).then(() => true);
        });
      }
      getDownloadUrl(e2, t2) {
        return console.warn("Please replace pb.backups.getDownloadUrl() with pb.backups.getDownloadURL()"), this.getDownloadURL(e2, t2);
      }
      getDownloadURL(e2, t2) {
        return this.client.buildURL(`/api/backups/${encodeURIComponent(t2)}?token=${encodeURIComponent(e2)}`);
      }
    };
    var CronService = class extends BaseService {
      getFullList(e2) {
        return __async(this, null, function* () {
          return e2 = Object.assign({
            method: "GET"
          }, e2), this.client.send("/api/crons", e2);
        });
      }
      run(e2, t2) {
        return __async(this, null, function* () {
          return t2 = Object.assign({
            method: "POST"
          }, t2), this.client.send(`/api/crons/${encodeURIComponent(e2)}`, t2).then(() => true);
        });
      }
    };
    function isFile(e2) {
      return "undefined" != typeof Blob && e2 instanceof Blob || "undefined" != typeof File && e2 instanceof File || null !== e2 && "object" == typeof e2 && e2.uri && ("undefined" != typeof navigator && "ReactNative" === navigator.product || "undefined" != typeof global && global.HermesInternal);
    }
    function isFormData(e2) {
      return e2 && ("FormData" === e2.constructor.name || "undefined" != typeof FormData && e2 instanceof FormData);
    }
    function hasFileField(e2) {
      for (const t2 in e2) {
        const s2 = Array.isArray(e2[t2]) ? e2[t2] : [e2[t2]];
        for (const e3 of s2) if (isFile(e3)) return true;
      }
      return false;
    }
    var r = /^[\-\.\d]+$/;
    function inferFormDataValue(e2) {
      if ("string" != typeof e2) return e2;
      if ("true" == e2) return true;
      if ("false" == e2) return false;
      if (("-" === e2[0] || e2[0] >= "0" && e2[0] <= "9") && r.test(e2)) {
        let t2 = +e2;
        if ("" + t2 === e2) return t2;
      }
      return e2;
    }
    var BatchService = class extends BaseService {
      constructor() {
        super(...arguments), this.requests = [], this.subs = {};
      }
      collection(e2) {
        return this.subs[e2] || (this.subs[e2] = new SubBatchService(this.requests, e2)), this.subs[e2];
      }
      send(e2) {
        return __async(this, null, function* () {
          const t2 = new FormData(), s2 = [];
          for (let e3 = 0; e3 < this.requests.length; e3++) {
            const i2 = this.requests[e3];
            if (s2.push({
              method: i2.method,
              url: i2.url,
              headers: i2.headers,
              body: i2.json
            }), i2.files) for (let s3 in i2.files) {
              const n2 = i2.files[s3] || [];
              for (let i3 of n2) t2.append("requests." + e3 + "." + s3, i3);
            }
          }
          return t2.append("@jsonPayload", JSON.stringify({
            requests: s2
          })), e2 = Object.assign({
            method: "POST",
            body: t2
          }, e2), this.client.send("/api/batch", e2);
        });
      }
    };
    var SubBatchService = class {
      constructor(e2, t2) {
        this.requests = [], this.requests = e2, this.collectionIdOrName = t2;
      }
      upsert(e2, t2) {
        t2 = Object.assign({
          body: e2 || {}
        }, t2);
        const s2 = {
          method: "PUT",
          url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records"
        };
        this.prepareRequest(s2, t2), this.requests.push(s2);
      }
      create(e2, t2) {
        t2 = Object.assign({
          body: e2 || {}
        }, t2);
        const s2 = {
          method: "POST",
          url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records"
        };
        this.prepareRequest(s2, t2), this.requests.push(s2);
      }
      update(e2, t2, s2) {
        s2 = Object.assign({
          body: t2 || {}
        }, s2);
        const i2 = {
          method: "PATCH",
          url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(e2)
        };
        this.prepareRequest(i2, s2), this.requests.push(i2);
      }
      delete(e2, t2) {
        t2 = Object.assign({}, t2);
        const s2 = {
          method: "DELETE",
          url: "/api/collections/" + encodeURIComponent(this.collectionIdOrName) + "/records/" + encodeURIComponent(e2)
        };
        this.prepareRequest(s2, t2), this.requests.push(s2);
      }
      prepareRequest(e2, t2) {
        if (normalizeUnknownQueryParams(t2), e2.headers = t2.headers, e2.json = {}, e2.files = {}, void 0 !== t2.query) {
          const s3 = serializeQueryParams(t2.query);
          s3 && (e2.url += (e2.url.includes("?") ? "&" : "?") + s3);
        }
        let s2 = t2.body;
        isFormData(s2) && (s2 = function convertFormDataToObject(e3) {
          let t3 = {};
          return e3.forEach((e4, s3) => {
            if ("@jsonPayload" === s3 && "string" == typeof e4) try {
              let s4 = JSON.parse(e4);
              Object.assign(t3, s4);
            } catch (e5) {
              console.warn("@jsonPayload error:", e5);
            }
            else void 0 !== t3[s3] ? (Array.isArray(t3[s3]) || (t3[s3] = [t3[s3]]), t3[s3].push(inferFormDataValue(e4))) : t3[s3] = inferFormDataValue(e4);
          }), t3;
        }(s2));
        for (const t3 in s2) {
          const i2 = s2[t3];
          if (isFile(i2)) e2.files[t3] = e2.files[t3] || [], e2.files[t3].push(i2);
          else if (Array.isArray(i2)) {
            const s3 = [], n2 = [];
            for (const e3 of i2) isFile(e3) ? s3.push(e3) : n2.push(e3);
            if (s3.length > 0 && s3.length == i2.length) {
              e2.files[t3] = e2.files[t3] || [];
              for (let i3 of s3) e2.files[t3].push(i3);
            } else if (e2.json[t3] = n2, s3.length > 0) {
              let i3 = t3;
              t3.startsWith("+") || t3.endsWith("+") || (i3 += "+"), e2.files[i3] = e2.files[i3] || [];
              for (let t4 of s3) e2.files[i3].push(t4);
            }
          } else e2.json[t3] = i2;
        }
      }
    };
    var Client = class {
      get baseUrl() {
        return this.baseURL;
      }
      set baseUrl(e2) {
        this.baseURL = e2;
      }
      constructor(e2 = "/", t2, s2 = "en-US") {
        this.cancelControllers = {}, this.recordServices = {}, this.enableAutoCancellation = true, this.baseURL = e2, this.lang = s2, t2 ? this.authStore = t2 : "undefined" != typeof window && window.Deno ? this.authStore = new BaseAuthStore() : this.authStore = new LocalAuthStore(), this.collections = new CollectionService(this), this.files = new FileService(this), this.logs = new LogService(this), this.settings = new SettingsService(this), this.realtime = new RealtimeService(this), this.health = new HealthService(this), this.backups = new BackupService(this), this.crons = new CronService(this);
      }
      get admins() {
        return this.collection("_superusers");
      }
      createBatch() {
        return new BatchService(this);
      }
      collection(e2) {
        return this.recordServices[e2] || (this.recordServices[e2] = new RecordService(this, e2)), this.recordServices[e2];
      }
      autoCancellation(e2) {
        return this.enableAutoCancellation = !!e2, this;
      }
      cancelRequest(e2) {
        return this.cancelControllers[e2] && (this.cancelControllers[e2].abort(), delete this.cancelControllers[e2]), this;
      }
      cancelAllRequests() {
        for (let e2 in this.cancelControllers) this.cancelControllers[e2].abort();
        return this.cancelControllers = {}, this;
      }
      filter(e2, t2) {
        if (!t2) return e2;
        for (let s2 in t2) {
          let i2 = t2[s2];
          switch (typeof i2) {
            case "boolean":
            case "number":
              i2 = "" + i2;
              break;
            case "string":
              i2 = "'" + i2.replace(/'/g, "\\'") + "'";
              break;
            default:
              i2 = null === i2 ? "null" : i2 instanceof Date ? "'" + i2.toISOString().replace("T", " ") + "'" : "'" + JSON.stringify(i2).replace(/'/g, "\\'") + "'";
          }
          e2 = e2.replaceAll("{:" + s2 + "}", i2);
        }
        return e2;
      }
      getFileUrl(e2, t2, s2 = {}) {
        return console.warn("Please replace pb.getFileUrl() with pb.files.getURL()"), this.files.getURL(e2, t2, s2);
      }
      buildUrl(e2) {
        return console.warn("Please replace pb.buildUrl() with pb.buildURL()"), this.buildURL(e2);
      }
      buildURL(e2) {
        let t2 = this.baseURL;
        return "undefined" == typeof window || !window.location || t2.startsWith("https://") || t2.startsWith("http://") || (t2 = window.location.origin?.endsWith("/") ? window.location.origin.substring(0, window.location.origin.length - 1) : window.location.origin || "", this.baseURL.startsWith("/") || (t2 += window.location.pathname || "/", t2 += t2.endsWith("/") ? "" : "/"), t2 += this.baseURL), e2 && (t2 += t2.endsWith("/") ? "" : "/", t2 += e2.startsWith("/") ? e2.substring(1) : e2), t2;
      }
      send(e2, t2) {
        return __async(this, null, function* () {
          t2 = this.initSendOptions(e2, t2);
          let s2 = this.buildURL(e2);
          if (this.beforeSend) {
            const e3 = Object.assign({}, yield this.beforeSend(s2, t2));
            void 0 !== e3.url || void 0 !== e3.options ? (s2 = e3.url || s2, t2 = e3.options || t2) : Object.keys(e3).length && (t2 = e3, console?.warn && console.warn("Deprecated format of beforeSend return: please use `return { url, options }`, instead of `return options`."));
          }
          if (void 0 !== t2.query) {
            const e3 = serializeQueryParams(t2.query);
            e3 && (s2 += (s2.includes("?") ? "&" : "?") + e3), delete t2.query;
          }
          "application/json" == this.getHeader(t2.headers, "Content-Type") && t2.body && "string" != typeof t2.body && (t2.body = JSON.stringify(t2.body));
          return (t2.fetch || fetch)(s2, t2).then((e3) => __async(this, null, function* () {
            let s3 = {};
            try {
              s3 = yield e3.json();
            } catch (e4) {
            }
            if (this.afterSend && (s3 = yield this.afterSend(e3, s3, t2)), e3.status >= 400) throw new ClientResponseError({
              url: e3.url,
              status: e3.status,
              data: s3
            });
            return s3;
          })).catch((e3) => {
            throw new ClientResponseError(e3);
          });
        });
      }
      initSendOptions(e2, t2) {
        if ((t2 = Object.assign({
          method: "GET"
        }, t2)).body = function convertToFormDataIfNeeded(e3) {
          if ("undefined" == typeof FormData || void 0 === e3 || "object" != typeof e3 || null === e3 || isFormData(e3) || !hasFileField(e3)) return e3;
          const t3 = new FormData();
          for (const s2 in e3) {
            const i2 = e3[s2];
            if ("object" != typeof i2 || hasFileField({
              data: i2
            })) {
              const e4 = Array.isArray(i2) ? i2 : [i2];
              for (let i3 of e4) t3.append(s2, i3);
            } else {
              let e4 = {};
              e4[s2] = i2, t3.append("@jsonPayload", JSON.stringify(e4));
            }
          }
          return t3;
        }(t2.body), normalizeUnknownQueryParams(t2), t2.query = Object.assign({}, t2.params, t2.query), void 0 === t2.requestKey && (false === t2.$autoCancel || false === t2.query.$autoCancel ? t2.requestKey = null : (t2.$cancelKey || t2.query.$cancelKey) && (t2.requestKey = t2.$cancelKey || t2.query.$cancelKey)), delete t2.$autoCancel, delete t2.query.$autoCancel, delete t2.$cancelKey, delete t2.query.$cancelKey, null !== this.getHeader(t2.headers, "Content-Type") || isFormData(t2.body) || (t2.headers = Object.assign({}, t2.headers, {
          "Content-Type": "application/json"
        })), null === this.getHeader(t2.headers, "Accept-Language") && (t2.headers = Object.assign({}, t2.headers, {
          "Accept-Language": this.lang
        })), this.authStore.token && null === this.getHeader(t2.headers, "Authorization") && (t2.headers = Object.assign({}, t2.headers, {
          Authorization: this.authStore.token
        })), this.enableAutoCancellation && null !== t2.requestKey) {
          const s2 = t2.requestKey || (t2.method || "GET") + e2;
          delete t2.requestKey, this.cancelRequest(s2);
          const i2 = new AbortController();
          this.cancelControllers[s2] = i2, t2.signal = i2.signal;
        }
        return t2;
      }
      getHeader(e2, t2) {
        e2 = e2 || {}, t2 = t2.toLowerCase();
        for (let s2 in e2) if (s2.toLowerCase() == t2) return e2[s2];
        return null;
      }
    };
    module.exports = Client;
  }
});
export default require_pocketbase_cjs();
//# sourceMappingURL=pocketbase_cjs.js.map
