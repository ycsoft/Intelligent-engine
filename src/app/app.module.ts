import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {AlertModule} from 'ngx-bootstrap';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

import {AppComponent} from './app.component';
import {SearchComponent} from '../pages/search/search.component';
import {ResultComponent} from '../pages/result/result.component';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        ResultComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AlertModule.forRoot(),
        TypeaheadModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
