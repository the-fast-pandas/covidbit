import { TemplateRef } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

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
  searchCheck = false;
  displayList = false;

  typesList = [
    {name: "Business #1"},
    {name: "Business #2"},
    {name: "Business #3"},
  ]

  businessTypes = [
    { name: "Restaurant" },
    { name: "Boutique" },
    { name: "Specialized Skill" },
    { name: "Food and Hospitality" },
    { name: "IT and Internet" },
    { name: "Business" },
    { name: "Labor" }
  ]

  constructor(private formBuilder: FormBuilder) {}

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
      businesses: this.formBuilder.array(this.typesList.map(x => !1),  Validators.required)
    });
    
  }

  
  verifyInfo(){
    console.log(this.businessCredentials.value)
    this.alert = true;
    this.businessCredentials.reset();
  }

  removeBusiness(){
    console.log(this.businessList.value);
  }

  searchForBusiness(){

    if (this.businessSearch.get('searchedBusiness')?.value === '')
    {
      console.log(this.displayList)
      this.searchCheck = true;
      this.displayList = false;
    }
    else {
      this.displayList = true;
      this.searchCheck = false;
    }

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

}
