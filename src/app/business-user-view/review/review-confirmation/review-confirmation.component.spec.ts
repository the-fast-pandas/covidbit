import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewConfirmationComponent } from './review-confirmation.component';

describe('ReviewConfirmationComponent', () => {
  let component: ReviewConfirmationComponent;
  let fixture: ComponentFixture<ReviewConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
