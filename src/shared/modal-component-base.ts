import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { NzModalSubject } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/app-component-base';

export abstract class ModalComponentBase extends AppComponentBase {

	readonly eventTypes = ['onShow', 'onShown', 'onHide', 'onHidden','onOk', 'onCancel', 'onDestroy'];

	subject: NzModalSubject;

	constructor(injector: Injector) {
		super(injector);

		this.subject = injector.get(NzModalSubject);

		this.eventTypes.forEach(name => {
			if(typeof this[name] === "function")
			{
				this.subject.on(name, this[name]);
			}
		});
	}

}
