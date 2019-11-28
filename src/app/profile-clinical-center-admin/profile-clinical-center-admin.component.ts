import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-profile-clinical-center-admin',
  templateUrl: './profile-clinical-center-admin.component.html',
  styleUrls: ['./profile-clinical-center-admin.component.css']
})
export class ProfileClinicalCenterAdminComponent implements OnInit {

  constructor(private _userService:UserService, private _authService:AuthService,private _router: Router) { }

  private _currentAdmin: any;

  editInformation: boolean= true;

  ngOnInit() {
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

  editInformationF(): void {
    this.editInformation=!this.editInformation;
  }

  clickedLogout(): void {
    this._authService.logout();
  }

  clickRegisterClCAdmin(): void {
    this._router.navigate(['/registerClinicalCenterAdmin']);
  }

}
