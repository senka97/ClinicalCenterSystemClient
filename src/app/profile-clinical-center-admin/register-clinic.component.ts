import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { Clinic } from './Clinic';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register-clinic',
  templateUrl: './register-clinic.component.html',
  styleUrls: ['./register-clinic.component.css']
})
export class RegisterClinicComponent implements OnInit {

  constructor(private _router: Router, 
    private _clcadminService: ClinicalCenterAdminService,
    private _notifier: NotifierService) {
      this._newClinic = new Clinic;
  }

  _newClinic: any;

  ngOnInit() {
    this.resetForm(); 
  }

  clickRegisterClinic() {
    this._clcadminService.createClinic(this._newClinic).subscribe(data => {
      this._notifier.notify("success","Clinic successfully registered.");
        setTimeout(() => {
        this._notifier.hideAll();
        }, 2000)
      },
      error => {
        this._notifier.notify("error","Error registering clinic.");
        setTimeout(() => {
        this._notifier.hideAll();
       }, 2000)
      
   })
   
   this._router.navigate(['/clinicalCenterAdminProfile']);
 
  }

  onBackClicked(): void {
    this._router.navigate(['/clinicalCenterAdminProfile']);
  }

  resetForm(form?: NgForm) {
   
    if (form != null) {
      form.reset();
    }
  }

}
