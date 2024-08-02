import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCurrencyInputComponent } from './field-currency-input.component';

describe('FieldCurrencyInputComponent', () => {
  let component: FieldCurrencyInputComponent;
  let fixture: ComponentFixture<FieldCurrencyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldCurrencyInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldCurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
