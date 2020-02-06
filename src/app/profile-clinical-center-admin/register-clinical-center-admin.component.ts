import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';

import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register-clinical-center-admin',
  templateUrl: './register-clinical-center-admin.component.html',
  styleUrls: ['./register-clinical-center-admin.component.css']
})
export class RegisterClinicalCenterAdminComponent implements OnInit {

  constructor(private _router: Router, private _clcadminService: ClinicalCenterAdminService,
    private _notifier: NotifierService) {
    this._newAdmin=new ClinicalCenterAdministrator();
  }
  _newAdmin : ClinicalCenterAdministrator;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 
  
  ngOnInit() {
    this.resetForm(); 
  }

  clickRegisterClCAdmin() {
    this._clcadminService.createClCAdmin(this._newAdmin).subscribe(data => {
      
      this._notifier.notify("success","Clinical center admin successfully registered.");
        setTimeout(() => {
        this._notifier.hideAll();
        }, 2000)
      },
      error => {
        this._notifier.notify("error","Error registering clinical center admin.");
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
