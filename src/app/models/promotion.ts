import { AccessoryItem } from "./accessory-item";
import { PartChoice } from "./part-choice";

export class Promotion {
	promotionEntityId: number | undefined;
	promotionName: string | undefined;
	startDate: Date | undefined;
	endDate: Date | undefined;
	discount: number | undefined;
	discountedPrice: number | undefined;

	partChoiceEntities: PartChoice[] | undefined;
	accessoryItemEntities: AccessoryItem[] | undefined;

	constructor(promotionEntityId?: number, promotionName?: string, startDate?: Date, endDate?: Date, discount?: number, discountedPrice?: number) {
		this.promotionEntityId = promotionEntityId;
		this.promotionName = promotionName;
		this.startDate = startDate;
		this.endDate = endDate;
		this.discount = discount;
		this.discountedPrice = discountedPrice;
	}
}
