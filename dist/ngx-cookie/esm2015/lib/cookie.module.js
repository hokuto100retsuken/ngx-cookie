import { DOCUMENT } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieWriterService } from './cookie-writer.service';
import { CookieOptionsProvider } from './cookie-options.provider';
import { cookieServiceFactory } from './cookie.factory';
import { CookieService } from './cookie.service';
import { COOKIE_OPTIONS, COOKIE_WRITER } from './tokens';
export class CookieModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaG9rdXRvMTAwcmV0c3VrZW4vc3JjL2dpdGh1Yi5jb20vaG9rdXRvMTAwcmV0c3VrZW4vbmd4LWNvb2tpZS9wcm9qZWN0cy9uZ3gtY29va2llL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb29raWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUc5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFNekQsTUFBTSxPQUFPLFlBQVk7SUFDdkI7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQXlCLEVBQUU7UUFDeEMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQztnQkFDNUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQztnQkFDdkQsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxDQUFDLEVBQUM7YUFDbkg7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUF5QixFQUFFO1FBQ3pDLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvb2tpZVdyaXRlclNlcnZpY2UgfSBmcm9tICcuL2Nvb2tpZS13cml0ZXIuc2VydmljZSc7XG5cbmltcG9ydCB7IENvb2tpZU9wdGlvbnMgfSBmcm9tICcuL2Nvb2tpZS5tb2RlbCc7XG5pbXBvcnQgeyBDb29raWVPcHRpb25zUHJvdmlkZXIgfSBmcm9tICcuL2Nvb2tpZS1vcHRpb25zLnByb3ZpZGVyJztcbmltcG9ydCB7IGNvb2tpZVNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi9jb29raWUuZmFjdG9yeSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBDT09LSUVfT1BUSU9OUywgQ09PS0lFX1dSSVRFUiB9IGZyb20gJy4vdG9rZW5zJztcblxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtDb29raWVPcHRpb25zUHJvdmlkZXJdXG59KVxuZXhwb3J0IGNsYXNzIENvb2tpZU1vZHVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciByb290IG1vZHVsZSB0byBwcm92aWRlIHRoZSBDb29raWVTZXJ2aWNlXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zOiBDb29raWVPcHRpb25zID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvb2tpZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29va2llTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBDT09LSUVfT1BUSU9OUywgdXNlVmFsdWU6IG9wdGlvbnN9LFxuICAgICAgICB7cHJvdmlkZTogQ09PS0lFX1dSSVRFUiwgdXNlQ2xhc3M6IENvb2tpZVdyaXRlclNlcnZpY2V9LFxuICAgICAgICB7cHJvdmlkZTogQ29va2llU2VydmljZSwgdXNlRmFjdG9yeTogY29va2llU2VydmljZUZhY3RvcnksIGRlcHM6IFtET0NVTUVOVCwgQ29va2llT3B0aW9uc1Byb3ZpZGVyLCBDT09LSUVfV1JJVEVSXX1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCBpbiB5b3VyIG90aGVyIChub24gcm9vdCkgbW9kdWxlcyB0byBpbXBvcnQgdGhlIGRpcmVjdGl2ZS9waXBlXG4gICAqL1xuICBzdGF0aWMgZm9yQ2hpbGQob3B0aW9uczogQ29va2llT3B0aW9ucyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb29raWVNb2R1bGU+IHtcbiAgICByZXR1cm4gQ29va2llTW9kdWxlLmZvclJvb3Qob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==