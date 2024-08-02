import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDateInputComponent } from './field-date-input.component';

describe('FieldDateInputComponent', () => {
  let component: FieldDateInputComponent;
  let fixture: ComponentFixture<FieldDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldDateInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
