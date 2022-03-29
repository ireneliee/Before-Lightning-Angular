import { AccessoryItem } from "./accessory-item";
import { PurchaseOrderLineItemTypeEnum } from "./enum/purchase-order-line-item-type-enum";
import { PartChoice } from "./part-choice";
import { Product } from "./product";

export class CartLineItem {
	quantity: number | undefined;
	subtotalPrice: number | undefined;
	cosmeticImageLink: string | undefined;
	purchaseOrderLineItemTypeEnum: PurchaseOrderLineItemTypeEnum | undefined;

	accessoryItemEntity: AccessoryItem | undefined;
	partChoiceEntities: PartChoice[] | undefined;
	productEntity: Product | undefined;

	constructor(productEntity?: Product, quantity?: number, subtotalPrice?: number, cosmeticImageLink?: string, purchaseOrderLineItemTypeEnum?: PurchaseOrderLineItemTypeEnum) {
        this.productEntity = productEntity;
		this.quantity = quantity;
		this.subtotalPrice = subtotalPrice;
		this.cosmeticImageLink = cosmeticImageLink;
		this.purchaseOrderLineItemTypeEnum = purchaseOrderLineItemTypeEnum;
	}

	
}
