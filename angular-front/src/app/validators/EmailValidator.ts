import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!control.value) return null;
    return emailRegExp.test(control.value) ? null : { email: true };
}
