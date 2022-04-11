import { Member } from "./member";

export class CreditCard {
	creditCardEntityId: number | undefined;
	creditCardNumber: number | undefined;
	nameOnCard: string | undefined;
	expiryDate: string | undefined;

	memberEntity: Member | undefined;

	constructor(creditCardId?: number, creditCardNumber?: number, nameOnCard?: string, expiryDate?: string) {
		this.creditCardEntityId = creditCardId;
		this.creditCardNumber = creditCardNumber;
		this.nameOnCard = nameOnCard;
		this.expiryDate = expiryDate;
	}
}
