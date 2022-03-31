import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { CreateForumReq } from "../models/create-forum-req";
import { Product } from "../models/product";
import { SessionService } from "./session.service";

const httpOptions = {
	headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
	providedIn: "root",
})
export class ProductService {
	baseUrl: string = "/api/Products";

	constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

	getProducts(): Observable<Product[]> {
		return this.httpClient.get<Product[]>(this.baseUrl + "/retrieveAllProductsToSell").pipe(catchError(this.handleError));
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
