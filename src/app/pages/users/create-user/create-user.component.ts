import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

import { UserServiceProxy, CreateUserDto, RoleDto, ListResultDtoOfRoleDto } from '@shared/service-proxies/service-proxies';
import { ModalComponentBase, ModalSubjectEvent } from '@shared/component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends ModalComponentBase implements OnInit {
	saving: boolean = false;

    user: CreateUserDto = null;
    validateForm: FormGroup;

    roles: ListResultDtoOfRoleDto = null;
    roleOptions: { label: string, value: string, checked: boolean }[];

    confirmPassword: String;

    constructor(
        injector: Injector,
        private userService: UserServiceProxy,
        private formBuilder: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.saving = true;
        this.userService.getRoles()
            .finally(() => { this.saving = false; })
			.subscribe((roles: ListResultDtoOfRoleDto) => {
				this.roles = roles;

				this.roleOptions = [];
				roles.items.forEach(item => {
					this.roleOptions.push({ label: this.l(item.displayName), value: item.normalizedName, checked: true });
				});
			});

        this.validateForm = this.formBuilder.group({
            email: [null, [Validators.email]],
            password: [null, [Validators.required]],
            checkPassword: [null, Validators.compose([Validators.required, this.confirmationValidator])],
            //username: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nicknameValidator.bind(this)],
            username: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            surname: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            isactive: [true],
            rolegroup: [true]
        });

        this.resetForm();
        this.user = new CreateUserDto();
        this.user.init({ isActive: true });
    }

    nicknameValidator = (control: FormControl): Observable<any> => {
        return control
            .valueChanges
            .debounceTime(500)
            .map((value) => {
                if (value !== 'cipchk') {
                    control.setErrors({ checked: true, error: true });
                    return;
                }
                control.setErrors(null);
            });
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.getFormControl('password').value) {
            return { confirm: true, error: true };
        }
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
		var roles = [];

		this.roleOptions.forEach(element => {
			if(element.checked)
				roles.push(element.value);
		});

		this.user.roleNames = roles;

		this.saving = true;
		this.userService.create(this.user)
			.finally(() => { this.saving = false; })
			.subscribe(() => {
				this.notify.success(this.l('SavedSuccessfully'));
				this.success();
			});
	}

}
