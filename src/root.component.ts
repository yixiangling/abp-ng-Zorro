import { Injector, HostBinding, Component, OnInit } from '@angular/core';
import { Abp } from '@abp';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent implements OnInit {
    layoutCollapsed: boolean = false;
    layoutFixed: boolean = true;
    layoutBoxed: boolean = false;
    @HostBinding('class.layout-fixed') get isFixed() { return this.layoutFixed; }
    @HostBinding('class.layout-boxed') get isBoxed() { return this.layoutBoxed; }
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.layoutCollapsed; }

    ngOnInit() {
        // event.on
        Abp.event.on('abp.theme-setting.collapsed', collapsed => {
            this.layoutCollapsed = collapsed;
        });
    }

    constructor(injector: Injector) {
    }

}