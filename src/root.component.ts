import { Injector, Component } from '@angular/core';

import { AbpMessageService } from './shared/helpers/message.service';
import { AbpNotifyService } from './shared/helpers/notify.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent {
    notify: AbpNotifyService;
    message: AbpMessageService;

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