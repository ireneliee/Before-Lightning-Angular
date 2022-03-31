import { Promotion } from "./promotion";

export class PartChoice {
	partChoiceEntityId: number | undefined;
	partChoiceName: string | undefined;
	partOverview: string | undefined;
	partDescription: string | undefined;
	brand: string | undefined;
	quantityOnHand: number | undefined;
	reorderQuantity: number | undefined;
	price: number | undefined;
	imageLink: string | undefined;
	isDisabled: boolean | undefined;

	promotionEntities: Promotion[] | undefined;
	compatibleChassisPartChoiceEntities: PartChoice[] | undefined;
	compatiblePartsPartChoiceEntities: PartChoice[] | undefined;

	constructor(partChoiceEntityId?: number, partChoiceName?: string, partOverview?: string, partDescription?: string, brand?: string, quantityOnHand?: number, reorderQuantity?: number, price?: number, imageLink?: string, isDisabled?: boolean) {
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
	}
}
