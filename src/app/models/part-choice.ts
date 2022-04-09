import { Promotion } from "./promotion";

export class PartChoice {
	partChoiceEntityId: number | undefined;
	partChoiceName: string;
	partOverview: string;
	partDescription: string;
	brand: string;
	quantityOnHand: number;
	reorderQuantity: number;
	price: number;
	imageLink: string;
	isDisabled: boolean;

	promotionEntities: Promotion[] = [];
	compatibleChassisPartChoiceEntities: PartChoice[] = [];
	compatiblePartsPartChoiceEntities: PartChoice[] = [];

	constructor(promotionEntities: Promotion[], compatibleChassisPartChoiceEntities: PartChoice[], 
		partChoiceName: string,
		compatiblePartsPartChoiceEntities: PartChoice[], partOverview: string, partDescription: string, brand: string, quantityOnHand: number, reorderQuantity: number, price: number, imageLink: string, isDisabled: boolean, partChoiceEntityId?: number) {
		this.partChoiceEntityId = partChoiceEntityId;
		this.partChoiceName = partChoiceName;
		this.partOverview = partOverview;
		this.partDescription = partDescription;
		this.brand = brand;
		this.quantityOnHand = quantityOnHand;
		this.reorderQuantity = reorderQuantity;
		this.price = price;
		this.imageLink = imageLink;
		this.isDisabled = isDisabled;
		this.promotionEntities = promotionEntities;
		this.compatibleChassisPartChoiceEntities = compatibleChassisPartChoiceEntities;
		this.compatiblePartsPartChoiceEntities = compatiblePartsPartChoiceEntities;
	}
}
