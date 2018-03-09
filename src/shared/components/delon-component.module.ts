import { NgModule, ModuleWithProviders } from '@angular/core';

import { AdProHeaderModule } from './pro-header/pro-header.module';
import { AdAvatarListModule } from './avatar-list/avatar-list.module';
import { AdCountDownModule } from './count-down/count-down.module';

const MODULES = [
    AdProHeaderModule, AdAvatarListModule, AdCountDownModule
];

@NgModule({
    imports: [
        AdProHeaderModule.forRoot(), 
        AdAvatarListModule.forRoot(),
        AdCountDownModule.forRoot()
    ],
    exports: MODULES
})
export class DelonComponentModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonComponentModule };
    }
}
