import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
    templateUrl: './sidebar-user-area.component.html',
    selector: 'sidebar-user-area',
    encapsulation: ViewEncapsulation.None
})
export class SideBarUserAreaComponent extends AppComponentBase implements OnInit {

    shownLoginName: string = "";
    emailAddress: string = "";

    constructor(
        injector: Injector,
        private _authService: AppAuthService, 
        public msgSrv: NzMessageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.shownLoginName = this.appSession.getShownLoginName();
        this.emailAddress = this.appSession.user.emailAddress;
    }

    logout(): void {
        this._authService.logout();
    }
}