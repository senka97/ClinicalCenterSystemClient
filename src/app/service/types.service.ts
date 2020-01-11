import { Type } from './../shared/model/Type';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })
  export class TypesService {
  
    constructor(private _apiService: ApiService, private _config: ConfigService) {}

    getExamType(exam_type_id){
        return this._apiService.get("http://localhost:9000/api/examTypes/getExamType/" + exam_type_id).pipe(
          map(examType => {
            return examType;
          })
        )
      }

    getExamTypes(clinic_id){
        return this._apiService.get("http://localhost:9000/api/examTypes/getExamTypes/" + clinic_id).pipe(
            map(examTypes => {
                return examTypes;
            })
        )
    }  

    addExamType(clinic_id, type: Type){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
        return this._apiService.post("http://localhost:9000/api/examTypes/addExamType/" + clinic_id, JSON.stringify(type),editHeaders).pipe(
            map(result => {
                console.log("Exam type added.");
            })
        )
    }

    updateExamType(clinic_id, type_id, type: Type){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
        return this._apiService.put("http://localhost:9000/api/examTypes/updateExamType/" + clinic_id + "/" + type_id, JSON.stringify(type), editHeaders).pipe(
            map(result => {
                console.log("Exam type updated.");
            })
        )         

    }

    removeExamType(clinic_id, type_id){
        return this._apiService.delete("http://localhost:9000/api/examTypes/removeExamType/" + clinic_id + "/" + type_id).pipe(
            map(result => {
                console.log("Exam type removed.");
            })
        )
    }


    getSurgeryType(surgery_type_id){
        return this._apiService.get("http://localhost:9000/api/surgeryTypes/getSurgeryType/" + surgery_type_id).pipe(
          map(surgeryType => {
            return surgeryType;
          })
        )
      }

    getSurgeryTypes(clinic_id){
        return this._apiService.get("http://localhost:9000/api/surgeryTypes/getSurgeryTypes/" + clinic_id).pipe(
            map(surgeryTypes => {
                return surgeryTypes;
            })
        )
    }  

    addSurgeryType(clinic_id, type: Type){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
        return this._apiService.post("http://localhost:9000/api/surgeryTypes/addSurgeryType/" + clinic_id, JSON.stringify(type),editHeaders).pipe(
            map(result => {
                console.log("Surgery type added.");
            })
        )
    }

    updateSurgeryType(clinic_id, type_id, type: Type){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
        return this._apiService.put("http://localhost:9000/api/surgeryTypes/updateSurgeryType/" + clinic_id + "/" + type_id, JSON.stringify(type), editHeaders).pipe(
            map(result => {
                console.log("Surgery type updated.");
            })
        )         

    }

    removeSurgeryType(clinic_id, type_id){
        return this._apiService.delete("http://localhost:9000/api/surgeryTypes/removeSurgeryType/" + clinic_id + "/" + type_id).pipe(
            map(result => {
                console.log("Surgery type removed.");
            })
        )
    }


  }