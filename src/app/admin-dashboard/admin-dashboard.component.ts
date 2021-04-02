// Server - CovidBit - Fast Pandas
// Created:  16, February, 2021, John Turkson


import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  openSettings: Boolean = false;
  settingsType: string = '';

  constructor(public dialogService: NbDialogService) { }

  ngOnInit(): void { }

  // (click) handler
  // Show settings Tab
  settingsOpened(event: Event) {
    let elementId: string = (event.target as Element).id;
    this.settingsType = elementId;
  }
}