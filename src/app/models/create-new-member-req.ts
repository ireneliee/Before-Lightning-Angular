import { Address } from "./address";

export class CreateNewMemberReq {
	address: Address | undefined;
	username: String | undefined;
	password: String | undefined;
	firstname: String | undefined;
	lastname: String | undefined;
	email: String | undefined;
	contact: String | undefined;
	imageLink: String | undefined;

	constructor(address: Address, username: String, password: String, firstname: String, lastname: String, email: String, contact: String, imageLink: String) {
		this.address = address;
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.contact = contact;
		this.imageLink = imageLink;
	}
}
