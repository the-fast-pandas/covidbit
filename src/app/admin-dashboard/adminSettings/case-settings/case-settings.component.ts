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

  searchCheck = false;
  checked: Boolean = false;

  caseResults: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.caseResults = new FormGroup({
      cases: this.formBuilder.array(this.typesList.map(x => !1),  Validators.required)
    });

  }

  searchForBusiness(){
    this.searchCheck = true;
  }

  toggle(checked: Boolean){
    this.checked = checked;
    console.log(checked);
  }

  convertToValue(key: string) {
    return this.caseResults.value[key].map((x: any, i: any) => !1)
  }
  

  onSubmit(){
    console.log(this.caseResults.controls.cases.value);
  }

}
