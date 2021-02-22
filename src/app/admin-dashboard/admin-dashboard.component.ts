import { Component, OnInit, Input} from '@angular/core';
import { NbDialogConfig, NbDialogService, NbMenuService } from '@nebular/theme';
import { CaseSettingsComponent } from './adminSettings/case-settings/case-settings.component'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {


  constructor(public dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  openSettings = false;
  settingsType = '';

  settingsOpened(event: Event){
    //Show settings Tab
    let elementId: string = (event.target as Element).id;
    this.settingsType = elementId;
    console.log(this.settingsType)
    
  }


}
