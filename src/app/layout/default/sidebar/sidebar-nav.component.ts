import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';

import { MenuService } from '@shared/layout/menu.service';
import { MenuItem } from '@shared/layout/menu-item';

import { Abp } from '@abp';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav'
})
export class SideBarNavComponent extends AppComponentBase implements OnInit {

    //菜单是通过MenuService中获取，设置菜单的位置在src/app/app.component.ts中。之所以这么干是因为在其他组件中需要获得菜单信息，因此将菜单数据放到服务中，以便共享给其他组件使用
    menuItems: MenuItem[];
    isCollapsed:boolean = false;
    themeValue: string = 'light';

    constructor(
        injector: Injector,
		private menuService: MenuService
    ) {
        super(injector);

        this.menuItems = this.menuService.menus;
    }

    ngOnInit(){
        // event.on
        Abp.event.on('abp.theme-setting.collapsed', collapsed => {
			this.isCollapsed = collapsed;
        });
        Abp.event.on('abp.theme-setting.changed', themeName => {
            switch(themeName)
            {
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                    this.themeValue = 'light';
                    break;
                default:
                    this.themeValue = 'dark';
                    break;
            }
        });
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}