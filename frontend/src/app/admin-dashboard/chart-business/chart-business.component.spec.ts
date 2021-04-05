// Server - CovidBit - Fast Pandas
// Created:  01, March, 2021, Teresa Costa

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartBusinessComponent } from './chart-business.component';

describe('ChartBusinessComponent', () => {
  let component: ChartBusinessComponent;
  let fixture: ComponentFixture<ChartBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
