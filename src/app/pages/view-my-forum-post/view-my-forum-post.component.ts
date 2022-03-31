import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-my-forum-post',
  templateUrl: './view-my-forum-post.component.html',
  styleUrls: ['./view-my-forum-post.component.css'],
})
export class ViewMyForumPostComponent implements OnInit {
  forumPosts: ForumPost[];
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  sortKey: string;
  displayMaximizable?: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig
  ) {
    this.forumPosts = new Array();
    this.sortOptions = new Array();
    this.sortField = '';
    this.sortKey = '';
    this.sortOrder = 0;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
}

  ngOnInit(): void {
    this.forumService.getMyForumPosts().subscribe({
      next:(response) => {
        this.forumPosts = response;
      },
      error: (error) => {
        console.log("***********ViewForumPageComponent.ts: " + error);
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
}
