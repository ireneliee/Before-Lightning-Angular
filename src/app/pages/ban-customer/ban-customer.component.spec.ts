import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanCustomerComponent } from './ban-customer.component';

describe('BanCustomerComponent', () => {
  let component: BanCustomerComponent;
  let fixture: ComponentFixture<BanCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
