import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { APIS } from '../../../_mock/_api';

@Component({
    selector: 'pro-list-card-list',
    templateUrl: './card-list.component.html',
    styles: [`
    :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
    }
    `],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProCardListComponent implements OnInit {

    list: any[] = [ null ];

    loading = true;

    constructor(public msg: NzMessageService) {}

    ngOnInit() {
        this.loading = true;
        let res = APIS["/api/list"]({ count: 8 });
        this.list = this.list.concat(res);
        this.loading = false;
    }
}
