// Server - CovidBit - Fast Pandas
// Created:  16, February, 2021, John Turkson
// Modified: 04, March, 2021, Teresa Costa: backend integration, global variables
//           20, March, 2021, John Turkson: improvements on backend/frontend integration
//           28, March, 2021, Teresa Costa: added invitations component, delete works

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// Local Service
import { AuthService } from '../../../services/auth-services/auth.service';
import { AdmService } from '../../../services/adm-services/adm.service';
// Models
import { BusinessName } from '../../../models/businessName.model';
import { Email } from '../../../models/email.model';
import { SafetyMeasures } from '../../../models/safetyMeasures.model';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {

  //Business types
  businessTypes = myGlobals.categories;

  // Form instances
  businessList: FormGroup = new FormGroup({});
  businessCredentials: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});
  businessInvitation: FormGroup = new FormGroup({});

  businessLocation = '';
  emailInvitation: Email = { email: '' };
  businessName: BusinessName = { name: 'empty' };

  // Check boolean
  alertBusinessCreated: Boolean = false;
  alertBusinessRemoved: Boolean = false;
  alertBusinessInvitationSent: Boolean = false
  searchCheck: Boolean = false;
  displayList: Boolean = false;

  namesList: Array<String> = [];
  idList: Array<String> = [];
  safetyMeasures: Array<SafetyMeasures> = [];

  constructor(private formBuilder: FormBuilder, public auth: AuthService, public adm: AdmService) {
    this.businessList = this.formBuilder.group({
      businesses: this.formBuilder.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.businessCredentials = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      businessType: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      businessLocation: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    })
    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });
    this.businessInvitation = new FormGroup({
      emailInvitation: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  // (onAdressChange) handler
  handleAddressChange(address: any) {
    this.businessCredentials.get('businessLocation')?.setValue(address.formatted_address);
  }

  // (ngSubmit)
  addBusiness() {
    this.auth.registrationForm(this.businessCredentials.value, this.safetyMeasures, true);
    this.alertBusinessCreated = true;
    this.businessCredentials.reset();
  }

  // (ngSubmit)
  removeBusiness() {
    this.adm.deleteUserAdm(this.idList).subscribe(
      data => {
        this.alertBusinessRemoved = true;
        this.businessSearch.reset();
        this.namesList = [];
        this.idList = [];
      }
    );
  }

  // (change) handler
  getCheckedValue(event: any) {
    let checkArray: FormArray = this.businessList.get('businesses') as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(event.target.value));
    } else {
      let index: number = 0;
      checkArray.controls.forEach(
        (item: AbstractControl) => {
          if (item.value == event.target.value) {
            checkArray.removeAt(index);
            return;
          }
          index++;
        });
    }
  }

  // (ngSubmit)
  inviteBusiness() {
    this.emailInvitation.email = this.businessInvitation.get('emailInvitation')?.value;
    this.adm.inviteNewUser(this.emailInvitation).subscribe(
      data => {
        this.alertBusinessInvitationSent = true;
        this.businessInvitation.reset();
      }
    )
  }

  // (ngSubmit)
  searchForBusiness() {
    this.namesList = [];
    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.adm.getUserAdm(this.businessName).subscribe(
      data => {
        this.getNames(data);
        if (this.businessSearch.get('searchedBusiness')?.value == '') {
          this.namesList = [];
        }
        if (this.namesList.length === 0) {
          this.searchCheck = true;
          this.displayList = false;
        } else {
          this.displayList = true;
          this.searchCheck = false;
        }
      }
    );
  }

  // (changeTab)
  tabReset() {
    this.displayList = false;
    this.searchCheck = false;
    this.businessCredentials.reset()
    this.businessSearch.get('searchedBusiness')?.setValue('');
  }

  // Called by searchForBusiness()
  // Returns a list of names and a a list of correspondent ids
  getNames(data: any) {
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data.users[i] !== undefined) {
        if (data.users[i].businessName === this.businessSearch.get('searchedBusiness')?.value) {
          this.namesList.push(data.users[i].businessName);
          this.idList.push(data.users[i]._id);
        }
      }
    }
  }

  // Removes alert messages
  onClose() {
    this.alertBusinessCreated = false;
    this.alertBusinessRemoved = false;
    this.alertBusinessInvitationSent = false;
  }

}