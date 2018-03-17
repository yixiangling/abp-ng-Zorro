import { Component, ViewContainerRef, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { LoginService } from './login/login.service';
import { AppComponentBase } from '@shared/component-base';

import { Abp } from '@abp';

@Component({
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.less'
    ]
})
export class AccountComponent extends AppComponentBase {

    private viewContainerRef: ViewContainerRef;

    versionText: string;
    currentYear: number;
    
    public constructor(
        injector: Injector,
        private _loginService: LoginService
    ) {
        super(injector);

        this.currentYear = new Date().getFullYear();
        this.versionText = this.appSession.application.version + ' [' + this.appSession.application.releaseDate.format('YYYYDDMM') + ']';
    }

    showTenantChange(): boolean {
        return Abp.multiTenancy.isEnabled;
    }
}