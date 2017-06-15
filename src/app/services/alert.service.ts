import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from 'app/beans/alert';

@Injectable()
export class AlertService {

  public event = new EventEmitter<Alert>();

  constructor() { }

  public alert(alert: Alert) {
    this.event.emit(alert);
  }

}
