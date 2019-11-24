import { Router } from '@angular/router';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';



@Injectable()
export class AuthService implements OnInit{


  ngOnInit(): void {
    localStorage.setItem('access_token', null);
  }

    constructor(
        private _apiService: ApiService,
        private _config: ConfigService,
        private _router: Router
      ) {
      }

      //private _access_token = null;

      login(user) {
        const loginHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        const body = {
          'email' : user.email,
          'password' : user.password
        };
        return this._apiService.post(this._config.login_url, JSON.stringify(body), loginHeaders)
          .pipe(map((res) => {
            console.log('Login success');
            //this._access_token = res.accessToken;
            localStorage.setItem('access_token', res.accessToken);
            console.log("Access token:" +  localStorage.getItem('access_token'));
          }));
      }

      logout() {
        //this._access_token = null; 
        localStorage.setItem('access_token', null);
        this._router.navigate(['/login']);
        console.log("Access token:" + localStorage.getItem('access_token'));
    }

    
    signup(user) {
      const signupHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.post(this._config.signup_url, JSON.stringify(user), signupHeaders)
        .pipe(map((res) => {
          console.log(res);
          console.log('Sign up success');
        }));
    }

    tokenIsPresent() {
      //return this._access_token != undefined && this._access_token != null;
      let token = localStorage.getItem('access_token'); //localstorage cuva stringove
      return token != 'null' && token != undefined;
    }
  
    getToken() {
      //return this._access_token;
      return localStorage.getItem('access_token');
    }


}