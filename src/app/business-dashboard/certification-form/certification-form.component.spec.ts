// Server - CovidBit - Fast Pandas
// Created: 20, MArch, 2021, Yevgeniya Anasheva

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationFormComponent } from './certification-form.component';

describe('CertificationFormComponent', () => {
  let component: CertificationFormComponent;
  let fixture: ComponentFixture<CertificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
