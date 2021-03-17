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

  typesList: Array<String> = [];

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

  }

  searchForBusiness() {

    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.adm.searchUserAdm(this.businessName).subscribe(
      data => {
        // this.typesList = data;
        if (this.typesList === []) {
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

  onSubmit() {
    console.log(this.caseResults.value);
  }

}