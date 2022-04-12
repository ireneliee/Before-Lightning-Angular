import { Address } from "./address";
import { DeliverySlot } from "./delivery-slot";
import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class CreatePurchaseOrderReq {
	listOfLineItems: PurchaseOrderLineItem[];
    // deliverySlot: DeliverySlot;
    memberUsername : string;
    address : Address;
    deliveryType : string;
    totalPrice : number;
	
    constructor(listOfLineItems: PurchaseOrderLineItem[], memberUsername : string, address : Address, deliveryType : string, totalPrice : number) {
        this.listOfLineItems = listOfLineItems;
        // this.deliverySlot = deliverySlot;
        this.memberUsername = memberUsername;
        this.address = address;
        this.deliveryType = deliveryType;
        this.totalPrice = totalPrice;
    }
}
// deliverySlot: DeliverySlot, 