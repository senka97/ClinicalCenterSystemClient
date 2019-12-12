import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClinicService{

    constructor(private _apiService:ApiService, private _config: ConfigService){

    }
    getClinics()
    {
     return this._apiService.get("http://localhost:9000/api/clinics/getClinics").pipe(
       map(clinics => {
           return clinics;
       })
     )
    }

}