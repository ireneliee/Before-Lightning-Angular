import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';
import {MessageService, SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Reply } from 'src/app/models/reply';

@Component({
  selector: 'app-view-my-forum-post',
  templateUrl: './view-my-forum-post.component.html',
  styleUrls: ['./view-my-forum-post.component.css'],
})
export class ViewMyForumPostComponent implements OnInit {
  forumPosts: ForumPost[];

  // attribute for view forum details
  forumToView: ForumPost;
  forumToViewReplies : Reply[] = [];
  display: boolean;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  sortKey: string;
  url: string;

  // attribute for create new reply
  currentMember: string;
  replyContent: string;
  createReplyDisplay:boolean;
  replySubmitted: boolean;
  replySuccess: boolean;
  replyError: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {
    this.forumPosts = new Array();
    this.sortOptions = new Array();
    this.forumToViewReplies = new Array();
    this.forumToView = new ForumPost();
    this.display = false;
    this.sortField = "";
    this.sortKey = "";
    this.sortOrder = 0;
    this.url = "../../../../../../../../../../glassfish-5.1.0-uploadedfiles/uploadedFiles/"

    this.replyContent = "";
    this.sortOrder = 0;
    this.currentMember = this.sessionService.getUsername();
    this.createReplyDisplay = false;
    this.replySubmitted = false;
    this.replySuccess = false;
    this.replyError = false;
  }

  testtest():void {
    console.log("this is testing method");
  }

  ngOnInit(): void {
    this.forumService.getMyForumPosts().subscribe({
      next:(response) => {
        this.forumPosts = response;
      },
      error: (error) => {
        console.log("***********ForumPageComponent.ts: " + error);
      }
    });
    this.sortOptions = [
      {label: 'Recent First', value: '!timestamp'},
      {label: 'Oldest First', value: 'timestamp'},
    ];
    this.primengConfig.ripple = true;
  }

  onSortChange(event: { value: any; }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

// view forum post detailss
showDialog(forumToView: ForumPost) {
  console.log(forumToView.forumPostEntityId);
  this.display = true;
  this.forumToView = forumToView;
  this.forumToViewReplies = forumToView.replies!;
}

redirectToUpdate(forumToUpdate: ForumPost) {
  console.log(forumToUpdate.forumPostEntityId);
  this.router.navigate(["/updateForumComponent/" + forumToUpdate.forumPostEntityId?.toString()]);

}

// method to create new reply
clearReplyForm() {
  this.replySubmitted = false;
  this.replyError = false;
  this.replySuccess = false;
  this.replyContent = "";
}

showCreateReplyDialog(forumToView:ForumPost) {
  this.createReplyDisplay = true;
  this.forumToView = forumToView;

}

createNewReply() {
  console.log("Create new reply here is called");
  this.replySubmitted = true;
  if(true) {
    console.log("Creating the new class");
    this.forumService.createNewReply(this.forumToView.forumPostEntityId!, this.replyContent).subscribe ({
      next: (response) => {
        console.log("Getting response");
        let postId: Number = response;
        this.replySuccess = true;
        this.replyError = false;
        this.clearReplyForm();
        this.messageService.add({ severity: 'info', summary: "Successfuly posted a forum reply" });
        //createNewReplyForm.resetForm();
        //createNewReplyForm.reset();
        this.clearReplyForm();
      },
      error: (error) => {
        this.replyError = true;
        this.replySuccess = false;
        this.messageService.add({severity: 'error', summary: "Error", detail: "An error has occured while posting the entry"});
        this.clearReplyForm();
      },
    });

  }
}
}