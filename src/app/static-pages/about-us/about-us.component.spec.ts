// Server - CovidBit - Fast Pandas
// Created: 15, March, 2021, Teresa Costa
// Modified: 01, April, 2021, Adilah 

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
