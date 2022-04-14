import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AccessoryItem } from "src/app/models/accessory-item";
import { Address } from "src/app/models/address";
import { CreditCard } from "src/app/models/credit-card";
import { DeliverySlot } from "src/app/models/delivery-slot";
import { DeliveryStatusEnum } from "src/app/models/enum/delivery-status-enum";
import { PurchaseOrderLineItemTypeEnum } from "src/app/models/enum/purchase-order-line-item-type-enum";
import { Member } from "src/app/models/member";
import { PartChoice } from "src/app/models/part-choice";
import { PurchaseOrderEntity } from "src/app/models/purchase-order";
import { PurchaseOrderLineItem } from "src/app/models/purchase-order-line-item";
import { PurchaseOrderService } from "src/app/services/purchase-order.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-view-my-cart-page",
	templateUrl: "./view-my-cart-page.component.html",
	styleUrls: ["./view-my-cart-page.component.css"],
})
export class ViewMyCartPageComponent implements OnInit {
	myCart: PurchaseOrderLineItem[] = [];
	totalPrice: number = 0;
	displayDialog: boolean = false;
	selectedLineItem: PurchaseOrderLineItem | null = null;
	selectedQuantity: number = 0;
	selectedQuantityOnHand: number = 0;
	displayCheckoutDialog: boolean = false;
	loggedIn: boolean = false;
	member: Member | null = null;

	//for checking out
	deliveryDate: Date = new Date();
	deliveryOptions = [
		{ label: "Self-Collection", value: "Self-Collection" },
		{ label: "Delivery", value: "Delivery" },
	];
	deliveryChoices = [
		{ label: "Standard", value: "Standard" },
		{ label: "Express (+$10)", value: "Express" },
	];
	selectedDeliveryMode: string = "";
	selectedDeliveryChoice: string = "";
	startDateToChoose: Date = new Date();
	earliestNumberOfDays: number = 0;
	listOfCreditCards: CreditCard[] = [];
	listOfAddresses: Address[] = [];
	selectedCreditCard: CreditCard = new CreditCard();
	selectedAddress: Address = new Address();

	constructor(private router: Router, private sessionService: SessionService, private messageService: MessageService, private purchaseOrderService: PurchaseOrderService) {}

	ngOnInit(): void {
		this.checkAccessRight();
		this.member = this.sessionService.getCurrentMember();
		let cart: PurchaseOrderLineItem[] | undefined = this.sessionService.getCart();
		if (cart) {
			this.myCart = cart;
			let index = 1;
			this.myCart.forEach((lineItem) => {
				this.checkItemPriceAndQuantity(lineItem);
				lineItem.purchaseOrderLineItemEntityId = index;
				index++;
				this.totalPrice += lineItem.subTotalPrice;
			});
		}
		this.deliveryDate.setDate(new Date().getDate() + 14);
		this.deliveryDate.setHours(12);
		this.deliveryDate.setMinutes(0);
		this.deliveryDate.setSeconds(0);
		this.loggedIn = this.sessionService.getIsLogin();
		this.startDateToChoose.setHours(12);
		this.startDateToChoose.setMinutes(0);
		this.startDateToChoose.setSeconds(0);
		if (this.member.creditCards != undefined) {
			this.listOfCreditCards = this.member.creditCards!;
		}
		this.listOfAddresses = this.member.addresses!;
		console.log("testtest");
	}

	checkItemPriceAndQuantity(lineitem: PurchaseOrderLineItem) {
		//check item still exist
		//check that the prices are still valid, if not update price
		//need to check if quantity still there?
	}

	checkoutCart() {
		this.displayCheckoutDialog = true;
	}

	setEarliestNumberOfDays() {
		if (this.selectedDeliveryChoice == "Express") {
			this.earliestNumberOfDays = 7;
		} else {
			this.earliestNumberOfDays = 14;
		}
		this.startDateToChoose.setDate(new Date().getDate() + this.earliestNumberOfDays);
		this.startDateToChoose.setHours(12);
		this.startDateToChoose.setMinutes(0);
		this.startDateToChoose.setSeconds(0);

		console.log("EARLIEST DATE:" + this.startDateToChoose);
	}

	confirmCheckoutCart() {
		console.log(" =========== IN VIEW CART COMPONENT ========");
		console.log(" =========== TRIGGERED CONFIRM CHECKOUT ========");

		let deliverySlot: DeliverySlot = new DeliverySlot();
		if (this.selectedDeliveryMode == "Delivery") {
			deliverySlot.deliveryStatus = DeliveryStatusEnum.OUTSTORE;
		} else {
			deliverySlot.deliveryStatus = DeliveryStatusEnum.INSTORE;
		}
		deliverySlot.requestedTimeOfDelivery = this.deliveryDate;

		let confirmedAddress: Address = new Address();
		if (this.selectedAddress.country !== null) {
			confirmedAddress = this.selectedAddress;
		}
		let finalDeliveryType: string = "";
		if (this.selectedDeliveryChoice === "Express") {
			finalDeliveryType = this.selectedDeliveryChoice;
		} else {
			this.selectedDeliveryChoice = "Standard";
		}
		console.log(" ------- sending out data to service --------");
		console.log(this.myCart);
		console.log(deliverySlot);
		console.log(confirmedAddress);
		console.log(finalDeliveryType);
		console.log(this.totalPrice);
		console.log("----------------------------------------------");

		this.purchaseOrderService.createNewPurchaseOrder(this.myCart, deliverySlot, confirmedAddress, finalDeliveryType, this.totalPrice).subscribe({
			next: (response) => {
				console.log(" ====== IN RESPONSE INSIDE VIEW CART COMPONENT =======");

				let purchaseOrder = response;
				console.log(purchaseOrder);

				this.sessionService.setCart([]);
				this.myCart = [];
				this.totalPrice = 0;
				this.selectedAddress = new Address();
				this.selectedCreditCard = new CreditCard();

				this.messageService.add({ severity: "success", summary: "Congratulations!", detail: "You have successfully checked out your order!" });
			},
			error: (error) => {
				this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when creating purchase order" });
				console.log("********** VIEW MY CART.ts: " + error);
			},
		});

		this.displayCheckoutDialog = false;
	}

	closeCheckoutDialog() {
		this.displayCheckoutDialog = false;
	}

	updateLineItem(lineItem: PurchaseOrderLineItem) {
		this.selectedLineItem = lineItem;
		this.selectedQuantity = lineItem.quantity;
		if (lineItem.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.BUILD) {
			let lowestStock = 100000;
			lineItem.partChoiceEntities.forEach((pc) => {
				if (pc.quantityOnHand < lowestStock) {
					lowestStock = pc.quantityOnHand;
				}
			});
			this.selectedQuantityOnHand = lowestStock;
		} else {
			this.selectedQuantityOnHand = lineItem.accessoryItemEntity.quantityOnHand!;
		}
		this.displayDialog = true;
	}
	confirmUpdate() {
		this.myCart.forEach((item) => {
			if (item.purchaseOrderLineItemEntityId == this.selectedLineItem?.purchaseOrderLineItemEntityId) {
				item.quantity = this.selectedQuantity;
				item.subTotalPrice = this.getBestPrice(item) * item.quantity;
			}
		});

		this.sessionService.setCart(this.myCart);
		this.messageService.add({ severity: "success", summary: "Success", detail: "Updated LineItem Quantity" });
		this.getNewTotalPrice();

		this.selectedLineItem = null;
		this.selectedQuantity = 0;
		this.selectedQuantityOnHand = 0;
		this.displayDialog = false;
	}

	removeLineItem(lineItem: PurchaseOrderLineItem) {
		console.log("CALLING REMOVE");
		console.log("CURRENT CART: ");
		console.log(this.myCart);

		let cart: PurchaseOrderLineItem[] | undefined = this.sessionService.getCart();
		if (cart) {
			console.log("CART EXIST");
			let newList: PurchaseOrderLineItem[] = [];
			let index = 1;
			this.myCart.forEach((item) => {
				if (item.purchaseOrderLineItemEntityId != lineItem.purchaseOrderLineItemEntityId) {
					item.purchaseOrderLineItemEntityId = index;
					newList.push(item);
					index++;
				}
			});

			console.log(newList);

			this.sessionService.setCart(newList);
			this.messageService.add({ severity: "success", summary: "Success", detail: "Removed Line Item From Cart" });
			this.myCart = newList;
			this.getNewTotalPrice();
		}
	}

	getLineItem(poli: PurchaseOrderLineItem): string {
		if (poli.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.BUILD) {
			let product = "";
			product += poli.productEntity.productName + "\n";
			product += "[";
			poli.partChoiceEntities.forEach((pc) => {
				product += "  - " + pc.partChoiceName + "\n";
			});
			product += "]";

			return product;
		} else {
			return poli.accessoryItemEntity.accessoryItemName!;
		}
	}

	getLineItemType(poli: PurchaseOrderLineItem): string {
		if (poli.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.BUILD) {
			return "BUILD";
		} else {
			return "ACCESSORY";
		}
	}

	getNewTotalPrice() {
		let newTotal = 0;
		this.myCart.forEach((item) => {
			newTotal += item.subTotalPrice;
		});
		this.totalPrice = newTotal;
	}

	getBestPrice(poli: PurchaseOrderLineItem): number {
		let total = 0;
		if (poli.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.BUILD) {
			poli.partChoiceEntities.forEach((pc) => {
				total += this.getBestPriceForPartChoice(pc);
			});

			return total;
		} else {
			return this.getBestPriceForAccessory(poli.accessoryItemEntity);
		}
	}

	getBestPriceForPartChoice(partChoice: PartChoice): number {
		//check if partchoice has promotions first
		let originalPrice = partChoice.price;
		let bestPrice = partChoice.price;
		if (partChoice.promotionEntities.length > 0) {
			partChoice.promotionEntities.forEach((promotion) => {
				let currentDate = new Date();
				// console.log(promotion.endDate, currentDate);
				if (promotion.endDate > currentDate && promotion.startDate <= currentDate) {
					if (promotion.discount != 0) {
						let newPrice = promotion.discount * originalPrice;
						if (newPrice < bestPrice) {
							bestPrice = newPrice;
						}
					} else {
						let newPrice = promotion.discountedPrice;
						if (newPrice < bestPrice) {
							bestPrice = newPrice;
						}
					}
				}
			});
			return bestPrice;
		} else {
			return partChoice.price;
		}
	}

	getBestPriceForAccessory(accessoryItem: AccessoryItem): number {
		//check if partchoice has promotions first
		let originalPrice = accessoryItem.price!;
		let bestPrice = accessoryItem.price!;
		if (accessoryItem.promotionEntities!.length > 0) {
			accessoryItem.promotionEntities!.forEach((promotion) => {
				let currentDate = new Date();
				// console.log(promotion.endDate, currentDate);
				if (promotion.endDate > currentDate && promotion.startDate <= currentDate) {
					if (promotion.discount != 0) {
						let newPrice = promotion.discount * originalPrice;
						if (newPrice < bestPrice) {
							bestPrice = newPrice;
						}
					} else {
						let newPrice = promotion.discountedPrice;
						if (newPrice < bestPrice) {
							bestPrice = newPrice;
						}
					}
				}
			});
			return bestPrice;
		} else {
			return accessoryItem.price!;
		}
	}

	// getParsedAddress(address : Address) : string {
	// 	let str = "";
	// 	str += address.block + "\n";
	// 	str += address.postalCode + "\n";
	// 	str += address.unit + "\n";
	// 	str += address.country;
	// 	return str;
	// }

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
