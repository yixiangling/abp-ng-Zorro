import { Injectable } from '@angular/core';

import { Abp , abp } from './../abp';

@Injectable()
export class FeatureCheckerService {

    get(featureName: string): abp.features.IFeature {
        return Abp.features.get(featureName);
    }

    getValue(featureName: string): string {
        return Abp.features.getValue(featureName);
    }

    isEnabled(featureName: string): boolean {
        return Abp.features.isEnabled(featureName);
    }

}
