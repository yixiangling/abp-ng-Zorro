import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
//import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, CreateUserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

//import * as _ from "lodash";

@Component({
    selector: 'create-user-modal',
    templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends AppComponentBase implements OnInit {

    //@ViewChild('createUserModal') modal: ModalDirective;
    //@ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    modalVisible = false;
    isConfirmLoading = false;

    user: CreateUserDto = null;
    //roles: RoleDto[] = null;

    form: FormGroup;
    //roles: RoleDto[] = null;
    roles: any = [];

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private fb: FormBuilder
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._userService.getRoles()
            .subscribe((result) => {
                this.roles = result.items.map(i => { return { label: i.name, value: i.normalizedName, checked: true }; });
            });

        this.form = this.fb.group({
            email: [null, [Validators.email]],
            password: [null, [Validators.required]],
            checkPassword: [null, Validators.compose([Validators.required, this.confirmationValidator])],
            //username: [null, Validators.compose([Validators.required, Validators.minLength(2)]), this.nicknameValidator.bind(this)],
            username: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])],
            name: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            surname: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
            isactive: [true],
            rolegroup: [true]
        }, );
    }

    show(): void {
        //this.modal.show();
        this.reset();
        this.user = new CreateUserDto();
        this.user.init({ isActive: true });
        this.roles.forEach(element => {
            element.checked = true;
        });
        this.modalVisible = true;
    }

    //onShown(): void {
    //    $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    //}

    save(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
        }
        console.log('log', this.form.value);
        if (this.form.valid) {
            //TODO: Refactor this, don't use jQuery style code
            var roles = [];

            this.roles.forEach((role) => {
                if (role.checked) {
                    roles.push(role.value);
                }
            });

            this.user.roleNames = roles;
            this.isConfirmLoading = true;
            this._userService.create(this.user)
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
        //this.modal.hide();
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.isConfirmLoading = false;
        this.reset(e);
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
        } else if (control.value !== this.form.controls['password'].value) {
            return { confirm: true, error: true };
        }
    }

    getFormControl(name: string) {
        return this.form.controls[name];
    }

    reset(e?): void {
        if (e) {
            e.preventDefault();
        }
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
        }
    }

}
