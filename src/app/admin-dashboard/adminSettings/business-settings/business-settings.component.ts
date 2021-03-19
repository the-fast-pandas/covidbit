// Server - CovidBit - Fast Pandas
// Created:             2021, John T
// Modified: 04, March, 2021, Teresa Costa: backend integration, global variables


import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-services/auth.service';
import * as myGlobals from '../../../globals';
import { AdmService } from '../../../services/adm-services/adm.service';
import { BusinessName } from '../../../models/businessName.model';

@Component({
  selector: 'app-business-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {

  businessCredentials: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});
  businessList: FormGroup = new FormGroup({});
  businessLocation = '';
  alert: Boolean = false;
  searchCheck = false;
  displayList = false;

  businessName: BusinessName = { name: '' };

  typesList: Array<String> = [];
  idList: Array<String> = [];

  //Business Types Array
  businessTypes = myGlobals.categories;

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

  }

  tabReset() {
    this.displayList = false;
    this.searchCheck = false;
    this.businessCredentials.reset()
    this.businessSearch.get('searchedBusiness')?.setValue('');
  }

  public handleAddressChange(address: any) {
    this.businessCredentials.get('businessLocation')?.setValue(address.formatted_address);
  }

  // Controls adding/register a business
  addBusiness() {
    this.auth.registerUser(this.businessCredentials.value, true);
    console.log(this.businessCredentials.value);
    this.alert = true;
    this.businessCredentials.reset();
  }

  // Controls delete of a Business User
  removeBusiness() {
    this.adm.deleteUserAdm(this.idList);
  }

  // Search business by name
  // Controls search business for delete
  searchForBusiness() {
    this.typesList = [];
    this.idList = [];

    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.adm.searchUserAdm(this.businessName).subscribe(
      data => {
        console.log(data)
        this.getNames(data);
        // this.getId(data);
        console.log(this.typesList);
        console.log(this.idList);

        if (this.businessSearch.get('searchedBusiness')?.value == '') {
          this.typesList = [];
        }

        if (this.typesList.length === 0) {
          this.searchCheck = true;
          this.displayList = false;
        } else {
          this.displayList = true;
          this.searchCheck = false;
        }
      }
    );
  }

  getCheckedValue(event: any) {
    const checkArray: FormArray = this.businessList.get('businesses') as FormArray;

    if(event.target.checked) {
      checkArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  // Adds business names to typesList
  getNames(data: any) {
    for (let i = 0; i < Object.keys(data).length; i++) {

      if (data.myUsers[i].businessName == this.businessSearch.get('searchedBusiness')?.value) {
        this.typesList.push(data.myUsers[i].businessName);
        this.idList.push(data.myUsers[i]._id);
      }

    }
  }

  // Get businesses id
  // getId(data: any) {
  //   for (let i = 0; i < Object.keys(data).length; i++) {
  //     this.idList.push(data.myUsers[i]._id);
  //   }
  // }

  onClose() {
    this.alert = false;
  }

}

