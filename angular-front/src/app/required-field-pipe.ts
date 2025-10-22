import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
    name: 'requiredField',
    pure: false,
})
export class RequiredFieldPipe implements PipeTransform {
    transform(formGroup: FormGroup, controlName: string): boolean {
        const control = formGroup.get(controlName);

        if (!control) return false;

        if (control instanceof FormArray) {
            return control.value.length === 0 && (control.touched || control.dirty);
        }

        return control
            ? control.invalid &&
                  (control.dirty || control.touched) &&
                  (control.errors?.['required'] || control.errors?.['conditionalRequired'])
            : false;
    }
}
