import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { PROFILES } from '../../../_mock/_profile';

@Component({
    selector: 'pro-profile-advanced',
    templateUrl: './advanced.component.html'
})
export class ProProfileAdvancedComponent implements OnInit {
    data = {
        advancedOperation1: [],
        advancedOperation2: [],
        advancedOperation3: []
    };

    constructor(public msg: NzMessageService) {}

    ngOnInit() {
        let res = PROFILES["GET /profile/advanced"];
        this.data = res;
    }
}
