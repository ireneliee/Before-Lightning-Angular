import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SessionService } from "./session.service";
import { Member } from "../models/member";
import { Address } from "../models/address";
import { CreateNewMemberReq } from "../models/create-new-member-req";

const httpOptions = {
	headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
	providedIn: "root",
})
export class MemberService {
	baseUrl: string = "/api/Member";

	constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

	MemberLogin(username: string | undefined, password: string | undefined): Observable<Member> {
		return this.httpClient.get<Member>(this.baseUrl + "/memberLogin?username=" + username + "&password=" + password).pipe(catchError(this.handleError));
	}

	RegisterNewMember(newAddress: Address ,username: string, password: string, firstname: string, lastname: string, email: string, contact: string, imageLink: string): Observable<Member> {
		console.log("======HERE IN MEMBER SERVICE =====");
		console.log(newAddress);

		let createNewMemberReq = new CreateNewMemberReq(newAddress, username, password, firstname, lastname, email, contact, imageLink);
		console.log(createNewMemberReq);

		return this.httpClient.put<Member>(this.baseUrl, createNewMemberReq, httpOptions).pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		let errorMessage: string = "";

		if (error.error instanceof ErrorEvent) {
			errorMessage = "An unknown error has occurred: " + error.error;
		} else {
			errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
		}

		console.error(errorMessage);

		return throwError(() => new Error(errorMessage));
	}
}
