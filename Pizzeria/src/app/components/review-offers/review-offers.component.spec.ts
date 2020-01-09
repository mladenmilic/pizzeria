import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOffersComponent } from './review-offers.component';

describe('ReviewOffersComponent', () => {
  let component: ReviewOffersComponent;
  let fixture: ComponentFixture<ReviewOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
