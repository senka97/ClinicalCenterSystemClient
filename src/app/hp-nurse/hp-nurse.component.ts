import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChanger } from './../shared/model/PasswordChanger';
import { PatientService } from './../service/patient.service';
import { AuthService } from './../service/auth.service';
import { FirstLoginDialogComponent } from '../shared/dialogs/first-login-dialog/first-login-dialog.component';
@Component({
  selector: 'app-hp-nurse',
  templateUrl: './hp-nurse.component.html',
  styleUrls: ['./hp-nurse.component.css']
})
export class HpNurseComponent implements OnInit {

  constructor( private _authService: AuthService, 
    private _patientService:PatientService, 
    private _dialog: MatDialog) { 

  }

  private _currentNurse: any;
  private _currentPatient: any;
  private _passwordChanger: PasswordChanger;

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
  }

  clickedLogout(){
    this._authService.logout();
  }
}
