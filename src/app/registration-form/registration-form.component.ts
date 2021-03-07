// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 08, February, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {

  alert: Boolean = false;

  //Business Types Array
  businessTypes = [
    { name: "Restaurant" },
    { name: "Boutique" },
    { name: "Specialized Skill" },
    { name: "Food and Hospitality" },
    { name: "IT and Internet" },
    { name: "Business" },
    { name: "Labor" }
  ]

  //Form Groups
  userCredentials: FormGroup = new FormGroup({});
  businessLocation = '';
  registeredUser: any;
  safteyMeasureList: any = [];

  constructor(public authService: AuthService, public router: Router) { }

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
      safteyMeasures: new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      })
    })

  }

  onSubmit(): void {
    this.authService.registerUser(this.userCredentials.value, false);
  }

  checkRegistrationForm() {

    if (this.userCredentials.controls.accountDetails.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }

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

    const safteyMeasure = {
      title: this.userCredentials.get('safteyMeasures.title')?.value,
      description: this.userCredentials.get('safteyMeasures.description')?.value
    }
    this.safteyMeasureList.push(safteyMeasure);
    this.userCredentials.get('safteyMeasures.title')?.reset()
    this.userCredentials.get('safteyMeasures.description')?.reset()
  }

  public handleAddressChange(address: any) {

    this.userCredentials.get('businessDetails.businessLocation')?.setValue(address.formatted_address);
  }

}