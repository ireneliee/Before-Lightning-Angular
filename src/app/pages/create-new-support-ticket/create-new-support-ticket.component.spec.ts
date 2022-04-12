import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSupportTicketComponent } from './create-new-support-ticket.component';

describe('CreateNewSupportTicketComponent', () => {
  let component: CreateNewSupportTicketComponent;
  let fixture: ComponentFixture<CreateNewSupportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewSupportTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
