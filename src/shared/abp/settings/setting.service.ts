import { Injectable } from '@angular/core';

import { Abp } from './../abp';

@Injectable()
export class SettingService {

    get(name: string): string {
        return Abp.setting.get(name);
    }

    getBoolean(name: string): boolean {
        return Abp.setting.getBoolean(name);
    }
    
    getInt(name: string): number {
        return Abp.setting.getInt(name);
    }

}
