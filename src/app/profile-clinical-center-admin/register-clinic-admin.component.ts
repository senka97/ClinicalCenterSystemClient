import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';

@Component({
  selector: 'app-register-clinic-admin',
  templateUrl: './register-clinic-admin.component.html',
  styleUrls: ['./register-clinic-admin.component.css']
})
export class RegisterClinicAdminComponent implements OnInit {

  constructor( private _router: Router,
    private _clcadminService: ClinicalCenterAdminService) {
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
      this._router.navigate(['/clinicalCenterAdminProfile']);
   },
   error => {
     alert("Registation failed.");
   })  
  }

  resetForm(form?: NgForm) {
   
    if (form != null) {
      form.reset();
    }
  }
}
