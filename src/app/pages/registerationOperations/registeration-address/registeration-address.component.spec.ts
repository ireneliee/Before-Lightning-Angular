import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationAddressComponent } from './registeration-address.component';

describe('RegisterationAddressComponent', () => {
  let component: RegisterationAddressComponent;
  let fixture: ComponentFixture<RegisterationAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterationAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
