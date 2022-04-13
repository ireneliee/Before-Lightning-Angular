export class DeleteCreditcardReq {
    private creditCardId: string | undefined;
    private memberId: string | undefined;

    constructor(creditCardId?:string, memberId?:string) {
        this.creditCardId = creditCardId;
        this.memberId = memberId;
    }
}

