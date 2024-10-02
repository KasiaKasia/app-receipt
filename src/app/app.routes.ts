import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'receipt',
        loadChildren: () => import('./modules/receipt/receipt.module').then(m => m.ReceiptModule)
    },
    {
        path: 'analysis',
        loadChildren: () => import('./modules/analysis/analysis.module').then(a => a.AnalysisModule),
        data: { preload: true }

    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '404'
    }
];
