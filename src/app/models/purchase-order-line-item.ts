import { AccessoryItem } from "./accessory-item";
import { PurchaseOrderLineItemTypeEnum } from "./enum/purchase-order-line-item-type-enum";
import { PartChoice } from "./part-choice";
import { Product } from "./product";

export class PurchaseOrderLineItem {
	purchaseOrderLineItemEntityId: number | undefined;
	serialNumber: number;
	quantity: number;
	subtotalPrice: number;
	cosmeticImageLink: string;
	purchaseOrderLineItemTypeEnum: PurchaseOrderLineItemTypeEnum;

	accessoryItemEntity: AccessoryItem = new AccessoryItem();
	partChoiceEntities: PartChoice[] = [];
	productEntity: Product = new Product();

	constructor(serialNumber: number, quantity: number, subtotalPrice: number, cosmeticImageLink: string, purchaseOrderLineItemTypeEnum: PurchaseOrderLineItemTypeEnum, purchaseOrderLineItemEntityId?: number) {
		this.purchaseOrderLineItemEntityId = purchaseOrderLineItemEntityId;
		this.serialNumber = serialNumber;
		this.quantity = quantity;
		this.subtotalPrice = subtotalPrice;
		this.cosmeticImageLink = cosmeticImageLink;
		this.purchaseOrderLineItemTypeEnum = purchaseOrderLineItemTypeEnum;
	}
}
