import { PurchaseOrderStatusEnum } from "./enum/purchase-order-status-enum";
import { Member } from "./member";
import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class PurchaseOrder {
	purchaseOrderEntityId: number | undefined;
	referenceNumber: string | undefined;
	totalPrice: number | undefined;
	dateCreated: Date | undefined;
	purchaseOrderStatusEnum: PurchaseOrderStatusEnum | undefined;

	memberEntity: Member | undefined;
	purchaseOrderLineItemEntities: PurchaseOrderLineItem[] | undefined;

	constructor(purchaseOrderEntityId?: number, referenceNumber?: string, totalPrice?: number, dateCreated?: Date, purchaseOrderStatusEnum?: PurchaseOrderStatusEnum) {
		this.purchaseOrderEntityId = purchaseOrderEntityId;
		this.referenceNumber = referenceNumber;
		this.totalPrice = totalPrice;
		this.dateCreated = dateCreated;
		this.purchaseOrderStatusEnum = purchaseOrderStatusEnum;
	}
}
