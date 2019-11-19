import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ConfigService{

    private _auth_url = 'http://localhost:9000/auth';
    private _login_url = this._auth_url + '/login';
    private _signup_url = this._auth_url + '/signup';

 
    get login_url(): string {
        return this._login_url;
    }

    get signup_url(): string {
        return this._signup_url;
      }

}