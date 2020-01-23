import { TypesService } from './../service/types.service';
import { PriceTag } from './../shared/model/PriceTag';
import { ClinicService } from 'src/app/service/clinic.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from '../shared/model/Clinic';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-clinic',
  templateUrl: './profile-clinic.component.html',
  styleUrls: ['./profile-clinic.component.css']
})
export class ProfileClinicComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _router: Router, private _clinicService:ClinicService, private _iconRegistry: MatIconRegistry, private _sanitizer: DomSanitizer, private _typesSerivce: TypesService) {

  }

  private _clinicId;
  private _clinic: Clinic;
  private _currentUser: any;
  private _role: String;
  private _showFA: boolean;
  private _showPriceList: boolean;
  private _showMap: boolean;
  private _coordinates: Array<Number>;
  private _surgeryPrice: PriceTag[];
  private _examPrice: PriceTag[];

  ngOnInit() {
      //Jovice moras kada pacijent klikne na klinike da tada u tom trenutku svuces kliniku na osnovu id-ja
      //i da je stavis na localStorage da bi se ovde mogla preuzeti, mora zbog mape tako
      this._clinic = JSON.parse(localStorage.getItem("clinic"));
      this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._role = this._currentUser.authorities[0]['authority'];
      this._showFA = false;
      this._showPriceList = false;
      this._showMap = false;
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
            }
          )
        }
      )  
    }

}
