import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-patient',
  templateUrl: './homepage-patient.component.html',
  styleUrls: ['./homepage-patient.component.css']
})
export class HomepagePatientComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  onClickedLogout(){
        this._authService.logout();
        
  }

  ngOnInit() {
  }

}
