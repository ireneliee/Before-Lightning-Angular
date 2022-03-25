import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyCartPageComponent } from './view-my-cart-page.component';

describe('ViewMyCartPageComponent', () => {
  let component: ViewMyCartPageComponent;
  let fixture: ComponentFixture<ViewMyCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyCartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
