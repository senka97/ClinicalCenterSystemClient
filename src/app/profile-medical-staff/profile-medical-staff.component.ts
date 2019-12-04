import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-medical-staff',
  templateUrl: './profile-medical-staff.component.html',
  styleUrls: ['./profile-medical-staff.component.css']
})
export class ProfileMedicalStaffComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  private _currentUser: any;
  private _changedUser: any;
  private _role: String;
  private _showInfo: boolean;
  private _showEditInfo: boolean;
  private _showChangePassword: boolean;

  ngOnInit() {

    this._currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this._changedUser = JSON.parse(JSON.stringify(this._currentUser)); //kopiranje objekta, da nemaju iste reference
    let tempRole = this._currentUser.authorities[0]['authority'];;
    if(tempRole == "ROLE_DOCTOR"){
      this._role = "doctor";
    }else{
      this._role = "nurse";
    }
    this._showInfo = true;
    this._showEditInfo = false;
    this._showChangePassword = false;
  }

  clickedLogout(){
      this._authService.logout();
  }

  backToHomepage(){
      this._showInfo = true;
      this._showEditInfo = false;
      this._showChangePassword = false;
      
      if(this._role == "doctor"){
           this._router.navigate(['/doctorHP']);
      }else{
           alert("Homepage for nurse doesn't exist.");
      }
  }
  
  clickedEdit(){
    this._changedUser = JSON.parse(JSON.stringify(this._currentUser)); //da bi se napravila kopija
    this._showEditInfo = true;
    this._showInfo = false;
  }

  clickedChangePassword(){
    this._showInfo = false;
    this._showChangePassword = true;
  }
  
  cancelEditInfo(){
    this._showInfo = true;
    this._showEditInfo = false;
  }

  saveChanges(){

  }

}
