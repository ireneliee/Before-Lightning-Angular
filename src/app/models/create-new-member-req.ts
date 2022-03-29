import { Address } from "./address";
import { Member } from "./member";

export class CreateNewMemberReq {

	member : Member | undefined;
    address : Address | undefined;
  

	constructor(member: Member, address: Address) {
		this.member = member;
		this.address = address;
	}
}