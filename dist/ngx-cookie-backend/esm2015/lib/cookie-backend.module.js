import { NgModule } from '@angular/core';
import { COOKIE_OPTIONS, COOKIE_WRITER, CookieModule, CookieOptionsProvider } from 'ngx-cookie';
import { CookieBackendWriterService } from './cookie-backend-writer.service';
export class CookieBackendModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWJhY2tlbmQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9ob2t1dG8xMDByZXRzdWtlbi9zcmMvZ2l0aHViLmNvbS9ob2t1dG8xMDByZXRzdWtlbi9uZ3gtY29va2llL3Byb2plY3RzL25neC1jb29raWUtYmFja2VuZC9zcmMvIiwic291cmNlcyI6WyJsaWIvY29va2llLWJhY2tlbmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBaUIscUJBQXFCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFL0csT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFPN0UsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBeUIsRUFBRTtRQUN4QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDO2dCQUM1QyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDO2FBQy9EO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBeUIsRUFBRTtRQUN6QyxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7YUFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ09PS0lFX09QVElPTlMsIENPT0tJRV9XUklURVIsIENvb2tpZU1vZHVsZSwgQ29va2llT3B0aW9ucywgQ29va2llT3B0aW9uc1Byb3ZpZGVyIH0gZnJvbSAnbmd4LWNvb2tpZSc7XG5cbmltcG9ydCB7IENvb2tpZUJhY2tlbmRXcml0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb29raWUtYmFja2VuZC13cml0ZXIuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Nvb2tpZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW0Nvb2tpZU9wdGlvbnNQcm92aWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgQ29va2llQmFja2VuZE1vZHVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgaW4geW91ciByb290IG1vZHVsZSB0byBwcm92aWRlIHRoZSBDb29raWVTZXJ2aWNlXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zOiBDb29raWVPcHRpb25zID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvb2tpZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29va2llTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBDT09LSUVfT1BUSU9OUywgdXNlVmFsdWU6IG9wdGlvbnN9LFxuICAgICAgICB7cHJvdmlkZTogQ09PS0lFX1dSSVRFUiwgdXNlQ2xhc3M6IENvb2tpZUJhY2tlbmRXcml0ZXJTZXJ2aWNlfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIGluIHlvdXIgb3RoZXIgKG5vbiByb290KSBtb2R1bGVzIHRvIGltcG9ydCB0aGUgZGlyZWN0aXZlL3BpcGVcbiAgICovXG4gIHN0YXRpYyBmb3JDaGlsZChvcHRpb25zOiBDb29raWVPcHRpb25zID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvb2tpZU1vZHVsZT4ge1xuICAgIHJldHVybiBDb29raWVCYWNrZW5kTW9kdWxlLmZvclJvb3Qob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==