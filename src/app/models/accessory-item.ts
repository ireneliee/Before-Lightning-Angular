import { Accessory } from "./accessory";
import { Promotion } from "./promotion";
import { Review } from "./review";

export class AccessoryItem {
	accessoryItemEntityId: number | undefined;
	accessoryItemName: string | undefined;
	skuCode: string | undefined;
	brand: string | undefined;
	description: string | undefined;
	quantityOnHand: number | undefined;
	reorderQuantity: number | undefined;
	price: number | undefined;
	imageLink: string | undefined;
	isDisabled: boolean | undefined;

    accessoryEntity : Accessory | undefined;
    promotionEntities : Promotion[] | undefined;
    reviewEntities : Review[] | undefined;

	constructor(
		accessoryItemEntityId?: number,
		accessoryItemName?: string,
		skuCode?: string,
		brand?: string,
		description?: string,
		quantityOnHand?: number,
		reorderQuantity?: number,
		price?: number,
		imageLink?: string,
		isDisabled?: boolean
	) {
		this.accessoryItemEntityId = accessoryItemEntityId;
		this.accessoryItemName = accessoryItemName;
		this.skuCode = skuCode;
		this.brand = brand;
		this.description = description;
		this.quantityOnHand = quantityOnHand;
		this.reorderQuantity = reorderQuantity;
		this.price = price;
		this.imageLink = imageLink;
		this.isDisabled = isDisabled;
	}
}
