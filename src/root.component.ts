import { Injector, HostBinding, Component, OnInit } from '@angular/core';

import { AbpMessageService } from './shared/helpers/message.service';
import { AbpNotifyService } from './shared/helpers/notify.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent implements OnInit{
    layoutCollapsed: boolean = false;
    layoutFixed: boolean = true;
    layoutBoxed: boolean = false;
    @HostBinding('class.layout-fixed') get isFixed() { return this.layoutFixed; }
    @HostBinding('class.layout-boxed') get isBoxed() { return this.layoutBoxed; }
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.layoutCollapsed; }

    notify: AbpNotifyService;
    message: AbpMessageService;

    ngOnInit() {
        abp.event.on('abp.theme-setting.collapsed', collapsed => {
            this.layoutCollapsed = collapsed;
        });
    }

    constructor(injector: Injector){
        this.notify = injector.get(AbpNotifyService);
        this.message = injector.get(AbpMessageService);

        this.replaceAbpModule();
    }
    
    replaceAbpModule(): void{
        abp.message = this.message;
        abp.notify = this.notify;
    }
}