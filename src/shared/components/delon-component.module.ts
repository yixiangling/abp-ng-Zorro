import { NgModule, ModuleWithProviders } from '@angular/core';

import { AdProHeaderModule } from './pro-header/pro-header.module';
import { AdAvatarListModule } from './avatar-list/avatar-list.module';
import { AdCountDownModule } from './count-down/count-down.module';
import { AdDescListModule } from './desc-list/desc-list.module';
import { AdEllipsisModule } from './ellipsis/ellipsis.module';
import { AdNoticeIconModule } from './notice-icon/notice-icon.module';
import { AdNumberInfoModule } from './number-info/number-info.module';
import { AdNumberToChineseModule } from './number-to-chinese/number-to-chinese.module';
import { AdResultModule } from './result/result.module';
import { AdTagSelectModule } from './tag-select/tag-select.module';
import { AdTrendModule } from './trend/trend.module';
import { AdStandardFormRowModule } from './standard-form-row/standard-form-row.module';

import { AdChartsModule } from './charts/charts.module';

const MODULES = [
    AdProHeaderModule, AdAvatarListModule, AdCountDownModule, AdDescListModule, AdEllipsisModule, AdNoticeIconModule, AdNumberInfoModule, AdNumberToChineseModule,
    AdResultModule, AdTagSelectModule, AdTrendModule, AdStandardFormRowModule, 
    AdChartsModule
];

@NgModule({
    imports: [
        AdProHeaderModule.forRoot(), 
        AdAvatarListModule.forRoot(),
        AdCountDownModule.forRoot(),
        AdDescListModule.forRoot(),
        AdEllipsisModule.forRoot(),
        AdNoticeIconModule.forRoot(),
        AdNumberInfoModule.forRoot(),
        AdNumberToChineseModule.forRoot(),
        AdResultModule.forRoot(),
        AdTagSelectModule.forRoot(),
        AdTrendModule.forRoot(),
        AdStandardFormRowModule.forRoot(),

        AdChartsModule.forRoot()
    ],
    exports: MODULES
})
export class DelonComponentModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonComponentModule };
    }
}
