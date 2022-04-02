import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeProductsPageComponent } from './customize-products-page.component';

describe('CustomizeProductsPageComponent', () => {
  let component: CustomizeProductsPageComponent;
  let fixture: ComponentFixture<CustomizeProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeProductsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
