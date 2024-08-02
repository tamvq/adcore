import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyOption } from '../../types/ui';
import { ValidationErrorComponent } from '../validation-error/validation-error.component';
import { CURRENCY_OPTIONS } from '../../shared/constants';

@Component({
  selector: 'app-field-currency-input',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    ValidationErrorComponent,
  ],
  templateUrl: './field-currency-input.component.html',
  styleUrl: './field-currency-input.component.scss',
})
export class FieldCurrencyInputComponent {
  @Input() currencies: CurrencyOption[] = CURRENCY_OPTIONS;
  @Input() priceControl: FormControl;
  @Input() currencyControl: FormControl;
  @Input() label: string;

  ngOnInit() {
    if (!this.currencyControl) {
      throw new Error('currencyControl is required.');
    }

    if (!this.priceControl) {
      throw new Error('priceControl is required.');
    }
  }
}
