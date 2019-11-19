import { ApiService } from './service/api.service';
import { ConfigService } from './service/config.service';
import { AuthService } from './service/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepagePatientComponent } from './homepage-patient/homepage-patient.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepagePatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'patientHP', component: HomepagePatientComponent},
      {path: '', redirectTo : 'login', pathMatch: 'full'}
    ])
  ],
  providers: [
    AuthService,
    ApiService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
