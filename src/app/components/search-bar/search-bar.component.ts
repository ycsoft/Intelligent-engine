import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SessionStorageService } from 'app/services/session-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    private ENTER = 13;

    @Input() keywords = '';

    @Output() onChange = new EventEmitter<string>();

    constructor(private sessionStorageService: SessionStorageService,
        private router: Router) { }

    ngOnInit() {
    }

    submit() {
        this.search();
    }

    keypress($event) {
        if ($event.keyCode === this.ENTER) {
            this.search();
        }
    }

    search() {
        // this.sessionStorageService.setItem('keywords', this.keywords);
        // this.onChange.emit(this.keywords);
        // this.sessionStorageService.clear();
        const user = this.sessionStorageService.getItem('user');
        const token = this.sessionStorageService.getItem('token');
        const money = this.sessionStorageService.getItem('money');

        console.log(token)
        const url = '/result/' + this.keywords + '/' + user + '/' + token + '/' + money;
        this.router.navigateByUrl(url)
        // this.router.navigate(['/result', this.keywords]);
    }
}
