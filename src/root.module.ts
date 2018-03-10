import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AbpModule, ABP_HTTP_PROVIDER } from '@abp/abp.module';

import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { RootComponent } from './root.component';
import { AppPreBootstrap } from './AppPreBootstrap';

// third
import { UEditorModule } from 'ngx-ueditor';

//fixed locale zh-CN
import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localeZhHansExtra from '@angular/common/locales/extra/zh-Hans';
function fixedLocale(){
	localeZhHans[0] = 'zh-CN';
	registerLocaleData(localeZhHans, localeZhHansExtra);
}

export function appInitializerFactory(injector: Injector) {
	return () => {

		abp.ui.setBusy();

		fixedLocale();

		return new Promise<boolean>((resolve, reject) => {
			AppPreBootstrap.run(() => {
				var appSessionService: AppSessionService = injector.get(AppSessionService);
				appSessionService.init().then(
					(result) => {
						abp.ui.clearBusy();
						resolve(result);
					},
					(err) => {
						abp.ui.clearBusy();
						reject(err);
					}
				);
			});
		});
	}
}

export function getRemoteServiceBaseUrl(): string {
	return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
	return abp.localization.currentLanguage.name;
}

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SharedModule.forRoot(),
		AbpModule,
		ServiceProxyModule,
		RootRoutingModule,
		UEditorModule.forRoot({
            // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
            // 指定ueditor.js路径目录
            path: '//apps.bdimg.com/libs/ueditor/1.4.3.1/',
            // 默认全局配置项
            options: {
                themePath: '//apps.bdimg.com/libs/ueditor/1.4.3.1/themes/'
            }
        }),
	],
	declarations: [
		RootComponent
	],
	providers: [
		ABP_HTTP_PROVIDER,
		{ provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFactory,
			deps: [Injector],
			multi: true
		},
		{
			provide: LOCALE_ID,
			useFactory: getCurrentLanguage
		}
	],
	bootstrap: [RootComponent]
})
export class RootModule {

}
