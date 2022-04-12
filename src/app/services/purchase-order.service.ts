import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Address } from "../models/address";
import { CreatePurchaseOrderReq } from "../models/create-purchase-order-req";
import { DeliverySlot } from "../models/delivery-slot";
import { FullPurchaseOrderEntity } from "../models/full-purchase-order";
import { PurchaseOrderEntity } from "../models/purchase-order";
import { PurchaseOrderLineItem } from "../models/purchase-order-line-item";
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

	getMyPurchaseOrder(): Observable<FullPurchaseOrderEntity[]> {
		console.log(this.sessionService.getUsername());
		return this.httpClient.get<FullPurchaseOrderEntity[]>(this.baseUrl + "/retrievePurchaseOrderByUsername?username=" + this.sessionService.getUsername()).pipe(catchError(this.handleError));
	}

	createNewPurchaseOrder(listOfLineItems: PurchaseOrderLineItem[], deliverySlot: DeliverySlot, address: Address, deliveryType: string, totalPrice: number): Observable<PurchaseOrderEntity> {
		console.log("====== HERE IN PURCHASE ORDER SERVICE =====");
		console.log(" ------- sending out data to service --------");
		console.log(listOfLineItems);
		console.log(deliverySlot);
		console.log("delivery status " + deliverySlot.deliveryStatus);

		console.log(address);
		console.log(deliveryType);
		console.log(totalPrice);
		console.log("----------------------------------------------");
		listOfLineItems.forEach((item) => {
			item.purchaseOrderLineItemEntityId = undefined;
		});
		console.log("outside of deleting IDs in line items");

		console.log(listOfLineItems);

		let purchaseOrderReq: CreatePurchaseOrderReq = new CreatePurchaseOrderReq(listOfLineItems,  this.sessionService.getCurrentMember().username, address, deliveryType, totalPrice);
// deliverySlot,
		console.log("CREATED PURCHASE ORDER REQUEST");

		console.log(purchaseOrderReq);

		return this.httpClient.put<any>(this.baseUrl + "/createNewPurchaseOrder", purchaseOrderReq, httpOptions).pipe(catchError(this.handleError));
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
