import { MERoomRequest } from './../../shared/model/MERoomRequest';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalExamService } from 'src/app/service/medical-exam-service';
import { MedicalExamRequest } from 'src/app/shared/model/MedicalExamRequest';
import { RoomME } from 'src/app/shared/model/RoomME';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _router: Router,private _medicalExamService:MedicalExamService,private _notifier:NotifierService) { }

  private _examId: any;
  private _clinicId: any;
  private _currentAdmin: any;
  private _examStart: MedicalExamRequest; //ovo je medicalExam sa podacima koji se zele
  private _examEnd: MedicalExamRequest; //ovo je medicalExam sa podacima kada se nadje soba
  private _showInfo: boolean;
  private _availableRooms: RoomME[]; //ovo su ponudjene sobe za rezervaciju

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._examId = params.get('idExam'); 
      this._clinicId = params.get("idClinic");
      this._medicalExamService.getMedicalExamRequest(this._examId).subscribe(
        res => {
          this._examStart = res; //na pocetku su isti
          this._examEnd = res;
          this._showInfo = true;
        }
      )
      //dobave se za trazeni datum i vreme
      this._medicalExamService.getAvailableRooms(this._examId).subscribe(
        res => {
          this._availableRooms = res;
        }
      )
    });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));

  }
  
   clickedBack(){
    this._router.navigate(["/examRoomRequests",this._clinicId]);
   }

   formatTime(time:Number[]){
    let timeStr: String = "";
    if(time[0]<10){
      timeStr += '0' + time[0];
    }else{
      timeStr += '' + time[0];
    }

    timeStr += ':' + time[1] + '0';
    return timeStr; 
  }

  reserveRoom(roomME){

    console.log(this._examStart);
    console.log(this._examEnd);
    console.log(roomME);
        let meR = new MERoomRequest(this._examStart,this._examEnd,roomME); 
        this._medicalExamService.reserveRoom(meR).subscribe(
          res => {
            this._notifier.notify("success","You have successfully reserved a room for medical exam.");
            setTimeout(() => {
             this._notifier.hideAll();
             this._router.navigate(["/examRoomRequests",this._clinicId]);
           }, 2000)
          },
          error => {
            this._notifier.notify("error",error.error);
            setTimeout(() => {
             this._notifier.hideAll();
             this._router.navigate(["/examRoomRequests",this._clinicId]);
           }, 2000)
          }
        )
  }
}
