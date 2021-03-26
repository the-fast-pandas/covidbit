import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarOntarioCanadaComponent } from './bar-ontario-canada.component';

describe('BarOntarioCanadaComponent', () => {
  let component: BarOntarioCanadaComponent;
  let fixture: ComponentFixture<BarOntarioCanadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarOntarioCanadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarOntarioCanadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
