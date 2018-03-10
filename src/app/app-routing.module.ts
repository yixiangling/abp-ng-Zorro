import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

import { DefaultPageComponent } from '@app/default/default-page.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'default', component: DefaultPageComponent, canActivate: [AppRouteGuard] },
                    {
                        path: 'pages',
                        loadChildren: './pages/pages.module#PagesModule'
                    },
                    {
                        path: 'routes',
                        loadChildren: './routes/routes.module#RoutesModule'
                    },
                    { path: '**', redirectTo: 'pages' }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }