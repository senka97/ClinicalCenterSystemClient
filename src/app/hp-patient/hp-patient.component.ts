import { Component, OnInit,Input } from '@angular/core';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AuthService } from '../service/auth.service';
import { PatientService } from '../service/patient.service';
import { MedicalRecord } from './medical-record/MedicalRecord';
@Component({
  selector: 'app-hp-patient',
  templateUrl: './hp-patient.component.html',
  styleUrls: ['./hp-patient.component.css']
})
export class HpPatientComponent implements OnInit {
  private _signUpUser : any = JSON.parse(localStorage.getItem('currentUser')); 


  show: boolean;
  showMedicalRecord: boolean;
  showHome: boolean;
  showClinics: boolean;
  _medicalRecord: MedicalRecord;
  showDoctors: boolean;
  notPatient : boolean;
  message : any;
  _patientId: any;
  _disabled : boolean;
 
  

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService, private _userService: UserService, private _patientService: PatientService) {
     

  }

  ngOnInit() {
   
  
    if(this._signUpUser.authorities[0]['authority'] == 'ROLE_PATIENT'){
      this.notPatient = false;
      this.patientMedicalRecord(this._signUpUser.id);
      this.message = "Home page for patient:";
      this._disabled = true;
    }else{

      this._route.paramMap.subscribe(params => { 
        this._patientId = params.get('id');
      });
      this.notPatient = true;
      this.patientMedicalRecord(this._patientId);
      this.message = "Patient #" + this._patientId + ", Doctor: ";
      this._disabled = false;
    }
    this.uncheckAll(false);
    this.resetForm();

    document.getElementById("hidden").hidden = this.notPatient;
    document.getElementById("notHidden").hidden = !this.notPatient;
    document.getElementById("hidden2").hidden = this.notPatient;
    document.getElementById("notHidden2").hidden = !this.notPatient;
    console.log("OVOOO")
    console.log( this._signUpUser.authorities[0]['authority'])
    console.log(this._patientId);
  

    this._medicalRecord = new MedicalRecord();
  }
  patientMedicalRecord(id) {
    this._patientService.getPatientMedicalRecord(id).subscribe(medRecord => {
      console.log(medRecord);
      this._medicalRecord = medRecord;


    })
  }

  resetForm(form?: NgForm) {
  }
  onClickedLogout() {
    this._authService.logout();

  }
  showProfileInfo() {
    this.show = this.uncheckAll(this.show);
    this.show = this.check(this.show);
  }
  showMedicalRecordInfo() {
    if(this._signUpUser.authorities[0]['authority'] == 'ROLE_PATIENT'){
      this.patientMedicalRecord(this._signUpUser.id);
    }else{
      this.patientMedicalRecord(this._patientId);
    }
    this.showMedicalRecord = this.uncheckAll(this.showMedicalRecord);
    this.showMedicalRecord = this.check(this.showMedicalRecord);

  }
  showListOfClinics() {
    this.showClinics = this.uncheckAll(this.showClinics);
    this.showClinics = this.check(this.showClinics);

  }
  showMedicalExams(){
    this.showDoctors = this.uncheckAll(this.showDoctors);
    this.showDoctors = this.check(this.showDoctors);
  }

  check(check: boolean): boolean {
    if (check == true) {
      check = false;
    } else {
      check = true;
    }
    return check;

  }
  uncheckAll(check): boolean {
    this.show = false;
    this.showHome = false;
    this.showMedicalRecord = false;
    this.showClinics = false;
    this.showDoctors = false;
    return check;
  }
  onClickedBack(){
    this._router.navigate(['/doctorHP']);
  }


}
