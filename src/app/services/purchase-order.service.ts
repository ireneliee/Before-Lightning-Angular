import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { FullPurchaseOrderEntity } from "../models/full-purchase-order";
import { PurchaseOrderEntity } from "../models/purchase-order";
import { SessionService } from "./session.service";

const httpOptions = {
	headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
	providedIn: "root",
})
export class PurchaseOrderService {
	baseUrl: string = "/api/PurchaseOrder";

	constructor(private httpClient: HttpClient, private sessionService: SessionService) {}

    getMyPurchaseOrder():Observable<FullPurchaseOrderEntity[]> {
		console.log(this.sessionService.getUsername());
        return this.httpClient.get<FullPurchaseOrderEntity[]>(this.baseUrl + "/retrievePurchaseOrderByUsername?username=" + this.sessionService.getUsername()).pipe(
          catchError(this.handleError)
        )
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
