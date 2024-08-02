import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { FieldTextInputComponent } from '../components/field-text-input/field-text-input.component';
import { FieldCurrencyInputComponent } from '../components/field-currency-input/field-currency-input.component';
import { FieldDateInputComponent } from '../components/field-date-input/field-date-input.component';
import { Option } from '../types/ui';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from '../services/course.service';
import { TABLE_DATA } from '../shared/constants';
import {
  autocompleteStringValidator,
  dateRangeValidator,
  formatDate,
  uniqueOptions,
} from '../shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    HttpClientModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-edit-course.component.html',
  styleUrl: './create-edit-course.component.scss',
})
export class CreateEditCourseComponent {
  id?: string;
  isCreateMode: boolean;
  courseForm: FormGroup;
  universityOptions: Option[] = [];
  cityOptions: Option[] = [];
  countryOptions: Option[] = [];
  isLoading: boolean = false;
  getCourseByIdInProgress: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.courseForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        university: ['', Validators.required],
        city: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        currency: ['USD', Validators.required],
        country: ['', Validators.required],
      },
      {
        validators: dateRangeValidator,
      }
    );
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isCreateMode = !this.id;
    this._fetchCourseById(this.id);
    this._fetchAutocompleteOptions();
  }

  private _fetchCourseById = (id?: string) => {
    if (id) {
      this.getCourseByIdInProgress = true;
      this.courseService.getCourseById(id).subscribe((course) => {
        this.getCourseByIdInProgress = false;
        this.courseForm.patchValue(course);
        this.courseForm.get('name')?.disable();
        this.courseForm.get('university')?.disable();
        this.courseForm.get('country')?.disable();
        this.courseForm.get('city')?.disable();
      });
    }
  };

  private _fetchAutocompleteOptions = () => {
    this.universityOptions = uniqueOptions(
      TABLE_DATA.map((i) => ({
        value: i.university,
        label: i.university,
      }))
    );

    this.countryOptions = uniqueOptions(
      TABLE_DATA.map((i) => ({
        value: i.country,
        label: i.country,
      }))
    );

    this.cityOptions = uniqueOptions(
      TABLE_DATA.map((i) => ({
        value: i.city,
        label: i.city,
      }))
    );
    this._setValidatorsToAutocomplete();
  };

  private _setValidatorsToAutocomplete = () => {
    this.courseForm
      .get('university')
      ?.setValidators([
        Validators.required,
        autocompleteStringValidator(this.universityOptions),
      ]);
    this.courseForm
      .get('country')
      ?.setValidators([
        Validators.required,
        autocompleteStringValidator(this.countryOptions),
      ]);
    this.courseForm
      .get('city')
      ?.setValidators([
        Validators.required,
        autocompleteStringValidator(this.cityOptions),
      ]);
  };

  getControl(controlName: string): FormControl {
    return this.courseForm.get(controlName) as FormControl;
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.courseForm.markAllAsTouched();
    if (this.courseForm.valid) {
      this.isLoading = true;
      if (this.isCreateMode) {
        this.courseService
          .createCourse({
            ...this.courseForm.value,
            startDate: formatDate(this.courseForm.value.startDate),
            endDate: formatDate(this.courseForm.value.endDate),
          })
          .subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/']);
          });
      } else {
        this.courseService
          .updateCourse(this.id!, {
            ...this.courseForm.value,
            startDate: formatDate(this.courseForm.value.startDate),
            endDate: formatDate(this.courseForm.value.endDate),
          })
          .subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/']);
          });
      }
    }
  }
}
