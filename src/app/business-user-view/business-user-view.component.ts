import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-user-view',
  templateUrl: './business-user-view.component.html',
  styleUrls: ['./business-user-view.component.scss']
})
export class BusinessUserViewComponent implements OnInit {

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
