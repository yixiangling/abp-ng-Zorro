import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';
import { UserServiceProxy, ChangeUserLanguageDto } from '@shared/service-proxies/service-proxies';

import { Abp, abp } from '@abp';

import * as _ from 'lodash';

@Component({
    selector: 'header-i18n',
    template: `
    <nz-dropdown>
        <div nz-dropdown>
            <i class="anticon anticon-edit"></i>
            {{currentLanguage.displayName}}
            <i class="anticon anticon-down"></i>
        </div>
        <ul nz-menu>
            <li nz-menu-item *ngFor="let language of languages"
                [nzSelected]="language.name == currentLanguage.name"
                (click)="changeLanguage(language.name)">
                <i class="anticon {{language.icon}}"></i>
                <span>{{language.displayName}}</span>
            </li>
        </ul>
    </nz-dropdown>
    `
})
export class HeaderI18nComponent extends AppComponentBase implements OnInit {

    languages: abp.localization.ILanguageInfo[];
    currentLanguage: abp.localization.ILanguageInfo;
    
    constructor(
        injector: Injector,
        private _userService: UserServiceProxy
    ) {
      super(injector);
    }
  
    ngOnInit() {
      this.languages = _.filter(this.localization.languages, l => !l.isDisabled);
      this.currentLanguage = this.localization.currentLanguage;
    }
  
    changeLanguage(languageName: string): void {
        const input = new ChangeUserLanguageDto();
        input.languageName = languageName;
  
        this._userService.changeLanguage(input).subscribe(() => {
            Abp.utils.setCookieValue(
                'Abp.Localization.CultureName',
                languageName,
                new Date(new Date().getTime() + 5 * 365 * 86400000), //5 year
                Abp.appPath,
                null
            );
  
            window.location.reload();
        });
    }
  }
  