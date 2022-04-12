
export class UpdateMemberDetailReq {

	username: string | undefined;
	firstname: string | undefined;
	lastname: string | undefined;
	email: string | undefined;
	contact: string | undefined;
	imageLink: string | undefined;

	constructor(username: string, firstname: string, lastname: string, email: string, contact: string, imageLink: string) {
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.contact = contact;
		this.imageLink = imageLink;
	}

}
