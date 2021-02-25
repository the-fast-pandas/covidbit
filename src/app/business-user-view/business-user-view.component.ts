import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-user-view',
  templateUrl: './business-user-view.component.html',
  styleUrls: ['./business-user-view.component.scss']
})
export class BusinessUserViewComponent implements OnInit {

  categoryName = '';
  safteyMeasureList: any = [];
  businessName: String = 'Business Name';
  businessPhoneNumber: String = '123-456-7890';
  businessAddress: String = '777 Bay Street, Toronto, ON';
  businessWebsite:String = 'www.fastpandas.com';
  businessType: String = 'Resturant'
  trackingMethod: boolean = false
  totalCases = 12;
  totalCases30Days = 3;

  typesList = [
    {name: "Resturant"},
    {name: "Botique"},
    {name: "Specialized Skill"},
    {name: "Food and Hospitality"},
    {name: "IT and Internet"},
    {name: "Business"},
    {name: "Labor"}
  ]

  constructor() { }

  ngOnInit(): void {

    safteyMeasures: new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })

    const safteyMeasure = {
      title: "Saftey Measure #1",
      description: "Saftey Measure Description"
    }

    this.safteyMeasureList.push(safteyMeasure)

  }


}
