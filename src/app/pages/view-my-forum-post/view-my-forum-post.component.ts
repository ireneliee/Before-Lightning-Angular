import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';
import {SelectItem} from 'primeng/api';
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
  forumToView: ForumPost;
  forumToViewReplies : Reply[] = [];
  display: boolean;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  sortKey: string;
  url: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig
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
}