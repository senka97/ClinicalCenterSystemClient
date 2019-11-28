import { ActivatedRoute } from '@angular/router';
import { PatientService } from './../../service/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  constructor(private _patientService: PatientService, private _route: ActivatedRoute) { }

  private _currentPatient: any;

  ngOnInit() {
    this._patientService.getPatient(this._route.snapshot.paramMap.get('id')).subscribe(patient => {
      this._currentPatient = patient;
    })
  }
}
