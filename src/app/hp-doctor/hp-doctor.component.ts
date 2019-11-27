import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hp-doctor',
  templateUrl: './hp-doctor.component.html',
  styleUrls: ['./hp-doctor.component.css']
})
export class HpDoctorComponent implements OnInit {

  constructor(private _userService:UserService) {

   }

   private _currentDoctor: any;

  ngOnInit() {
    
    this._currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

}
