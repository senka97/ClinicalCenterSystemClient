import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Router} from '@angular/router';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';

@Component({
  selector: 'app-profile-clinical-center-admin',
  templateUrl: './profile-clinical-center-admin.component.html',
  styleUrls: ['./profile-clinical-center-admin.component.css']
})
export class ProfileClinicalCenterAdminComponent implements OnInit {

  constructor(private _userService:UserService, 
    private _authService:AuthService,
    private _router: Router,
    private _clcadminService: ClinicalCenterAdminService) { }

  private _currentAdmin: ClinicalCenterAdministrator;
  
  editInformation: boolean= true;

  ngOnInit() {
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

  editInformationF(): void {
    if(!this.editInformation) //ako je false onda treba da se sacuvaju podaci
    {
        this._clcadminService.changeInformation(this._currentAdmin).subscribe(data=>{
           console.log("Information changed");
        },
        error=>{
          alert("Change of information failed!");
        })
          
    }
    this.editInformation=!this.editInformation;
    
  }

  clickedLogout(): void {
    this._authService.logout();
  }

  clickRegisterClCAdmin(): void {
    this._router.navigate(['/registerClinicalCenterAdmin']);
  }

}
