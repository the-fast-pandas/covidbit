// Server - CovidBit - Fast Pandas
// Created:  01, February, 2021, John Turkson
// Modified: 08, February, 2021, Teresa Costa: backend integration (checks database for user, registeres a new user in database)

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
// Local Services
import { AuthService } from '../services/auth-services/auth.service';
import { DataService } from '../services/data-services/data.service';
import { SafetyMeasures } from '../models/schemas/safetyMeasures.model';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {

  // Alert Control
  alert: Boolean = false;
  serverWarning: Boolean = false;

  //Business Types Array
  businessTypes = myGlobals.categories;

  //Form Group
  userCredentials: FormGroup = new FormGroup({});

  businessLocation: String = myGlobals.emptyField;

  safetyMeasures: Array<SafetyMeasures> = [];
  safetyMeasure: SafetyMeasures = { title: myGlobals.emptyField, description: myGlobals.emptyField , confirmed: myGlobals.emptyField}

  constructor(public auth: AuthService, public router: Router, public data: DataService) {
    if (sessionStorage.getItem('server_warning') === 'true') {
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
    sessionStorage.removeItem('server_warning'); // Controls messages from server
  }

  onSubmit(): void {
    this.auth.registrationForm(this.userCredentials.value, this.safetyMeasures, false);
  }

  checkRegistrationForm() {
    if (this.userCredentials.controls.accountDetails.invalid) {
      this.alert = true;
    }
    else {
      if (this.data.getValidUser(this.userCredentials.value)) {
        this.alert = false;
      } else {
        this.alert = true;
      }
    }
  }

  checkBusinessInfoForm() {
    if (this.userCredentials.controls.businessDetails.invalid) {
      this.alert = true;
    } else {
      this.alert = false;
    }
  }

  onAddMeasure() {
    this.safetyMeasure.title = this.userCredentials.get('safetyMeasures.title')?.value;
    this.safetyMeasure.description = this.userCredentials.get('safetyMeasures.description')?.value;
    this.safetyMeasures.push(this.safetyMeasure);
    this.userCredentials.get('safetyMeasures.title')?.reset()
    this.userCredentials.get('safetyMeasures.description')?.reset()
  }

  public handleAddressChange(address: any) {
    this.userCredentials.get('businessDetails.businessLocation')?.setValue(address.formatted_address);
  }

  onCloseServer() {
    this.serverWarning = false;
  }

  onClose() {
    this.alert = false;
  }

}