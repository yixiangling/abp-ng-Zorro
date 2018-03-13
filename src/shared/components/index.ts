import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';

// region: all modules
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
import { AdReuseTabModule } from './reuse-tab/reuse-tab.module';

import { AdChartsModule } from './charts/charts.module';

const MODULES = [
    AdProHeaderModule, AdAvatarListModule, AdCountDownModule, AdDescListModule, AdEllipsisModule, AdNoticeIconModule, AdNumberInfoModule, AdNumberToChineseModule,
    AdResultModule, AdTagSelectModule, AdTrendModule, AdStandardFormRowModule,
    AdReuseTabModule,
    AdChartsModule
];

// region: export

export * from './avatar-list';
export * from './desc-list';
export * from './ellipsis';
export * from './notice-icon';
export * from './number-info';
export * from './pro-header';
export * from './result';
export * from './standard-form-row';
export * from './tag-select';
export * from './trend';
export * from './charts';
export * from './count-down';
export * from './reuse-tab';
export * from './number-to-chinese';

// endregion

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
        AdReuseTabModule.forRoot(),

        AdChartsModule.forRoot()
    ],
    exports: MODULES
})
export class DelonRootModule {
    constructor(@Optional() @SkipSelf() parentModule: DelonRootModule) {
        if (parentModule) {
            throw new Error(`DelonRootModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}

@NgModule({ exports: MODULES })
export class DelonComponentModule {
    // constructor(@Optional() @SkipSelf() parentModule: DelonRootModule) {
    //     if (parentModule) {
    //         throw new Error(`DelonRootModule has already been loaded. Import Core modules in the AppModule only.`);
    //     }
    // }
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonRootModule };
    }
}
