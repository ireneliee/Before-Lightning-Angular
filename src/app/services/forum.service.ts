import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateForumReq } from '../models/create-forum-req';
import { ForumPost } from '../models/forum-post';
import { UpdateForumPost } from '../models/update-forum-post';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  baseUrl: string = "/api/ForumPosts";

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { 

  }

  updateForum(forumPostId: number, content: string, visibility: boolean): Observable<ForumPost[]> {
    console.log("updating the current forum");
    console.log(visibility);
    let updateForumPost: UpdateForumPost = new UpdateForumPost(this.sessionService.getUsername(), content, visibility, forumPostId);
    return this.httpClient.post<any>(this.baseUrl, updateForumPost, httpOptions).pipe (
      catchError(this.handleError)
    );
  }

  getForumPosts():Observable<ForumPost[]> {
    return this.httpClient.get<ForumPost[]>(this.baseUrl + "/retrieveAllForumPosts").pipe(
      catchError(this.handleError)
    );
  }

  getMyForumPosts():Observable<ForumPost[]> {
    return this.httpClient.get<ForumPost[]>(this.baseUrl + "/retrieveMyForumPosts/?username=" + this.sessionService.getUsername()).pipe(
      catchError(this.handleError)
    )
  }
  createNewForum(title: string, content: string, filename: string): Observable<number> {
    console.log(this.sessionService.getUsername())
    return this.httpClient.get<number>(this.baseUrl + "/createNewForum/?username=" + this.sessionService.getUsername()
     + "&title=" + title + "&content=" + content + "&filename=" + filename).pipe (
      catchError(this.handleError)
    );
  }

  getForumByForumId(forumId: number): Observable<ForumPost> {
    return this.httpClient.get<ForumPost>(this.baseUrl + "/retrieveForumPostById?forumId=" + forumId.toString()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";
    if(error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occured: " + error.error;

    } else {
      errorMessage = "A HTTP error has occured: " + `HTTP${error.status}: ${error.error}`;
    }
    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
