import { Component, OnInit, Input} from '@angular/core';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {PasswordChanger } from '../shared/model/PasswordChanger'

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {
  @Input("_signUpUser") _signUpUser : any;
  @Input("showHome") showHome : boolean;
  @Input("show") show : boolean;
  _passwordChanger : PasswordChanger;
  confirmPassword: String;
  oldPassword: String;

  message: String;
  changePasswordMessage : String;
 
  constructor(private _route: ActivatedRoute, 
    private _router: Router,
     private _authService: AuthService,private _userService:UserService) {

  
      }
 
  ngOnInit() {
    this._passwordChanger = new PasswordChanger("","");
    this.oldPassword = ""
    this.confirmPassword = ""
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
      console.log(this.oldPassword)
      console.log(this.confirmPassword)
      this._passwordChanger = new PasswordChanger(this.oldPassword,this.confirmPassword);
      console.log(this._passwordChanger);
      this._userService.changePassword(this._passwordChanger).subscribe(data => {
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
  

}
