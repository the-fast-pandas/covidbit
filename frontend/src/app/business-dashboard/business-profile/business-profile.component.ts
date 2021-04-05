// Server - CovidBit - Fast Pandas
// Created:  10, February, 2021, Valya Derksen
// Modified: 25, February, 2021, Teresa Costa: backend integration, added global variables

import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// Local Services
import { DataService } from '../../services/data-services/data.service';
import { AuthService } from '../../services/auth-services/auth.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})

export class BusinessProfileComponent implements OnInit, AfterContentChecked {

  //Form Group
  userProfile: FormGroup = new FormGroup({});

  // Initialization Data
  id: String = myGlobals.emptyField;
  businessName: String = myGlobals.emptyField;
  firstName: String = myGlobals.emptyField;
  lastName: String = myGlobals.emptyField;
  businessLocation: String = myGlobals.emptyField;
  businessPhone: String = myGlobals.emptyField;
  email: String = myGlobals.emptyField;
  webSite: String = myGlobals.emptyField;
  businessType: String = myGlobals.emptyField;

  //Business Types Array
  businessTypes = myGlobals.categories;

  constructor(private activatedRoute: ActivatedRoute, public data: DataService, private ref: ChangeDetectorRef, public auth: AuthService) { }

  ngOnInit(): void {
    this.userProfile = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required]),
      businessLocation: new FormControl('', [Validators.required]),
      businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      webSite: new FormControl('')
    })

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
          this.email = data.user.loginId;
          this.businessType = data.user.businessType;
          this.webSite = data.user.website;
        })
  }

  // Detects chnages many by the user
  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  // Form is submited with new changes
  onSubmit() {
    this.auth.editProfile(this.userProfile.value, this.id);
  }

  public handleAddressChange(address: any) {
    this.userProfile.get('businessLocation')?.setValue(address.formatted_address);
  }
}