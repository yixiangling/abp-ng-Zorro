import { Component, ViewContainerRef, Injector, OnInit, AfterViewInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';

import { MenuService } from '@shared/layout/menu.service';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
	templateUrl: './app.component.html'
})
export class AppComponent extends AppComponentBase implements OnInit, AfterViewInit {

	isFetching: boolean = false;
	private viewContainerRef: ViewContainerRef;

	constructor(
		injector: Injector,
		private menuService: MenuService
	) {
		super(injector);

		//设置应用下所有的菜单数据
		this.menuService.menus = [
			new MenuItem("app默认", "", "anticon anticon-appstore", "/app/default"),
			new MenuItem("管理", "", "anticon anticon-appstore", "", [
				new MenuItem(this.l("HomePage"), "", "anticon anticon-appstore", "/app/pages/home"),
				new MenuItem(this.l("Users"), "Pages.Users", "anticon anticon-appstore", "/app/pages/users"),
				new MenuItem(this.l("Tenants"), "Pages.Users", "anticon anticon-appstore", "/app/pages/tenants"),
				new MenuItem(this.l("Roles"), "Pages.Roles", "anticon anticon-appstore", "/app/pages/roles"),
				new MenuItem(this.l("About"), "", "anticon anticon-appstore", "/app/pages/about")
			]),
			new MenuItem("ng-alain 示例", "", "anticon anticon-appstore", "", [
				new MenuItem(this.l("HomePage"), "", "anticon anticon-appstore", "/app/pages/home"),
				new MenuItem(this.l("Users"), "Pages.Users", "anticon anticon-appstore", "/app/pages/users"),
				new MenuItem(this.l("Tenants"), "Pages.Users", "anticon anticon-appstore", "/app/pages/tenants"),
				new MenuItem(this.l("Roles"), "Pages.Roles", "anticon anticon-appstore", "/app/pages/roles"),
				new MenuItem(this.l("About"), "", "anticon anticon-appstore", "/app/pages/about")
			]),
		];
		console.log('set menu to services');
		console.log(this.menuService.menus);
	}

	ngOnInit(): void {

		abp.event.on('abp.notifications.received', userNotification => {
			abp.notifications.showUiNotifyForUserNotification(userNotification);

			//Desktop notification
			Push.create("AbpZeroTemplate", {
				body: userNotification.notification.data.message,
				icon: abp.appPath + 'assets/app-logo-small.png',
				timeout: 6000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
		});
	}

	ngAfterViewInit(): void {

	}
}