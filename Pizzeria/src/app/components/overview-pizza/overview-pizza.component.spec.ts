import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPizzaComponent } from './overview-pizza.component';

describe('OverviewPizzaComponent', () => {
  let component: OverviewPizzaComponent;
  let fixture: ComponentFixture<OverviewPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewPizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
