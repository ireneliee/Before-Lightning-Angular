import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SessionService } from "./session.service";
import { Member } from "../models/member";
import { Address } from "../models/address";
import { CreateNewMemberReq } from "../models/create-new-member-req";
import { UpdateMemberDetailReq } from "../models/update-member-detail-req";
import { CreateAddressReq } from "../models/create-address-req";
import { CreateCreditcardReq } from "../models/create-creditcard-req";
import { DeleteAddressReq } from "../models/delete-address-req";
import { DeleteCreditcardReq } from "../models/delete-creditcard-req";

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

	UpdateMember(username:string,firstname: string, lastname: string, email: string, contact: string, imageLink: string ): Observable<Member> {
		let updateMemberReq = new UpdateMemberDetailReq(username, firstname, lastname,email,contact,imageLink);
		return this.httpClient.post<Member>(this.baseUrl + "/updateMember", updateMemberReq, httpOptions).pipe(catchError(this.handleError));
	}

	AddAddress(memberId:string,block:string,unit:string,postalCode:string,country:string): Observable<Member> {
		let addAddress = new CreateAddressReq(memberId,block,unit,postalCode,country);
		return this.httpClient.post<Member>(this.baseUrl + "/addAddress", addAddress, httpOptions).pipe(catchError(this.handleError));


	}
DeleteAddress(memberId:string, addressId: string) {
	let deleteAddressReq = new DeleteAddressReq(addressId,memberId)
	return this.httpClient.post<Member>(this.baseUrl + "/deleteAddress",deleteAddressReq,httpOptions).pipe(catchError(this.handleError));

}
	RetrieveMemberById(memberEntityId:string): Observable<Member> {
		return this.httpClient.get<Member>(this.baseUrl + "/retrieveMemberById?memberEntityId=" + memberEntityId).pipe(catchError(this.handleError));
	}

	RetrieveMemberByUsername(username:string): Observable<Member> {
		return this.httpClient.get<Member>(this.baseUrl + "/retrieveMemberByUsername?username=" + username).pipe(catchError(this.handleError));
	}

	AddCreditCard(memberId:string, creditCardNumber:string, nameOnCard:string, expiryDate:string): Observable<Member> {
		let addCreditCard = new CreateCreditcardReq(memberId,creditCardNumber,nameOnCard,expiryDate);
		return this.httpClient.post<Member>(this.baseUrl + "/addCreditCard", addCreditCard, httpOptions).pipe(catchError(this.handleError));

	}
	DeleteCreditCard(memberId:string, creditCardId: string) {
		let deleteCreditCard = new DeleteCreditcardReq(creditCardId,memberId)
		return this.httpClient.post<Member>(this.baseUrl + "/deleteCreditCard",deleteCreditCard,httpOptions).pipe(catchError(this.handleError));
	
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
