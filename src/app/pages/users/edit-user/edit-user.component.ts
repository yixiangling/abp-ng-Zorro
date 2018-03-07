import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { UserServiceProxy, UserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import * as _ from "lodash";

@Component({
    selector: 'edit-user-modal',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible: boolean = false;
    user: UserDto = null;
    userRoles: RoleDto[] = null;
    roles: any = [];
    isConfirmLoading = false;
    form: FormGroup;
    loading = false;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {

        this.user = new UserDto();
        this.user.init({ isActive: true });
        this._userService.getRoles()
            .subscribe((result) => {
                this.userRoles = result.items;
                this.roles = this.userRoles.map(i => { return { label: i.name, value: i.normalizedName, checked: true }; });
            });

        this.form = this.fb.group({
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
        this.roles.forEach(role => {
            if (this.user.roleNames.indexOf(role.value) !== -1) {
                role.checked = true;
            }
            else {
                role.checked = false;
            }
        });
    }

    show(id: number): void {
        this.modalVisible = true;
        this.loading = true;
        //用户
        this._userService.get(id)
            .subscribe(
            (result) => {
                this.user = result;
                //角色
                //this.roles = this.userRoles.map(i => { return { label: i.name, value: i.normalizedName, checked: this.userInRole(i, this.user) }; });
                this.roles = this.userRoles.map(i => { return { label: i.name, value: i.normalizedName, checked: true }; });
                this.userInRoles();
                this.loading = false;
            });
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
    }

    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        if (this.form.valid) {
            this.isConfirmLoading = true;

            var roles = [];

            this.roles.forEach((role) => {
                if (role.checked) {
                    roles.push(role.value);
                }
            });

            this.user.roleNames = roles;

            this._userService.update(this.user)
                .finally(() => { this.isConfirmLoading = false; })
                .subscribe(() => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.close();
                    this.modalSave.emit(null);
                });
        }
    }

    close(): void {
        this.modalVisible = false;
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    reset(e): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
    }
}
