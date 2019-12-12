import { Component, OnInit } from '@angular/core';
import { Clinic } from './clinic'
import { ClinicService } from 'src/app/service/clinic.service'
@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
  _clinic : Clinic;
  _clinics : any;
  _allClinics : any;
  imagePath : any;
  startIndex : any;
  numberOfClinics : any;
  leftArrow : String;
  rightArrow : String;
  showSpinner : boolean;
  constructor(private _clinicService :ClinicService) { }

  ngOnInit() {
    this.startIndex = 0;
    this.leftArrow = "<--";
    this.rightArrow = "-->";
    this.numberOfClinics = 0;
    this.showSpinner = true;
   // this._clinic = new Clinic();
    // this._clinic.name = " Neurologija";
    // this._clinic.address = "Narodnog Fronta 76";
    // this._clinic.description = "Klinika za neurologiju";
    // this._clinic.numberOfReviews = 0;
    // this._clinic.rating = 2.34;
    this.imagePath = "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";
    //this._allClinics = [this._clinic,this._clinic,this._clinic,this._clinic,this._clinic,this._clinic,this._clinic,this._clinic,this._clinic,this._clinic];

   
    this._clinicService.getClinics().subscribe(clinics => {
     
      this._allClinics = clinics;
      this.numberOfClinics = this._allClinics.length;
      this.nextClinics();
      this.showSpinner = false;

     
    }); 
  
  
    
  }

 
  nextClinics(){
    var left = this.numberOfClinics - this.startIndex;
    console.log(left);
    var num = 0;
    if(left >= 3){
     num = 3;
    }else if(left == 2){
      num = 2;
    }else if(left == 1){
      num = 1;
    }
    this.startIndex =  this.startIndex + num;
    this.newClinics(num);

  }
  newClinics(num){
 
    this._clinics = [];
    var start = this.startIndex - num;
    var end = this.startIndex;
    for(start; start<end; start++ ){
      console.log(start,end);
      this._clinics.push(this._allClinics[start]);
    }
   
  }
  previousClinics(){
    this.startIndex =  this.startIndex - this._clinics.length;
    this.newClinics(3);

  }

}
