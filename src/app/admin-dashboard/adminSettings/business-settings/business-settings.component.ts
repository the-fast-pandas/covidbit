// Server - CovidBit - Fast Pandas
// Created:             2021, John T
// Modified: 04, March, 2021, Teresa Costa: backend integration, global variables


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-services/auth.service';
import * as myGlobals from '../../../globals';
import { AdmService } from '../../../services/adm-services/adm.service';
import { BusinessName } from '../../../models/businessName.model';

@Component({
  selector: 'app-buisness-settings',
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.scss']
})
export class MapSettingsComponent implements OnInit {

  businessCredentials: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});
  businessList: FormGroup = new FormGroup({});
  businessLocation = '';
  alert: Boolean = false;
  searchCheck: Boolean = false;
  displayList: Boolean = false;

  businessName: BusinessName = { name: '' };

  typesList: Array<String> = [];
  idList: Array<String> = [];

  //Business Types Array
  businessTypes = myGlobals.categories;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public admService: AdmService) { }

  ngOnInit(): void {

    this.businessCredentials = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      businessType: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      businessLocation: new FormControl('', [Validators.required]),
    })
    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });

    this.businessList = new FormGroup({
      businesses: this.formBuilder.array(this.typesList.map(x => !1), Validators.required)
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
    this.authService.registerUser(this.businessCredentials.value, true);
    this.alert = true;
    this.businessCredentials.reset();
  }

  // Controls delete of a Business User
  removeBusiness() {
    this.admService.deleteUserAdm(this.idList);
  }

  // Search business by name
  // Controls search business for delete
  searchForBusiness() {
    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.admService.searchUserAdm(this.businessName).subscribe(
      data => {
        console.log(data.myUsers);
        this.getNames(data);
        this.getId(data);
        if (this.typesList === []) {
          this.searchCheck = true;
          this.displayList = false;
        } else {
          this.displayList = true;
          this.searchCheck = false;
        }
      }
    );
  }

  // Adds business names to typesList
  getNames(data: any) {
    for (let i = 0; i < Object.keys(data).length; i++) {
      this.typesList.push(data.myUsers[i].businessName);
    }
  }

  // Get businesses id
  getId(data: any) {
    for (let i = 0; i < Object.keys(data).length; i++) {
      this.idList.push(data.myUsers[i]._id);
    }
  }

  onClose() {
    this.alert = false;
  }

}

