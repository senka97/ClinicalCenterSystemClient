import { PasswordChanger } from './../shared/model/PasswordChanger';
import { UserEdit } from './../shared/model/UserEdit';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-medical-staff',
  templateUrl: './profile-medical-staff.component.html',
  styleUrls: ['./profile-medical-staff.component.css']
})
export class ProfileMedicalStaffComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router, private _userService:UserService) { }

  private _currentUser: any;
  private _changedUser: any;
  private _role: String;
  private _showInfo: boolean;
  private _showEditInfo: boolean;
  private _showChangePassword: boolean;
  private _passwordChanger: PasswordChanger;
  private _confirmPassword: String;
  private _showError: boolean;
  

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
    this._showChangePassword = false;
    this._passwordChanger = new PasswordChanger("","");
  }

  clickedLogout(){
      this._authService.logout();
  }

  backToHomepage(){
      this._showInfo = true;
      this._showEditInfo = false;
      this._showChangePassword = false;
      this._showChangePassword = false;
      
      if(this._role == "doctor"){
           this._router.navigate(['/doctorHP']);
      }else{
           alert("Homepage for nurse doesn't exist.");
      }
  }
  
  clickedEdit(){
    this._changedUser = JSON.parse(JSON.stringify(this._currentUser)); //ako se nesto promeni ali se ne sacuva
    this._showEditInfo = true;
    this._showInfo = false;
  }
  
  cancelEditInfo(){
    this._showInfo = true;
    this._showEditInfo = false;
  }

  saveChanges(){
    //samo u slucaju kada se nesto promenilo se salje put zahtev za izmenom
    if(this._currentUser.name != this._changedUser.name || this._currentUser.surname != this._changedUser.surname
      || this._currentUser.address != this._changedUser.address || this._currentUser.city != this._changedUser.city 
      || this._currentUser.country != this._changedUser.country || this._currentUser.phoneNumber != this._changedUser.phoneNumber){
        let userEdit = new UserEdit(this._changedUser.name, this._changedUser.surname,this._changedUser.address,
          this._changedUser.city, this._changedUser.country, this._changedUser.phoneNumber);
          console.log(userEdit);
           this._userService.editInfo(userEdit).subscribe(res => {
                     localStorage.setItem('currentUser',JSON.stringify(this._changedUser)); //postavim da je taj izmenjeni sada trenutno ulogovan
                     this._currentUser = JSON.parse(JSON.stringify(this._changedUser));
                     this._showEditInfo = false;
                     this._showInfo = true;
           });
      }else{
        this._showEditInfo = false;
        this._showInfo = true;
      }

  }

  clickedChangePassword(){
    this._showInfo = false;
    this._showChangePassword = true;
    this._passwordChanger = new PasswordChanger("","");
  }

  cancelChangePassword(){
    this._showInfo = true;
    this._showChangePassword = false;
  }

  changePassword(){
       this._authService.changePassoword(this._passwordChanger).subscribe(
         res => {
           console.log("Password successfully changed");
           this._showChangePassword = false;
           this._showInfo = true;
         },
         error => {
          this._showError = true;
          setTimeout(() => {
            this._showError = false;
          }, 5000)
         }
       )
  }

  

 
}
