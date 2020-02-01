import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'
import { Appointment } from 'src/app/hp-patient/appointments-list/Appointment'
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {
  appointments : Appointment[] =[
    {name: 'Petar', date: '20.12.2019.', time: '14:30', type: 'Pregled'},
    {name: 'Petar', date: '20.12.2019.', time: '15:00', type: 'Pregled'},
    {name: 'Petar', date: '20.12.2019.', time: '15:30', type: 'Pregled'},
    {name: 'Petar', date: '20.12.2019.', time: '16:00', type: 'Pregled'},
    {name: 'Petar', date: '20.12.2019.', time: '17:00', type: 'Pregled'},
  ];

  sortedAppointments : Appointment[];
  @Input("doctor") doctor : any;
  constructor() { }

  ngOnInit() {
    this.sortedAppointments = this.appointments;
  }
  sortData(sort: Sort) {
   
    const data = this.appointments.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAppointments = data;
      return;
    }

    this.sortedAppointments = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'time': return compare(a.time, b.time, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}