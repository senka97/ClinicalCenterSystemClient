import { Time } from '@angular/common';
import { Medication } from './Medication';
import { Diagnosis } from './Diagnosis';
import { Doctor } from './Doctor';

export class MedicalReport {

    id: number;
    description: String;
    date: any;
    time: any;
    diagnoses: Diagnosis[];
    medications: Medication[];
    doctor: Doctor;

    constructor(){
        this.description="";
        
        
    }
    
}