export class CreateCreditcardReq {
    memberId: string | undefined;
    creditCardNumber: string | undefined;
    nameOnCard: string | undefined;
    expiryDate: string | undefined;

    constructor(memberId: string, creditCardNumber: string, nameOnCard: string, expiryDate:string) {
        this.memberId = memberId;
        this.creditCardNumber = creditCardNumber;
        this.nameOnCard = nameOnCard;
        this.expiryDate = expiryDate;
    }
}
