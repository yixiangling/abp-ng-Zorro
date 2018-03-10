import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { APIS } from '../../../_mock/_api';

@Component({
    selector: 'pro-basic-list',
    templateUrl: './basic-list.component.html',
    styleUrls: [ './basic-list.component.less' ]
})
export class ProBasicListComponent implements OnInit {
    q: any = {
        status: 'all'
    };
    loading = false;
    data: any[] = [];

    constructor(public msg: NzMessageService) {}

    ngOnInit() {
    }

    getData() {
        //this.loading = true;
        setTimeout(() => {
            let res = APIS["/api/list"]({ count: 5 });
            this.data = res;
            //this.loading = false;
        }, 1000);
    }
}
