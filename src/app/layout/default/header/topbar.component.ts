import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase {
    searchToggleStatus: boolean;
    collapsed: boolean = true;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    toggleCollapsedSideabar() {
        //this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
        this.collapsed = !this.collapsed;
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus;
    }
}