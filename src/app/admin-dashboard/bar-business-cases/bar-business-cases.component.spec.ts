import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarBusinessCasesComponent } from './bar-business-cases.component';

describe('BarBusinessCasesComponent', () => {
  let component: BarBusinessCasesComponent;
  let fixture: ComponentFixture<BarBusinessCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarBusinessCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarBusinessCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
