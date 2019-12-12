import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private _apiService: ApiService, private _config: ConfigService) {

  }
  getClinics() {
    return this._apiService.get("http://localhost:9000/api/clinics/getClinics").pipe(
      map(clinics => {
        return clinics;
      })
    )
  }



  editClinicInfo(clinic) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/clinics/editClinic/" + clinic.id, JSON.stringify(clinic), editHeaders).pipe(
      map(result => {
        console.log("Clinic updated.");

      })
    )
  }
}
