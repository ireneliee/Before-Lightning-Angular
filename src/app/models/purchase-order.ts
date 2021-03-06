import { PurchaseOrderStatusEnum } from "./enum/purchase-order-status-enum";
import { Member } from "./member";
import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class PurchaseOrderEntity {
	purchaseOrderEntityId: number | undefined;
	referenceNumber: string | undefined;
	totalPrice: number | undefined;
	dateCreated: Date | undefined;
	purchaseOrderStatus: PurchaseOrderStatusEnum | undefined;

	member: Member | undefined;
	purchaseOrderLineItems: PurchaseOrderLineItem[] | undefined;

	constructor(member?: Member, purchaseOrderEntityId?: number, referenceNumber?: string, totalPrice?: number, dateCreated?: Date, purchaseOrderStatus?: PurchaseOrderStatusEnum) {
		this.purchaseOrderEntityId = purchaseOrderEntityId;
		this.referenceNumber = referenceNumber;
		this.totalPrice = totalPrice;
		this.dateCreated = dateCreated;
		this.purchaseOrderStatus = purchaseOrderStatus;
		this.member = member;
	}
}
