import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { NgForm } from '@angular/forms';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import {EditorModule} from 'primeng/editor';

@Component({
  selector: 'app-create-new-forum-post',
  templateUrl: './create-new-forum-post.component.html',
  styleUrls: ['./create-new-forum-post.component.css']
})
export class CreateNewForumPostComponent implements OnInit {
  submitted: boolean;
  newForum: ForumPost;
  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig) { 
      this.submitted = false;
      this.newForum = new ForumPost();
      this.resultSuccess = false;
      this.resultError = false;
    }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  displayMaximizable?: boolean;

  showMaximizableDialog() {
    this.displayMaximizable = true;
}

create(createForumPostForm: NgForm) {

}

  

}
