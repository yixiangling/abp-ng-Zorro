import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRouteGuard } from '@shared/auth/auth-route-guard';

import { LayoutComponent } from '../layout/default/layout.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { TenantsComponent } from './tenants/tenants.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            //{ path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'home', component: HomeComponent, data: { translate: 'home' } ,  canActivate: [AppRouteGuard] },
            { path: 'users', component: UsersComponent, data: { translate: 'users', permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
            { path: 'roles', component: RolesComponent, data: { translate: 'roles', permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
            { path: 'tenants', component: TenantsComponent, data: { translate: 'tenants', permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
            { path: 'about', component: AboutComponent, data: { translate: 'about' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PagesRoutingModule { }