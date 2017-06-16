import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    @ViewChild('select') select: ElementRef;
    constructor() { }

    ngOnInit() {
        $(this.select.nativeElement).selectpicker();
    }

    refresh(){
        $(this.select.nativeElement).selectpicker('refresh');
    }

}