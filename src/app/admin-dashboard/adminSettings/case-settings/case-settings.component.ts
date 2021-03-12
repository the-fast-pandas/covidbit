import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';

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

  constructor(private formBuilder: FormBuilder) {
    this.caseResults = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    })
   }

  ngOnInit(): void {

    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
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

  getCheckedValue(event: any) {
    const checkArray: FormArray = this.caseResults.get('checkArray') as FormArray;

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

  onSubmit(){
    console.log(this.caseResults.value);
  }

}
