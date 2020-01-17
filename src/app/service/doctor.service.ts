import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Doctor } from '../shared/model/Doctor';
import { HttpHeaders } from '@angular/common/http';
import { DoctorSearch } from '../shared/model/DoctorSearch';


@Injectable({
    providedIn: 'root'
  })
  export class DoctorService {

    constructor(private _apiService:ApiService){}

    getDoctor(doctor_id){
        return this._apiService.get("http://localhost:9000/api/doctors/getDoctor/" + doctor_id).pipe(
            map(doctor =>{
                return doctor;
            })
        )      
    }

    getAllDoctors(clinic_id:String){
        return this._apiService.get("http://localhost:9000/api/doctors/getAllDoctors/" + clinic_id).pipe(
            map(doctors => {
                return doctors;
            })
        )
    }

    addNewDoctor(doctor:Doctor, clinic_id: String){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.post("http://localhost:9000/api/doctors/addDoctor/" + clinic_id, JSON.stringify(doctor), editHeaders).pipe(
            map(result => {
              console.log("Doctor registred.");
      
            })
          )
    }

    removeDoctor(doctor_id){
        return this._apiService.delete("http://localhost:9000/api/doctors/removeDoctor/" + doctor_id).pipe(
        map(res=> {
           return res;
        })
    )
    }

    searchDoctors(doctorSearch: DoctorSearch, clinic_id:String){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
        return this._apiService.post("http://localhost:9000/api/doctors/searchDoctors/" + clinic_id, JSON.stringify(doctorSearch), editHeaders).pipe(
            map(doctorsFound => {
                return doctorsFound;
            })
        )

    }
  }