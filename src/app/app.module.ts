import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AngularEchartsModule } from 'ngx-echarts';

import { ResourceModule } from 'ngx-resource';

import { SelectModule } from './components/select2/ng2-select';

import { AppComponent } from './app.component';
import { ResultComponent } from './pages/result/result.component';
import { OrderComponent } from './pages/order/order.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { CheckComponent } from './components/check/check.component';
import { AutoContentHeightDirective } from './directives/auto-content-height.directive';
import { RadioComponent } from './components/radio/radio.component';
import { AlertService } from 'app/services/alert.service';
import { CAlertComponent } from 'app/components/alert/alert.component';
import { RmbPipe } from 'app/pipes/rmb.pipe';
import { SessionStorageService } from 'app/services/session-storage.service';
import { ChartDataService } from 'app/services/chart-data.service';
import { DataService } from 'app/services/data.service';
import { EmailDirective } from './validators/email.directive';
import { MobileDirective } from './validators/mobile.directive';
import { SmallTypeColorService } from 'app/services/small-type-color.service';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
    declarations: [
        AppComponent,
        ResultComponent,
        OrderComponent,
        LogoComponent,
        SearchBarComponent,
        CheckComponent,
        CheckComponent,
        AutoContentHeightDirective,
        RadioComponent,
        CAlertComponent,
        RmbPipe,
        EmailDirective,
        MobileDirective,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AngularEchartsModule,
        BrowserAnimationsModule,
        ResourceModule.forRoot(),
        SelectModule
    ],
    providers: [
        AlertService,
        SessionStorageService,
        ChartDataService,
        DataService,
        SmallTypeColorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
