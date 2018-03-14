import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { NzModalSubject } from 'ng-zorro-antd';
import { AppComponentBase } from './app-component-base';

export abstract class ModalComponentBase extends AppComponentBase {
	modalVisible: boolean = false;
	subject: NzModalSubject;

	constructor(injector: Injector) {
		super(injector);

		this.subject = injector.get(NzModalSubject);

		const eventTypes = ['onShow', 'onShown', 'onHide', 'onHidden', 'onOk', 'onCancel', 'onDestroy'];
		eventTypes.forEach(name => {
			if (typeof this[name] === "function") {
				this.subject.on(name, this[name]);
			}
		});

		this.subject.on('onShow', ()=> this.modalVisible=true);
		this.subject.on('onHide', ()=> this.modalVisible=false);
	}

}

export namespace ModalSubjectEvent {
	export interface OnShow {
		onShow(): void;
	}
	export interface OnShown {
		onShown(): void;
	}
	export interface OnHide {
		onHide(): void;
	}
	export interface OnHidden {
		onHidden(): void;
	}
	export interface OnOk {
		onOk(): void;
	}
	export interface OnCancel {
		onCancel(): void;
	}
	export interface OnDestroy {
		onDestroy(): void;
	}
}
