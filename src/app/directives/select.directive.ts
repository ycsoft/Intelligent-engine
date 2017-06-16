import { Directive, ElementRef, OnInit, Input } from '@angular/core';
declare var $: any;

@Directive({
    selector: '[appSelect]'
})
export class SelectDirective implements OnInit {

    _options;
    @Input()
    set options(options){
        this._options = options;
        setTimeout(function() {
            $(this.el.nativeElement).selectpicker('refresh');
            $(this.el.nativeElement).selectpicker('render');
        }, 2000);
    }

    get options(){
        return this._options;
    }
    ngOnInit(): void {
        $(this.el.nativeElement).selectpicker();
        $(this.el.nativeElement.parentNode).click(() => {
            if ($(this.el.nativeElement.parentNode).hasClass('open')) {
                $(this.el.nativeElement.parentNode).removeClass('open');
            } else {
                $(this.el.nativeElement.parentNode).addClass('open');
            }
        });
    }

    constructor(private el: ElementRef) { }

}
