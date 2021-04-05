import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCanadaComponent } from './stats-canada.component';

describe('StatsCanadaComponent', () => {
  let component: StatsCanadaComponent;
  let fixture: ComponentFixture<StatsCanadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsCanadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCanadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
