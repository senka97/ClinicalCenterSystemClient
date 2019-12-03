import { UserService } from './../service/user.service';
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
    private _router: Router, private _authService: AuthService, private _userService: UserService) {
    this._loginUser = new LoginUser();
    this._showError = false;
  }
  

   
  onClickedLogin() {
    console.log("Email:" + this._loginUser.email + " and password: " + this._loginUser.password);
    this._authService.login(this._loginUser).subscribe(
      data => {
          this._userService.getMyInfo().subscribe(user =>{
             console.log("Role of user : " + user.authorities[0]['authority']);
             let role = user.authorities[0]['authority'];
              if(role === 'ROLE_DOCTOR'){
                this._router.navigate(['/doctorHP']);
<<<<<<< HEAD
              }else if(role === 'ROLE_PATIENT'){
                this._router.navigate(['/patientHP']);
              }
              
              else{
=======
              }
              else if(role=== 'ROLE_CLINICAL_CENTER_ADMIN'){
                this._router.navigate(['/clinicalCenterAdminProfile']);
              }else{
>>>>>>> master
                alert("Nije doktor. Nema jos homepage.");
        }
      
          });
        
    },
      error => {
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
