import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmService } from '../../../services/adm-services/adm.service';
import { BusinessName } from '../../../models/businessName.model';

@Component({
  selector: 'app-case-settings',
  templateUrl: './case-settings.component.html',
  styleUrls: ['./case-settings.component.scss']
})
export class CaseSettingsComponent implements OnInit {

  typesList: Array<String> = [];

  displayCaseList = false;
  searchCheck = false
  checked: Boolean = false;

  caseResults: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});

  businessName: BusinessName = { name: '' };

  constructor(private formBuilder: FormBuilder, public admService: AdmService) { }

  ngOnInit(): void {

    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });

    this.caseResults = new FormGroup({
      cases: this.formBuilder.array(this.typesList.map(x => !1), Validators.required)
    });

  }

  searchForBusiness() {

    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.admService.searchUserAdm(this.businessName).subscribe(
      data => {
        //this.typesList = data;
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

  onSubmit() {
    console.log(this.caseResults.controls.cases.value);
  }

}
