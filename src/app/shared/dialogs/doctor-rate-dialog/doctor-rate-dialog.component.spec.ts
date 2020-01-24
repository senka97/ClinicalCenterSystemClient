import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRateDialogComponent } from './doctor-rate-dialog.component';

describe('DoctorRateDialogComponent', () => {
  let component: DoctorRateDialogComponent;
  let fixture: ComponentFixture<DoctorRateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
