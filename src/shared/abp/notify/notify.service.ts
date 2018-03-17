import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class NotifyService {

    constructor(
        private notifySrv: NzNotificationService
    ) { }

    info(message: string, title: string = "信息提示", options?: any): void {
        this.notifySrv.info(title, message, options);
    }

    success(message: string, title: string = "成功提示", options?: any): void {
        this.notifySrv.success(title, message, options);
    }

    warn(message: string, title: string = "警告提示", options?: any): void {
        this.notifySrv.warning(title, message, options);
    }

    error(message: string, title: string = "失败提示", options?: any): void {
        this.notifySrv.error(title, message, options);
    }

}