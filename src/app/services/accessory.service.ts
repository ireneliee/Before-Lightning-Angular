import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Accessory } from "../models/accessory";
import { Product } from "../models/product";
import { SessionService } from "./session.service";

@Injectable({
	providedIn: "root",
})
export class AccessoryService {
	httpOptions = {
		headers: new HttpHeaders({ "Content-Type": "application/json" }),
	};

	baseUrl: string = "/api/Accessory";

	constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

	getAccessories(): Observable<Accessory[]> {
		return this.httpClient.get<Accessory[]>(this.baseUrl + "/retrieveAllAccessoryToSell").pipe(catchError(this.handleError));
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
