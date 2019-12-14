import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClinicComponent } from './register-clinic.component';

describe('RegisterClinicComponent', () => {
  let component: RegisterClinicComponent;
  let fixture: ComponentFixture<RegisterClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
