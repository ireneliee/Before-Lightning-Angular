import { Part } from "./part";
import { PartChoice } from "./part-choice";

export class SelectedPartChoicePair {
        partChoice : PartChoice;
        part: Part;
        price : number;
    	constructor(partChoice: PartChoice, part : Part, price: number) {
            this.part = part;
            this.partChoice = partChoice
            this.price = price;
        }
}
