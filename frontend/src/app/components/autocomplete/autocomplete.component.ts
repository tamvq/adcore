import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Option } from '../../types/ui';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: Option[] = [];

  filteredOptions: Observable<Option[]>;

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => {
      const value = option.value;
      const cleanedString = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return cleanedString.toLowerCase().includes(filterValue);
    });
  }
}
