import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DiagnosisService } from 'src/app/service/diagnosis.service';
import { PatientService } from 'src/app/service/patient.service';
@Component({
  selector: 'app-diagnosis-dialog',
  templateUrl: './diagnosis-dialog.component.html',
  styleUrls: ['./diagnosis-dialog.component.css']
})
export class DiagnosisDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<any>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private _diagnosesService: DiagnosisService, private _patientService : PatientService) { }
  private _diagnoses: any

  ngOnInit() {
    this._diagnosesService.getDiagnosis().subscribe( diagnoses => {
      this._diagnoses = diagnoses;

    })
  }
  clickAddDiagnose(diagnose){
    this.data // id
    console.log(diagnose.id) 
    this._patientService.addChronicCondition(this.data,diagnose).subscribe(data => {
    },
    error => {
      alert("Add diagnose error");
      console.log(this.data);
      console.log(diagnose)
    })

    
  }

}



