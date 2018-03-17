import * as moment from 'moment';
import { AppConsts } from '@shared/AppConsts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Injector, Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Abp ,abp } from '@abp';

export class AppPreBootstrap {

    static run(injector: Injector, callback: () => void): void {
        AppPreBootstrap.getApplicationConfig(injector, () => {
            AppPreBootstrap.getUserConfiguration(injector, callback);
        });
    }

    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getApplicationConfig(injector: Injector, callback: () => void) {
        let httpClient: HttpClient = injector.get(HttpClient);
        
        let requestHeaders = {};
        if(Abp.multiTenancy.getTenantIdCookie()){
            requestHeaders['Abp.TenantId'] = Abp.multiTenancy.getTenantIdCookie().toString();
        }

        httpClient.get<any>('/assets/appconfig.json', {
            headers: requestHeaders
        }).subscribe(result=>{
            AppConsts.appBaseUrl = result.appBaseUrl;
            AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
            
            callback();
        });

        // return abp.ajax({
        //     url: '/assets/appconfig.json',
        //     method: 'GET',
        //     headers: {
        //         'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
        //     }
        // }).done(result => {
        //     AppConsts.appBaseUrl = result.appBaseUrl;
        //     AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
            
        //     callback();
        // });
    }

    private static getCurrentClockProvider(currentProviderName: string): abp.timing.IClockProvider {
        if (currentProviderName === "unspecifiedClockProvider") {
            return Abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === "utcClockProvider") {
            return Abp.timing.utcClockProvider;
        }

        return Abp.timing.localClockProvider;
    }

    private static getUserConfiguration(injector: Injector, callback: () => void) {
        let httpClient: HttpClient = injector.get(HttpClient);

        let requestHeaders = {
            Authorization: 'Bearer ' + Abp.auth.getToken()
        };
        if(Abp.multiTenancy.getTenantIdCookie()){
            requestHeaders['Abp.TenantId'] = Abp.multiTenancy.getTenantIdCookie().toString();
        }
        if(Abp.utils.getCookieValue("Abp.Localization.CultureName")){
            requestHeaders['.AspNetCore.Culture'] = Abp.utils.getCookieValue("Abp.Localization.CultureName");
        }

        httpClient.get<any>(AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll', {
            headers: requestHeaders
        }).subscribe(res=>{
            let result = res.result;
            // $.extend(true, Abp, result);
            console.log('AbpUserConfiguration: %o', result);

            Abp.multiTenancy.setGlobal(result.multiTenancy);
            Abp.session.setGlobal(result.session);
            Abp.localization.setGlobal(result.localization);
            Abp.features.setGlobal(result.features);
            Abp.auth.setGlobal(result.auth);
            Abp.nav.setGlobal(result.nav);
            Abp.setting.setGlobal(result.setting);

            Abp.clock.setGloabl(result.clock);
            Abp.timing.setGloabl(result.timing);

            Abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

            moment.locale(Abp.localization.currentLanguage.name);

            if (Abp.clock.provider.supportsMultipleTimezone) {
                moment.tz.setDefault(Abp.timing.timeZoneInfo.iana.timeZoneId);
            }

            callback();
        });

        // return abp.ajax({
        //     url: AppConsts.remoteServiceBaseUrl + '/AbpUserConfiguration/GetAll',
        //     method: 'GET',
        //     headers: {
        //         Authorization: 'Bearer ' + abp.auth.getToken(),
        //         '.AspNetCore.Culture': abp.utils.getCookieValue("Abp.Localization.CultureName"),
        //         'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
        //     }
        // }).done(result => {
        //     $.extend(true, abp, result);

        //     abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

        //     moment.locale(abp.localization.currentLanguage.name);

        //     if (abp.clock.provider.supportsMultipleTimezone) {
        //         moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
        //     }

        //     callback();
        // });
    }
}