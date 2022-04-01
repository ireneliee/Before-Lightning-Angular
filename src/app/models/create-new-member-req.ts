import { Address } from "./address";

export class CreateNewMemberReq {
	address: Address | undefined;
	username: string | undefined;
	password: string | undefined;
	firstname: string | undefined;
	lastname: string | undefined;
	email: string | undefined;
	contact: string | undefined;
	imageLink: string | undefined;

	constructor(address: Address, username: string, password: string, firstname: string, lastname: string, email: string, contact: string, imageLink: string) {
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
