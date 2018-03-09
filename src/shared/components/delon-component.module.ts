import { NgModule, ModuleWithProviders } from '@angular/core';

import { AdProHeaderModule } from './pro-header/pro-header.module';
import { AdAvatarListModule } from './avatar-list/avatar-list.module';
import { AdCountDownModule } from './count-down/count-down.module';
import { AdDescListModule } from './desc-list/desc-list.module';
import { AdEllipsisModule } from './ellipsis/ellipsis.module';
import { AdNoticeIconModule } from './notice-icon/notice-icon.module';
import { AdNumberInfoModule } from './number-info/number-info.module';
import { AdNumberToChineseModule } from './number-to-chinese/number-to-chinese.module';

const MODULES = [
    AdProHeaderModule, AdAvatarListModule, AdCountDownModule, AdDescListModule, AdEllipsisModule, AdNoticeIconModule, AdNumberInfoModule, AdNumberToChineseModule
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
        AdNumberToChineseModule.forRoot()
    ],
    exports: MODULES
})
export class DelonComponentModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonComponentModule };
    }
}
