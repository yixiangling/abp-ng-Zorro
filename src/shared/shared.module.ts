import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { NzTreeModule } from 'ng-tree-antd';
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';

import { DelonComponentModule } from './components/delon-component.module';


// region: zorro modules

import {
    // LoggerModule,
    // NzLocaleModule,
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    // NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzRootModule,
    NzCarouselModule,
    // NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    // NzBackTopModule,
    // NzAffixModule,
    // NzAnchorModule,
    NzAvatarModule,
    // SERVICES
    NzNotificationService,
    NzMessageService
} from 'ng-zorro-antd';
const ZORROMODULES = [
    // LoggerModule,
    // NzLocaleModule,
    NzButtonModule,
    NzAlertModule,
    NzBadgeModule,
    // NzCalendarModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzGridModule,
    NzMessageModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzRadioModule,
    NzRateModule,
    NzSelectModule,
    NzSpinModule,
    NzSliderModule,
    NzSwitchModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzUtilModule,
    NzStepsModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzRootModule,
    NzCarouselModule,
    // NzCardModule,
    NzCollapseModule,
    NzTimelineModule,
    NzToolTipModule,
    // NzBackTopModule,
    // NzAffixModule,
    // NzAnchorModule,
    NzAvatarModule
];
// endregion


import { MomentDatePipe } from './pipes/moment-date.pipe';
import { YNPipe } from './pipes/yn.pipe';
const PIPES = [MomentDatePipe, YNPipe];

import { ModalHelper } from './helpers/modal.helper';
import { AbpMessageService } from './helpers/message.service';
import { AbpNotifyService } from './helpers/notify.service';
import { MenuService } from './layout/menu.service';
import { ColorsService } from './layout/colors.service'
const HELPERS = [ ModalHelper, AbpMessageService, AbpNotifyService, MenuService, ColorsService ];

@NgModule({
    imports: [
        CommonModule,
        AbpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NzTreeModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule.forRoot(),
        DelonComponentModule.forRoot()
    ],
    declarations: [
        ...PIPES
    ],
    providers: [  ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NzTreeModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        DelonComponentModule,
        ...PIPES
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                NzNotificationService,
                NzMessageService,
                
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard,
                ...HELPERS
            ]
        }
    }
}
