import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase implements OnInit {
    searchToggleStatus: boolean;
    isCollapsed:boolean = false;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit(){
        abp.event.on('abp.theme-setting.collapsed', collapsed => {
			this.isCollapsed = collapsed;
		});
    }

    toggleCollapsedSideabar() {
        abp.event.trigger('abp.theme-setting.collapsed', !this.isCollapsed);
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }
}