import { PartChoice } from "./part-choice";
import { Product } from "./product";

export class Part {
	partEntityId: number;
	partName: string;
	description: string;
	isDisabled: boolean;

	productEntities: Product[] = [];
	partChoiceEntities: PartChoice[] = [];

	constructor(partEntityId: number, partName: string, description: string, isDisabled: boolean) {
		this.partEntityId = partEntityId;
		this.partName = partName;
		this.description = description;
		this.isDisabled = isDisabled;
	}
}
