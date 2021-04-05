import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarOntarioCanadaVaccinesComponent } from './bar-ontario-canada-vaccines.component';

describe('BarOntarioCanadaVaccinesComponent', () => {
  let component: BarOntarioCanadaVaccinesComponent;
  let fixture: ComponentFixture<BarOntarioCanadaVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarOntarioCanadaVaccinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarOntarioCanadaVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
