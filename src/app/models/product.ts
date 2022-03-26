import { Part } from "./part";
import { Review } from "./review";

export class Product {
	productEntityId: number | undefined;
	productName: string | undefined;
	skuCode: string | undefined;
	description: string | undefined;
	productOverview: string | undefined;
	imageLink: string | undefined;
	isDisabled: boolean | undefined;

	reviewEntities: Review[] | undefined;
	partEntities: Part[] | undefined;

	constructor(productEntityId?: number, productName?: string, skuCode?: string, productOverview?: string, description?: string, imageLink?: string, isDisabled?: boolean) {
		this.productEntityId = productEntityId;
		this.productName = productName;
		this.skuCode = skuCode;
		this.description = description;
		this.productOverview = productOverview;
		this.imageLink = imageLink;
		this.isDisabled = isDisabled;
	}
}
