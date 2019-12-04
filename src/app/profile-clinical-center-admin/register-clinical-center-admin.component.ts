import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';

import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';


@Component({
  selector: 'app-register-clinical-center-admin',
  templateUrl: './register-clinical-center-admin.component.html',
  styleUrls: ['./register-clinical-center-admin.component.css']
})
export class RegisterClinicalCenterAdminComponent implements OnInit {

  constructor(private _router: Router, private _clcadminService: ClinicalCenterAdminService) {
    this._newAdmin=new ClinicalCenterAdministrator();
  }
  _newAdmin : ClinicalCenterAdministrator;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 
  
  ngOnInit() {
    this.resetForm(); 
  }

  clickRegisterClCAdmin() {
    this._clcadminService.createClCAdmin(this._newAdmin).subscribe(data => {
      this._router.navigate(['/clinicalCenterAdminProfile']);
   },
   error => {
     alert("Registation failed.");
   })  
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
