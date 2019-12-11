import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-hp-patient',
  templateUrl: './hp-patient.component.html',
  styleUrls: ['./hp-patient.component.css']
})
export class HpPatientComponent implements OnInit {
  private _signUpUser: any = JSON.parse(localStorage.getItem('currentUser'));
  show: boolean;
  showMedicalRecord: boolean;
  showHome: boolean;
  showClinics: boolean;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService, private _userService: UserService) {


  }

  ngOnInit() {
    this.uncheckAll(false);
    this.resetForm();

  }

  resetForm(form?: NgForm) {
  }
  onClickedLogout() {
    this._authService.logout();

  }
  showProfileInfo() {
    this.show = this.uncheckAll(this.show);
    this.show = this.check(this.show);
  }
  showMedicalRecordInfo() {
    this.showMedicalRecord = this.uncheckAll(this.showMedicalRecord);
    this.showMedicalRecord = this.check(this.showMedicalRecord);

  }
  showListOfClinics() {
    this.showClinics = this.uncheckAll(this.showClinics);
    this.showClinics = this.check(this.showClinics);

  }

  check(check: boolean): boolean {
    if (check == true) {
      check = false;
    } else {
      check = true;
    }
    return check;

  }
  uncheckAll(check): boolean {
    this.show = false;
    this.showHome = false;
    this.showMedicalRecord = false;
    this.showClinics = false;
    return check;
  }


}
