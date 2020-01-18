import { AbsenceRequest } from './../shared/model/AbsenceRequest';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AbsenceService {

    constructor(private _apiService:ApiService){}

    sendRequestDoctor(absenceRequest:AbsenceRequest){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.post("http://localhost:9000/api/absences/sendRequestDoctor", JSON.stringify(absenceRequest), editHeaders).pipe(
            map(result => {
              console.log("Request for absence sent.");
      
            })
          )
    }
  }
