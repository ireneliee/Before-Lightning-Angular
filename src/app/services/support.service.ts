import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { SupportTicket } from "../models/support-ticket";
import { SessionService } from "./session.service";

@Injectable({
	providedIn: "root",
})
export class SupportService {
	baseUrl: string = "/api/Support";

	constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

	retrieveSupportTickets(email: string): Observable<SupportTicket[]> {
		return this.httpClient.get<SupportTicket[]>(this.baseUrl + "/retrieveSupportTickets?email=" + email).pipe(catchError(this.handleError));
	}

	getMyForumPosts():Observable<SupportTicket[]> {
		return this.httpClient.get<SupportTicket[]>(this.baseUrl + "/retrieveMySupportTickets/?username=" + this.sessionService.getUsername()).pipe(
		  catchError(this.handleError)
		)
	}
	
	createSupportTicket(issue: string): Observable<number> {
		if (this.sessionService.getIsLogin() == false) {
			console.log("user not logged in");
			console.log("current email: " + this.sessionService.getEmail());
			return this.httpClient.get<number>(this.baseUrl + "/createSupportTicketWithEmail/?email=" + this.sessionService.getEmail() + "&issue=" + issue)
			.pipe(catchError(this.handleError));
		} else {
			console.log("user is logged in");
			console.log("current username: " + this.sessionService.getUsername());
			return this.httpClient.get<number>(this.baseUrl + "/createNewSupportTicket/?username=" + this.sessionService.getUsername() + "&issue=" + issue)
				.pipe(catchError(this.handleError));
		}
	}


	private handleError(error: HttpErrorResponse) {
		let errorMessage: string = "";
		if (error.error instanceof ErrorEvent) {
			errorMessage = "An unknown error has occured: " + error.error;
		} else {
			errorMessage = "A HTTP error has occured: " + `HTTP${error.status}: ${error.error}`;
		}
		console.error(errorMessage);

		return throwError(() => new Error(errorMessage));
	}
}
