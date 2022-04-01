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
