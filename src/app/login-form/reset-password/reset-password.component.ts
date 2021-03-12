// Server - CovidBit - Fast Pandas
// Created: 08, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  
  newPassword: FormGroup = new FormGroup({});

  // Error warnings
  alert: Boolean = false;
  serverWarning: Boolean = false;

  constructor(public authService: AuthService, public router: Router) { 
    if (localStorage.getItem('server_warning') === 'true') {  // Controls messages from server
      this.serverWarning = true;
    }
  }

  ngOnInit(): void {
    this.newPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  checkLoginForm() {
    if (this. newPassword.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
  }

  // Closes the warning box for the server errors
  onCloseServer() {
  }

  // Cheks login credentials
  onSubmit() {
    this.authService.logIn(this.newPassword.value);
  }

  onClose() {
    this.alert = false;
    this.authService.logIn(this.newPassword.value).unsubscribe();
  }

}
