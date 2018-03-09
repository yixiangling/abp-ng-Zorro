import { NgModule, ModuleWithProviders } from '@angular/core';

import { AdProHeaderModule } from './pro-header/pro-header.module';

const MODULES = [
    AdProHeaderModule
];

@NgModule({
    imports: [
        AdProHeaderModule.forRoot()
    ],
    declarations: [

    ],
    providers: [ ],
    exports: MODULES
})
export class DelonComponentModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DelonComponentModule };
    }
}
