import { Address } from "./address";
import { DeliverySlot } from "./delivery-slot";
import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class CreatePurchaseOrderReq {
	listOfLineItems: PurchaseOrderLineItem[];
	// deliverySlot: DeliverySlot;
	memberUsername: string;
	address: Address;
	deliveryType: string;
	totalPrice: number;
	day: number;
	month: number;
	year: number;
	hours: number;
	deliveryOption: string;

	constructor(listOfLineItems: PurchaseOrderLineItem[], memberUsername: string, address: Address, deliveryType: string, totalPrice: number, day: number, month: number, year: number, hours: number, deliveryOption: string) {
		this.listOfLineItems = listOfLineItems;
		// this.deliverySlot = deliverySlot;
		this.memberUsername = memberUsername;
		this.address = address;
		this.deliveryType = deliveryType;
		this.totalPrice = totalPrice;
		this.day = day;
		this.month = month;
		this.year = year;
		this.hours = hours;
		this.deliveryOption = deliveryOption;
	}
}
// deliverySlot: DeliverySlot,
