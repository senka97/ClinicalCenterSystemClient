import { PatientService } from './service/patient.service';
import { UserService } from './service/user.service';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { ApiService } from './service/api.service';
import { ConfigService } from './service/config.service';
import { AuthService } from './service/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HpDoctorComponent } from './hp-doctor/hp-doctor.component';
import { ListPatientsComponent } from './hp-doctor/list-patients/list-patients.component';
import { PatientDetailsComponent } from './hp-doctor/patient-details/patient-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HpDoctorComponent,
    ListPatientsComponent,
    PatientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent},
      {path: 'doctorHP', component: HpDoctorComponent,
       children:[
        {
           path: 'listOfPatients',
           component: ListPatientsComponent,
           outlet: 'hpDoctor',
           children:[
            {
              path: 'patientDetails/:id',
              component: PatientDetailsComponent,
              outlet: 'hpDoctor'
            }
           ]
        },
        
      ]},
      {path: '', redirectTo : 'login', pathMatch: 'full'},
      //{path: '**', redirectTo: 'login'},
    ])
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
    PatientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
