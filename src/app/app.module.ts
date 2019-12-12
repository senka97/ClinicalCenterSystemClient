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
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './_modal';

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
import { MatDialogModule } from '@angular/material/dialog'; //mora se instalirati ng @angular/material
import { PasswordChangedDialogComponent } from './shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { ProfileClinicAdminComponent } from './profile-clinic-admin/profile-clinic-admin.component';
import { EditInfoDialogComponent } from './shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { EditPasswordDialogComponent } from './shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { PasswordWrongDialogComponent } from './shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { FirstLoginDialogComponent } from './shared/dialogs/first-login-dialog/first-login-dialog.component';
import { EditClinicDialogComponent } from './profile-clinic-admin/edit-clinic-dialog/edit-clinic-dialog.component';



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
    PasswordChangedDialogComponent, 
    ProfileClinicAdminComponent, 
    EditInfoDialogComponent, 
    EditPasswordDialogComponent, 
    PasswordWrongDialogComponent, 
    FirstLoginDialogComponent, EditClinicDialogComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent},
      {path: 'patientHP', component: HpPatientComponent},
      {path: 'doctorHP', component: HpDoctorComponent,
       children:[
        {
           path: 'listOfPatients',
           component: ListPatientsComponent,
           outlet: 'hpDoctor',
        },
        
      ]},
      {path: 'clinicalCenterAdminProfile', component: ProfileClinicalCenterAdminComponent },
      {path: 'registerClinicalCenterAdmin', component: RegisterClinicalCenterAdminComponent},
      {path: 'registerClinicAdmin', component: RegisterClinicAdminComponent},
      {path: 'medicalStaffProfile', component: ProfileMedicalStaffComponent},
      {path: 'clinicAdminProfile', component: ProfileClinicAdminComponent},
      {path: '', redirectTo : 'login', pathMatch: 'full'}
      //{path: '**', redirectTo: 'login'},

    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
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
    ClinicAdminService,
    ClinicService
  ],
  entryComponents: [ //ovo mora da se doda za dijalog
    PasswordChangedDialogComponent,
    EditInfoDialogComponent,
    PasswordWrongDialogComponent,
    EditPasswordDialogComponent,
    FirstLoginDialogComponent,
    EditClinicDialogComponent
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
