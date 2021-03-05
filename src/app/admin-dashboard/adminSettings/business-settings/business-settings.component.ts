import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth-services/auth.service';
import * as myGlobals from '../../../globals';
import { DataService } from '../../../data/data.service';
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

  //Business Types Array
  businessTypes = myGlobals.categories;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public dataService: DataService) { }

  ngOnInit(): void {

    this.businessCredentials = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      businessType: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
      businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      businessLocation: new FormControl('', [Validators.required])
    })

    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });

    this.businessList = new FormGroup({
      businesses: this.formBuilder.array(this.typesList.map(x => !1), Validators.required)
    });

  }

  // Controls adding/register a business
  addBusiness() {
    this.authService.addBusinessUser(this.businessCredentials.value);
    this.alert = true;
    this.businessCredentials.reset();
  }

  removeBusiness() {

  }

  // Controls search business for delete
  searchForBusiness() {
    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.dataService.searchUserAdm(this.businessName).subscribe(
      data => {
        this.getNames(data.users);
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

  tabReset() {
    this.displayList = false;
    this.searchCheck = false;
    this.businessCredentials.reset()
    this.businessSearch.get('searchedBusiness')?.setValue('');
  }

  onClose() {
    this.alert = false;
  }

  public handleAddressChange(address: any) {

    this.businessCredentials.get('businessLocation')?.setValue(address.formatted_address);
  }

  getNames(data: any) {
    const names = [...data];
    for (var name of names) {
      this.typesList.push(name.businessName);
    }
  }

}

