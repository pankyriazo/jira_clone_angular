import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'board',
        loadChildren: () => import('src/pages/board/board.module').then(m => m.BoardModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('src/pages/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
