import { Address } from "./address";
import { CreditCard } from "./credit-card";
import { ForumPost } from "./forum-post";
import { PurchaseOrderEntity } from "./purchase-order";
import { Reply } from "./reply";
import { ShoppingCart } from "./shopping-cart";

export class Member {
	userEntityId: number | undefined;
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	email: string;
	contact: string;
	imageLink: string;
	salt: string;
	isActive: boolean;

	creditCards: CreditCard[] | undefined;
	addresses: Address[] | undefined;
	purchaseOrderEntities: PurchaseOrderEntity[] | undefined;
	shoppingCartEntity: ShoppingCart | undefined;
	listOfAutheredForumPosts: ForumPost[] | undefined;
	listOfLikedForumPost: ForumPost[] | undefined;
	listOfReplyEntities: Reply[] | undefined;

	constructor(username: string, password: string, firstname: string, lastname: string, email: string, contact: string, imageLink: string, salt: string, isActive: boolean, userEntityId?: number) {
		this.userEntityId = userEntityId;
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.contact = contact;
		this.imageLink = imageLink;
		this.salt = salt;
		this.isActive = isActive;
	}
}
