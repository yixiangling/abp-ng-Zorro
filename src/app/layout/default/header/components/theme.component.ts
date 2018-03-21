import { Component, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingService } from '@abp/settings/setting.service';
import { AppComponentBase } from '@shared/component-base';

import { Abp } from '@abp';

type ThemeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

@Component({
    selector: 'header-theme',
    template: `
    <strong>{{ l('切换主题')}}</strong>
    <div class="theme-icons">
        <label *ngFor="let item of themes" (click)="changeTheme(item.l)" [style.background]="item.bg">
            <i class="anticon anticon-check" *ngIf="item.l == currentTheme"></i>
            <div class="areas">
                <span class="nav" [style.background]="item.nav"></span>
                <span class="con" [style.background]="item.con"></span>
            </div>
        </label>
    </div>
    `
})
export class HeaderThemeComponent extends AppComponentBase {

    defaultTheme: ThemeType = 'A';
    currentTheme: ThemeType = 'A';

    themes: { l: ThemeType, bg: string, nav: string, con: string }[] = [
        { l: 'A', bg: '#108ee9', nav: '#fff', con: '#f5f7fa' },
        { l: 'B', bg: '#00a2ae', nav: '#fff', con: '#f5f7fa' },
        { l: 'C', bg: '#00a854', nav: '#fff', con: '#f5f7fa' },
        { l: 'D', bg: '#f04134', nav: '#fff', con: '#f5f7fa' },
        { l: 'E', bg: '#373d41', nav: '#fff', con: '#f5f7fa' },
        { l: 'F', bg: '#108ee9', nav: '#404040', con: '#f5f7fa' },
        { l: 'G', bg: '#00a2ae', nav: '#404040', con: '#f5f7fa' },
        { l: 'H', bg: '#00a854', nav: '#404040', con: '#f5f7fa' },
        { l: 'I', bg: '#f04134', nav: '#404040', con: '#f5f7fa' },
        { l: 'J', bg: '#373d41', nav: '#404040', con: '#f5f7fa' }
    ];

    constructor(
        injector: Injector,
        private settings: SettingService,
        @Inject(DOCUMENT) private doc: any
    ) {
        super(injector);

        this.currentTheme = <ThemeType>settings.get('UI.Theme');
        if(!this.currentTheme)
        {
            this.changeTheme(this.defaultTheme);
        }
    }

    changeTheme(theme: ThemeType) {
        this.setTheme(theme);
        
        //如果要保存theme配置到服务器，则在此调用相关服务方法
    }

    private setTheme(name: ThemeType) {
        if (name === this.currentTheme) {
            return;
        }
        const bodyEl = this.doc.querySelector('body');
        const removeArr = [];
        for (let i = 0; i < bodyEl.classList.length; i++) {
            if (bodyEl.classList[i].startsWith('theme-')) {
                removeArr.push(bodyEl.classList[i]);
            }
        }
        if (removeArr.length) bodyEl.classList.remove(...removeArr);
        bodyEl.classList.add(`theme-${name.toLowerCase()}`);
        this.currentTheme = name;

        //event.trigger
        Abp.event.trigger('abp.theme-setting.changed', name);
    }
}
