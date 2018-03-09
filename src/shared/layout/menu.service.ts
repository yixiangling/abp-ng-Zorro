import { Injectable, Inject, Optional, OnDestroy } from '@angular/core';
import { MenuItem } from './menu-item';

@Injectable()
export class MenuService implements OnDestroy {

    private data: MenuItem[] = [];

    constructor(
    ) { 
    }

    set menus(items: MenuItem[]) {
        this.data = items;
    }

    get menus() {
        return this.data;
    }

    /**
     * 清空菜单
     */
    clear() {
        this.data = [];
    }

    /**
     * 根据URL设置菜单 `_open` 属性
     * @param url URL地址
     */
    openedByUrl(url: string) {
        if (!url) return;


    }

    /**
     * 根据url获取菜单列表
     * @param url
     */
    getPathByUrl(url: string): MenuItem[] {
        let result: MenuItem[] = [];
        this.findMenuItem(url, this.data, result)

        result.reverse();

        return result;
    }

    private findMenuItem(url: string, items: MenuItem[], result: MenuItem[]): boolean {
        let item: MenuItem;
        for (var i = 0; i < items.length; i++) {
            item = items[i];
            if(item.items && item.items.length)
            {
                if(this.findMenuItem(url, item.items, result))
                {
                    result.push(item);
                    return true;
                }
            }
            if(item.route == url || (!(item.items && item.items.length) && url.startsWith(item.route)))
            {
                result.push(item);
                return true;
            }
        }
    }

    ngOnDestroy(): void {

    }
}