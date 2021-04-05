// Server - CovidBit - Fast Pandas
// Created: 20, MArch, 2021, Yevgeniya Anasheva

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Local Services
import { DataService } from '../../services/data-services/data.service';
import { AuthService } from '../../services/auth-services/auth.service';
import { SafetyMeasures } from '../../models/safetyMeasures.model';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.scss']
})
export class CertificationFormComponent implements OnInit {

  // From Group
  userCredentials: FormGroup = new FormGroup({});

  // Form Variables
  id: String = myGlobals.emptyField;
  businessName: String = myGlobals.emptyField;
  firstName: String = myGlobals.emptyField;
  lastName: String = myGlobals.emptyField;
  businessLocation: String = myGlobals.emptyField;
  businessPhone: String = myGlobals.emptyField;
  email: String = myGlobals.emptyField;
  webSite: String = myGlobals.emptyField;
  businessType: String = myGlobals.emptyField;

  // Alert Control
  acceptedGuidelines: Boolean = false;

  safetyMeasureList: Array<SafetyMeasures> = [];
  safetyMeasure: SafetyMeasures = { title: myGlobals.emptyField, description: myGlobals.emptyField , confirmed: myGlobals.emptyField}

  constructor(public auth: AuthService, public router: Router, public data: DataService, private activatedRoute: ActivatedRoute, private location: Location) { 
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getUserView(id)
      .subscribe(
        data => {
          this.id = data.user._id;
          this.businessName = data.user.businessName;
          this.firstName = data.user.firstName;
          this.lastName = data.user.lastName;
          this.businessPhone = data.user.phoneNumber;
          this.businessLocation = data.user.location;
          this.businessType = data.user.businessType;
          this.safetyMeasureList = data.user.safetyMeasures;
        })
  }

  ngOnInit(): void {
    this.userCredentials = new FormGroup({
      guidelines: new FormGroup({
        acceptedGuidelines: new FormControl('', [Validators.required])
      }),
      safetyMeasures: new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      })
    })
  }

  onSubmit(): void {
    this.auth.addCertification(this.userCredentials.value, this.id);
  }

  backClicked() {
    this.location.back();
  }

  acceptGuidelines() {
    if(this.acceptedGuidelines)
      this.acceptedGuidelines = false;
    else
      this.acceptedGuidelines = true;
  }

}
