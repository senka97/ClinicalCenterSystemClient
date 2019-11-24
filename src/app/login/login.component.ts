import { element } from 'protractor';
import { AuthService } from './../service/auth.service';
import { LoginUser } from './LoginUser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   pageTitle = "Login"
   _loginUser : LoginUser;
   _showError : boolean;


  constructor(private _route: ActivatedRoute, 
    private _router: Router, private _authService: AuthService) {
    this._loginUser = new LoginUser();
    this._showError = false;
  }
  

   
  onClickedLogin() {
    console.log("Email:" + this._loginUser.email + " and password: " + this._loginUser.password);
    this._authService.login(this._loginUser).subscribe(data => {
      this._router.navigate(['/patientHP']);
    },
    error => {
      //alert("Incorrect email or password");
      this._showError = true;
      setTimeout(() => {
        this._showError = false;
     }, 5000)
      
    })
          
  }

  onRegisterClicked() {

    this._router.navigate(['/signup']);
  }

  
  
  ngOnInit() {
  }

}
