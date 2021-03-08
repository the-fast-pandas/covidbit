import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.scss']
})
export class CertificationFormComponent implements OnInit {

  userCredentials: FormGroup = new FormGroup({});
  safetyMeasureList: any = [];
  acceptedGuidelines: Boolean = false;

  constructor(public authService: AuthService, public router: Router) { }

  onSubmit(): void {
    console.log(this.userCredentials.value);
  }

  // toggle(checked: boolean) {
  //   this.acceptedGuidelines = checked;
  // }

  ngOnInit(): void {
    this.userCredentials = new FormGroup({
      guidelines: new FormGroup({
        acceptedGuidelines: new FormControl('', [Validators.required])
      }),
      safetyMeasures: new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      })
    })
  }

  onAddMeasure() {

    const safetyMeasure = {
      title: this.userCredentials.get('safetyMeasures.title')?.value,
      description: this.userCredentials.get('safetyMeasures.description')?.value
    }
    this.safetyMeasureList.push(safetyMeasure);
    this.userCredentials.get('safetyMeasures.title')?.reset()
    this.userCredentials.get('safetyMeasures.description')?.reset()
  }

}
