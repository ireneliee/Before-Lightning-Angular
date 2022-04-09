import { Part } from "./part";
import { PartChoice } from "./part-choice";

export class SelectedPartChoicePair {
	partChoice: PartChoice | undefined;
	part: Part | undefined;
	price: number | undefined;
	constructor(part?: Part, price?: number,partChoice?: PartChoice) {
		this.part = part;
		this.partChoice = partChoice;
		this.price = price;
	}
}
