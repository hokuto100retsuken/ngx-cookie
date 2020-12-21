import { Request, Response } from 'express';
import { CookieOptions, ICookieWriterService } from 'ngx-cookie';
export declare class CookieBackendWriterService implements ICookieWriterService {
    private request;
    private response;
    constructor(request: Request, response: Response);
    readAllAsString(): string;
    private getNormalizedResponseCookies;
    private latestUniqueCookieValues;
    write(name: string, value: string | undefined, options?: CookieOptions): void;
    private getOptions;
    private getExpires;
}
