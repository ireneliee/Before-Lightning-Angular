import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAccessoryItemsPageComponent } from './view-all-accessory-items-page.component';

describe('ViewAllAccessoryItemsPageComponent', () => {
  let component: ViewAllAccessoryItemsPageComponent;
  let fixture: ComponentFixture<ViewAllAccessoryItemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllAccessoryItemsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllAccessoryItemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
