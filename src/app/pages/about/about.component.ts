import { NzMessageService } from 'ng-zorro-antd';
import { Component, Injector } from '@angular/core';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-page-about',
    templateUrl: './about.component.html'
})
export class AboutComponent extends AppComponentBase {
    type = '';
    q = '';

    quick(key: string) {
        this.q = key;
        this.search();
    }

    search() {
        this.msg.success(`搜索：${this.q}`);
    }

    constructor(injector: Injector, public msg: NzMessageService) {
        super(injector);
    }
}
