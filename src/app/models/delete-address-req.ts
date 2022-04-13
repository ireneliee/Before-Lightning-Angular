export class DeleteAddressReq {
    private addressId: string | undefined;
    private memberId: string | undefined;

    constructor(addresssId?:string, memberId?:string) {
        this.addressId = addresssId;
        this.memberId = memberId;
    }
}
