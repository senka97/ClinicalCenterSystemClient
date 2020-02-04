import { IncomeDate } from './../shared/model/IncomeDate';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class MedicalExamService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }
    getMedicalExam(id:string){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getMedicalExam/" + id).pipe(
            map(exam => {
                console.log(exam);
                return exam;
            })
          )
    }

    getIncome(incomeDate: IncomeDate, clinic_id){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.post("http://localhost:9000/api/medicalExams/getIncome/" + clinic_id, JSON.stringify(incomeDate), editHeaders).pipe(
            map(result => {
                return result;      
            })
          )
    }


}