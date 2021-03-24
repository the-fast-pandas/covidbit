import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntarioCanadaDeathComponent } from './ontario-canada-death.component';

describe('OntarioCanadaDeathComponent', () => {
  let component: OntarioCanadaDeathComponent;
  let fixture: ComponentFixture<OntarioCanadaDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntarioCanadaDeathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntarioCanadaDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
