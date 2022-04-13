import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';
import { MessageService, SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Reply } from 'src/app/models/reply';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { Member } from 'src/app/models/member';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css'],
})
export class ForumPageComponent implements OnInit {
  // attribute for view all forum posts
  forumPosts: ForumPost[];

  // attribute for view forum details
  forumToView: ForumPost;
  forumToViewReplies: Reply[] = [];
  display: boolean;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  sortKey: string;
  JSON;

  // attribute for create new reply
  currentMember: string;
  replyContent: string;
  createReplyDisplay: boolean;
  replySubmitted: boolean;
  replySuccess: boolean;
  replyError: boolean;
  likingMap: Map<ForumPost, Boolean>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig
  ) {
    this.forumPosts = new Array();
    this.sortOptions = new Array();
    this.forumToViewReplies = new Array();
    this.sortField = '';
    this.sortKey = '';

    this.forumToView = new ForumPost();
    this.display = false;

    this.replyContent = '';
    this.sortOrder = 0;
    this.currentMember = this.sessionService.getUsername();
    this.createReplyDisplay = false;
    this.replySubmitted = false;
    this.replySuccess = false;
    this.replyError = false;

    this.likingMap = new Map();
    this.JSON = JSON;
  }

  testtest(): void {
    console.log('this is testing method');
  }

  // view all replies

  ngOnInit(): void {
    this.forumService.getForumPosts().subscribe({
      next: (response) => {
        this.forumPosts = response;
        console.log(response);
      },
      error: (error) => {
        console.log('***********ForumPageComponent.ts: ' + error);
      },
    });
    this.sortOptions = [
      { label: 'Recent First', value: '!timestamp' },
      { label: 'Oldest First', value: 'timestamp' },
    ];
    this.primengConfig.ripple = true;
  }

  callRefreshList(event: any) {
    this.refreshList();
    this.display = false;
  }

  refreshList() {
    this.forumService.getForumPosts().subscribe({
      next: (response) => {
        this.forumPosts = response;
      },
      error: (error) => {
        console.log('***********ForumPageComponent.ts: ' + error);
      },
    });
  }

  callOnSortChange(event: any) {
    this.onSortChange(event.value);
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // view forum post details

  showDialog(forumToView: ForumPost) {
    console.log(forumToView.forumPostEntityId);
    this.display = true;
    this.forumToView = forumToView;
    this.forumToViewReplies = forumToView.replies!;
  }

  // below are the method for create new reply

  clearReplyForm() {
    this.replySubmitted = false;
    this.replyError = false;
    this.replySuccess = false;
    this.replyContent = '';
  }

  showCreateReplyDialog(forumToView: ForumPost) {
    this.createReplyDisplay = true;
    this.forumToView = forumToView;
  }

  createNewReply() {
    if(this.replyContent !== "") {
      this.replySubmitted = true;
    if (true) {
      console.log('Creating the new class');
      this.forumService
        .createNewReply(this.forumToView.forumPostEntityId!, this.replyContent)
        .subscribe({
          next: (response) => {
            console.log('Getting response');
            let postId: Number = response;
            this.replySuccess = true;
            this.replyError = false;
            this.clearReplyForm();
            this.messageService.add({
              severity: 'info',
              summary: 'Successfuly posted a forum reply',
            });
            this.clearReplyForm();
            this.refreshList();
            this.createReplyDisplay = false;
          },
          error: (error) => {
            this.replyError = true;
            this.replySuccess = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error has occured while posting the entry',
            });
            this.clearReplyForm();
            this.createReplyDisplay = false;
          },
        });
    }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Comment cannot be empty!'
      });
      this.createReplyDisplay = false;
    }
    
  }

  // like / dislike function

  fastCheckHasAlreadyLiked(post: ForumPost): boolean {
    let username = this.sessionService.getUsername();
    let listOfUserWhoLikes: Member[] | undefined = post.userWhoLikes;
    if (listOfUserWhoLikes !== undefined) {
      for (let i = 0; i < listOfUserWhoLikes.length; i++) {
        if (listOfUserWhoLikes[i].username === username) {
          return true;
        }
      }
    }
    return false;
  }


  async changeLikes(post: ForumPost) {
    let postIdInString: string | undefined = post.forumPostEntityId?.toString();

    if (postIdInString !== undefined) {
      await this.forumService
        .changeLikes(postIdInString)
        .toPromise()
        .then((response) => {
          this.refreshList();
          if(this.fastCheckHasAlreadyLiked(post)) {
            this.messageService.add({ severity: 'info', summary: "You unlike this post!"});
          } else {
            this.messageService.add({ severity: 'info', summary: "You like this post!"});
          }
        });
    }
  }
}
