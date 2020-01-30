import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Rate } from '../../model/Rate';
import { ClinicService } from 'src/app/service/clinic.service'

@Component({
  selector: 'app-clinic-rate-dialog',
  templateUrl: './clinic-rate-dialog.component.html',
  styleUrls: ['./clinic-rate-dialog.component.css']
})
export class ClinicRateDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,private _clinicService : ClinicService) { }
  private _rate : any = 0;
  private _clinics : any;
  private _clinic : any;
  private hide = true;
  private _patientId : any;
  private rate : Rate;

  ngOnInit() {
    this._clinics = this.data;
    this._patientId = this.dialogRef.id;
  }
  
  onCancelDialog(){

    this.Cancel();
  }
  Cancel(): void {
    this.dialogRef.close();
  }
  onSubmit() { 
    this.rate = new Rate();
    this.rate.patient_id = this._patientId;
    this.rate.rate = this._rate;

    this._clinicService.rateClinic(this._clinic.id,this.rate).subscribe(clinic => {
      this.dialogRef.close();
    })
  }
  clinicForRate(clinic){
    this.hide = false;
    this._clinic = clinic;

  }
}



