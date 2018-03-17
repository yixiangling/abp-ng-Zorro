import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AbpModule, ABP_HTTP_PROVIDER, Abp } from '@abp';


import { SharedModule } from '@shared/shared.module';
import { DelonComponentModule } from '@shared/components';
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { RootComponent } from './root.component';
import { AppPreBootstrap } from './AppPreBootstrap';

import { LocalizationService } from '@abp';

//ng-zorro 国际化（ng-zorro0.7版本正式发布后此处会更新）
import { NzLocaleService } from 'ng-zorro-antd';
import { zhCN, enUS, trTR, zhTW, ruRU } from 'ng-zorro-antd';

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

//preloader
function preloader() {
    function remove() {
		const body = document.querySelector('body');
		const preloader = document.querySelector('.preloader');
	
		body.style.overflow = 'hidden';
        // preloader value null when running --hmr
        if (!preloader) return;
        preloader.addEventListener('transitionend', function () {
            preloader.className = 'preloader-hidden';
        });

        preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
    }
	setTimeout(() => {
		remove();
		const body = document.querySelector('body');
		body.style.overflow = '';
	}, 100);
};

function setNgZorroLocale(injector: Injector): void {

	let nzLocalService = injector.get(NzLocaleService);

	let langName = Abp.localization.currentLanguage.name;
	console.log('current language: ' + langName);
	let lang: any;
	switch (langName) {
		case 'zh':
		case 'zh-CN':
		case 'zh-Hans':
			lang = zhCN;
			break;
		case 'en':
		case 'en-US':
			lang = enUS;
			break;
		default:
			lang = zhCN;
			break;
	}

	console.log('current language change to %o', lang);
	nzLocalService.setLocale(lang);
}

export function appInitializerFactory(injector: Injector) {
	return () => {

		fixedLocale();

		return new Promise<boolean>((resolve, reject) => {
			AppPreBootstrap.run(injector, () => {
				var appSessionService: AppSessionService = injector.get(AppSessionService);
				appSessionService.init().then(
					(result) => {
						setNgZorroLocale(injector);
						preloader();
						resolve(result);
					},
					(err) => {
						preloader();
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
	return Abp.localization.currentLanguage.name;
}



@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule.forRoot(),
		DelonComponentModule.forRoot(),
		AbpModule,
		ServiceProxyModule,
		RootRoutingModule,
		NgZorroAntdExtraModule.forRoot(),
		UEditorModule.forRoot({
            // **注：** 建议使用本地路径；以下为了减少 ng-alain 脚手架的包体大小引用了CDN，可能会有部分功能受影响
            // 指定ueditor.js路径目录
            path: '//apps.bdimg.com/libs/ueditor/1.4.3.1/',
            // 默认全局配置项
            options: {
                themePath: '//apps.bdimg.com/libs/ueditor/1.4.3.1/themes/'
            }
		})
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
