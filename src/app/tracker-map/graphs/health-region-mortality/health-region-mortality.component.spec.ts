import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRegionMortalityComponent } from './health-region-mortality.component';

describe('HealthRegionMortalityComponent', () => {
  let component: HealthRegionMortalityComponent;
  let fixture: ComponentFixture<HealthRegionMortalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthRegionMortalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthRegionMortalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
