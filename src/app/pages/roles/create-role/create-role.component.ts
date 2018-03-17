import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

import { RoleServiceProxy, CreateRoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { ModalComponentBase, ModalSubjectEvent } from '@shared/component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

@Component({
	templateUrl: './create-role.component.html',
	styles: []
})
export class CreateRoleComponent extends ModalComponentBase implements OnInit, ModalSubjectEvent.OnShow {
	saving: boolean = false;

	permissions: ListResultDtoOfPermissionDto = null;
	role: CreateRoleDto = null;
	permissionOptions: { label: string, value: string, checked: boolean }[];

	validateForm: FormGroup;

	constructor(
		injector: Injector,
		private roleService: RoleServiceProxy,
		private formBuilder: FormBuilder
	) {
		super(injector);
	}

	ngOnInit(): void {
		this.saving = true;
		this.roleService.getAllPermissions()
			.finally(() => { this.saving = false; })
			.subscribe((permissions: ListResultDtoOfPermissionDto) => {
				this.permissions = permissions;

				this.permissionOptions = [];
				permissions.items.forEach(item => {
					this.permissionOptions.push({ label: this.l(item.displayName), value: item.name, checked: false });
				});
			});

		this.validateForm = this.formBuilder.group({
			roleName: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
			displayName: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
			description: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
			permissions: []
		});

		this.resetForm();
		this.role = new CreateRoleDto();
		this.role.init({ isStatic: false });
	}

	onShow(): void {
		//注意 onShow 会在 ngOnInit 前执行，onShow是在NzModalSubject收到onShow事件时执行的。这是ng-zorro的问题
	}

	getFormControl(name: string) {
        return this.validateForm.controls[name];
	}
	
	resetForm($event?: MouseEvent) {
		if($event) $event.preventDefault();

		this.validateForm.reset();
		for (const key in this.validateForm.controls) {
			this.validateForm.controls[key].markAsPristine();
		}
	}

	save(e): void {
		var permissions = [];

		this.permissionOptions.forEach(element => {
			if(element.checked)
				permissions.push(element.value);
		});

		this.role.permissions = permissions;

		this.saving = true;
		this.roleService.create(this.role)
			.finally(() => { this.saving = false; })
			.subscribe(() => {
				this.notify.success(this.l('SavedSuccessfully'));
				this.success();
			});
	}

}
