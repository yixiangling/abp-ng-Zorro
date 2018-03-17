import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';

import { ModalHelper } from '@shared/helpers/modal.helper';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-extras-poi-edit',
    templateUrl: './edit.component.html'
})
export class ExtrasPoiEditComponent implements OnInit {
    i: any;
    cat: string[] = [ '美食', '美食,粤菜', '美食,粤菜,湛江菜' ];

    constructor(
        private modalHelper: ModalHelper,
        private subject: NzModalSubject,
        private httpClient: HttpClient,
        public msgSrv: NzMessageService
    ) { }

    ngOnInit() {
        if (this.i.id > 0) {
            this.httpClient.get('./assets/pois.json').subscribe((res: any) => this.i = res.data[0]);
        }
    }

    save() {
        this.httpClient.get('./assets/pois.json').subscribe(() => {
            this.msgSrv.success('保存成功，只是模拟，实际未变更');
            this.subject.next('true');
            this.close();
        });
        
    }

    close() {
        this.subject.destroy();
    }
}
