// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 08, February, 2021, Teresa Costa: backend integration (checks database for user, registeres a new user in database)

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../services/auth-services/auth.service';
import { DataService } from '../services/data-services/data.service';
import { Router } from '@angular/router';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {

  // Error warnings
  alert: Boolean = false;
  serverWarning: Boolean = false;

  //Business Types Array
  businessTypes = myGlobals.categories;

  //Form Groups
  userCredentials: FormGroup = new FormGroup({});
  businessLocation = '';
  safetyMeasureList: any = [];

  constructor(public authService: AuthService, public router: Router, public dataService: DataService) {
    if (localStorage.getItem('server_warning') === 'true') {  // Controls messages from server
      this.serverWarning = true;
    }
  }

  ngOnInit(): void {
    this.userCredentials = new FormGroup({
      accountDetails: new FormGroup({
        businessName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        businessType: new FormControl('', [Validators.required]),
      }),
      businessDetails: new FormGroup({
        businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
        businessLocation: new FormControl('', [Validators.required])
      }),
      safetyMeasures: new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      })
    })
    localStorage.removeItem('server_warning'); // Controls messages from server
  }

  onSubmit(): void {
    this.authService.registerUser(this.userCredentials.value, false);
  }

  checkRegistrationForm() {
    if (this.userCredentials.controls.accountDetails.invalid) {
      this.alert = true;
    }
    else {
      if (this.dataService.getValidUser(this.userCredentials.value)) {
        this.alert = false;
      } else {
        this.alert = true;
      }
    }
  }

  // Closes the warning box for the server errors
  onCloseServer() {
    this.serverWarning = false;
  }

  checkBusinessInfoForm() {
    if (this.userCredentials.controls.businessDetails.invalid) {
      this.alert = true;
    } else {
      this.alert = false;
    }
  }

  onClose() {
    this.alert = false;
  }

  onAddMeasure() {

    const safetyMeasure = {
      title: this.userCredentials.get('safetyMeasures.title')?.value,
      description: this.userCredentials.get('safetyMeasures.description')?.value
    }
    this.safetyMeasureList.push(safetyMeasure);
    this.userCredentials.get('safetyMeasures.title')?.reset()
    this.userCredentials.get('safetyMeasures.description')?.reset()
    //console.log(this.userCredentials.value);  // this returns safetyMeasures: {title: null, description: null}
  }

  public handleAddressChange(address: any) {

    this.userCredentials.get('businessDetails.businessLocation')?.setValue(address.formatted_address);
  }

}