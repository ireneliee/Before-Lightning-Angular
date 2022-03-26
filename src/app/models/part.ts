import { PartChoice } from "./part-choice";
import { Product } from "./product";

export class Part {
	partEntityId: number | undefined;
	partName: string | undefined;
	description: string | undefined;
	isDisabled: boolean | undefined;

	productEntities: Product[] | undefined;
	partChoiceEntities: PartChoice[] | undefined;

	constructor(partEntityId?: number, partName?: string, description?: string, isDisabled?: boolean) {
		this.partEntityId = partEntityId;
		this.partName = partName;
		this.description = description;
		this.isDisabled = isDisabled;
	}
}
