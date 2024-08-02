import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';

@Component({
  selector: 'app-field-date-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  templateUrl: './field-date-input.component.html',
  styleUrl: './field-date-input.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class FieldDateInputComponent {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() placeholder: string = '';

  ngOnInit() {
    if (!this.control) {
      throw new Error('FormControl is required.');
    }
  }
}
