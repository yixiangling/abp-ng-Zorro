import { Component, Input, ElementRef, TemplateRef, ContentChild, OnInit, AfterViewInit, Inject, Renderer2, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { PermissionCheckerService } from '@abp/auth/permission-checker.service';

import { MenuService } from '@shared/layout/menu.service';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    selector: 'pro-header',
    templateUrl: './pro-header.component.html',
    styleUrls: ['./pro-header.less']
})
export class ProHeaderComponent implements OnInit {

    // region fields

    @Input() title: string;

    /**
     * 自动生成导航，以当前路由从主菜单中定位
     */
    @Input()
    get autoBreadcrumb() { return this._autoBreadcrumb; }
    set autoBreadcrumb(value: any) {
        this._autoBreadcrumb = coerceBooleanProperty(value);
    }
    private _autoBreadcrumb = true;

    paths: any[] = [];

    @ContentChild('breadcrumb') breadcrumb: TemplateRef<any>;

    @ContentChild('logo') logo: TemplateRef<any>;

    @ContentChild('action') action: TemplateRef<any>;

    @ContentChild('content') content: TemplateRef<any>;

    @ContentChild('extra') extra: TemplateRef<any>;

    @ContentChild('tab') tab: TemplateRef<any>;

    // endregion

    constructor(
        private route: Router,
        private menuSrv: MenuService,
        private permission: PermissionCheckerService,
        
        private el: ElementRef, 
        private renderer: Renderer2) { }

    private genBreadcrumb() {
        if (this.breadcrumb || !this.autoBreadcrumb || !this.menuSrv) return;
        let menus = this.menuSrv.getPathByUrl(this.route.url);
        if (menus.length <= 0) return;
        let paths: any[] = [];
        menus.forEach(item => {
            paths.push({ title: item.name, link: (item.route != this.route.url && this.isGranted(item)) ? item.route : '' });
        });

        this.paths = paths;
    }

    isGranted(menuItem: MenuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }

    ngOnInit() {
        (this.el.nativeElement as HTMLElement).classList.add('content__title', 'pro-header');
        this.genBreadcrumb();
    }
}
