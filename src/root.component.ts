import { Injector, HostBinding, Component, OnInit } from '@angular/core';

import { AbpMessageService } from './shared/helpers/message.service';
import { AbpNotifyService } from './shared/helpers/notify.service';
import { LocalizationService } from '@abp/localization/localization.service';

//ng-zorro 国际化
import { NzLocaleService } from 'ng-zorro-antd';
import { zhCN, enUS, trTR, zhTW, ruRU } from 'ng-zorro-antd';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent implements OnInit {
    layoutCollapsed: boolean = false;
    layoutFixed: boolean = true;
    layoutBoxed: boolean = false;
    @HostBinding('class.layout-fixed') get isFixed() { return this.layoutFixed; }
    @HostBinding('class.layout-boxed') get isBoxed() { return this.layoutBoxed; }
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.layoutCollapsed; }

    notify: AbpNotifyService;
    message: AbpMessageService;

    localization: LocalizationService;
    nzLocalService: : NzLocaleService;

    ngOnInit() {
        abp.event.on('abp.theme-setting.collapsed', collapsed => {
            this.layoutCollapsed = collapsed;
        });
    }

    constructor(injector: Injector) {
        this.notify = injector.get(AbpNotifyService);
        this.message = injector.get(AbpMessageService);

        this.localization = injector.get(LocalizationService);
        this.nzLocalService = injector.get(NzLocaleService);

        this.replaceAbpModule();
        this.setNgZorroLocale();
    }

    replaceAbpModule(): void {
        abp.message = this.message;
        abp.notify = this.notify;
    }

    setNgZorroLocale(): void {
        
        let langName = this.localization.currentLanguage.name;
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
        this.nzLocalService.setLocale(lang);
    }

}