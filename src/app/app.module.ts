import { TypesService } from './service/types.service';
import { RoomService } from './service/room.service';
import { ClinicService } from './service/clinic.service';
import { ClinicAdminService } from './service/clinic-admin.service';
import { PatientService } from './service/patient.service';
import { UserService } from './service/user.service';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { ApiService } from './service/api.service';
import { ConfigService } from './service/config.service';
import { AuthService } from './service/auth.service';
import { ClinicalCenterAdminService } from './service/clinical-center-admin.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './_modal';
import { MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material' //Date picker
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //bootstrap
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HpDoctorComponent } from './hp-doctor/hp-doctor.component';
import { HpPatientComponent } from './hp-patient/hp-patient.component';
import { ProfileClinicalCenterAdminComponent } from './profile-clinical-center-admin/profile-clinical-center-admin.component';
import { RegisterClinicalCenterAdminComponent } from './profile-clinical-center-admin/register-clinical-center-admin.component';
import { ListPatientsComponent } from './hp-doctor/list-patients/list-patients.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { MedicalRecordComponent } from './hp-patient/medical-record/medical-record.component';
import { ProfileMedicalStaffComponent } from './profile-medical-staff/profile-medical-staff.component';
import { RegisterClinicAdminComponent } from './profile-clinical-center-admin/register-clinic-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClinicListComponent } from './hp-patient/clinic-list/clinic-list.component';
import { MatDialogModule } from '@angular/material/dialog'; //mora se instalirati ng @angular/material
import { PasswordChangedDialogComponent } from './shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { ProfileClinicAdminComponent } from './profile-clinic-admin/profile-clinic-admin.component';
import { EditInfoDialogComponent } from './shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { EditPasswordDialogComponent } from './shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { PasswordWrongDialogComponent } from './shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { FirstLoginDialogComponent } from './shared/dialogs/first-login-dialog/first-login-dialog.component';
import { EditClinicDialogComponent } from './profile-clinic-admin/edit-clinic-dialog/edit-clinic-dialog.component';
import { DoctorsListComponent } from './hp-patient/doctors-list/doctors-list.component';
import {MatSortModule,MatSortHeader,MatTableModule} from '@angular/material';
import { AppointmentsListComponent } from './hp-patient/appointments-list/appointments-list.component';
import { ExamRoomsComponent } from './profile-clinic-admin/exam-rooms/exam-rooms.component';
import { MatRadioModule } from '@angular/material/radio';
import { NewRoomDialogComponent } from './profile-clinic-admin/exam-rooms/new-room-dialog/new-room-dialog.component';
import { InfoDialogComponent } from './shared/dialogs/info-dialog/info-dialog.component'
import { HpNurseComponent } from './hp-nurse/hp-nurse.component';
import { RegisterClinicComponent } from './profile-clinical-center-admin/register-clinic.component';
import { RejectRequestDialogComponent } from './profile-clinical-center-admin/reject-request-dialog/reject-request-dialog.component';
import { UpdateRoomDialogComponent } from './profile-clinic-admin/exam-rooms/update-room-dialog/update-room-dialog.component';
import { ExamSurgeryTypesComponent } from './profile-clinic-admin/exam-surgery-types/exam-surgery-types.component';
import { NewTypeDialogComponent } from './profile-clinic-admin/exam-surgery-types/new-type-dialog/new-type-dialog.component';
import { UpdateTypeDialogComponent } from './profile-clinic-admin/exam-surgery-types/update-type-dialog/update-type-dialog.component';
import { DiagnosisService } from './service/diagnosis.service';
import { MedicationService } from './service/medication.service';
import { NewDiagnosisDialogComponent } from './profile-clinical-center-admin/new-diagnosis-dialog/new-diagnosis-dialog.component';
import { NewMedicationDialogComponent } from './profile-clinical-center-admin/new-medication-dialog/new-medication-dialog.component';
import { EditDiagnosisDialogComponent } from './profile-clinical-center-admin/edit-diagnosis-dialog/edit-diagnosis-dialog.component';
import { EditMedicationDialogComponent } from './profile-clinical-center-admin/edit-medication-dialog/edit-medication-dialog.component';
import { MedicationDialogComponent } from './shared/dialogs/medication-dialog/medication-dialog.component';
import { DiagnosisDialogComponent } from './shared/dialogs/diagnosis-dialog/diagnosis-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar'; //npm install --save angular-calendar date-fns
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { CalendarHeaderComponent } from './work-calendar/calendar-header.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HpDoctorComponent,
    HpPatientComponent,
    ProfileClinicalCenterAdminComponent,
    RegisterClinicalCenterAdminComponent,
    ListPatientsComponent,
    FormComponentComponent,
    MedicalRecordComponent,
    ProfileMedicalStaffComponent,
    RegisterClinicAdminComponent,
    ClinicListComponent,
    PasswordChangedDialogComponent,
    ProfileClinicAdminComponent,
    EditInfoDialogComponent,
    EditPasswordDialogComponent,
    PasswordWrongDialogComponent,
    FirstLoginDialogComponent,
    EditClinicDialogComponent,
    DoctorsListComponent,
    AppointmentsListComponent,  
    ExamRoomsComponent,
    NewRoomDialogComponent,
    InfoDialogComponent,
    HpNurseComponent,
    RegisterClinicComponent,
    RejectRequestDialogComponent,
    UpdateRoomDialogComponent,
    ExamSurgeryTypesComponent,
    NewTypeDialogComponent,
    UpdateTypeDialogComponent,
    NewDiagnosisDialogComponent,
    NewMedicationDialogComponent,
    EditDiagnosisDialogComponent,
    EditMedicationDialogComponent,
    MedicationDialogComponent,
    DiagnosisDialogComponent,
    WorkCalendarComponent,
    CalendarHeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    MatSortModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'patientHP', component: HpPatientComponent },
      {
        path: 'doctorHP', component: HpDoctorComponent,
        children: [
          {
            path: 'listOfPatients',
            component: ListPatientsComponent,
            outlet: 'hpDoctor',
          },

        ]
      },
      {
        path: 'nurseHP', component: HpNurseComponent,
        children: [
          {
            path: 'listOfPatients',
            component: ListPatientsComponent,
            outlet: 'hpNurse',
          },
        ]
      },
      { path: 'clinicalCenterAdminProfile', component: ProfileClinicalCenterAdminComponent },
      { path: 'registerClinicalCenterAdmin', component: RegisterClinicalCenterAdminComponent },
      { path: 'registerClinicAdmin', component: RegisterClinicAdminComponent },
      { path: 'registerClinic', component: RegisterClinicComponent },
      { path: 'medicalStaffProfile', component: ProfileMedicalStaffComponent },
      { path: 'patientHP/:id', component: HpPatientComponent },
      { path: 'clinicAdminProfile', component: ProfileClinicAdminComponent },
      { path: 'examRooms/:id', component: ExamRoomsComponent },
      { path: 'examSurgeryTypes/:id', component: ExamSurgeryTypesComponent},
      { path: 'workCalendar', component: WorkCalendarComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }
      //{path: '**', redirectTo: 'login'},

    ]),
    BrowserAnimationsModule,
    //DatePicker
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    ApiService,
    ConfigService,
    UserService,
    ClinicalCenterAdminService,
    PatientService,
    ClinicService,
    ClinicAdminService,
    RoomService,
    TypesService,
    DiagnosisService,
    MedicationService
  ],
  entryComponents: [ //ovo mora da se doda za dijalog
    PasswordChangedDialogComponent,
    EditInfoDialogComponent,
    PasswordWrongDialogComponent,
    EditPasswordDialogComponent,
    FirstLoginDialogComponent,
    EditClinicDialogComponent,
    RejectRequestDialogComponent,
    NewRoomDialogComponent,
    InfoDialogComponent,
    UpdateRoomDialogComponent,
    NewTypeDialogComponent,
    UpdateTypeDialogComponent,
    NewDiagnosisDialogComponent,
    NewMedicationDialogComponent,
    EditDiagnosisDialogComponent,
    EditMedicationDialogComponent,
    MedicationDialogComponent,
    DiagnosisDialogComponent
    
  ],
  //schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
