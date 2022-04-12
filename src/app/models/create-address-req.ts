export class CreateAddressReq {
    memberId: string | undefined;
    block: string | undefined;
    unit: string | undefined;
    postalCode: string | undefined;
    country: string | undefined;

    constructor(memberId: string, block: string, unit: string, postalCode: string, country: string) {
        this.memberId = memberId;
        this.block = block;
        this.unit = unit;
        this.postalCode = postalCode;
        this. country = country;
    }
}
