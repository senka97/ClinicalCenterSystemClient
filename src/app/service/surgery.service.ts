import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class SurgeryService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }
    getSurgeries(id:string){
        return this._apiService.get("http://localhost:9000/api/surgery/getSurgeries/" + id).pipe(
            map(surgery => {
                console.log(surgery);
                return surgery;
            })
          )
    }

    getDoctorsSurgeries(id:string){
        return this._apiService.get("http://localhost:9000/api/surgery/getDoctorsSurgeries/" + id).pipe(
            map(surgeries => {
               // console.log(surgeries);
                return surgeries;
            })
          )
    }


}