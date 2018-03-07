import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem("默认页", "", "anticon anticon-appstore", "/app/default"),
        new MenuItem("管理", "", "anticon anticon-appstore", "", [
            new MenuItem(this.l("HomePage"), "", "anticon anticon-appstore", "/app/pages/home"),
            new MenuItem(this.l("Users"), "Pages.Users", "anticon anticon-appstore", "/app/pages/users"),
            new MenuItem(this.l("Tenants"), "Pages.Users", "anticon anticon-appstore", "/app/pages/tenants"),
            new MenuItem(this.l("Roles"), "Pages.Roles", "anticon anticon-appstore", "/app/pages/roles"),
            new MenuItem(this.l("About"), "", "anticon anticon-appstore", "/app/pages/about")
        ]),
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        // if (menuItem.permissionName) {
        //     return this.permission.isGranted(menuItem.permissionName);
        // }

        return true;
    }
}