import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

import { Abp } from '@abp';

@Injectable()
export class AppAuthService {

    logout(reload?: boolean): void {
        Abp.auth.clearToken();
        if (reload !== false) {
            location.href = AppConsts.appBaseUrl;
        }
    }
}