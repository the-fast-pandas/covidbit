import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit {

  categoryName = '';

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
    this.categoryName = this.typesList[Math.floor(Math.random() * this.typesList.length)].name;
  }

}
