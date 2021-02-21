import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  alert: Boolean = false;

  //Business Types Array
  businessTypes = [
    {name: "Resturant"},
    {name: "Botique"},
    {name: "Specialized Skill"},
    {name: "Food and Hospitality"},
    {name: "IT and Internet"},
    {name: "Business"},
    {name: "Labor"}
  ]

  //Form Group
  userProfile: FormGroup = new FormGroup({});
  tester:FormGroup = new FormGroup({});
  businessLocation = '';
  registeredUser:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userProfile= new FormGroup({     
        businessName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        businessType: new FormControl('', [Validators.required]),
        businessLocation: new FormControl('', [Validators.required]),
        businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        webSite: new FormControl('', [Validators.required, Validators.pattern("https://.*")])
    })
  }

  onSubmit(): void {
    console.log(this.userProfile.value);
    this.router.navigate(['/home']);
  }

  checkProfileForm() {

    if (this.userProfile.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
   
  }

  onClose() {
    this.alert = false;
  }

  public handleAddressChange(address: any) {
    
    this.userProfile.get('businessLocation')?.setValue(address.formatted_address);
  }

}
