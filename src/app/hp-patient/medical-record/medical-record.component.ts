import { Component, OnInit, Input } from '@angular/core';
import { MedicalRecord } from './MedicalRecord';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  _medicalRecord : MedicalRecord;
  disabled : boolean;
  allergicMedication : boolean;
  chronicCondition : boolean;
  constructor() { }

  ngOnInit() {
    this._medicalRecord = new MedicalRecord();
    this._medicalRecord.height = 76;
    this._medicalRecord.weight = 183;
    this._medicalRecord.organDonor = false;
    this._medicalRecord.diopter = "+2:-2";
    this._medicalRecord.bloodType = "AB+";
    this.allergicMedication = true;
    this.chronicCondition = true;
    
    this.disabled = false;
  }
  //for doctors
  onChangeMedicalRecord(){
    

  }
  onShowAllergicMedication(){
    this.allergicMedication  = this.check(this.allergicMedication);

  }
  onShowChronicCondition(){
    this.chronicCondition  = this.check(this.chronicCondition);
  }
  check(check : boolean) : boolean{
    if(check == true){
      check = false;
    }else{
      check = true;
    }
    return check;

  }

}

