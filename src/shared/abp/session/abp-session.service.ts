import { Injectable } from '@angular/core';

import { Abp , MultiTenancy } from './../abp';

@Injectable()
export class AbpSessionService {

    get userId(): number | undefined {
        return Abp.session.userId;
    }

    get tenantId(): number | undefined {
        return Abp.session.tenantId;
    }

    get impersonatorUserId(): number | undefined {
        return Abp.session.impersonatorUserId;
    }

    get impersonatorTenantId(): number | undefined {
        return Abp.session.impersonatorTenantId;
    }

    get multiTenancySide(): MultiTenancy {
        return Abp.session.multiTenancySide;
    }

}
