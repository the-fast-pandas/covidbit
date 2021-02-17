// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 08, February, 2021, Teresa Costa: backend integration

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
  alert: Boolean = false;

  constructor(public authService: AuthService, public router: Router) { }

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
    this.authService.logIn(this.loginCredentials.value);
  }

  onClose() {
    this.alert = false;
  }

}