import { AvailableRoomRequest } from './../shared/model/AvailabeRoomRequest';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })
  export class RoomService {
  
    constructor(private _apiService: ApiService, private _config: ConfigService) {}

    getRoom(room_id){
        return this._apiService.get("http://localhost:9000/api/rooms/getRoom/" + room_id).pipe(
          map(room => {
            return room;
          })
        )
      }

    getRooms(idClinic){
        return this._apiService.get("http://localhost:9000/api/rooms/getRooms/" + idClinic).pipe(
          map(rooms => {
            return rooms;
          })
        )
    }

    removeRoom(room_id){
    return this._apiService.delete("http://localhost:9000/api/rooms/removeRoom/" + room_id).pipe(
        map(res=> {
           return res;
        })
    )
    }  

    getAvailableRooms(idClinic,roomReq:AvailableRoomRequest){
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.post("http://localhost:9000/api/rooms/getAvailableRooms/" + idClinic, JSON.stringify(roomReq), editHeaders).pipe(
        map(res=> {
          return res;
        })
      )
    }


}