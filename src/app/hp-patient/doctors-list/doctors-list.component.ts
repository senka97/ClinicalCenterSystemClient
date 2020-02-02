import { Component, OnInit, Input } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'
import { DoctorService } from 'src/app/service/doctor.service';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { Appointment } from '../appointments-list/Appointment';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  @Input("doctors") doctors;
  @Input("doctorReq") doctorReq : AvailableDoctorRequest;

 // private _selectedType: TypeReg;
  private _date: any;
  private _rating: Number;
  private _docName: String;
  private _docSurname: String;
  private doctor : any;

  sortedDoctors : Doctor[];
  appointments : any;
  showTimes : boolean;
  constructor(private _doctorService : DoctorService) { }

  ngOnInit() {
    this.sortedDoctors = this.doctors;
    this.showTimes = false;
   
  }
  showDoctorTimes(doctor: any){

    this.doctor = doctor;
    
  
    
  
  
    this._doctorService.getAvailableTerms(this.doctor.id,this.doctorReq).subscribe(terms => {
      this.appointments = terms;
      console.log("Terms: " + this.appointments);

      this.showTimes = true;
   
  }); 
   

  }
  sortData(sort: Sort) {
   
    const data = this.doctors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDoctors = data;
      return;
    }

    this.sortedDoctors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'rating': return compare(a.rating, b.rating, isAsc);
        case 'numberOfReviews': return compare(a.numberOfReviews, b.numberOfReviews, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}