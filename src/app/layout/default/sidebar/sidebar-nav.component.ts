import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

import { MenuService } from '@shared/layout/menu.service';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    //菜单是通过MenuService中获取，设置菜单的位置在src/app/app.component.ts中。之所以这么干是因为在其他组件中需要获得菜单信息，因此将菜单数据放到服务中，以便共享给其他组件使用
    menuItems: MenuItem[];

    constructor(
        injector: Injector,
		private menuService: MenuService
    ) {
        super(injector);

        this.menuItems = this.menuService.menus;
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}