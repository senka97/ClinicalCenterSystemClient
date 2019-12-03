import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ConfigService{

    private _auth_url = 'http://localhost:9000/auth';
    private _server_url = 'http://localhost:9000';
    private _login_url = this._auth_url + '/login';
    private _signup_url = this._auth_url + '/signup';
    private _whoami_url = this._server_url + '/users/currentUser';
    private _editpatient_url =this._server_url + '/users/editPatient';
    private _passchange_url = this._server_url + '/users/changePassword'

 
    get login_url(): string {
        return this._login_url;
    }

    get signup_url(): string {
        return this._signup_url;
      }
    
    get whoami_url(): string {
      return this._whoami_url;
    }
    get editpatient_url():string{
      return this._editpatient_url;
    }
    get server_url():string{
      return this._server_url;
    }
    get passchange_url():string{
      return this._passchange_url;
    }

}