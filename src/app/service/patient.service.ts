import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
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
    getPatientMedicalRecord(id:string){
        return this._apiService.get("http://localhost:9000/api/patients/patientMedicalRecord/" + id).pipe(
            map(medRecord => {
                console.log("Patient retrieved:");
                console.log(medRecord);
                return medRecord;
            })
          )
    }
     editPatientMedicalRecord(id:string,medicalRecord)
    {
      console.log("DDDD");
      console.log(medicalRecord);
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/patients/editMedicalRecord/"+id,JSON.stringify(medicalRecord) ,editHeaders).pipe(
        map(result => {
          console.log("Patient medical record.");
        })
      )
    }
    addAlergicMedication(id:string,medication)
    {
     
      console.log(medication);
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/patients/addAlergicMedication/"+id,JSON.stringify(medication) ,editHeaders).pipe(
        map(result => {
          console.log("Add new alergic mmedication");
        })
      )
    }
    getPatientAlergicMed(id:string){
      return this._apiService.get("http://localhost:9000/api/patients/getPatientAlergicMed/" + id).pipe(
          map(alergicMed => {
              console.log(alergicMed);
              return alergicMed;
          })
        )
  }
  addChronicCondition(id:string,diagnose)
  {
   
    console.log(diagnose);
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/patients/addChronicCondition/"+id,JSON.stringify(diagnose) ,editHeaders).pipe(
      map(result => {
        console.log("Add new chronic condition");
      })
    )
  }
  getPatientChronicCon(id:string){
    return this._apiService.get("http://localhost:9000/api/patients/getPatientChronicCon/" + id).pipe(
        map(chronicCond => {
            console.log(chronicCond);
            return chronicCond;
        })
      )
}
getRatedClinics(id:string){
  return this._apiService.get("http://localhost:9000/api/patients/getRatedClinics/" + id).pipe(
      map(clinics => {
          console.log("clinics retrieved:");
          console.log(clinics);
          return clinics;
      })
    )
}

getRatedDoctors(id:string){
  return this._apiService.get("http://localhost:9000/api/patients/getRatedDoctors/" + id).pipe(
      map(doctors => {
          console.log("Doctors retrieved:");
          console.log(doctors);
          return doctors;
      })
    )
}

    

}