// Server - CovidBit - Fast Pandas
// Created: 08, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
// Local Services
import { DataService } from '../../services/data-services/data.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  // Form variable
  loginId: FormGroup = new FormGroup({});

  // Alert Control
  alert: Boolean = false;
  serverWarning: Boolean = false;

  constructor(public data: DataService, public router: Router) { 
    if (localStorage.getItem('new_password_warning') === 'true') {  
      this.serverWarning = true;
    }
  }

  ngOnInit(): void {
    this. loginId = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    })
    localStorage.removeItem('new_password_warning');
  }

  checkLoginForm() {
    if (this. loginId.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
  }

  // Closes the warning box for the server errors
  onCloseServer() {
    this.serverWarning = false;
    localStorage.removeItem('new_password_warning');
  }

  // ChecksloginForm credentials
  onSubmit() {
    this.data.requestNewPassword(this.loginId.value);
  }

  onClose() {
    this.alert = false;
    this.data.requestNewPassword(this.loginId.value).unsubscribe();
  }

}
