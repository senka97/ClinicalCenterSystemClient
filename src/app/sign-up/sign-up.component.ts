import { SignUpUser } from './SignUpUser';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  _signUpUser: SignUpUser;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  constructor(private _route: ActivatedRoute, 
    private _router: Router,
     private _authService: AuthService) {
       this._signUpUser = new SignUpUser();
      }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    /*this.user = {
      userName: '',
      surname: '',
      adress: '',
      city: '',
      country: '',
      email: '',
      password: '',
      phoneNumber: '',
      serialNumber: '',
      confirmPassword: ''

    }*/

  }
  onClickedRegister() {
    console.log(this._signUpUser);
    this._authService.signup(this._signUpUser).subscribe(data => {
       this._router.navigate(['/login']);
    },
    error => {
      alert("Registation failed.");
    })

  }
  
    

}
