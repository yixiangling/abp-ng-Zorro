import { NgModule, ModuleWithProviders } from '@angular/core';

import { AdProHeaderModule } from './pro-header/pro-header.module';
import { AdAvatarListModule } from './avatar-list/avatar-list.module';

const MODULES = [
    AdProHeaderModule, AdAvatarListModule
];

@NgModule({
    imports: [
        AdProHeaderModule.forRoot(), 
        AdAvatarListModule.forRoot()
    ],
    exports: MODULES
})
export class DelonComponentModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonComponentModule };
    }
}
