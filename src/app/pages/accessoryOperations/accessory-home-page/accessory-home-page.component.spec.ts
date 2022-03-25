import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryHomePageComponent } from './accessory-home-page.component';

describe('AccessoryHomePageComponent', () => {
  let component: AccessoryHomePageComponent;
  let fixture: ComponentFixture<AccessoryHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoryHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
