import { FirstLoginDialogComponent } from './../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { PasswordWrongDialogComponent } from '../shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { EditPasswordDialogComponent } from '../shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { UserService } from './../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { PasswordChanger } from '../shared/model/PasswordChanger';
import { EditInfoDialogComponent } from '../shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { UserEdit } from '../shared/model/UserEdit';
import { PasswordChangedDialogComponent } from '../shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-clinic-admin',
  templateUrl: './profile-clinic-admin.component.html',
  styleUrls: ['./profile-clinic-admin.component.css']
})
export class ProfileClinicAdminComponent implements OnInit {

  constructor(private _authService: AuthService, private _dialog: MatDialog, private _userService: UserService, private _router: Router) { }

  private _currentAdmin: any;
  private _changedAdmin: any;
  private _showInfo: boolean;
  private _showEditInfo: boolean;
  private _showChangePassword: boolean;
  private _passwordChanger: PasswordChanger;
  private _confirmPassword: String;
  private _showError: boolean;

  ngOnInit() {
    
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this._changedAdmin = JSON.parse(JSON.stringify(this._currentAdmin));
    this._passwordChanger = new PasswordChanger("","");
    if(this._currentAdmin.passwordChanged == false){
    let ref1 = this._dialog.open(FirstLoginDialogComponent,{
        disableClose: true,
        width: '50%',
        data: this._passwordChanger
    });
  }

  }

  clickedEdit(){

       let dialogRef = this._dialog.open(EditInfoDialogComponent, {
         width: '50%',
         data: JSON.parse(JSON.stringify(this._currentAdmin))
       });
       dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result != undefined){
        this._changedAdmin = result;
        if(this._currentAdmin.name != this._changedAdmin.name || this._currentAdmin.surname != this._changedAdmin.surname
          || this._currentAdmin.address != this._changedAdmin.address || this._currentAdmin.city != this._changedAdmin.city 
          || this._currentAdmin.country != this._changedAdmin.country || this._currentAdmin.phoneNumber != this._changedAdmin.phoneNumber){
              let userEdit = new UserEdit(this._changedAdmin.name, this._changedAdmin.surname,this._changedAdmin.address,
              this._changedAdmin.city, this._changedAdmin.country, this._changedAdmin.phoneNumber);
              this._currentAdmin = JSON.parse(JSON.stringify(this._changedAdmin));
              this._userService.editInfo(userEdit).subscribe(res => {
                localStorage.setItem('currentUser',JSON.stringify(this._changedAdmin)); //postavim da je taj izmenjeni sada trenutno ulogovan
      });
        }
      }
      });
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

  clickedLogout(){
       this._authService.logout();
  }

}
