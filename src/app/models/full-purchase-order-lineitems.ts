import { AccessoryItem } from "./accessory-item";
import { PurchaseOrderLineItemTypeEnum } from "./enum/purchase-order-line-item-type-enum";
import { PartChoice } from "./part-choice";
import { Product } from "./product";

export class FullPurchaseOrderLineItem {
	purchaseOrderLineItemEntityId: number | undefined;
	serialNumber: number;
	quantity: number;
	subTotalPrice: number;
	cosmeticImageLink: string;
	purchaseOrderLineItemTypeEnum: PurchaseOrderLineItemTypeEnum;

	accessoryItemEntity: AccessoryItem = new AccessoryItem();
	partChoiceEntities: PartChoice[] = [];
	productEntity: Product = new Product();

	constructor(accessoryItemEntity: AccessoryItem, partChoiceEntities: PartChoice[], productEntity: Product, serialNumber: number, quantity: number, subTotalPrice: number, cosmeticImageLink: string, purchaseOrderLineItemTypeEnum: PurchaseOrderLineItemTypeEnum, purchaseOrderLineItemEntityId?: number) {
		this.purchaseOrderLineItemEntityId = purchaseOrderLineItemEntityId;
		this.serialNumber = serialNumber;
		this.quantity = quantity;
		this.subTotalPrice = subTotalPrice;
		this.cosmeticImageLink = cosmeticImageLink;
		this.purchaseOrderLineItemTypeEnum = purchaseOrderLineItemTypeEnum;
        this.accessoryItemEntity = accessoryItemEntity;
        this.partChoiceEntities = partChoiceEntities;
        this.productEntity = productEntity;
	}
}
