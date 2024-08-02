import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TABLE_DATA } from '../shared/constants';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { FieldTextInputComponent } from '../components/field-text-input/field-text-input.component';
import { FieldCurrencyInputComponent } from '../components/field-currency-input/field-currency-input.component';
import { FieldDateInputComponent } from '../components/field-date-input/field-date-input.component';
import { Option } from '../types/ui';

@Component({
  selector: 'app-create-edit-course',
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    FieldTextInputComponent,
    FieldCurrencyInputComponent,
    FieldDateInputComponent,
  ],
  templateUrl: './create-edit-course.component.html',
  styleUrl: './create-edit-course.component.scss',
})
export class CreateEditCourseComponent {
  id?: string;
  isCreateMode: boolean;
  courseForm: FormGroup;
  universityOptions: Option[];
  cityOptions: Option[];
  countryOptions: Option[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      name: '',
      university: '',
      city: '',
      description: '',
      startDate: '',
      endDate: '',
      price: '',
      currency: '',
      country: '',
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isCreateMode = !this.id;

    this._fetchAutocompleteOptions();
  }

  private _fetchAutocompleteOptions = () => {
    this.universityOptions = TABLE_DATA.map((i) => ({
      value: i.university,
      label: i.university,
    }));

    this.countryOptions = TABLE_DATA.map((i) => ({
      value: i.country,
      label: i.country,
    }));

    this.cityOptions = TABLE_DATA.map((i) => ({
      value: i.city,
      label: i.city,
    }));
  };

  getControl(controlName: string): FormControl {
    return this.courseForm.get(controlName) as FormControl;
  }
}
