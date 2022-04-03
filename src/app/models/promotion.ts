import { AccessoryItem } from "./accessory-item";
import { PartChoice } from "./part-choice";

export class Promotion {
	promotionEntityId: number;
	promotionName: string;
	startDate: Date;
	endDate: Date;
	discount: number;
	discountedPrice: number;

	partChoiceEntities: PartChoice[] = [];
	accessoryItemEntities: AccessoryItem[] = [];

	constructor(promotionEntityId: number, promotionName: string, startDate: Date, endDate: Date, discount: number, discountedPrice: number) {
		this.promotionEntityId = promotionEntityId;
		this.promotionName = promotionName;
		this.startDate = startDate;
		this.endDate = endDate;
		this.discount = discount;
		this.discountedPrice = discountedPrice;
	}
}
