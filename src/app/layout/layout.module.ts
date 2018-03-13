import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './default/layout.component';
// import { DelonComponentModule } from '@shared/components';

import { TopBarComponent } from './default/header/topbar.component';
import { SideBarUserAreaComponent } from './default/sidebar/sidebar-user-area.component';
import { SideBarNavComponent } from './default/sidebar/sidebar-nav.component';
import { SideBarFooterComponent } from './default/sidebar/sidebar-footer.component';
import { HeaderSearchComponent } from './default/header/components/search.component';
import { HeaderThemeComponent } from './default/header/components/theme.component';
import { HeaderNotifyComponent } from './default/header/components/notify.component';
import { HeaderTaskComponent } from './default/header/components/task.component';
import { HeaderIconComponent } from './default/header/components/icon.component';
import { HeaderFullScreenComponent } from './default/header/components/fullscreen.component';
import { HeaderI18nComponent } from './default/header/components/i18n.component';
import { HeaderStorageComponent } from './default/header/components/storage.component';
import { HeaderUserComponent } from './default/header/components/user.component';

const COMPONENTS = [
    LayoutComponent,
    TopBarComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent
];

const HEADERCOMPONENTS = [
    HeaderSearchComponent,
    HeaderNotifyComponent,
    HeaderTaskComponent,
    HeaderIconComponent,
    HeaderFullScreenComponent,
    HeaderThemeComponent,
    HeaderI18nComponent,
    HeaderStorageComponent,
    HeaderUserComponent
];

@NgModule({
    imports: [SharedModule, CommonModule, RouterModule],
    providers: [],
    declarations: [
        ...COMPONENTS,
        ...HEADERCOMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class LayoutModule { }
