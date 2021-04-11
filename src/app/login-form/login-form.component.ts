// Server - CovidBit - Fast Pandas
// Created:  10, January, 2021, John Turkson, component implementation
// Modified: 08, February, 2021, Teresa Costa, added integration with authentication, database

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
// Local Services
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  // Form Variables
  loginCredentials: FormGroup = new FormGroup({});

  // Alert variables
  alert: Boolean = false;
  serverWarning: Boolean = false;
  newPassword: Boolean = false;
  authWarning: Boolean = false;

  constructor(public auth: AuthService, public router: Router) {
    if (sessionStorage.getItem('server_warning') === 'true') {
      this.serverWarning = true;
    } else if (sessionStorage.getItem('new_password') === 'true') {
      this.newPassword = true;
    } else if (sessionStorage.getItem('auth_warning') === 'true') {
      this.authWarning = true;
    }
  }

  ngOnInit(): void {
    this.loginCredentials = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
    sessionStorage.removeItem('server_warning');
    sessionStorage.removeItem('auth_warning');
  }

  // Checks for form validation
  checkLoginForm() {
    if (this.loginCredentials.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
  }

  // SubmitsloginForm credentials
  onSubmit() {
    this.auth.loginForm(this.loginCredentials.value);
  }

  // Closes the warning box for the server errors
  onCloseServer() {
    this.serverWarning = false;
    this.newPassword = false;
    this.authWarning = false;
    sessionStorage.removeItem('new_password');
    sessionStorage.removeItem('auth_warning');
  }

  onClose() {
    this.alert = false;
    this.auth.loginForm(this.loginCredentials.value).unsubscribe();
    sessionStorage.removeItem('server_warning'); // Controls messages from server
    sessionStorage.removeItem('auth_warning');
  }
}