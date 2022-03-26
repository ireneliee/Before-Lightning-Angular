import { AccessoryItem } from "./accessory-item";
import { PurchaseOrderLineItemTypeEnum } from "./enum/purchase-order-line-item-type-enum";
import { PartChoice } from "./part-choice";
import { Product } from "./product";

export class PurchaseOrderLineItem {
	purchaseOrderLineItemEntityId: number | undefined;
	serialNumber: number | undefined;
	quantity: number | undefined;
	subtotalPrice: number | undefined;
	cosmeticImageLink: string | undefined;
	purchaseOrderLineItemTypeEnum: PurchaseOrderLineItemTypeEnum | undefined;

	accessoryItemEntity: AccessoryItem | undefined;
	partChoiceEntities: PartChoice[] | undefined;
	productEntity: Product | undefined;

	constructor(purchaseOrderLineItemEntityId?: number, serialNumber?: number, quantity?: number, subtotalPrice?: number, cosmeticImageLink?: string, purchaseOrderLineItemTypeEnum?: PurchaseOrderLineItemTypeEnum) {
		this.purchaseOrderLineItemEntityId = purchaseOrderLineItemEntityId;
		this.serialNumber = serialNumber;
		this.quantity = quantity;
		this.subtotalPrice = subtotalPrice;
		this.cosmeticImageLink = cosmeticImageLink;
		this.purchaseOrderLineItemTypeEnum = purchaseOrderLineItemTypeEnum;
	}
}
