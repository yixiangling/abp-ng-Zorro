import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ModalHelper } from '@shared/helpers/modal.helper';
import { PagedListingComponentBase, PagedRequestDto } from "shared/component-base";
import { UserServiceProxy, IUserDto, UserDto, CreateUserDto, RoleDto, PagedResultDtoOfUserDto } from '@shared/service-proxies/service-proxies';

import { CreateUserComponent } from "./create-user/create-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

@Component({
    templateUrl: './users.component.html'
})
export class UsersComponent extends PagedListingComponentBase<UserDto> {

	loading = false;
	dataItems: UserDto[] = [];

    constructor(
		private injector: Injector,
		private userService: UserServiceProxy,
		private modalHelper: ModalHelper
	) {
		super(injector);
	}

	list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
		this.loading = true;

		this.userService.getAll(request.skipCount, request.maxResultCount)
			.finally(() => {
				finishedCallback();
				this.loading = false;
			})
			.subscribe((result: PagedResultDtoOfUserDto) => {
				this.dataItems = result.items;
				this.showPaging(result, pageNumber);
			});
	}

	delete(user: UserDto): void {
		this.message.confirm(
			"Delete user '" + user.fullName + "'?",
			(result: boolean) => {
				if (result) {
					this.userService.delete(user.id)
						.finally(() => {
							this.notify.info("Deleted User: " + user.name);
							this.refresh();
						})
						.subscribe(() => { });
				}
			}
		);
	}

	create(): void {
		this.modalHelper.open(CreateUserComponent).subscribe(res => this.refresh());
	}

	edit(user: UserDto): void {
		this.modalHelper.open(EditUserComponent, { id: user.id }).subscribe(res => this.refresh());
	}
}