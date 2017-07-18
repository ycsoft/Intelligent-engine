import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'app/services/session-storage.service';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

    user = '';
    token = '';
    money = '';

    constructor(private sessionStorage: SessionStorageService) { }

    ngOnInit() {
    }

    goMain() {
        this.user = this.sessionStorage.getItem('user');
        this.token = this.sessionStorage.getItem('token');
        this.money = this.sessionStorage.getItem('money');

        location.href = 'http://localhost:8080/#/home/' + this.user + '/' + this.token + '/' + this.money;
    }

}
