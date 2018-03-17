import { Component, ViewContainerRef, Injector, OnInit, AfterViewInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/component-base';

import { MenuService } from '@shared/layout/menu.service';
import { MenuItem } from '@shared/layout/menu-item';

import { Abp } from '@abp';

@Component({
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
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
				// new MenuItem(this.l("HomePage"), "", "anticon anticon-appstore", "/app/pages/home"),
				new MenuItem(this.l("Users"), "Pages.Users", "anticon anticon-appstore", "/app/pages/users"),
				// new MenuItem(this.l("Tenants"), "Pages.Users", "anticon anticon-appstore", "/app/pages/tenants"),
				new MenuItem(this.l("Roles"), "Pages.Roles", "anticon anticon-appstore", "/app/pages/roles"),
				// new MenuItem(this.l("About"), "", "anticon anticon-appstore", "/app/pages/about")
			]),
			new MenuItem("ng-alain 示例", "", "anticon anticon-appstore", "", [
				new MenuItem(this.l("仪表盘"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("仪表盘V1"), "", "anticon anticon-appstore", "/app/routes/dashboard/v1"),
					new MenuItem(this.l("分析页"), "", "anticon anticon-appstore", "/app/routes/dashboard/analysis"),
					new MenuItem(this.l("Monitor"), "", "anticon anticon-appstore", "/app/routes/dashboard/monitor"),
					new MenuItem(this.l("Workplace"), "", "anticon anticon-appstore", "/app/routes/dashboard/workplace")
				]),
				new MenuItem(this.l("小部件"), "", "anticon anticon-appstore", "/app/routes/widgets"),
				new MenuItem(this.l("基础元素"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("按钮"), "", "anticon anticon-appstore", "/app/routes/elements/buttons"),
					new MenuItem(this.l("Notification"), "", "anticon anticon-appstore", "/app/routes/elements/notification"),
					new MenuItem(this.l("Modal"), "", "anticon anticon-appstore", "/app/routes/elements/modal"),
					new MenuItem(this.l("Tree Antd"), "", "anticon anticon-appstore", "/app/routes/elements/tree-antd"),
					new MenuItem(this.l("Sortable"), "", "anticon anticon-appstore", "/app/routes/elements/sortable"),
					new MenuItem(this.l("Spin"), "", "anticon anticon-appstore", "/app/routes/elements/spin"),
					new MenuItem(this.l("Dropdown"), "", "anticon anticon-appstore", "/app/routes/elements/dropdown"),
					new MenuItem(this.l("Grid"), "", "anticon anticon-appstore", "/app/routes/elements/grid"),
					new MenuItem(this.l("Grid Masonry"), "", "anticon anticon-appstore", "/app/routes/elements/gridmasonry"),
					new MenuItem(this.l("Typography"), "", "anticon anticon-appstore", "/app/routes/elements/typography"),
					new MenuItem(this.l("Font Icons"), "", "anticon anticon-appstore", "/app/routes/elements/iconsfont"),
					new MenuItem(this.l("Colors"), "", "anticon anticon-appstore", "/app/routes/elements/colors")
				]),
				new MenuItem(this.l("表单"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("标准"), "", "anticon anticon-appstore", "/app/routes/forms/standard"),
					new MenuItem(this.l("扩展"), "", "anticon anticon-appstore", "/app/routes/forms/extended"),
					new MenuItem(this.l("校验"), "", "anticon anticon-appstore", "/app/routes/forms/validation"),
					new MenuItem(this.l("上传"), "", "anticon anticon-appstore", "/app/routes/forms/upload"),
					new MenuItem(this.l("图片裁剪"), "", "anticon anticon-appstore", "/app/routes/forms/cropper"),
					new MenuItem(this.l("Dynamic Form"), "", "anticon anticon-appstore", "/app/routes/forms/json-schema")
				]),
				new MenuItem(this.l("编辑器"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("UEditor"), "", "anticon anticon-appstore", "/app/routes/editor/ueditor")
				]),
				new MenuItem(this.l("Charts"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("G2"), "", "anticon anticon-appstore", "/app/routes/charts/g2")
				]),
				new MenuItem(this.l("表格"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("标准"), "", "anticon anticon-appstore", "/app/routes/tables/standard"),
					new MenuItem(this.l("Full"), "", "anticon anticon-appstore", "/app/routes/tables/full")
				]),
				new MenuItem(this.l("地图"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("QQ"), "", "anticon anticon-appstore", "/app/routes/maps/qq")
				]),
				new MenuItem(this.l("Form Page"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("Step Form"), "", "anticon anticon-appstore", "/app/routes/pro/form/step-form"),
					new MenuItem(this.l("Advanced Form"), "", "anticon anticon-appstore", "/app/routes/pro/form/advanced-form")
				]),
				new MenuItem(this.l("列表页"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("查询列表"), "", "anticon anticon-appstore", "/app/routes/pro/list/table-list"),
					new MenuItem(this.l("标准列表"), "", "anticon anticon-appstore", "/app/routes/pro/list/basic-list"),
					new MenuItem(this.l("卡片列表"), "", "anticon anticon-appstore", "/app/routes/pro/list/card-list"),
					new MenuItem(this.l("搜索列表（项目）"), "", "anticon anticon-appstore", "/app/routes/pro/list/cover-card-list"),
					new MenuItem(this.l("搜索列表（应用）"), "", "anticon anticon-appstore", "/app/routes/pro/list/filter-card-list"),
					new MenuItem(this.l("搜索列表（文章）"), "", "anticon anticon-appstore", "/app/routes/pro/list/search")
				]),
				new MenuItem(this.l("详情页"), "", "anticon anticon-appstore", "", [
					// new MenuItem(this.l("标准详情页"), "", "anticon anticon-appstore", "/app/routes/pro/profile/basic"),
					new MenuItem(this.l("高级详情页"), "", "anticon anticon-appstore", "/app/routes/pro/profile/advanced")
				]),
				new MenuItem(this.l("结果"), "", "anticon anticon-appstore", "", [
					new MenuItem(this.l("成功"), "", "anticon anticon-appstore", "/app/routes/pro/result/success"),
					new MenuItem(this.l("失败"), "", "anticon anticon-appstore", "/app/routes/pro/result/fail")
				]),
			]),
		];
	}

	ngOnInit(): void {

		//--此处桌面通知功能应改成service

		// Abp.event.on('abp.notifications.received', userNotification => {
		// 	Abp.notifications.showUiNotifyForUserNotification(userNotification);

		// 	//Desktop notification
		// 	Push.create("AbpZeroTemplate", {
		// 		body: userNotification.notification.data.message,
		// 		icon: abp.appPath + 'assets/app-logo-small.png',
		// 		timeout: 6000,
		// 		onClick: function () {
		// 			window.focus();
		// 			this.close();
		// 		}
		// 	});
		// });
	}

	ngAfterViewInit(): void {

	}
}