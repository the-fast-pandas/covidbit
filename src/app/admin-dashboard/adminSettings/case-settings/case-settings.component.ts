import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AdmService } from '../../../services/adm-services/adm.service';
import { BusinessName } from '../../../models/businessName.model';


@Component({
  selector: 'app-case-settings',
  templateUrl: './case-settings.component.html',
  styleUrls: ['./case-settings.component.scss']
})
export class CaseSettingsComponent implements OnInit {

  genderArray = [{ name: "Male"}, { name: "Female" }];

  foundBusinesses: Array<String> = [];
  casesIDList: Array<String> = [];
  listOfBusinesses: Array<String> = [];

  displayCaseList = false;
  searchCheck = false
  checked: Boolean = false;

  caseResults: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});
  businessName: BusinessName = { name: '' };

  newCaseInformation: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, public adm: AdmService) {
    this.caseResults = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    })
  }


  ngOnInit(): void {

    this.newCaseInformation = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      acquisition: new FormControl('', [Validators.required])
    })

    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });

    //Fill Dropdown List with businesses from the Database
    this.adm.searchUserAdm(this.businessName).subscribe(
      data => {
        console.log(data.myUsers);
        this.fillDropdownList(data);
        console.log(this.listOfBusinesses);
      }
    );

  }

  searchForBusiness() {
    //Clear Arrays that hold information
    this.foundBusinesses = [];
    this.casesIDList = [];

    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.adm.searchUserCases(this.businessName).subscribe(
      data => {
        console.log(data)
        
        if (this.foundBusinesses.length === 0) {
          this.searchCheck = true;
          this.displayCaseList = false;
        } else {
          this.displayCaseList = true;
          this.searchCheck = false;
        }
      }
    );
  }

  toggle(checked: Boolean) {
    this.checked = checked;
    console.log(checked);
  }

  convertToValue(key: string) {
    return this.caseResults.value[key].map((x: any, i: any) => !1)
  }

  tabReset() {
    this.displayCaseList = false;
    this.searchCheck = false;
    this.businessSearch.get('searchedBusiness')?.setValue('');
  }

  getCheckedValue(event: any) {
    const checkArray: FormArray = this.caseResults.get('checkArray') as FormArray;

    if (event.target.checked) {
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

  fillDropdownList(data: any) {
    for (let i = 0; i < data.myUsers.length; i++) {
        this.listOfBusinesses.push(data.myUsers[i].businessName);
    }
  }

  getBusinesses(data: any) {
    for (let i = 0; i < Object.keys(data).length; i++) {

      if (data.myUsers[i].businessName == this.businessSearch.get('searchedBusiness')?.value) {
        this.foundBusinesses.push(data.myUsers[i].businessName);
        this.casesIDList.push(data.myUsers[i]._id);
      }

    }
  }

  onSubmit() {
    console.log(this.caseResults.value);
  }

}