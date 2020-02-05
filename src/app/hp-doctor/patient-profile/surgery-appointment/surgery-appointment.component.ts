import { Component, OnInit,Input } from '@angular/core';
import { TypeReg } from 'src/app/shared/model/TypeReg';
import { DoctorService } from 'src/app/service/doctor.service';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-surgery-appointment',
  templateUrl: './surgery-appointment.component.html',
  styleUrls: ['./surgery-appointment.component.css']
})
export class SurgeryAppointmentComponent implements OnInit {
  private _date: any;
  private _selectedType: TypeReg;

  @Input("_surgeryTypes") _surgeryTypes : any;
  @Input("_doctor") doctor: any;
  private doctorReq: any;
  @Input("_patientId") _patientId : any;

  constructor(private _doctorService: DoctorService,private _notifier : NotifierService) { }

  ngOnInit() {
  }

}
