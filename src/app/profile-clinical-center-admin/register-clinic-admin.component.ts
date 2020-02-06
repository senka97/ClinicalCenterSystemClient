import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register-clinic-admin',
  templateUrl: './register-clinic-admin.component.html',
  styleUrls: ['./register-clinic-admin.component.css']
})
export class RegisterClinicAdminComponent implements OnInit {

  constructor( private _router: Router,
    private _clcadminService: ClinicalCenterAdminService,
    private _notifier: NotifierService) {
      this._newAdmin=new ClinicalCenterAdministrator();
      this._selectedClinic= 0;
    }

  private _clinics: any;
  private _newAdmin: any;
  private _selectedClinic: any;

  ngOnInit() {
    this._clcadminService.getClinics().subscribe(clinics => {
      this._clinics = clinics;
    });
  }

  onBackClicked(): void {
    this._router.navigate(['/clinicalCenterAdminProfile']);
  }

  clickRegisterClinicAdmin() {
    this._clcadminService.createClinicAdmin(this._newAdmin,this._selectedClinic ).subscribe(data => {
     // alert("Admin successfully created!");
     this._notifier.notify("success","Clinic admin successfully registered.");
        setTimeout(() => {
        this._notifier.hideAll();
        }, 2000)
      },
      error => {
        this._notifier.notify("error","Error registering clinic admin.");
        setTimeout(() => {
        this._notifier.hideAll();
       }, 2000)
      
   })
   this._router.navigate(['/clinicalCenterAdminProfile']);
   
  }

  resetForm(form?: NgForm) {
   
    if (form != null) {
      form.reset();
    }
  }
}
