import { Component, Input } from '@angular/core';
import { getFormFieldErrorMessage } from '../../shared/utils';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss',
})
export class ValidationErrorComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() customClass: string = '';

  get errorMessage(): string {
    return getFormFieldErrorMessage(this.control, this.label);
  }
}
