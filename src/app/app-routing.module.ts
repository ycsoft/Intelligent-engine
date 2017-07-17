import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultComponent } from './pages/result/result.component';
import { OrderComponent } from 'app/pages/order/order.component';

const routes: Routes = [
    {
        path: 'result/:keywords/:user/:token/:money',
        component: ResultComponent
    },
    {
        path: 'order/:keywords',
        component: OrderComponent
    },
    {
        path: '',
        redirectTo: 'result',
        pathMatch: 'full'
    },
    { path: '**', component: ResultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
