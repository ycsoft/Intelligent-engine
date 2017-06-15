
import { AlertType } from 'app/beans/alert-type.enum';

export interface Alert {
    type: AlertType;
    msg: string;
}
