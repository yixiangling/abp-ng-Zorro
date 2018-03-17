import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { zip } from 'rxjs/observable/zip';

import { UserServiceProxy, UserDto, RoleDto, ListResultDtoOfRoleDto } from '@shared/service-proxies/service-proxies';
import { ModalComponentBase, ModalSubjectEvent } from '@shared/component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

@Component({
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends ModalComponentBase implements OnInit {
    
    @Input() id: number;

	saving: boolean = false;

    user: UserDto = new UserDto();
    validateForm: FormGroup;

    roles: ListResultDtoOfRoleDto = null;
    roleOptions: { label: string, value: string, checked: boolean }[];

    constructor(
        injector: Injector,
        private userService: UserServiceProxy,
        private formBuilder: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
		this.saving = true;
		zip(
            this.userService.getRoles(),
            this.userService.get(this.id)
		)
		.finally(() => { this.saving = false; })
		.subscribe(([ roles, result]: [ ListResultDtoOfRoleDto, UserDto]) => {
			
			this.roles = roles;
			this.user = result;
			let options = [];
			roles.items.forEach(item => {
				options.push({ label: this.l(item.displayName), value: item.normalizedName, checked: false });
			});
			
			options.filter((item) => result.roleNames.indexOf(item.value) >= 0).map(item => {item.checked = true});
			
			this.roleOptions = options;
        });
        
        this.validateForm = this.formBuilder.group({
            email: [null, [Validators.email]],
            username: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            surname: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            isactive: [null],
            editrolegroup: [null]
        }, );
    }

    userInRole(role: RoleDto, user: UserDto): boolean {
        if (user.roleNames.indexOf(role.normalizedName) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    userInRoles() {
        this.roleOptions.forEach(role => {
            if (this.user.roleNames.indexOf(role.value) !== -1) {
                role.checked = true;
            }
            else {
                role.checked = false;
            }
        });
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
		this.userService.update(this.user)
			.finally(() => { this.saving = false; })
			.subscribe(() => {
				this.notify.success(this.l('SavedSuccessfully'));
				this.success();
			});
	}
}
