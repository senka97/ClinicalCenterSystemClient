import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChanger } from './../shared/model/PasswordChanger';
import { PatientService } from './../service/patient.service';
import { AuthService } from './../service/auth.service';
import { FirstLoginDialogComponent } from '../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hp-nurse',
  templateUrl: './hp-nurse.component.html',
  styleUrls: ['./hp-nurse.component.css']
})
export class HpNurseComponent implements OnInit {

  constructor( private _authService: AuthService, 
    private _patientService:PatientService, 
    private _router: Router,
    private _dialog: MatDialog) { 

  }

  private _currentNurse: any;
  private _currentPatient: any;
  private _patients: any;
  private _passwordChanger: PasswordChanger;

  private _showList: boolean;
  private _showPatient: boolean;

  ngOnInit() {
    this._currentNurse = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this._passwordChanger = new PasswordChanger("","");
    if(this._currentNurse.passwordChanged == false){
      let ref1 = this._dialog.open(FirstLoginDialogComponent,{
          disableClose: true,
          width: '50%',
          data: this._passwordChanger
      });
    }
    this._patientService.getAllPatients().subscribe(patients => {
      this._patients = patients;     
     });
    this._showList = false;
    this._showPatient = false;
  }

  showAllPatients(){
      this._showList = !this._showList;
      this._showPatient = false;      
  }

  showDetails(id){
    this._patientService.getPatient(id).subscribe(patient => {
      this._currentPatient = patient;
      this._showList = false;
      this._showPatient = true;
    })
  }

  goBack(){ //vraca na listu pacijenata
    this._showPatient = false;
    this._showList = true;
  }

  clickedLogout(){
    this._authService.logout();
  }

  clickedProfile(){
    this._router.navigate(['/medicalStaffProfile']);
  }

  clickedWorkCalendar(){
    this._router.navigate(['/workCalendar']);
  }

  clickedBack(){
    this._showPatient = false;
    this._showList = false;
  }
}
