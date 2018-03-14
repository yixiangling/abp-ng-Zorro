import { Component, Injector, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './default-page.component.html',
    animations: [appModuleAnimation()]
})
export class DefaultPageComponent extends AppComponentBase implements AfterViewInit {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    ngAfterViewInit(): void {
      
    }
}
