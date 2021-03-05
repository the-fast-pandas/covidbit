// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 08, February, 2021, Teresa Costa, added integration with authentication, database
//           04, March,    2021, Teresa Costa, added warnings from the server

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth-services/auth.service';
import { Router } from '@angular/router';
import { windowCount } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  loginCredentials: FormGroup = new FormGroup({});
  alert: Boolean = false;
  serverWarning: Boolean = false;

  constructor(public authService: AuthService, public router: Router) {
  }
 

  ngOnInit(): void {
    this.loginCredentials = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  

  }

  checkLoginForm() {
    if (this.loginCredentials.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
  }

  onSubmit() {
    let result = this.authService.logIn(this.loginCredentials.value);
    console.log(result);
    this.serverWarning = this.authService.serverWarning;
  }

  onClose() {
    this.alert = false;
  }

  onCloseServer() {
    this.serverWarning = false;
  }

}