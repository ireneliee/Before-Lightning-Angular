import { Part } from "./part";
import { PartChoice } from "./part-choice";

export class SelectedPartChoicePair {
        partChoice : PartChoice;
        part: Part;
    	constructor(partChoice: PartChoice, part : Part) {
            this.part = part;
            this.partChoice = partChoice
        }
}
