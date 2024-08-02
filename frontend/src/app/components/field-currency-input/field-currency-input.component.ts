import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyOption } from '../../types/ui';

const currencyOptions: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'GBP', symbol: '£', name: 'British Pound Sterling' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
];

@Component({
  selector: 'app-field-currency-input',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './field-currency-input.component.html',
  styleUrl: './field-currency-input.component.scss',
})
export class FieldCurrencyInputComponent {
  @Input() currencies: CurrencyOption[] = currencyOptions;
  @Input() priceControl: FormControl;
  @Input() currencyControl: FormControl;

  ngOnInit() {
    if (!this.currencyControl) {
      throw new Error('currencyControl is required.');
    }

    if (!this.priceControl) {
      throw new Error('priceControl is required.');
    }
  }
}
