import { Injectable } from '@angular/core';

import { Abp } from './../abp';

@Injectable()
export class AbpMultiTenancyService {

    get isEnabled(): boolean {
        return Abp.multiTenancy.isEnabled;
    }

}
