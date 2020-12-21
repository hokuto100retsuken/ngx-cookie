import { Injectable, Optional, Inject, NgModule } from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { isNil, isEmpty, isString, CookieModule, COOKIE_OPTIONS, COOKIE_WRITER, CookieOptionsProvider } from 'ngx-cookie';

const COOKIE_SEPARATOR = '; ';
class CookieBackendWriterService {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    readAllAsString() {
        var _a, _b;
        const requestHeadersCookies = (_b = (_a = this.request) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.cookie;
        const cookiesFromRequest = requestHeadersCookies ? requestHeadersCookies.split(COOKIE_SEPARATOR) : [];
        const addedCookies = this.getNormalizedResponseCookies();
        const allCookies = this.latestUniqueCookieValues(cookiesFromRequest, addedCookies);
        return allCookies.join(COOKIE_SEPARATOR);
    }
    getNormalizedResponseCookies() {
        var _a;
        const responseCookies = (_a = this.response.getHeader('Set-Cookie')) !== null && _a !== void 0 ? _a : '';
        const addedCookies = Array.isArray(responseCookies) ? responseCookies : [responseCookies];
        return addedCookies.map(cookieEntry => cookieEntry.split('; ')[0]);
    }
    latestUniqueCookieValues(oldCookies, newerCookies) {
        const cookiesMap = new Map();
        const oldAndNewCookies = [...oldCookies, ...newerCookies];
        oldAndNewCookies
            .filter(value => value)
            .map(cookie => cookie.split('='))
            .forEach(([key, value]) => cookiesMap.set(key, value));
        const result = [];
        cookiesMap.forEach((value, key) => result.push(`${key}=${value}`));
        return result;
    }
    write(name, value, options) {
        if (!isNil(this.response)) {
            this.response.cookie(name, value, this.getOptions(options));
        }
    }
    getOptions(options) {
        if (isEmpty(options)) {
            return {};
        }
        return {
            expires: this.getExpires(options === null || options === void 0 ? void 0 : options.expires),
            httpOnly: options === null || options === void 0 ? void 0 : options.httpOnly,
            path: options === null || options === void 0 ? void 0 : options.path,
            domain: options === null || options === void 0 ? void 0 : options.domain,
            secure: options === null || options === void 0 ? void 0 : options.secure,
            sameSite: options === null || options === void 0 ? void 0 : options.sameSite
        };
    }
    getExpires(expires) {
        if (isEmpty(expires)) {
            return undefined;
        }
        return isString(expires) ? new Date(expires) : expires;
    }
}
CookieBackendWriterService.decorators = [
    { type: Injectable }
];
CookieBackendWriterService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [REQUEST,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RESPONSE,] }] }
];

class CookieBackendModule {
    /**
     * Use this method in your root module to provide the CookieService
     */
    static forRoot(options = {}) {
        return {
            ngModule: CookieModule,
            providers: [
                { provide: COOKIE_OPTIONS, useValue: options },
                { provide: COOKIE_WRITER, useClass: CookieBackendWriterService }
            ]
        };
    }
    /**
     * Use this method in your other (non root) modules to import the directive/pipe
     */
    static forChild(options = {}) {
        return CookieBackendModule.forRoot(options);
    }
}
CookieBackendModule.decorators = [
    { type: NgModule, args: [{
                imports: [CookieModule],
                providers: [CookieOptionsProvider]
            },] }
];

/*
 * Public API Surface of ngx-cookie-backend
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CookieBackendModule, CookieBackendWriterService };
//# sourceMappingURL=ngx-cookie-backend.js.map
