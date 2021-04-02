// Server - CovidBit - Fast Pandas
// Created: 08, March, 2021, Teresa Costa

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
// Local Services
import { DataService } from '../../services/data-services/data.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  // Form variable
  newPassword: FormGroup = new FormGroup({});

  // Allows for access
  token: String = myGlobals.emptyField;

  // Alert Control
  alert: Boolean = false;
  serverWarning: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute, public data: DataService, public router: Router) {
    if (localStorage.getItem('server_warning') === 'true') {
      this.serverWarning = true;
    }
  }

  ngOnInit(): void {
    this.newPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
    this.token = this.activatedRoute.snapshot.params['token'];
    this.data.checkValidNewPassword(this.token);
  }

  // Checks for form validation
  checkLoginForm() {
    if (this.newPassword.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
  }

  // Submits login credentials
  onSubmit() {
    this.data.setNewPassword(this.newPassword.value, this.token);
  }

  onClose() {
    this.alert = false;
    this.data.setNewPassword(this.newPassword.value, this.token).unsubscribe();
  }
  
}