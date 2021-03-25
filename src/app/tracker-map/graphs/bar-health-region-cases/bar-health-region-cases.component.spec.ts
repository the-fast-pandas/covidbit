import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarHealthRegionCasesComponent } from './bar-health-region-cases.component';

describe('ChartGTAComponent', () => {
  let component: BarHealthRegionCasesComponent;
  let fixture: ComponentFixture<BarHealthRegionCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarHealthRegionCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarHealthRegionCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
