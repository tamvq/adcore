import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTextInputComponent } from './field-text-input.component';

describe('FieldTextInputComponent', () => {
  let component: FieldTextInputComponent;
  let fixture: ComponentFixture<FieldTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldTextInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
