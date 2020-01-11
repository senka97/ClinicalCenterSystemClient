import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MedicationService } from 'src/app/service/medication.service';
import { PatientService } from 'src/app/service/patient.service';
@Component({
  selector: 'app-medication-dialog',
  templateUrl: './medication-dialog.component.html',
  styleUrls: ['./medication-dialog.component.css']
})
export class MedicationDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<any>,  @Inject(MAT_DIALOG_DATA) public data: any,
   private _medicationService: MedicationService, private _patientService : PatientService) { }
  private _medications: any


  ngOnInit() {
    this._medicationService.getMedications().subscribe( medications => {
      this._medications = medications;
    })
 
  }
  clickAddMedication(med){
    this.data // id
    console.log(med.id) 
    this._patientService.addAlergicMedication(this.data,med).subscribe(data => {
    },
    error => {
      alert("Add ne medication error");
      console.log(this.data);
      console.log(med)
    })

    
  }

}
