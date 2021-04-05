import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntarioCanadaComponent } from './ontario-canada.component';

describe('OntarioCanadaComponent', () => {
  let component: OntarioCanadaComponent;
  let fixture: ComponentFixture<OntarioCanadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntarioCanadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntarioCanadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
