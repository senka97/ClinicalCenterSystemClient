import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Clinic } from './clinic'
import { ClinicService } from 'src/app/service/clinic.service'
import { TypeReg } from 'src/app/shared/model/TypeReg';
import { TypesService } from 'src/app/service/types.service';
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
  showDoctors : boolean;
  showAppointments : boolean;
  
  private _examTypes: TypeReg[];
  private _selectedType: TypeReg;
  private _date: any;

  constructor(private _clinicService :ClinicService, private _router:Router, private _typesService : TypesService) { }

  ngOnInit() {
    this.startIndex = 0;
    this.leftArrow = "<--";
    this.rightArrow = "-->";
    this.numberOfClinics = 0;
    this.showSpinner = true;
    this.showDoctors = false;
    this.showAppointments = false;
    this.imagePath = "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

    this._typesService.getAllExamTypes().subscribe(
      res => {
        this._examTypes = res;
      });
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
  readMore(){
    if(this.showDoctors == false){
      this.showDoctors = true;
    }else{
      this.showDoctors = false;
    }
  }
  showDoctorTimes(){
    this.showAppointments = true;
  }

  showClinicProfile(idClinic){
    this._clinicService.getClinic(idClinic).subscribe(
      clinic => {       
           let clinicTemp:Clinic = clinic;
           localStorage.setItem("clinic",JSON.stringify(clinicTemp));
           localStorage.setItem("coordinates",null);
           this._router.navigate(['/clinicProfile/', idClinic]);
      }
    )
  }

}
