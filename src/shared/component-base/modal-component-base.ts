import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { NzModalSubject } from 'ng-zorro-antd';
import { AppComponentBase } from './app-component-base';

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

// export namespace ModalSubjectEvent{
// 	export interface onShow {
// 		onShow(): void;
// 	}
// 	export interface onShown {
// 		onShown(): void;
// 	}
// 	export interface onHide {
// 		onHide(): void;
// 	}
// 	export interface onHidden {
// 		onHidden(): void;
// 	}
// 	export interface onOk {
// 		onOk(): void;
// 	}
// 	export interface onCancel {
// 		onCancel(): void;
// 	}
// 	export interface onDestroy {
// 		onDestroy(): void;
// 	}
// }
