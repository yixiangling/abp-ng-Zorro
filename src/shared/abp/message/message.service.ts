import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class MessageService {

    constructor(private modalSrv: NzModalService) { }

    info(message: string, title: string = "通知信息"): any {
        this.modalSrv.info({
            title: title,
            content: message
        })
    }

    success(message: string, title: string = "成功信息"): any {
        this.modalSrv.success({
            title: title,
            content: message
        })
    }

    warn(message: string, title: string = "警告信息"): any {
        this.modalSrv.warning({
            title: title,
            content: message
        })
    }

    error(message: string, title: string = "失败信息"): any {
        this.modalSrv.error({
            title: title,
            content: message
        })
    }

    confirm(message: string, titleOrCallBack?: string | ((result: boolean) => void), callback?: (result: boolean) => void): any {
        if (typeof titleOrCallBack == 'string') {
            this.modalSrv.confirm({
                title: titleOrCallBack,
                content: message,
                onOk() {
                    if (callback) callback(true);
                },
                onCancel() {
                    if (callback) callback(false);
                }
            });
        } else {
            this.modalSrv.confirm({
                title: "确认操作",
                content: message,
                onOk() {
                    if (titleOrCallBack) titleOrCallBack(true);
                },
                onCancel() {
                    if (titleOrCallBack) titleOrCallBack(false);
                }
            });
        }
    }

}