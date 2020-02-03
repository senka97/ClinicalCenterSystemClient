import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'
import { Appointment } from 'src/app/hp-patient/appointments-list/Appointment'
import {Sort} from '@angular/material/sort';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { PatientService } from 'src/app/service/patient.service';
@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  @Input("appointments") appointments;
  @Input("_patientId") _patientId : any;

  sortedAppointments : Appointment[];
  @Input("doctor") doctor : any;
  @Input("doctorReq") doctorReq : AvailableDoctorRequest;
  constructor(private _patientService: PatientService) { }

  reserveAppointment(appointment : Appointment){
    this._patientService.makeAppointment(this._patientId,appointment).subscribe(appointment => {

      console.log("Appoinment : " + appointment);
      
    

     
    }); 

  }

  ngOnInit() {

    console.log( " Procita ih" + this.appointments);
    console.log(this.doctor);
    this.sortedAppointments = this.appointments;
    
  }
  sortData(sort: Sort) {
   
    const data = this.appointments.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAppointments = data;
      return;
    }

    this.sortedAppointments = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
      
        case 'date': return compare(a.date, b.date, isAsc);
        case 'time': return compare(a.time, b.time, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}