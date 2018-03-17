import { Injectable } from '@angular/core';

import { Abp , abp } from './../abp';

@Injectable()
export class LocalizationService {

    get languages(): abp.localization.ILanguageInfo[] {
        return Abp.localization.languages;
    }

    get currentLanguage(): abp.localization.ILanguageInfo {
        return Abp.localization.currentLanguage as abp.localization.ILanguageInfo;
    }

    localize(key: string, sourceName: string): string {
        return Abp.localization.localize(key, sourceName);
    }
    
    getSource(sourceName: string): (key: string) => string {
        return Abp.localization.getSource(sourceName);
    }

}
