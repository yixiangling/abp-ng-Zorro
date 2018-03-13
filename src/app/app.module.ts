import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { LayoutModule } from './layout/layout.module';

import { DefaultPageComponent } from '@app/default/default-page.component';

@NgModule({
    declarations: [
        AppComponent,
        DefaultPageComponent        
    
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        LayoutModule,
    ],
    providers: [
    ]
})
export class AppModule { }
