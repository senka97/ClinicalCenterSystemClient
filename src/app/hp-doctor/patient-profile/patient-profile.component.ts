import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { MatDialog } from '@angular/material';
import { MedicationDialogComponent } from 'src/app/shared/dialogs/medication-dialog/medication-dialog.component';
import { DiagnosisDialogComponent } from 'src/app/shared/dialogs/diagnosis-dialog/diagnosis-dialog.component';
import { ChangeMedicalRecordDialogComponent } from './change-medical-record-dialog/change-medical-record-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
      private _patientService: PatientService,
      private _router: Router,
      private _dialog: MatDialog,
      private _notifier: NotifierService) { }

  private _currentPatient: any;
  private _patientId: any;
  private _medicalRecord: any;
  private _medicalRecordChanged: any;
  private _allergicMedicationList: any[];
  private _chronicConditionList: any[];


  private _showInformation: boolean;
  private _showMedicalRecord: boolean;
  private _showMedicalReports: boolean;
  private _startMedicalExam: boolean;

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._patientId = params.get('id');
    });
    this._patientService.getPatient(this._patientId).subscribe( 
      patient=> {
        this._currentPatient=patient;
      }
    );
    this._patientService.getPatientMedicalRecord(this._patientId).subscribe(medRecord => {
      this._medicalRecord = medRecord;
    });

    this._patientService.getPatientAlergicMed(this._patientId).subscribe(allergicMed => {
      this._allergicMedicationList = allergicMed;
    });

    this._patientService.getPatientChronicCon(this._patientId).subscribe(chronicCon => {
      this._chronicConditionList = chronicCon;
    });

    this._showInformation = false;
    this._showMedicalRecord = false;
    this._startMedicalExam = false;
    this._showMedicalReports = false;
   
  }

  clickedShowInformation()
  {
    this._showInformation=!this._showInformation;
    this._showMedicalRecord = false;
    this._showMedicalReports = false;
  }
  
  clickedMedicalRecord()
  {
    this._showMedicalRecord=!this._showMedicalRecord;
    this._showMedicalReports = false;
    this._showInformation = false;
  }

  clickedMedicalReports()
  {

  }

  clickedStartMedicalExam()
  {
    if(this._startMedicalExam==false)
    {
      this._startMedicalExam=true;
    }
    else
    {
      //zavrsavanje pregleda
      this._startMedicalExam=false;
    }
   
  }

  clickedCreateMedicalReport()
  {
    
  }

  clickedChangeInformation()
  {
    let dialogRef = this._dialog.open(ChangeMedicalRecordDialogComponent, {
      width: '50%',
      data: JSON.parse(JSON.stringify(this._medicalRecord))
    });
    dialogRef.afterClosed().subscribe(result => {
     if(result != undefined){
     this._medicalRecordChanged = result;
     if(this._medicalRecord.dateOfBirth != this._medicalRecordChanged.dateOfBirth || this._medicalRecord.height!= this._medicalRecordChanged.height
       || this._medicalRecord.weight != this._medicalRecordChanged.weight || this._medicalRecord.diopter != this._medicalRecordChanged.diopter
       || this._medicalRecord.bloodType != this._medicalRecordChanged.bloodType || this._medicalRecord.organDonor != this._medicalRecordChanged.organDonor){
           this._medicalRecord = JSON.parse(JSON.stringify(this._medicalRecordChanged));
           this._patientService.editPatientMedicalRecord(this._patientId,this._medicalRecord).subscribe(data => {
              this._notifier.notify("success","Medical record changed");
              setTimeout(() => {
                this._notifier.hideAll();
              }, 2000)
          },
          error => {
            this._notifier.notify("error","Change medical record failed");
              setTimeout(() => {
            this._notifier.hideAll();
            }, 2000)
          })
     }
   }
   });
  }

  addAllergicMedication(){
    let dialogRef = this._dialog.open(MedicationDialogComponent, {
      width: '50%',
      data: this._patientId,
    });
    dialogRef.afterClosed().subscribe( result =>
      {
        this._patientService.getPatientAlergicMed(this._patientId).subscribe(allergicMed => {
          this._allergicMedicationList = allergicMed;
        });
      });
  }
  addChronicCondition(){
    let dialogRef = this._dialog.open(DiagnosisDialogComponent, {
      width: '50%',
      data: this._patientId,
    });
    dialogRef.afterClosed().subscribe( result =>{
      this._patientService.getPatientChronicCon(this._patientId).subscribe(chronicCon => {
        this._chronicConditionList = chronicCon;
      });
    });
  }

  onClickedBack(){
    this._router.navigate(['/doctorHP']);
  }

  clickedClose(){
    this._showInformation = false;
  }

}
