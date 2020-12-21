import { InjectionToken, Injectable, Inject, Injector, NgModule } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';

const COOKIE_OPTIONS = new InjectionToken('COOKIE_OPTIONS');
const COOKIE_WRITER = new InjectionToken('COOKIE_WRITER');

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
    let lastCookies = {};
    let lastCookieString = '';
    let cookieArray;
    let cookie;
    let i;
    let index;
    let name;
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
    let expires = options === null || options === void 0 ? void 0 : options.expires;
    let val;
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
    const cookieValue = (options === null || options === void 0 ? void 0 : options.storeUnencoded) ? value : encodeURIComponent(val);
    let str = encodeURIComponent(name) + '=' + cookieValue;
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
    const cookieLength = str.length + 1;
    if (cookieLength > 4096) {
        console.log(`Cookie \'${name}\' possibly not set or overflowed because it was too large (${cookieLength} > 4096 bytes)!`);
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

class CookieOptionsProvider {
    constructor(options = {}, injector) {
        this.injector = injector;
        this.defaultOptions = {
            path: this.injector.get(APP_BASE_HREF, '/'),
            domain: undefined,
            expires: undefined,
            secure: false,
            httpOnly: false
        };
        this.options = mergeOptions(this.defaultOptions, options);
    }
}
CookieOptionsProvider.decorators = [
    { type: Injectable }
];
CookieOptionsProvider.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [COOKIE_OPTIONS,] }] },
    { type: Injector }
];

class CookieService {
    constructor(document, optionsProvider, cookieWriterService) {
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
    hasKey(key) {
        const value = this.get(key);
        return isPresent(value);
    }
    /**
     * @description
     * Returns the value of given cookie key.
     *
     * @param key Id to use for lookup.
     * @returns Raw cookie value.
     */
    get(key) {
        var _a;
        return (_a = this.getAll()) === null || _a === void 0 ? void 0 : _a[key];
    }
    /**
     * @description
     * Returns the deserialized value of given cookie key.
     *
     * @param key Id to use for lookup.
     * @returns Deserialized cookie value.
     */
    getObject(key) {
        const value = this.get(key);
        if (isNil(value)) {
            return undefined;
        }
        else if (value === '') {
            return {};
        }
        return JSON.parse(value);
    }
    /**
     * @description
     * Returns a key value object with all the cookies.
     *
     * @returns All cookies
     */
    getAll() {
        const cookieString = this.cookieWriterService.readAllAsString();
        return parseCookieString(cookieString);
    }
    /**
     * @description
     * Sets a value for given cookie key.
     *
     * @param key Id for the `value`.
     * @param value Raw value to be stored.
     * @param options (Optional) Options object.
     */
    put(key, value, options) {
        const opts = mergeOptions(this.options, options);
        this.cookieWriterService.write(key, value, opts);
    }
    /**
     * @description
     * Serializes and sets a value for given cookie key.
     *
     * @param key Id for the `value`.
     * @param value Value to be stored.
     * @param options (Optional) Options object.
     */
    putObject(key, value, options) {
        this.put(key, JSON.stringify(value), options);
    }
    /**
     * @description
     * Remove given cookie.
     *
     * @param key Id of the key-value pair to delete.
     * @param options (Optional) Options object.
     */
    remove(key, options) {
        this.put(key, undefined, options);
    }
    /**
     * @description
     * Remove all cookies.
     */
    removeAll(options) {
        const cookies = this.getAll();
        Object.keys(cookies).forEach(key => this.remove(key, options));
    }
}
CookieService.decorators = [
    { type: Injectable }
];
CookieService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: CookieOptionsProvider },
    { type: undefined, decorators: [{ type: Inject, args: [COOKIE_WRITER,] }] }
];

class CookieWriterService {
    constructor(document) {
        this.document = document;
    }
    readAllAsString() {
        return this.document.cookie || '';
    }
    write(name, value, options) {
        this.document.cookie = buildCookieString(name, value, options);
    }
}
CookieWriterService.decorators = [
    { type: Injectable }
];
CookieWriterService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

function cookieServiceFactory(document, cookieOptionsProvider, cookieWriterService) {
    return new CookieService(document, cookieOptionsProvider, cookieWriterService);
}

class CookieModule {
    /**
     * Use this method in your root module to provide the CookieService
     */
    static forRoot(options = {}) {
        return {
            ngModule: CookieModule,
            providers: [
                { provide: COOKIE_OPTIONS, useValue: options },
                { provide: COOKIE_WRITER, useClass: CookieWriterService },
                { provide: CookieService, useFactory: cookieServiceFactory, deps: [DOCUMENT, CookieOptionsProvider, COOKIE_WRITER] }
            ]
        };
    }
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     */
    static forChild(options = {}) {
        return CookieModule.forRoot(options);
    }
}
CookieModule.decorators = [
    { type: NgModule, args: [{
                providers: [CookieOptionsProvider]
            },] }
];

/*
 * Public API Surface of ngx-cookie
 */

/**
 * Generated bundle index. Do not edit.
 */

export { COOKIE_OPTIONS, COOKIE_WRITER, CookieModule, CookieOptionsProvider, CookieService, CookieWriterService, buildCookieString, cookieServiceFactory, isEmpty, isNil, isPresent, isString, mergeOptions, parseCookieString, safeDecodeURIComponent };
//# sourceMappingURL=ngx-cookie.js.map
