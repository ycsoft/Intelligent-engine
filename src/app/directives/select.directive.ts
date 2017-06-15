import { Directive, ElementRef, OnInit } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appSelect]'
})
export class SelectDirective implements OnInit {
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
