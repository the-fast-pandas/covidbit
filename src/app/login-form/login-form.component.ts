// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 08, February, 2021, Teresa Costa, added integration with authentication, database
//           04, March,    2021, Teresa Costa, added warnings from the server (local_storage)

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth-services/auth.service';
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

  constructor(public authService: AuthService, public router: Router) { 
    if (localStorage.getItem('server_warning') === 'true') {  // Controls messages from server
      this.serverWarning = true;
    }
  }

  ngOnInit(): void {
    this.loginCredentials = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
    localStorage.removeItem('server_warning'); // Controls messages from server
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
  }

  // Cheks login credentials
  onSubmit() {
    this.authService.logIn(this.loginCredentials.value);
  }

  onClose() {
    this.alert = false;
    this.authService.logIn(this.loginCredentials.value).unsubscribe();
  }
}