import { Address } from "./address";
import { CreditCard } from "./credit-card";
import { ForumPost } from "./forum-post";
import { PurchaseOrder } from "./purchase-order";
import { Reply } from "./reply";
import { ShoppingCart } from "./shopping-cart";

export class Member {
	memberId: number | undefined;
	username: string | undefined;
	password: string | undefined;
	firstName: string | undefined;
	lastName: string | undefined;
	email: String | undefined;
	contact: String | undefined;
	imageLink: String | undefined;
	salt: String | undefined;
	isActive: Boolean | undefined;

	creditCardEntities: CreditCard[] | undefined;
	addressEntities: Address[] | undefined;
  purchaseOrderEntities : PurchaseOrder[] | undefined;
  shoppingCartEntity : ShoppingCart | undefined;
  listOfAutheredForumPosts : ForumPost[] | undefined;
  listOfLikedForumPost: ForumPost[] | undefined;
  listOfDislikedForumPost:ForumPost[] | undefined;
  listOfReplyEntities : Reply[] | undefined;
  

	constructor(memberId?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: String, contact?: String, imageLink?: String, salt?: String, isActive?: Boolean) {
		this.memberId = memberId;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contact = contact;
		this.imageLink = imageLink;
		this.salt = salt;
		this.isActive = isActive;
	}
}
