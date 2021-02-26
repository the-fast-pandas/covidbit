// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 25, February, 2021, Teresa Costa: backend integration (constructor)


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-business-user-view',
  templateUrl: './business-user-view.component.html',
  styleUrls: ['./business-user-view.component.scss']
})
export class BusinessUserViewComponent implements OnInit {

  categoryName = '';
  safteyMeasureList: any = [];
  businessName: String = '';
  businessPhoneNumber: String = '';
  businessAddress: String = '';
  businessWebsite: String = '';
  businessType: String = ''
  trackingMethod: boolean = false
  totalCases = 0;
  totalCases30Days = 0;

  loaded = false;

  typesList = [
    { name: "Restaurant" },
    { name: "Boutique" },
    { name: "Specialized Skill" },
    { name: "Food and Hospitality" },
    { name: "IT and Internet" },
    { name: "Business" },
    { name: "Labor" }
  ]

  constructor(public dataService: DataService, public router: Router, private activatedRoute: ActivatedRoute) {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getUserView(id)
      .subscribe(
        data => {
          this.businessName = data.user.businessName;
          this.businessPhoneNumber = data.user.phoneNumber;
          this.businessAddress = data.user.location;
          this.businessWebsite = data.user.loginId;
          //location.reload();
        })
  }

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