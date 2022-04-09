import { PurchaseOrderStatusEnum } from "./enum/purchase-order-status-enum";
import { FullPurchaseOrderLineItem } from "./full-purchase-order-lineitems";
import { Member } from "./member";
import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class FullPurchaseOrderEntity {
	purchaseOrderEntityId: number | undefined;
	referenceNumber: string | undefined;
	totalPrice: number | undefined;
	dateCreated: Date | undefined;
	purchaseOrderStatus: PurchaseOrderStatusEnum | undefined;

	member: Member | undefined;
	purchaseOrderLineItems: FullPurchaseOrderLineItem[] | undefined;

	constructor(purchaseOrderLineItems?: FullPurchaseOrderLineItem[], member?: Member, purchaseOrderEntityId?: number, referenceNumber?: string, totalPrice?: number, dateCreated?: Date, purchaseOrderStatus?: PurchaseOrderStatusEnum) {
		this.purchaseOrderEntityId = purchaseOrderEntityId;
		this.referenceNumber = referenceNumber;
		this.totalPrice = totalPrice;
		this.dateCreated = dateCreated;
		this.purchaseOrderStatus = purchaseOrderStatus;
		this.member = member;
		this.purchaseOrderLineItems = purchaseOrderLineItems;
	}
}
