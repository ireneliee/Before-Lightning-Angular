import { Component, OnInit, Output } from '@angular/core';
import { MessageService, Message, PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-new-forum-post',
  templateUrl: './create-new-forum-post.component.html',
  styleUrls: ['./create-new-forum-post.component.css'],
  providers: [MessageService],
})
export class CreateNewForumPostComponent implements OnInit {
  @Output()
  signalToRefresh: EventEmitter<string> = new EventEmitter<string>();
  submitted: boolean;
  title: string;
  content: string;
  fileName: string;
  resultSuccess: boolean;
  resultError: boolean;
  msgs: Message[];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig
  ) {
    this.submitted = false;
    this.title = '';
    this.content = '';
    this.fileName = '';
    this.resultSuccess = false;
    this.resultError = false;
    this.msgs = [];
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.clear();
  }

  clear() {
    this.submitted = false;
    this.resultError = false;
    this.resultSuccess = false;

    this.fileName = '';
    this.title = '';
    this.content = '';
  }

  displayMaximizable?: boolean;

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  create(createForumPostForm: NgForm) {
    if (this.title !== "" && this.content !== "") {
      this.submitted = true;
      if (createForumPostForm.valid) {
        this.forumService
          .createNewForum(this.title, this.content, this.fileName)
          .subscribe({
            next: (response) => {
              let postId: Number = response;
              this.resultSuccess = true;
              this.resultError = false;
              this.clear();
              this.messageService.add({
                severity: 'info',
                summary: 'Successfuly posted a forum post entry',
                detail: 'Please visit the forum page to view your entry',
              });
              createForumPostForm.resetForm();
              createForumPostForm.reset();
              this.signalToRefresh.emit('');
            },
            error: (error) => {
              this.resultError = true;
              this.resultSuccess = false;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'An error has occured while posting the entry',
              });
              console.log('********** Create new forum post.ts: ' + error);
            },
          });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Title or content cannot be empty!'
      });
    }
  }
}
