import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Room } from '../shared/model/Room';




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

  getRooms(clinic_id){
    return this._apiService.get("http://localhost:9000/api/clinics/getRooms/" + clinic_id).pipe(
      map(rooms => {
        return rooms;
      })
    )
  }

  addNewRoom(clinic_id,room:Room){
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post("http://localhost:9000/api/clinics/addNewRoom/" + clinic_id, JSON.stringify(room), editHeaders).pipe(
      map(result => {
        console.log("Room added.");

      })
    )
  }


  updateRoom(clinic_id,room:Room){
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/rooms/updateRoom/" + room.id + "/" + clinic_id, JSON.stringify(room), editHeaders).pipe(
      map(result => {
        console.log("Room updated.");

      })
    )
  }
}
