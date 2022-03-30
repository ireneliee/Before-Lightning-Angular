import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewForumPostComponent } from './create-new-forum-post.component';

describe('CreateNewForumPostComponent', () => {
  let component: CreateNewForumPostComponent;
  let fixture: ComponentFixture<CreateNewForumPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewForumPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewForumPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
