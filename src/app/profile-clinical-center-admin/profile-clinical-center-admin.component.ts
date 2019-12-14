import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Router} from '@angular/router';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { ModalService } from '../_modal';
import { PasswordChanger } from '../shared/model/PasswordChanger';
import { PasswordWrongDialogComponent } from '../shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { EditPasswordDialogComponent } from '../shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { FirstLoginDialogComponent } from './../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangedDialogComponent } from '../shared/dialogs/password-changed-dialog/password-changed-dialog.component';

@Component({
  selector: 'app-profile-clinical-center-admin',
  templateUrl: './profile-clinical-center-admin.component.html',
  styleUrls: ['./profile-clinical-center-admin.component.css']
})
export class ProfileClinicalCenterAdminComponent implements OnInit {

  constructor(private _userService:UserService, 
    private _dialog: MatDialog,
    private _clinicalCenterAdminService: ClinicalCenterAdminService,
    private _authService:AuthService,
    private _router: Router,
    private _modalService: ModalService) {
     
    }

  private _currentAdmin: any;
  private _changedAdmin: any;
  private _passwordChanger: PasswordChanger;
  private userRequests: any[];
  editInformation: boolean= true;
  newRequests: boolean;
  showNewRequests: boolean=false;

  ngOnInit() {
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this._changedAdmin = JSON.parse(JSON.stringify(this._currentAdmin)); 
    this._passwordChanger = new PasswordChanger("","");
    this._clinicalCenterAdminService.getNewRequests().subscribe( users => {
      this.userRequests = users;
      if(users.length==0)
      {
        this.newRequests=false;
      }
      else{
        this.newRequests=true;
      }
    })
    if(this._currentAdmin.passwordChanged == false){
      let ref1 = this._dialog.open(FirstLoginDialogComponent,{
          disableClose: true,
          width: '50%',
          data: this._passwordChanger
      });
    }
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

  editInformationF(): void {
    if(!this.editInformation) //ako je false onda treba da se sacuvaju podaci
    {
      //ako je neko polje ostavljeno prazno treba da ostane na ovoj formi i izbaci upozorenje
      if(this._changedAdmin.name.length == 0 || this._changedAdmin.surname.length == 0 || this._changedAdmin.address.length== 0 ||
      this._changedAdmin.city.length == 0 || this._changedAdmin.country.length == 0 || this._changedAdmin.phoneNumber.length == 0)
      {
        alert("You must fill all the fields");
        return;
      }
      //ako nije promenjena nijedna informacija nece se slati zahtev
      if(this._currentAdmin.name != this._changedAdmin.name || this._currentAdmin.surname != this._changedAdmin.surname
        || this._currentAdmin.address != this._changedAdmin.address || this._currentAdmin.city != this._changedAdmin.city 
        || this._currentAdmin.country != this._changedAdmin.country || this._currentAdmin.phoneNumber != this._changedAdmin.phoneNumber)
        {
          this._userService.editInfo(this._changedAdmin).subscribe(data=>{
            console.log("Information changed");
            localStorage.setItem('currentUser',JSON.stringify(this._changedAdmin)); 
            this._currentAdmin = JSON.parse(JSON.stringify(this._changedAdmin));
            alert("Information successfully changed!");
         },
          error=>{
            this.editInformation=!this.editInformation;
           alert("Change of information failed!");
          })
          
        }

        this.editInformation=!this.editInformation;
          
    }
    else
    {
      this.editInformation=!this.editInformation;
    }
    
    
  }

  clickedLogout(): void {
    this._authService.logout();
  }

  clickRegisterClCAdmin(): void {
    this._router.navigate(['/registerClinicalCenterAdmin']);
  }

  clickRegisterClinicAdmin(): void {
    this._router.navigate(['/registerClinicAdmin']);
  }

  clickRegisterClinic(): void {
    this._router.navigate(['/registerClinic']);
  }

  clickNewRequest() {
    this.showNewRequests=!this.showNewRequests;
  }

  clickAcceptRequest(id)
  {
    this._clinicalCenterAdminService.acceptRequest(id).subscribe(data=>{
      this._clinicalCenterAdminService.getNewRequests().subscribe( users => {
        this.userRequests = users;
        if(users.length==0)
        {
          this.newRequests=false;
          this.showNewRequests=false;
        }
      })
    },
    error=>{
      console.log("Error accepting request");
    })
  }

  clickRejectRequest(id)
  {
    this._clinicalCenterAdminService.rejectRequest(id).subscribe(data=>{
      this._clinicalCenterAdminService.getNewRequests().subscribe( users => {
        this.userRequests = users;
        if(users.length==0)
        {
          this.newRequests=false;
          this.showNewRequests=false;
        }
      })
    },
    error=>{
      console.log("Error rejecting request");
    })
  }

  clickedChangePassword(){
    this._passwordChanger = new PasswordChanger("","");
    let dialogRef = this._dialog.open(EditPasswordDialogComponent, {
         width: '50%',
         data: this._passwordChanger
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined){
        this._passwordChanger = result;
        this._authService.changePassoword(this._passwordChanger).subscribe(
          res => {
            let dialogRef1 = this._dialog.open(PasswordChangedDialogComponent, {
              width: '50%'
            });
    
            dialogRef1.afterClosed().subscribe(result => {
             this._authService.logout(); 
             this._router.navigate(['\login']);
           });
          },
           error => {
            let dialogRef2 = this._dialog.open(PasswordWrongDialogComponent, {
              width: '50%'
            }); 
           }
           );
        
       }
    });

  }

  /*closeModal(id: string) {
    this._modalService.close(id); 
  }
  closeModalWithSave(id: string)
  {
    this._authService.changePassoword(this._passwordChanger).subscribe(
      res => {
        alert("Password successfully changed. Please log in to confirm your changes.");
        this._authService.logout(); 
        this._router.navigate(['\login']);
      },
      error => {
        alert("Password changing failed");
      }
    )
    this._modalService.close(id); 
  }*/

}
