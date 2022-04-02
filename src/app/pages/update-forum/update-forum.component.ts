import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';
import { MessageService } from "primeng/api";
import { TooltipModule } from 'primeng/tooltip';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-update-forum',
  templateUrl: './update-forum.component.html',
  styleUrls: ['./update-forum.component.css']
})
export class UpdateForumComponent implements OnInit {
  submitted: boolean;
  forumId: string | null;
  forumToUpdate: ForumPost;
  retrieveForumError: boolean;
  visibilityOptions: any[];

  resultSuccess: boolean;
  resultError: boolean;
  message: string | undefined;

  constructor(private router: Router,
				private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
				public sessionService: SessionService,
        private forumService: ForumService) {
          this.forumId = null;
          this.resultSuccess = false;
          this.resultError = false;
          this.submitted = false;
          this.retrieveForumError = false;
          this.forumToUpdate = new ForumPost();
          this.visibilityOptions = [
            {label: 'Visible', value: true},
            {label: 'Not visible', value: false}
          ];
         }

  ngOnInit(): void {
    this.forumId = this.activatedRoute.snapshot.paramMap.get('forumId');

    if(this.forumId != null) {
      
      this.forumService.getForumByForumId(parseInt(this.forumId)).subscribe({
        next: (response)  => {
          this.forumToUpdate = response;

        },
        error: (error) => {
          this.retrieveForumError = true;
          console.log('*************ViewForumDetailsComponent.ts: ' + error);
        },
      });
    }
    
  }

  initializeState(): void {
    this.forumToUpdate = new ForumPost();
  }

  dummydummyfunc(): void {
    console.log
  }

  update(updateForumForm: NgForm) {
    this.submitted = true;
    if(updateForumForm.valid) {
      this.forumService.updateForum(this.forumToUpdate.forumPostEntityId!, this.forumToUpdate.content!, this.forumToUpdate.isVisible!).subscribe({
        next: (response) => {
          this.resultSuccess= true;
          this.resultError = false;
          this.initializeState;
          this.messageService.add({severity: "success", summary: "Service Message", detail: "Forum has been updated!"});
          updateForumForm.resetForm();
          updateForumForm.resetForm();  
        },
        error: (error) => {
          this.resultError = true;
          this.resultSuccess = false;
          this.messageService.add({severity: "error", summary: "Service Message", detail: "Error occured when registering member"});

        },

    });
    }
  }
}
