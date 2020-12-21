import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { CookieOptionsProvider } from './cookie-options.provider';
import { COOKIE_WRITER } from './tokens';
import { isNil, isPresent, mergeOptions, parseCookieString } from './utils';
export class CookieService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2hva3V0bzEwMHJldHN1a2VuL3NyYy9naXRodWIuY29tL2hva3V0bzEwMHJldHN1a2VuL25neC1jb29raWUvcHJvamVjdHMvbmd4LWNvb2tpZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29va2llLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDekMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRzVFLE1BQU0sT0FBTyxhQUFhO0lBSXhCLFlBQXNDLFFBQWEsRUFDL0IsZUFBc0MsRUFDZixtQkFBeUM7UUFGOUMsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBdUI7UUFDZix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXNCO1FBQ2xGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEdBQUcsQ0FBQyxHQUFXOztRQUNiLGFBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSwwQ0FBRyxHQUFHLEVBQUU7SUFDOUIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQVMsQ0FBQyxHQUFXO1FBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNO1FBQ0osTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2hFLE9BQU8saUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQXlCLEVBQUUsT0FBdUI7UUFDakUsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsU0FBUyxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsT0FBdUI7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLEdBQVcsRUFBRSxPQUF1QjtRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVMsQ0FBQyxPQUF1QjtRQUMvQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7OztZQXpHRixVQUFVOzs7NENBS0ksTUFBTSxTQUFDLFFBQVE7WUFYckIscUJBQXFCOzRDQWFmLE1BQU0sU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb29raWVPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL2Nvb2tpZS1vcHRpb25zLnByb3ZpZGVyJztcblxuaW1wb3J0IHsgQ29va2llRGljdCwgQ29va2llT3B0aW9ucywgSUNvb2tpZVNlcnZpY2UsIElDb29raWVXcml0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb29raWUubW9kZWwnO1xuaW1wb3J0IHsgQ09PS0lFX1dSSVRFUiB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IGlzTmlsLCBpc1ByZXNlbnQsIG1lcmdlT3B0aW9ucywgcGFyc2VDb29raWVTdHJpbmcgfSBmcm9tICcuL3V0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZVNlcnZpY2UgaW1wbGVtZW50cyBJQ29va2llU2VydmljZSB7XG5cbiAgcHJvdGVjdGVkIG9wdGlvbnM6IENvb2tpZU9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wdGlvbnNQcm92aWRlcjogQ29va2llT3B0aW9uc1Byb3ZpZGVyLFxuICAgICAgICAgICAgICBASW5qZWN0KENPT0tJRV9XUklURVIpIHByaXZhdGUgY29va2llV3JpdGVyU2VydmljZTogSUNvb2tpZVdyaXRlclNlcnZpY2UpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnNQcm92aWRlci5vcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZXR1cm5zIGlmIHRoZSBnaXZlbiBjb29raWUga2V5IGV4aXN0cyBvciBub3QuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgSWQgdG8gdXNlIGZvciBsb29rdXAuXG4gICAqIEByZXR1cm5zIHRydWUgaWYga2V5IGV4aXN0cywgb3RoZXJ3aXNlIGZhbHNlLlxuICAgKi9cbiAgaGFzS2V5KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldChrZXkpO1xuICAgIHJldHVybiBpc1ByZXNlbnQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBnaXZlbiBjb29raWUga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IElkIHRvIHVzZSBmb3IgbG9va3VwLlxuICAgKiBAcmV0dXJucyBSYXcgY29va2llIHZhbHVlLlxuICAgKi9cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbGwoKT8uW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJldHVybnMgdGhlIGRlc2VyaWFsaXplZCB2YWx1ZSBvZiBnaXZlbiBjb29raWUga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IElkIHRvIHVzZSBmb3IgbG9va3VwLlxuICAgKiBAcmV0dXJucyBEZXNlcmlhbGl6ZWQgY29va2llIHZhbHVlLlxuICAgKi9cbiAgZ2V0T2JqZWN0KGtleTogc3RyaW5nKTogb2JqZWN0IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgaWYgKGlzTmlsKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJldHVybnMgYSBrZXkgdmFsdWUgb2JqZWN0IHdpdGggYWxsIHRoZSBjb29raWVzLlxuICAgKlxuICAgKiBAcmV0dXJucyBBbGwgY29va2llc1xuICAgKi9cbiAgZ2V0QWxsKCk6IENvb2tpZURpY3Qge1xuICAgIGNvbnN0IGNvb2tpZVN0cmluZyA9IHRoaXMuY29va2llV3JpdGVyU2VydmljZS5yZWFkQWxsQXNTdHJpbmcoKTtcbiAgICByZXR1cm4gcGFyc2VDb29raWVTdHJpbmcoY29va2llU3RyaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogU2V0cyBhIHZhbHVlIGZvciBnaXZlbiBjb29raWUga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IElkIGZvciB0aGUgYHZhbHVlYC5cbiAgICogQHBhcmFtIHZhbHVlIFJhdyB2YWx1ZSB0byBiZSBzdG9yZWQuXG4gICAqIEBwYXJhbSBvcHRpb25zIChPcHRpb25hbCkgT3B0aW9ucyBvYmplY3QuXG4gICAqL1xuICBwdXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQsIG9wdGlvbnM/OiBDb29raWVPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0cyA9IG1lcmdlT3B0aW9ucyh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHRoaXMuY29va2llV3JpdGVyU2VydmljZS53cml0ZShrZXksIHZhbHVlLCBvcHRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogU2VyaWFsaXplcyBhbmQgc2V0cyBhIHZhbHVlIGZvciBnaXZlbiBjb29raWUga2V5LlxuICAgKlxuICAgKiBAcGFyYW0ga2V5IElkIGZvciB0aGUgYHZhbHVlYC5cbiAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIGJlIHN0b3JlZC5cbiAgICogQHBhcmFtIG9wdGlvbnMgKE9wdGlvbmFsKSBPcHRpb25zIG9iamVjdC5cbiAgICovXG4gIHB1dE9iamVjdChrZXk6IHN0cmluZywgdmFsdWU6IG9iamVjdCwgb3B0aW9ucz86IENvb2tpZU9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLnB1dChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJlbW92ZSBnaXZlbiBjb29raWUuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgSWQgb2YgdGhlIGtleS12YWx1ZSBwYWlyIHRvIGRlbGV0ZS5cbiAgICogQHBhcmFtIG9wdGlvbnMgKE9wdGlvbmFsKSBPcHRpb25zIG9iamVjdC5cbiAgICovXG4gIHJlbW92ZShrZXk6IHN0cmluZywgb3B0aW9ucz86IENvb2tpZU9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLnB1dChrZXksIHVuZGVmaW5lZCwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJlbW92ZSBhbGwgY29va2llcy5cbiAgICovXG4gIHJlbW92ZUFsbChvcHRpb25zPzogQ29va2llT3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IGNvb2tpZXMgPSB0aGlzLmdldEFsbCgpO1xuICAgIE9iamVjdC5rZXlzKGNvb2tpZXMpLmZvckVhY2goa2V5ID0+IHRoaXMucmVtb3ZlKGtleSwgb3B0aW9ucykpO1xuICB9XG5cbn1cbiJdfQ==