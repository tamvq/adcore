import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-field-text-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './field-text-input.component.html',
  styleUrl: './field-text-input.component.scss',
})
export class FieldTextInputComponent {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() type?: 'text' | 'textarea' = 'text';
  @Input() rows?: number = 3;
}
