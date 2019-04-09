import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomepageComponent} from "./components/homepage/homepage.component";

export const routes: Routes = [
    {
        path: '', component: HomepageComponent,
        data: { animation: ''},
    },
    {
    path: 'directory',
    loadChildren: './modules/directory/directory.module#DirectoryModule',
    },
    {
    path: 'portfolio/:portfolio-name/:portfolio-lob',
    loadChildren: './modules/metrics/modules/dashboard/dashboard.module#DashboardModule',
    },
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true, enableTracing: false});
