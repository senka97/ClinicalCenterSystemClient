import { TypeReg } from 'src/app/shared/model/TypeReg';
import { DoctorService } from 'src/app/service/doctor.service';
import { TypesService } from './../service/types.service';
import { PriceTag } from './../shared/model/PriceTag';
import { ClinicService } from 'src/app/service/clinic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../shared/model/Clinic';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RoomService } from '../service/room.service';
import { Room } from '../shared/model/Room';
import { StarRatingComponent } from 'ng-starrating';
import { Doctor } from '../shared/model/Doctor';
import { DoctorRating } from '../shared/model/DoctorRating';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-clinic',
  templateUrl: './profile-clinic.component.html',
  styleUrls: ['./profile-clinic.component.css']
})
export class ProfileClinicComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _router: Router, private _clinicService:ClinicService, private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer, private _typesSerivce: TypesService,private _roomService:RoomService,private _doctorService:DoctorService) {

  }

  private _clinicId;
  private _clinic: Clinic;
  private _currentUser: any;
  private _role: String;
  private _showFA: boolean;
  private _showPriceList: boolean;
  private _showRooms: boolean;
  private _showDoctors: boolean;
  private _showTableAll:boolean;
  private _showTableSearch:boolean;
  private _showMap: boolean;
  private _coordinates: Array<Number>;
  private _surgeryPrice: PriceTag[];
  private _examPrice: PriceTag[];
  private _rooms: Room[];
  private _index: Number;
  private _doctors: DoctorRating[];
  private _examTypes: TypeReg[];
  //form
  private _selectedType: TypeReg;
  private _date: any;
  private _rating: Number;
  private _docName: String;
  private _docSurname: String;

  ngOnInit() {
      this._clinic = JSON.parse(localStorage.getItem("clinic"));
      this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._role = this._currentUser.authorities[0]['authority'];
      this._showFA = false;
      this._showPriceList = false;
      this._showMap = false;
      this._showRooms = false;
      this._showDoctors = false;
      this._showTableAll = true;
      this._showTableSearch = false;
      this._coordinates = JSON.parse(localStorage.getItem("coordinates"));

      this._iconRegistry.addSvgIcon(
        'location-icon',
        this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/location.svg'));
    }

    showMap(){
      if(this._showMap){
        this._showMap = false;
      }else{
        this._showMap = true;
        this._coordinates = JSON.parse(localStorage.getItem("coordinates"));
      }
    }

    public onLoad(event) {
        let tempCoords = [];
        tempCoords = JSON.parse(localStorage.getItem("coordinates"));

        if(tempCoords == null){
        const ymaps = event.ymaps;
        ymaps.geocode(this._clinic.address)
        .then((res) => {
           this._coordinates = res.geoObjects.get(0).properties.get('boundedBy')[0];
           localStorage.setItem("coordinates",JSON.stringify(this._coordinates));
          
        });
      }
      
    }

    clickedBack(){
         if(this._role == "ROLE_CLINIC_ADMIN"){
             this._router.navigate(['/clinicAdminProfile']);
         }
         if(this._role == "ROLE_PATIENT"){
             this._router.navigate(['/patientHP']);
         }
    }

    showFA(){
      this._showFA = true;
      this._showPriceList = false;
      this._showRooms = false;
      this._showDoctors = false;
    }

    showPriceList(){

      this._typesSerivce.getExamPrice(this._clinic.id).subscribe(
        res => {
          this._examPrice = res;
          this._typesSerivce.getSurgeryPrice(this._clinic.id).subscribe(
            res1 => {
              this._surgeryPrice = res1;
              this._showPriceList = true;
              this._showFA = false;
              this._showRooms = false;
              this._showDoctors = false;
            }
          )
        }
      )  
    }

    showRooms(){
        this._roomService.getRooms(this._clinic.id).subscribe(
          res => {
            this._rooms = res;
            this._showRooms = true;
            this._showFA = false;
            this._showPriceList = false; 
            this._showDoctors = false;
          }
        )
    }

    showDoctors(){

      if(this._role == "ROLE_CLINIC_ADMIN"){ 

        this._doctorService.getAllDoctorsRating(this._clinic.id).subscribe(
          res => {
             this._doctors = res;
             console.log(this._doctors);

             this._showDoctors = true;
             this._showFA = false;
             this._showRooms = false;
             this._showPriceList = false;
          }
        )
        
      }else{

        this._typesSerivce.getExamTypesForRes(this._clinic.id).subscribe(
          res => {
            this._examTypes = res;
            this._doctorService.getAllDoctorsRating(this._clinic.id).subscribe(
              res => {
                 this._doctors = res;
                 this.resetForm();
                 this._showDoctors = true;
                 this._showFA = false;
                 this._showRooms = false;
                 this._showPriceList = false;
              }
            )    
          }
        )      
      }
    }

    searchDoctors(){

      //ovde slanje parametara za pretragu doktora i prikaz tabele rezultata pretrage
      console.log(this._selectedType);
      console.log(this._date);
      console.log(this._rating);
      console.log(this._docName);
      console.log(this._docSurname);
      this._showTableAll = false;
      this._showTableSearch = true;

    }

    reset(){
      this._showTableSearch = false;
      this._showTableAll = true;
    }

    resetForm(){
      this._selectedType = null;
      this._date = null;
      this._rating = null;
      this._docName = null;
      this._docSurname = null;
    }

}
