import { RoomAddedDialogComponent } from './room-added-dialog/room-added-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClinicService } from 'src/app/service/clinic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/shared/model/Room';
import { NewRoomDialogComponent } from './new-room-dialog/new-room-dialog.component';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';


@Component({
  selector: 'app-exam-rooms',
  templateUrl: './exam-rooms.component.html',
  styleUrls: ['./exam-rooms.component.css']
})
export class ExamRoomsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _clinicService: ClinicService, private _router: Router, private _dialog: MatDialog) { }

  private _currentAdmin: any;
  private _clinicId: String;
  private _rooms: Room[];
  private _searchRoom: Room;
  private _newRoom: Room;
  private types: String[] = ['Medical exam', 'Surgery'];
  private _foundRooms: Room[];
  private _showTable: boolean;
  private _showMsg: boolean;


  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
    this._clinicId = params.get('id'); 
    console.log(this._clinicId);
    this._searchRoom = new Room();
    this._newRoom = new Room();
    this._showTable = false;
    this._showMsg = false;
  });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
  }
   
  clickedBack(){
      this._router.navigate(["/clinicAdminProfile"]);
  }

  onClickedSearch(myForm){
      this._foundRooms = [];
      this._clinicService.getRooms(this._clinicId).subscribe(
        rooms => {
            this._rooms = rooms;
            console.log(this._rooms);
            for(let room of this._rooms){
              let enteredName = false;
              let enteredNumber = false;
              let enteredType = false;
              if(this._searchRoom.name != null && this._searchRoom.name != "" && this._searchRoom.name != undefined){
                  enteredName = true;
              } 
              if(this._searchRoom.number != null && this._searchRoom.number != "" && this._searchRoom.number != undefined){
                  enteredNumber = true;
              } 
              if(this._searchRoom.roomType != null && this._searchRoom.roomType != "" && this._searchRoom.roomType != undefined){
                   enteredType = true;
              } 
              if(enteredName){
                if(!room.name.toLowerCase().includes(this._searchRoom.name.toLocaleLowerCase())){
                  continue;
                }
              }
              if(enteredNumber){
                 if(!room.number.toLowerCase().includes(this._searchRoom.number.toLocaleLowerCase())){
                   continue;
                 }
                }
              if(enteredType){
                if(room.roomType != this._searchRoom.roomType){
                  continue;
                }
              }
             
                if(enteredName == false && enteredNumber == false && enteredType == false){
                  continue;
                }else{
                 this._foundRooms.push(room);
                }
                       
              }
             
            if(this._foundRooms.length != 0){
                 console.log("Pronasao sobu");
                 this._showTable = true;
                 this._showMsg = false;
                 myForm.reset();
                 console.log(this._searchRoom.roomType);
                
                 
            }else{
                 console.log("Nije pronasao sobu");
                 this._showTable = false;
                 myForm.reset();
                 this._showMsg = true;
                 
            }
      });
    }  

     addNewRoom(){
      this._newRoom = new Room();
      let dialogRef = this._dialog.open(NewRoomDialogComponent, {
        width: '50%',
        data: this._newRoom
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
        this._newRoom = result;
        this._clinicService.addNewRoom(this._clinicId, this._newRoom).subscribe(
          res => {
            let dialogRef1 = this._dialog.open(RoomAddedDialogComponent, {
              width: '50%'
            });
          },
            error => {
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: error.error
              });
            }
            );
        
        }
    });
      }
}
