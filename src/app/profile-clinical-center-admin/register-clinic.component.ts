import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { Clinic } from './Clinic';


@Component({
  selector: 'app-register-clinic',
  templateUrl: './register-clinic.component.html',
  styleUrls: ['./register-clinic.component.css']
})
export class RegisterClinicComponent implements OnInit {

  constructor(private _router: Router, 
    private _clcadminService: ClinicalCenterAdminService) {
      this._newClinic = new Clinic;
  }

  _newClinic: any;

  ngOnInit() {
    this.resetForm(); 
  }

  clickRegisterClinic() {
    this._clcadminService.createClinic(this._newClinic).subscribe(data => {
      alert("Clinic successfully created!");
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
