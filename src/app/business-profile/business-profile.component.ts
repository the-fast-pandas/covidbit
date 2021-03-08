import { AfterContentChecked, ChangeDetectorRef , Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-services/data.service';
import * as myGlobals from '../globals';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})

export class BusinessProfileComponent implements OnInit, AfterContentChecked{

  // some dummy data
  id: String = ' ';
  businessName: String = '';
  firstName: String = '';
  lastName: String = '';
  businessLocation: String = '';
  businessPhone: String = '';
  email: String = '';
  webSite: String = '';
  businessType: String = '';

  //Business Types Array
  businessTypes = myGlobals.categories;

  //Form Group
  userProfile: FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute, public dataService: DataService, private ref: ChangeDetectorRef, public authService: AuthService) {


  }

  ngOnInit(): void {

    this.userProfile = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required]),
      businessLocation: new FormControl('', [Validators.required]),
      businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      webSite: new FormControl('' , [Validators.required, Validators.pattern("https://.*")])
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getUserView(id)
      .subscribe(
        data => {   
          this.id = data.user._id;
          this.businessName = data.user.businessName;
          this.firstName = data.user.firstName;
          this.lastName = data.user.lastName;
          this.businessPhone = data.user.phoneNumber;
          this.businessLocation = data.user.location;
          this.email = data.user.loginId;
          this.businessType = data.user.businessType;
          this.webSite = data.user.website;
        })
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSubmit() {
    this.authService.editProfile(this.userProfile.value, this.id);
  }

  public handleAddressChange(address: any) {
    this.userProfile.get('businessLocation')?.setValue(address.formatted_address);
  }

}