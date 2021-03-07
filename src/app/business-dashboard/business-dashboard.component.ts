import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AuthService } from '../auth-services/auth.service';
@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
})
export class BusinessDashboardComponent implements OnInit {
  
  //Form Groups
  safteyMeasures: FormGroup = new FormGroup({});
  safteyMeasureList: any = [];

  
  // some dummy data
  businessName: String = 'Pizza-Pizza';
  firstName: String = 'James';
  lastName: String = 'Bond';
  businessLocation: String = '45 Gerrard St W, Toronto, ON M5G 1Z4, Canada';
  businessPhone: String = '647-234-4567';
  email: String = 'pizza@gmail.com';
  webSite: String = 'https://www.pizzapizza.ca';
  businessType: String = 'Resturant';

  // smart table settings
    settings = {
      columns: {
        caseCount: {
          title: 'ID'
        },
        dateReported: {
          title: 'Date of case'
        },
        status: {
          title: 'Case Status'
        },
        gender: {
          title: 'Gender of person'
        },
        age: {
          title: 'Age of person'
        }
      }
    };
  
    constructor() {}
  
    ngOnInit(): void {
      this.safteyMeasures = new FormGroup({
          title: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required])
        })
    }

    onAddMeasure() {
      const safteyMeasure = {
        title: this.safteyMeasures.get('title')?.value,
        description: this.safteyMeasures.get('description')?.value
      }
      this.safteyMeasureList.push(safteyMeasure);
      this.safteyMeasures.get('title')?.reset()
      this.safteyMeasures.get('description')?.reset()
    }
  
  }
  



