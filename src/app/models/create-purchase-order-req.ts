import { DeliverySlot } from "./delivery-slot";
import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class CreatePurchaseOrderReq {
	listOfLineItems: PurchaseOrderLineItem[];
    deliverySlot: DeliverySlot;
    memberUsername : string;
	
    constructor(listOfLineItems: PurchaseOrderLineItem[], deliverySlot: DeliverySlot, memberUsername : string) {
        this.listOfLineItems = listOfLineItems;
        this.deliverySlot = deliverySlot;
        this.memberUsername = memberUsername;
    }
}
