import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  private ENTER = 13;

  @Input() keywords = '';

  @Output() onChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.onChange.emit(this.keywords);
  }

  keypress($event) {
    if ($event.keyCode === this.ENTER) {
      this.onChange.emit(this.keywords);
    }
  }

}
