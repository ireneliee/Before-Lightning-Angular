import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { Accessory } from "src/app/models/accessory";
import { AccessoryItem } from "src/app/models/accessory-item";
import { PurchaseOrderLineItemTypeEnum } from "src/app/models/enum/purchase-order-line-item-type-enum";
import { PurchaseOrderLineItem } from "src/app/models/purchase-order-line-item";
import { Review } from "src/app/models/review";
import { AccessoryService } from "src/app/services/accessory.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-view-all-accessory-items-page",
	templateUrl: "./view-all-accessory-items-page.component.html",
	styleUrls: ["./view-all-accessory-items-page.component.scss"],
})
export class ViewAllAccessoryItemsPageComponent implements OnInit {
	sortOptions: SelectItem[];
	sortField: string;
	sortOrder: number;
	sortKey: string;
	accessoryId: string | null;
	accessory: Accessory | null;
	listOfAccessoryItems: AccessoryItem[] = [];
	retrieveAccessoryError: boolean;
	displayDialog: boolean = false;
	displayReviewsDialog: boolean = false;
	selectedAccessoryItem: AccessoryItem | null = null;
	selectedQuantity: number = 1;
	selectedAccessoryItemQuantityOnHand: number = 0;
	listOfReviews: Review[] = [];

	constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private messageService: MessageService, private accessoryService: AccessoryService) {
		this.retrieveAccessoryError = false;
		this.accessoryId = null;
		this.accessory = null;
		this.sortOptions = new Array();
		this.sortField = "";
		this.sortKey = "";
		this.sortOrder = 0;
	}

	ngOnInit(): void {
		this.checkAccessRight();
		this.accessoryId = this.activatedRoute.snapshot.paramMap.get("accessoryId");

		if (this.accessoryId != null) {
			this.accessoryService.getAccessoryById(parseInt(this.accessoryId)).subscribe({
				next: (response) => {
					this.accessory = response;
					this.listOfAccessoryItems = this.accessory.accessoryItemEntities!;
				},
				error: (error) => {
					this.retrieveAccessoryError = true;
					console.log("********** View All Accessory Items PAGE Component.ts: " + error);
				},
			});
		}
	}

	doDisplayDialog(accessoryItem: AccessoryItem) {
		this.displayDialog = true;
		this.selectedAccessoryItem = accessoryItem;
		this.selectedAccessoryItemQuantityOnHand = this.selectedAccessoryItem.quantityOnHand!;
	}

	doDisplayReviewsDialog(accessoryItem: AccessoryItem) {
		this.displayReviewsDialog = true;
		console.log(accessoryItem);
		this.selectedAccessoryItem = accessoryItem;
		this.listOfReviews = this.selectedAccessoryItem.reviewEntities!;
	}

	addToCart() {
		let cart: PurchaseOrderLineItem[] | undefined = this.sessionService.getCart();
		//check if cart has accessory item alr
		console.log("ADD TO CART CALLED");

		if (cart) {
			console.log("CART EXISTS");

			let checkExist = false;
			cart.forEach((item) => {
				if (item.purchaseOrderLineItemTypeEnum == PurchaseOrderLineItemTypeEnum.ACCESSORY) {
					if (item.accessoryItemEntity.accessoryItemEntityId == this.selectedAccessoryItem?.accessoryItemEntityId) {
						console.log("EXISTING LINE ITEM WITH SAME ACCESSORY ITEM");

						checkExist = true;
						item.quantity += this.selectedQuantity;
						if (item.quantity > this.selectedAccessoryItem?.quantityOnHand!) {
							console.log("QUANTITY MORE THAN STOCK");

							item.quantity = this.selectedAccessoryItem?.quantityOnHand!;
							this.triggerMessage("Quantity selected has exceeded maximum stock available!", "info", "Exceeded Quantity Available");
						}
						item.subTotalPrice = item.quantity * this.getBestPrice(this.selectedAccessoryItem!);
						this.triggerMessage("Successfully added Accessory to Cart!", "success", "Success");
					}
				}
			});

			if (checkExist == false) {
				console.log("NO EXISTING ACCESSORY LINE ITEM");

				let poli: PurchaseOrderLineItem = new PurchaseOrderLineItem(0, this.selectedQuantity, this.selectedQuantity * this.selectedAccessoryItem?.price!, "", PurchaseOrderLineItemTypeEnum.ACCESSORY);
				poli.accessoryItemEntity = this.selectedAccessoryItem!;
				cart.push(poli);
				this.triggerMessage("Successfully added Accessory to Cart!", "success", "Success");
			}
			console.log("CURRENT CART CONTENTS: ");
			console.log(cart);
			console.log("SETTING CART");
			this.sessionService.setCart(cart);
		} else {
			console.log("CART DOES NOT EXIST");

			let poli: PurchaseOrderLineItem = new PurchaseOrderLineItem(0, this.selectedQuantity, this.selectedQuantity * this.selectedAccessoryItem?.price!, "", PurchaseOrderLineItemTypeEnum.ACCESSORY);
			poli.accessoryItemEntity = this.selectedAccessoryItem!;
			cart = [poli];
			this.sessionService.setCart(cart);
			console.log("THIS IS THE CART :");
			console.log(cart);
			this.triggerMessage("Successfully added Accessory to Cart!", "success", "Success");
		}

		this.displayDialog = false;
		this.selectedAccessoryItem = null;
		this.selectedQuantity = 1;
	}

	getBestPrice(accessoryItem: AccessoryItem): number {
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

	onSortChange(event: { value: any }) {
		let value = event.value;

		if (value.indexOf("!") === 0) {
			this.sortOrder = -1;
			this.sortField = value.substring(1, value.length);
		} else {
			this.sortOrder = 1;
			this.sortField = value;
		}
	}

	triggerMessage(message: string, severity: string, summary: string) {
		console.log("called trigger message");

		this.messageService.add({ severity: severity, summary: summary, detail: message });
		console.log("called trigger message");
	}

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
