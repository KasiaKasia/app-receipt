import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validatorCharacterIsNumber]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatorCharacterIsNumberDirective,
    multi: true
  }]
})
export class ValidatorCharacterIsNumberDirective implements Validator {

  constructor() {}
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (control.value === null || control.value === '') {
      return null;
    }
    const inputValue = control.value;
    const deleteSpace = inputValue.replaceAll(' ', '');
    var regularExpressionPattern = new RegExp(/^[0-9,\.]+$/);

    if (regularExpressionPattern.test(deleteSpace)) {
      return null;
    } else {
      return {
        'characterIsNumber': true
      } as ValidationErrors;
    }
  }
}
