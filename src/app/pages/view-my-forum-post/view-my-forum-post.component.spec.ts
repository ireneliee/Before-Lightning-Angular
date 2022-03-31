import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyForumPostComponent } from './view-my-forum-post.component';

describe('ViewMyForumPostComponent', () => {
  let component: ViewMyForumPostComponent;
  let fixture: ComponentFixture<ViewMyForumPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyForumPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyForumPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
