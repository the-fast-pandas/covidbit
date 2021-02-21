import { Component, OnInit, Input} from '@angular/core';
import { NbDialogConfig, NbDialogService, NbMenuService } from '@nebular/theme';
import { CaseSettingsComponent } from './case-settings/case-settings.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {


  constructor(public dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  toggle(event: Event): void {
    let elementId: string = (event.target as Element).id;
    console.log(elementId);

    if (elementId === 'add') {
      this.dialogService.open(CaseSettingsComponent, {
        context: {title: 'Add Case', buttonText: 'Add Case'}
      });
    }

    if (elementId === 'remove') {
      this.dialogService.open(CaseSettingsComponent, {
        context: {title: 'Remove Case', buttonText: 'Remove Case'}
      });
    }
    
}

}
