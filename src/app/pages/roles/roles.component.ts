import { Component, Injector, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getFakeList } from '../_mock/api.service';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'pro-page-roles',
    templateUrl: './roles.component.html',
    styleUrls: [ './roles.component.less' ]
})
export class RolesComponent extends AppComponentBase implements OnInit {
    q: any = {
        status: 'all'
    };
    loading = false;
    data: any[] = [];

    constructor(injector: Injector, public msg: NzMessageService) {
        super(injector);
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = true;
        setTimeout(() => {
            this.data = getFakeList(5);
            this.loading = false;
        }, 1000);
    }
}
