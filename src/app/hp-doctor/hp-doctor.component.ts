import { PatientService } from './../service/patient.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hp-doctor',
  templateUrl: './hp-doctor.component.html',
  styleUrls: ['./hp-doctor.component.css']
})
export class HpDoctorComponent implements OnInit {

  constructor(private _authService: AuthService, private _patientService:PatientService) {

   }

   private _currentDoctor: any;
   private _currentPatient: any;

  ngOnInit() {
    
    this._currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

  clickedLogout(){
       this._authService.logout();
  }


}
