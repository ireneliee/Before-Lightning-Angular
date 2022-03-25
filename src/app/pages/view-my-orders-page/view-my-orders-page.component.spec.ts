import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyOrdersPageComponent } from './view-my-orders-page.component';

describe('ViewMyOrdersPageComponent', () => {
  let component: ViewMyOrdersPageComponent;
  let fixture: ComponentFixture<ViewMyOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyOrdersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
