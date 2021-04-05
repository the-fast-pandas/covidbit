import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraphCanadaComponent } from './line-graph-canada.component';

describe('LineGraphCanadaComponent', () => {
  let component: LineGraphCanadaComponent;
  let fixture: ComponentFixture<LineGraphCanadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGraphCanadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGraphCanadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
