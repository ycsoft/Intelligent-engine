import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export function validateMobile(c: FormControl) {
    const MOBILE_REGEXP = /^1[0-9]{10,10}$/;

    return MOBILE_REGEXP.test(c.value) ? null : {
        validateMobile: { valid: false }
    }
}

@Directive({
    selector: '[appMobile][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateMobile, multi: true }
    ]
})
export class MobileDirective {

    constructor() { }

}
