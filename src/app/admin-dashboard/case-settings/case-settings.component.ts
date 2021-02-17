import { Component, OnInit, Input, Injectable } from '@angular/core';
import { CasesService } from '../cases.service';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-case-settings',
  templateUrl: './case-settings.component.html',
  styleUrls: ['./case-settings.component.scss']
})
export class CaseSettingsComponent implements OnInit {


  @Input()
  title!: string;

  @Input()
  buttonText!: string;

  @Input()
  addCase = false;

  @Input()
  removeCase = false;

  items = [
    { title: 'Add Case' },
    { title: 'Remove Case' },
  ];

  typesList = [
    {name: "Resturant"},
    {name: "Botique"},
    {name: "Specialized Skill"},
    {name: "Food and Hospitality"},
    {name: "IT and Internet"},
    {name: "Business"},
    {name: "Labor"}
  ]

 

  constructor(private menuService: NbMenuService) { }

  ngOnInit(): void {
    
  }

}
