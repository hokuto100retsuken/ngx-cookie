import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable, Injector } from '@angular/core';
import { COOKIE_OPTIONS } from './tokens';
import { mergeOptions } from './utils';
export class CookieOptionsProvider {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLW9wdGlvbnMucHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2hva3V0bzEwMHJldHN1a2VuL3NyYy9naXRodWIuY29tL2hva3V0bzEwMHJldHN1a2VuL25neC1jb29raWUvcHJvamVjdHMvbmd4LWNvb2tpZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29va2llLW9wdGlvbnMucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHdkMsTUFBTSxPQUFPLHFCQUFxQjtJQUtoQyxZQUFvQyxVQUF5QixFQUFFLEVBQzNDLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQztZQUMzQyxNQUFNLEVBQUUsU0FBUztZQUNqQixPQUFPLEVBQUUsU0FBUztZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELENBQUM7OztZQWhCRixVQUFVOzs7NENBTUksTUFBTSxTQUFDLGNBQWM7WUFaUCxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQX0JBU0VfSFJFRiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvb2tpZU9wdGlvbnMgfSBmcm9tICcuL2Nvb2tpZS5tb2RlbCc7XG5pbXBvcnQgeyBDT09LSUVfT1BUSU9OUyB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IG1lcmdlT3B0aW9ucyB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29va2llT3B0aW9uc1Byb3ZpZGVyIHtcblxuICByZWFkb25seSBvcHRpb25zOiBDb29raWVPcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRPcHRpb25zOiBDb29raWVPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09PS0lFX09QVElPTlMpIG9wdGlvbnM6IENvb2tpZU9wdGlvbnMgPSB7fSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgcGF0aDogdGhpcy5pbmplY3Rvci5nZXQoQVBQX0JBU0VfSFJFRiwgJy8nKSxcbiAgICAgIGRvbWFpbjogdW5kZWZpbmVkLFxuICAgICAgZXhwaXJlczogdW5kZWZpbmVkLFxuICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIGh0dHBPbmx5OiBmYWxzZVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICB9XG5cbn1cbiJdfQ==