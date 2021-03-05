import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-case-settings',
  templateUrl: './case-settings.component.html',
  styleUrls: ['./case-settings.component.scss']
})
export class CaseSettingsComponent implements OnInit {

  typesList = [
    {name: "Case #1"},
    {name: "Case #2"},
    {name: "Case #3"},
  ]

  displayCaseList = false;
  searchCheck = false
  checked: Boolean = false;

  caseResults: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });

    this.caseResults = new FormGroup({
      cases: this.formBuilder.array(this.typesList.map(x => !1),  Validators.required)
    });

  }

  searchForBusiness(){

    if (this.businessSearch.get('searchedBusiness')?.value === '')
    {
      console.log(this.displayCaseList)
      this.searchCheck = true;
      this.displayCaseList = false;
    }
    else {
      this.displayCaseList = true;
      this.searchCheck = false;
    }

    
  }

  toggle(checked: Boolean){
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

  onSubmit(){
    console.log(this.caseResults.controls.cases.value);
  }

}
