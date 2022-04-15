import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumPost } from 'src/app/models/forum-post';
import { ForumService } from 'src/app/services/forum.service';
import { SessionService } from 'src/app/services/session.service';
import {Message, MessageService, SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Reply } from 'src/app/models/reply';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Member } from 'src/app/models/member';

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

  // attribute for create new reply
  currentMember: Member;
  replyContent: string;
  createReplyDisplay:boolean;
  replySubmitted: boolean;
  replySuccess: boolean;
  replyError: boolean;

  //image retrieval
  imageToShow: any;
  isImageLoading: boolean;

  // message
  msgs: Message[];

    // view likes
    viewLikesDisplay: boolean;
    likeList: Member[];
  


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private forumService: ForumService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private fileUploadService: FileUploadService
  ) {
    this.forumPosts = new Array();
    this.sortOptions = new Array();
    this.forumToViewReplies = new Array();
    this.forumToView = new ForumPost();
    this.display = false;
    this.sortField = "";
    this.sortKey = "";
    this.sortOrder = 0;

    this.replyContent = "";
    this.sortOrder = 0;
    this.currentMember = this.sessionService.getCurrentMember();
    this.createReplyDisplay = false;
    this.replySubmitted = false;
    this.replySuccess = false;
    this.replyError = false;

    // image retrieval
    this.isImageLoading = false;

    // message service
    this.msgs = [];

    //view likes
    this.viewLikesDisplay = false;
    this.likeList = new Array();
  }

  testtest():void {
    console.log("this is testing method");
  }

  // showing message
  makeMessageAppear(m: Message) {
    this.msgs = [];
    this.msgs.push(m);
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

  callRefreshList(event: any) {
    this.refreshList();
    this.display = false;
  }

   refreshList(){
    this.forumService.getMyForumPosts().subscribe({
      next:(response) => {
        this.forumPosts = response;
      },
      error: (error) => {
        console.log("***********ForumPageComponent.ts: " + error);
      }
    });
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
          this.makeMessageAppear({
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
          this.makeMessageAppear({
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
    this.makeMessageAppear({
      severity: 'error',
      summary: 'Comment cannot be empty!'
    });
    this.createReplyDisplay = false;
  }
  
}
// image retrieval

getImageFromService() {
  this.isImageLoading = true;
  let yourImageUrl = this.forumToView.imageLink;
  this.fileUploadService.getImage(yourImageUrl!).subscribe({
    next:(response) => {
      this.createImageFromBlob(response);
      this.isImageLoading = false;
    },
     error: (error) => {
      this.isImageLoading = false;
      console.log(error);
     }
  });
}
createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
     this.imageToShow = reader.result;
  }, false);

  if (image) {
     reader.readAsDataURL(image);
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

hasAlreadyLiked(postId: string): Boolean {
  this.forumService
    .checkUserLikes(postId)
    .toPromise()
    .then((response) => {
      if (response !== undefined) {
        return response as boolean;
      } else {
        return false;
      }
    });
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
          this.makeMessageAppear({ severity: 'info', summary: "You like this post!"});
        } else {
          this.makeMessageAppear({ severity: 'info', summary: "You unlike this post!"});
        }
      });
  }
}

showViewLikesDisplay(forumToView: ForumPost) {
  this.viewLikesDisplay = true;
  this.likeList = forumToView.userWhoLikes!;
}

doesNotHaveProfilePic(member: Member) {
  if(member.imageLink === null || member.imageLink === "") {
    return true;
  } else {
    return false;
  }
}
}