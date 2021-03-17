// Server - CovidBit - Fast Pandas
// Created:  10,  January, 2021, John Turkson, component implementation
// Modified: 08, February, 2021, Teresa Costa, added integration with authentication, database

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../services/auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  loginCredentials: FormGroup = new FormGroup({});

  // Error warnings
  alert: Boolean = false;
  serverWarning: Boolean = false;
  newPassword: Boolean = false;
  authWarning: Boolean = false;

  constructor(public auth: AuthService, public router: Router) {
    if (localStorage.getItem('server_warning') === 'true') {  // Controls messages from server
      this.serverWarning = true;
    } else if (localStorage.getItem('new_password') === 'true') {  // Controls messages from server
      this.newPassword = true;
    } else if (localStorage.getItem('auth_warning') === 'true') {  // Controls messages from server
      this.authWarning = true;
    }
  }

  ngOnInit(): void {
    this.loginCredentials = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
    localStorage.removeItem('server_warning'); // Controls messages from server
    localStorage.removeItem('auth_warning');
  }

  checkLoginForm() {
    if (this.loginCredentials.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
  }

  // Closes the warning box for the server errors
  onCloseServer() {
    this.serverWarning = false;
    this.newPassword = false;
    this.authWarning = false;
    localStorage.removeItem('new_password');
    localStorage.removeItem('auth_warning');
  }

  // Cheks login credentials
  onSubmit() {
    this.auth.logIn(this.loginCredentials.value);
  }

  onClose() {
    this.alert = false;
    this.auth.logIn(this.loginCredentials.value).unsubscribe();
    localStorage.removeItem('server_warning'); // Controls messages from server
    localStorage.removeItem('auth_warning');
  }
 
}