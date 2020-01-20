import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    this.view = CalendarView.Month;
    this.viewDate =  new Date();
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let tempRole = this._currentUser.authorities[0]['authority'];;
    if(tempRole == "ROLE_DOCTOR"){ //ovde ucitati preglede trenutnog doktora
      this._role = "doctor";
    }else{
      this._role = "nurse";
    }
    
  }

  _role: String;
  _currentUser: any;
  view: CalendarView;
  viewDate: Date;

  events: CalendarEvent[] = [ //primer cisto da nesto ima
    {
      title: 'Appointment',
      start: new Date("Fri Jan 24 2020 07:00:00 AM"),
      end: new Date("Fri Jan 24 2020 08:00:00 AM")
    },
    {
      title: 'Appointment Today',
      start: new Date()
    }
  ];

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

  clickedBack() : void
  {
    if(this._role == "doctor"){
        this._router.navigate(['/doctorHP']);
    }else{
        this._router.navigate(['/nurseHP']);
    }
  }

}
