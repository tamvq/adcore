import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Option } from '../types/ui';

import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('en-US');

export const getFormFieldErrorMessage = (
  control: FormControl,
  fieldLabel: string
): string => {
  if (control.hasError('required')) {
    return `${fieldLabel} is required.`;
  } else if (control.hasError('minlength')) {
    const requiredLength = control.getError('minlength').requiredLength;
    return `${fieldLabel} must be at least ${requiredLength} characters long.`;
  } else if (control.hasError('invalidAutocompleteString')) {
    return `${fieldLabel} must ve a valid option`;
  } else if (control.hasError('min')) {
    return `${fieldLabel} must be greater than ${control.errors?.['min'].min}`;
  }

  // Add more error checks as needed
  return '';
};

export const autocompleteStringValidator = (
  validOptions: Option[]
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.some((v) => v.value === control.value)) {
      return null; /* valid option selected */
    }
    return { invalidAutocompleteString: { value: control.value } };
  };
};

export const dateRangeValidator = (group: FormGroup) => {
  if (!group) return null;
  //@ts-ignore
  const startDate = group.get('startDate').value;
  //@ts-ignore
  const endDate = group.get('endDate').value;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { invalidDateRange: true };
  }

  return null;
};

export function formatDate(
  date: Date | string,
  format = 'yyyy-MM-dd'
): string | null {
  if (!date) return null;
  return datePipe.transform(date, format);
}
