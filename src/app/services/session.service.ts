import { Injectable } from "@angular/core";
import { Member } from "../models/member";
import { PurchaseOrderLineItem } from "../models/purchase-order-line-item";

@Injectable({
	providedIn: "root",
})
export class SessionService {
	constructor() {}

	getIsLogin(): boolean {
		if (sessionStorage["isLogin"] == "true") {
			return true;
		} else {
			return false;
		}
	}

	setIsLogin(isLogin: boolean): void {
		sessionStorage["isLogin"] = isLogin;
	}

	getCurrentMember(): Member {
		return JSON.parse(sessionStorage["currentMember"]);
	}

	setCurrentMember(currentMember: Member | null): void {
		sessionStorage["currentMember"] = JSON.stringify(currentMember);
	}

	getUsername(): string {
		return sessionStorage["username"];
	}

	setUsername(username: string | undefined): void {
		sessionStorage["username"] = username;
	}

	getPassword(): string {
		return sessionStorage["password"];
	}

	setPassword(password: string | undefined): void {
		sessionStorage["password"] = password;
	}

	//THIS IS FOR THE SHOPPING CART
	//===================================================================
	getCart(): PurchaseOrderLineItem[] | undefined {
		const cart = sessionStorage.getItem("cart");

		if (typeof cart === "string") {
			return JSON.parse(cart);
		} else {
			return [];
		}
	}

	setCart(lineItems: PurchaseOrderLineItem[]): void {
		sessionStorage.setItem("cart", JSON.stringify(lineItems));
	}
	//===================================================================

	//UPDATE THIS WHEN YOU MAKE NEW PAGES
	checkAccessRight(path: string): boolean {
		console.log("********** path: " + path);
		console.log(this.getIsLogin());

		if (this.getIsLogin()) {
			if (
				path == "/index" ||
				path == "/productsHomePage" ||
				path.startsWith("/customizeProductsPage") ||
				path == "/accessoryHomePage" ||
				path.startsWith("/viewAllAccessoryItemsPage") ||
				path == "/viewMyCartPage" ||
				path == "/viewMyOrdersPage" ||
				path == "/forumPage" ||
				path == "/supportPage" ||
				path == "/settingsPage"
			) {
				return true;
			} else {
				return false;
			}
		} else {
			if (
				path == "/index" ||
				path == "/productsHomePage" ||
				path.startsWith("/customizeProductsPage") ||
				path == "/registeration" ||
				path == "/accessoryHomePage" ||
				path.startsWith("/viewAllAccessoryItemsPage") ||
				path == "/viewMyCartPage" ||
				path == "/forumPage" ||
				path == "/supportPage" 
			) {
				return true;
			} else {
				return false;
			}
		}
	}

	getEmail(): string {
		return sessionStorage["email"];
	}

	setEmail(email: string | undefined): void {
		sessionStorage["email"] = email;
	}
}
