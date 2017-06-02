import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../pages/search/search.component';
import { ResultComponent } from '../pages/result/result.component';

const routes: Routes = [
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'result',
        component: ResultComponent
    },
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
