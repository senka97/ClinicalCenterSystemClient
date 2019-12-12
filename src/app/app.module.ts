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
import {MatDatepickerModule,MatNativeDateModule,MatProgressSpinnerModule} from '@angular/material' //Date picker
import {MatFormFieldModule} from '@angular/material/form-field';
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
import { ClinicService } from './service/clinic.service';


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
    RegisterClinicAdminComponent, ClinicListComponent
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
      {path: '', redirectTo : 'login', pathMatch: 'full'}
      //{path: '**', redirectTo: 'login'},

    ]),
    BrowserAnimationsModule,
    //DatePicker
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
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
    ClinicService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
