import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  doctors: Doctor[] = [
    {name: 'Petar', surname: 'Peric', rating: 5, numberOfReviews: 270},
    {name: 'Mika', surname: 'Mikic', rating: 2, numberOfReviews: 10},
    {name: 'Zika', surname: 'Zikic', rating: 3, numberOfReviews: 2},
    {name: 'Ana', surname: 'Anic', rating: 4, numberOfReviews: 100},
    {name: 'Sanja', surname: 'Sanjic', rating: 3.37, numberOfReviews: 76},
  ];

 // private _selectedType: TypeReg;
  private _date: any;
  private _rating: Number;
  private _docName: String;
  private _docSurname: String;

  sortedDoctors : Doctor[];
  showTimes : boolean;
  constructor() { }

  ngOnInit() {
    this.sortedDoctors = this.doctors;
    this.showTimes = false;
   
  }
  showDoctorTimes(){


    if(this.showTimes == true){
      this.showTimes = false;
    }else{
      this.showTimes = true;
    }

  }
  sortData(sort: Sort) {
   
    const data = this.doctors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDoctors = data;
      return;
    }

    this.sortedDoctors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'rating': return compare(a.rating, b.rating, isAsc);
        case 'numberOfReviews': return compare(a.numberOfReviews, b.numberOfReviews, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}