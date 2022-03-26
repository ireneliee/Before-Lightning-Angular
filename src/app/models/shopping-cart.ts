import { PurchaseOrderLineItem } from "./purchase-order-line-item";

export class ShoppingCart {
	shoppingCartEntityId: number | undefined;

	purchaseOrderLineItemEntities: PurchaseOrderLineItem[] | undefined;

	constructor(shoppingCartEntityId?: number) {
		this.shoppingCartEntityId = shoppingCartEntityId;
	}
}
