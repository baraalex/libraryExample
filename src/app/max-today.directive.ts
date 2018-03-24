import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

export function MaxTodayValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const dateForm = new Date(control.value);
    const today = new Date();

    today.setHours(0);
    today.setSeconds(0);
    today.setMinutes(0);

    const afterToday = today < dateForm;
    return afterToday ? { dateError: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appMaxToday]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxTodayDirective, multi: true }]
})
export class MaxTodayDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return MaxTodayValidator()(control);
  }
}
