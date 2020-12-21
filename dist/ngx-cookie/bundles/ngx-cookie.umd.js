(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-cookie', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-cookie'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var COOKIE_OPTIONS = new core.InjectionToken('COOKIE_OPTIONS');
    var COOKIE_WRITER = new core.InjectionToken('COOKIE_WRITER');

    // tslint:disable-next-line:no-any
    function isNil(obj) {
        return obj === undefined || obj === null;
    }
    // tslint:disable-next-line:no-any
    function isPresent(obj) {
        return !isNil(obj);
    }
    // tslint:disable-next-line:no-any
    function isString(obj) {
        return typeof obj === 'string';
    }
    // noinspection JSUnusedGlobalSymbols
    // tslint:disable-next-line:no-any
    function isEmpty(value) {
        if (isNil(value)) {
            return true;
        }
        if (value === {}) {
            return true;
        }
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }
        if (typeof value !== 'boolean' && !value) {
            return true;
        }
        // noinspection RedundantIfStatementJS
        if (Object.keys(value).length === 0 && value.constructor === Object) {
            return true;
        }
        return false;
    }
    function mergeOptions(oldOptions, newOptions) {
        if (!newOptions) {
            return oldOptions;
        }
        return {
            path: isPresent(newOptions.path) ? newOptions.path : oldOptions.path,
            domain: isPresent(newOptions.domain) ? newOptions.domain : oldOptions.domain,
            expires: isPresent(newOptions.expires) ? newOptions.expires : oldOptions.expires,
            secure: isPresent(newOptions.secure) ? newOptions.secure : oldOptions.secure,
            sameSite: isPresent(newOptions.sameSite) ? newOptions.sameSite : oldOptions.sameSite,
            httpOnly: isPresent(newOptions.httpOnly) ? newOptions.httpOnly : oldOptions.httpOnly,
            storeUnencoded: isPresent(newOptions.storeUnencoded) ? newOptions.storeUnencoded : oldOptions.storeUnencoded
        };
    }
    function parseCookieString(currentCookieString) {
        var lastCookies = {};
        var lastCookieString = '';
        var cookieArray;
        var cookie;
        var i;
        var index;
        var name;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) { // ignore nameless cookies
                    name = safeDecodeURIComponent(cookie.substring(0, index));
                    // the first value that is seen for a cookie is the most
                    // specific one.  values for the same cookie name that
                    // follow are for less specific paths.
                    if (isNil((lastCookies)[name])) {
                        lastCookies[name] = safeDecodeURIComponent(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    }
    function buildCookieString(name, value, options) {
        var expires = options === null || options === void 0 ? void 0 : options.expires;
        var val;
        if (isNil(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            val = '';
        }
        else {
            val = value;
        }
        if (isString(expires)) {
            expires = new Date(expires);
        }
        var cookieValue = (options === null || options === void 0 ? void 0 : options.storeUnencoded) ? value : encodeURIComponent(val);
        var str = encodeURIComponent(name) + '=' + cookieValue;
        str += (options === null || options === void 0 ? void 0 : options.path) ? ';path=' + options.path : '';
        str += (options === null || options === void 0 ? void 0 : options.domain) ? ';domain=' + options.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += (options === null || options === void 0 ? void 0 : options.sameSite) ? '; SameSite=' + options.sameSite : '';
        str += (options === null || options === void 0 ? void 0 : options.secure) ? ';secure' : '';
        str += (options === null || options === void 0 ? void 0 : options.httpOnly) ? '; HttpOnly' : '';
        // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
        // - 300 cookies
        // - 20 cookies per unique domain
        // - 4096 bytes per cookie
        var cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log("Cookie '" + name + "' possibly not set or overflowed because it was too large (" + cookieLength + " > 4096 bytes)!");
        }
        return str;
    }
    function safeDecodeURIComponent(str) {
        try {
            return decodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    }

    var CookieOptionsProvider = /** @class */ (function () {
        function CookieOptionsProvider(options, injector) {
            if (options === void 0) { options = {}; }
            this.injector = injector;
            this.defaultOptions = {
                path: this.injector.get(common.APP_BASE_HREF, '/'),
                domain: undefined,
                expires: undefined,
                secure: false,
                httpOnly: false
            };
            this.options = mergeOptions(this.defaultOptions, options);
        }
        return CookieOptionsProvider;
    }());
    CookieOptionsProvider.decorators = [
        { type: core.Injectable }
    ];
    CookieOptionsProvider.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [COOKIE_OPTIONS,] }] },
        { type: core.Injector }
    ]; };

    var CookieService = /** @class */ (function () {
        function CookieService(document, optionsProvider, cookieWriterService) {
            this.document = document;
            this.optionsProvider = optionsProvider;
            this.cookieWriterService = cookieWriterService;
            this.options = this.optionsProvider.options;
        }
        /**
         * @description
         * Returns if the given cookie key exists or not.
         *
         * @param key Id to use for lookup.
         * @returns true if key exists, otherwise false.
         */
        CookieService.prototype.hasKey = function (key) {
            var value = this.get(key);
            return isPresent(value);
        };
        /**
         * @description
         * Returns the value of given cookie key.
         *
         * @param key Id to use for lookup.
         * @returns Raw cookie value.
         */
        CookieService.prototype.get = function (key) {
            var _a;
            return (_a = this.getAll()) === null || _a === void 0 ? void 0 : _a[key];
        };
        /**
         * @description
         * Returns the deserialized value of given cookie key.
         *
         * @param key Id to use for lookup.
         * @returns Deserialized cookie value.
         */
        CookieService.prototype.getObject = function (key) {
            var value = this.get(key);
            if (isNil(value)) {
                return undefined;
            }
            else if (value === '') {
                return {};
            }
            return JSON.parse(value);
        };
        /**
         * @description
         * Returns a key value object with all the cookies.
         *
         * @returns All cookies
         */
        CookieService.prototype.getAll = function () {
            var cookieString = this.cookieWriterService.readAllAsString();
            return parseCookieString(cookieString);
        };
        /**
         * @description
         * Sets a value for given cookie key.
         *
         * @param key Id for the `value`.
         * @param value Raw value to be stored.
         * @param options (Optional) Options object.
         */
        CookieService.prototype.put = function (key, value, options) {
            var opts = mergeOptions(this.options, options);
            this.cookieWriterService.write(key, value, opts);
        };
        /**
         * @description
         * Serializes and sets a value for given cookie key.
         *
         * @param key Id for the `value`.
         * @param value Value to be stored.
         * @param options (Optional) Options object.
         */
        CookieService.prototype.putObject = function (key, value, options) {
            this.put(key, JSON.stringify(value), options);
        };
        /**
         * @description
         * Remove given cookie.
         *
         * @param key Id of the key-value pair to delete.
         * @param options (Optional) Options object.
         */
        CookieService.prototype.remove = function (key, options) {
            this.put(key, undefined, options);
        };
        /**
         * @description
         * Remove all cookies.
         */
        CookieService.prototype.removeAll = function (options) {
            var _this = this;
            var cookies = this.getAll();
            Object.keys(cookies).forEach(function (key) { return _this.remove(key, options); });
        };
        return CookieService;
    }());
    CookieService.decorators = [
        { type: core.Injectable }
    ];
    CookieService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: CookieOptionsProvider },
        { type: undefined, decorators: [{ type: core.Inject, args: [COOKIE_WRITER,] }] }
    ]; };

    var CookieWriterService = /** @class */ (function () {
        function CookieWriterService(document) {
            this.document = document;
        }
        CookieWriterService.prototype.readAllAsString = function () {
            return this.document.cookie || '';
        };
        CookieWriterService.prototype.write = function (name, value, options) {
            this.document.cookie = buildCookieString(name, value, options);
        };
        return CookieWriterService;
    }());
    CookieWriterService.decorators = [
        { type: core.Injectable }
    ];
    CookieWriterService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };

    function cookieServiceFactory(document, cookieOptionsProvider, cookieWriterService) {
        return new CookieService(document, cookieOptionsProvider, cookieWriterService);
    }

    var CookieModule = /** @class */ (function () {
        function CookieModule() {
        }
        /**
         * Use this method in your root module to provide the CookieService
         */
        CookieModule.forRoot = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: CookieModule,
                providers: [
                    { provide: COOKIE_OPTIONS, useValue: options },
                    { provide: COOKIE_WRITER, useClass: CookieWriterService },
                    { provide: CookieService, useFactory: cookieServiceFactory, deps: [common.DOCUMENT, CookieOptionsProvider, COOKIE_WRITER] }
                ]
            };
        };
        /**
         * Use this method in your other (non root) modules to import the directive/pipe
         */
        CookieModule.forChild = function (options) {
            if (options === void 0) { options = {}; }
            return CookieModule.forRoot(options);
        };
        return CookieModule;
    }());
    CookieModule.decorators = [
        { type: core.NgModule, args: [{
                    providers: [CookieOptionsProvider]
                },] }
    ];

    /*
     * Public API Surface of ngx-cookie
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.COOKIE_OPTIONS = COOKIE_OPTIONS;
    exports.COOKIE_WRITER = COOKIE_WRITER;
    exports.CookieModule = CookieModule;
    exports.CookieOptionsProvider = CookieOptionsProvider;
    exports.CookieService = CookieService;
    exports.CookieWriterService = CookieWriterService;
    exports.buildCookieString = buildCookieString;
    exports.cookieServiceFactory = cookieServiceFactory;
    exports.isEmpty = isEmpty;
    exports.isNil = isNil;
    exports.isPresent = isPresent;
    exports.isString = isString;
    exports.mergeOptions = mergeOptions;
    exports.parseCookieString = parseCookieString;
    exports.safeDecodeURIComponent = safeDecodeURIComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-cookie.umd.js.map
