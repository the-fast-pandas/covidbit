import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRegionCasesComponent } from './health-region-cases.component';

describe('HealthRegionComponent', () => {
  let component: HealthRegionCasesComponent;
  let fixture: ComponentFixture<HealthRegionCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthRegionCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthRegionCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
