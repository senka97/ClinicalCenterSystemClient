import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DoctorService } from 'src/app/service/doctor.service';
@Component({
  selector: 'doctor-rate-dialog',
  templateUrl: './doctor-rate-dialog.component.html',
  styleUrls: ['./doctor-rate-dialog.component.css']
})
export class DoctorRateDialog implements OnInit {

  constructor( public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private _doctorService : DoctorService) { }
  private _rate : any = 0;
  private _doctors : any;
  private _doctor : any;
  private hide = true;
  ngOnInit() {
    this._doctors = this.data;
  }

  onCancelDialog(){

    this.Cancel();
  }
  Cancel(): void {
    this.dialogRef.close();
  }
  onSubmit() { 

    this._doctorService.rateDoctor(this._doctor.id,this._rate).subscribe(doctor => {
      console.log(doctor)
    })
  }
  doctorForRate(doctor){
    this.hide = false;
    this._doctor = doctor;

  }
}
