import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getRule, saveRule, removeRule } from '../_mock/rule.service';
import { UserServiceProxy, IUserDto, UserDto, CreateUserDto, RoleDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/app-component-base';
import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

@Component({
    templateUrl: './users.component.html'
})
export class UsersComponent extends AppComponentBase implements OnInit {

    @ViewChild('editUserModal') editUserModal: EditUserComponent;
    @ViewChild('createUserModal') createUserModal: CreateUserComponent;

    q: any = {
        pi: 1,
        ps: 10,
        total: 0,
        sorter: '',
        status: -1,
        statusList: []
    };
    data: UserDtoRuntime[] = [];
    loading = false;
    selectedRows: any[] = [];
    curRows: any[] = [];
    totalCallNo = 0;
    allChecked = false;
    indeterminate = false;
    status = [
        { text: '启用', value: false, type: 'success' },
        { text: '禁用', value: false, type: 'default' }
    ];
    sortMap: any = {};
    expandForm = false;

    constructor(injector: Injector, public msg: NzMessageService, private _userService: UserServiceProxy) {
        super(injector);
    }

    ngOnInit() {
        this.refreshData();
    }

    adduser() {
        this.createUserModal.show();
    }

    remove() {
        this.selectedRows.forEach(i => removeRule(i.no));
        this.refreshData();
        this.clear();
    }

    clear() {
        this.selectedRows = [];
        this.totalCallNo = 0;
        this.data.forEach(i => i.checked = false);
        this.refreshStatus();
    }

    refreshStatus() {
        const allChecked = this.curRows.every(value => value.disabled || value.checked);
        const allUnChecked = this.curRows.every(value => value.disabled || !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.data.filter(value => value.checked);
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
    }  

    refreshData(reset = false) {
        if (reset) {
            this.q.pi = 1;
        }
        this.loading = true;
        this._userService.getAll((this.q.pi - 1) * this.q.ps, this.q.ps).subscribe((result: PagedResultDtoOfUserDto) => {
            this.loading = false;
            let status = 0;

            this.data = [];
            for (const item of result.items){
                this.data.push(new UserDtoRuntime(item))
            }
            this.data = this.data.map(i => {
                if (i.isActive) {
                    status = 0;
                } else {
                    status = 1;
                }
                const statusItem = this.status[status];
                i.activeText = statusItem.text;
                i.activeType = statusItem.type;
                return i;
            });
            this.q.total = result.totalCount;
        })
    };

    reset(ls: any[]) {
        for (const item of ls) item.value = false;
        this.refreshData();
    }

   
    editUser(user: UserDto): void {
        this.editUserModal.show(user.id);
    }
}

class UserDtoRuntime extends UserDto {
    checked: boolean;
    activeText: string;
    activeType: string;

    constructor(data?: IUserDto) {
        super(data);
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}