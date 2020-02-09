import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'
import { AppointmentsListComponent } from './appointments-list.component';
import {By} from '@angular/platform-browser';
import {NotifierModule, NotifierService} from 'angular-notifier';
import { PatientService } from 'src/app/service/patient.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { RatingModule } from 'ng-starrating';
import { Appointment } from './Appointment';
describe('AppointmentsListComponent', () => {
  let component: AppointmentsListComponent;
  let fixture: ComponentFixture<AppointmentsListComponent>;
  let doctor: Doctor;
  let appointment : Appointment;
  let appointments : Appointment[];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [NotifierService,
        PatientService,
      ],
      imports: [
        NotifierModule,
        HttpClientTestingModule,
        RatingModule
      ],
      declarations: [ AppointmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsListComponent);
    component = fixture.componentInstance;
    doctor = new Doctor();
  
    doctor.name = "JaSam";
    doctor.surname = "Car";
    doctor.rating = 5;
    appointment = new Appointment();
    appointment.type = "Pregled glave";
    appointment.date =[2020,2,2];
    appointment.time = [12,0];
    let appointment2 = new Appointment();
    appointment2.type = "Pregled glave";
    appointment2.date =[2020,2,2];
    appointment2.time = [13,0];
    appointments =[appointment,appointment2];
 

    component.appointments = appointments;
    component.doctor = doctor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('AppointmentsListComponent', () => {
    it ('Doctor:', () => {

      const table = fixture.debugElement.queryAll(By.css('tr'));
      const doc = fixture.debugElement.queryAll(By.css('#petar-name'));
   
      expect(doc[0].nativeElement.textContent).toEqual(" JaSam ");

      expect(table.length).toEqual(3);
     
    });


  });
});