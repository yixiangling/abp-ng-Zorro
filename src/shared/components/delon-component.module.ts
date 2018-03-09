import { NgModule, ModuleWithProviders } from '@angular/core';

import { AdProHeaderModule } from './pro-header/pro-header.module';
import { AdAvatarListModule } from './avatar-list/avatar-list.module';
import { AdCountDownModule } from './count-down/count-down.module';
import { AdDescListModule } from './desc-list/desc-list.module';
import { AdEllipsisModule } from './ellipsis/ellipsis.module';
import { AdNoticeIconModule } from './notice-icon/notice-icon.module';
import { AdNumberInfoModule } from './number-info/number-info.module';

const MODULES = [
    AdProHeaderModule, AdAvatarListModule, AdCountDownModule, AdDescListModule, AdEllipsisModule, AdNoticeIconModule, AdNumberInfoModule
];

@NgModule({
    imports: [
        AdProHeaderModule.forRoot(), 
        AdAvatarListModule.forRoot(),
        AdCountDownModule.forRoot(),
        AdDescListModule.forRoot(),
        AdEllipsisModule.forRoot(),
        AdNoticeIconModule.forRoot(),
        AdNumberInfoModule.forRoot()
    ],
    exports: MODULES
})
export class DelonComponentModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonComponentModule };
    }
}
