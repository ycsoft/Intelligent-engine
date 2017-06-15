import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

export function validateEmail(c: FormControl) {
    const EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;

    return EMAIL_REGEXP.test(c.value) ? null : {
        validateMobile: { valid: false }
    };
}

@Directive({
    selector: '[appEmail][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
    ]
})
export class EmailDirective {

    constructor() { }

}
