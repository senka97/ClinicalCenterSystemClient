import { PatientService } from './../../service/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  constructor(private _patientService:PatientService) { }

  private _patients: any;
  private _currentPatient: any;
  private _showList: boolean;
  private _showPatient: boolean;

  ngOnInit() {
      console.log("nesto");
      this._patientService.getAllPatients().subscribe(patients => {
      this._patients = patients;
      this._showList = true;
      this._showPatient = false;
      
     });
  }

  showDetails(id){
    this._patientService.getPatient(id).subscribe(patient => {
      this._currentPatient = patient;
      this._showList = false;
      this._showPatient = true;
    })
  }

  goBack(){
    this._showPatient = false;
    this._showList = true;
  }

}
