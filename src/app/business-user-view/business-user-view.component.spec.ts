// Server - CovidBit - Fast Pandas
// Created:  20, February, 2021, John T

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessUserViewComponent } from './business-user-view.component';

describe('BusinessUserViewComponent', () => {
  let component: BusinessUserViewComponent;
  let fixture: ComponentFixture<BusinessUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
