import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class PatientService{

    constructor(private _apiService:ApiService, private _config: ConfigService){

    }

    getAllPatients(){
        return this._apiService.get("http://localhost:9000/api/patients/allSorted").pipe(
            map(patients => {
                console.log("All patients retrieved.");
                console.log(patients);
                return patients;
            })
          )

    }

    getPatient(id:string){
        return this._apiService.get("http://localhost:9000/api/patients/patient/" + id).pipe(
            map(patient => {
                console.log("Patient retrieved:");
                console.log(patient);
                return patient;
            })
          )
    }

}