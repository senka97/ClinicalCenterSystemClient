import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-hp-patient',
  templateUrl: './hp-patient.component.html',
  styleUrls: ['./hp-patient.component.css']
})
export class HpPatientComponent implements OnInit {
  private _signUpUser: any =JSON.parse(localStorage.getItem('currentUser'));
  confirmPassword: String;
  message: String;
  show :  boolean;
  showHome : boolean;
  changePasswordMessage : String;

   constructor(private _route: ActivatedRoute, 
    private _router: Router,
     private _authService: AuthService,private _userService:UserService) {

  
      }

  ngOnInit() {
   
    this.show = true;
    this.resetForm();
    
  }

  resetForm(form?: NgForm) {
    this.confirmPassword = "";
    this.message = "";
  }
  showProfileInfo(){
    this.changePasswordMessage = "Patient profile informations:";
    this.show = false;
    this.showHome = true;
  }
  showPasswordInput(){
    if(this.show == true){
      this.changePasswordMessage = "Patient profile informations:"
      this.show = false;
    }else{
     
      this.changePasswordMessage = "Password change:"
      this.show = true;
    }
  }
  onChangeClicked(){
    console.log(this._signUpUser);
    if(this.show == false){
      this._userService.editInfo(this._signUpUser).subscribe(data => {
      },
      error => {
        alert("Patient info change error.");
      })
    }else{
      this._userService.changePassword(this._signUpUser).subscribe(data => {
      },
      error => {
        alert("Error in password change.");
      })
    }
    

    
  }
  onPasswordChange(){
    if(this._signUpUser.password != this.confirmPassword){
      this.message = "changed";
    }else {
      this.message = ""
    }
    
  }
  onConfirnChange(){
    if(this._signUpUser.password == this.confirmPassword){
      this.message = ""
    }else{
      this.message = "changed";
    }
  }
  onClickedLogout(){
    this._authService.logout();
    
}

 
}
