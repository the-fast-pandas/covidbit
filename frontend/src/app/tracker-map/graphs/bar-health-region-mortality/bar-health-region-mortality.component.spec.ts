import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarHealthRegionMortalityComponent } from './bar-health-region-mortality.component';

describe('BarHealthRegionMortalityComponent', () => {
  let component: BarHealthRegionMortalityComponent;
  let fixture: ComponentFixture<BarHealthRegionMortalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarHealthRegionMortalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarHealthRegionMortalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
