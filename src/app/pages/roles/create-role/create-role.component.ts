import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

import { RoleServiceProxy, CreateRoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
	selector: 'create-role-modal',
	templateUrl: './create-role.component.html',
	styles: []
})
export class CreateRoleComponent extends AppComponentBase implements OnInit {
	active: boolean = false;
	saving: boolean = false;

	permissions: ListResultDtoOfPermissionDto = null;
	role: CreateRoleDto = null;

	constructor(
		injector: Injector,
		private _roleService: RoleServiceProxy,
		private subject: NzModalSubject
	) {
		super(injector);

		this.subject.on('onDestory', () => {
			console.log('destroy');
		});
		this.subject.on('onShow', () => {
			this.role = new CreateRoleDto();
			this.role.init({ isStatic: false });
		});
	}

	ngOnInit(): void {
		this._roleService.getAllPermissions()
			.subscribe((permissions: ListResultDtoOfPermissionDto) => {
				this.permissions = permissions;
			});
	}

	save(e): void {
		var permissions = [];
		// $(this.modalContent.nativeElement).find("[name=permission]").each(
		// 	(index: number, elem: Element) => {
		// 		if ($(elem).is(":checked")) {
		// 			permissions.push(elem.getAttribute("value").valueOf());
		// 		}
		// 	}
		// );

		this.role.permissions = permissions;

		this.saving = true;
		this._roleService.create(this.role)
			.finally(() => { this.saving = false; })
			.subscribe(() => {
				this.notify.info(this.l('SavedSuccessfully'));
				this.subject.next('传出数据');
			});
	}

	close(e): void {
		this.subject.destroy('onCancel');
	}

}
