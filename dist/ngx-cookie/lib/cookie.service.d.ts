import { CookieOptionsProvider } from './cookie-options.provider';
import { CookieDict, CookieOptions, ICookieService, ICookieWriterService } from './cookie.model';
export declare class CookieService implements ICookieService {
    private document;
    private optionsProvider;
    private cookieWriterService;
    protected options: CookieOptions;
    constructor(document: any, optionsProvider: CookieOptionsProvider, cookieWriterService: ICookieWriterService);
    /**
     * @description
     * Returns if the given cookie key exists or not.
     *
     * @param key Id to use for lookup.
     * @returns true if key exists, otherwise false.
     */
    hasKey(key: string): boolean;
    /**
     * @description
     * Returns the value of given cookie key.
     *
     * @param key Id to use for lookup.
     * @returns Raw cookie value.
     */
    get(key: string): string;
    /**
     * @description
     * Returns the deserialized value of given cookie key.
     *
     * @param key Id to use for lookup.
     * @returns Deserialized cookie value.
     */
    getObject(key: string): object | undefined;
    /**
     * @description
     * Returns a key value object with all the cookies.
     *
     * @returns All cookies
     */
    getAll(): CookieDict;
    /**
     * @description
     * Sets a value for given cookie key.
     *
     * @param key Id for the `value`.
     * @param value Raw value to be stored.
     * @param options (Optional) Options object.
     */
    put(key: string, value: string | undefined, options?: CookieOptions): void;
    /**
     * @description
     * Serializes and sets a value for given cookie key.
     *
     * @param key Id for the `value`.
     * @param value Value to be stored.
     * @param options (Optional) Options object.
     */
    putObject(key: string, value: object, options?: CookieOptions): void;
    /**
     * @description
     * Remove given cookie.
     *
     * @param key Id of the key-value pair to delete.
     * @param options (Optional) Options object.
     */
    remove(key: string, options?: CookieOptions): void;
    /**
     * @description
     * Remove all cookies.
     */
    removeAll(options?: CookieOptions): void;
}
