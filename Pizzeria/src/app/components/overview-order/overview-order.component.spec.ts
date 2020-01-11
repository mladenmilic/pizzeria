import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewOrderComponent } from './overview-order.component';

describe('OverviewOrderComponent', () => {
  let component: OverviewOrderComponent;
  let fixture: ComponentFixture<OverviewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
