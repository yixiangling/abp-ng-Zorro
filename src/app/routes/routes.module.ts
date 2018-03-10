import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';

// single pages
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

@NgModule({
    imports: [ SharedModule, RouteRoutingModule ],
    declarations: [
        DashboardV1Component,
        DashboardAnalysisComponent,
        DashboardMonitorComponent,
        DashboardWorkplaceComponent,

        // single pages
        Exception403Component,
        Exception404Component,
        Exception500Component
    ]
})

export class RoutesModule {}
