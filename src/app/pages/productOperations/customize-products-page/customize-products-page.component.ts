import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PurchaseOrderLineItemTypeEnum } from "src/app/models/enum/purchase-order-line-item-type-enum";
import { Part } from "src/app/models/part";
import { PartChoice } from "src/app/models/part-choice";
import { Product } from "src/app/models/product";
import { PurchaseOrderLineItem } from "src/app/models/purchase-order-line-item";
import { SelectedPartChoicePair } from "src/app/models/selected-part-choice-pair";
import { ProductService } from "src/app/services/product.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-customize-products-page",
	templateUrl: "./customize-products-page.component.html",
	styleUrls: ["./customize-products-page.component.scss"],
	providers: [MessageService],
})
export class CustomizeProductsPageComponent implements OnInit {
	productId: string | null;
	productToCustomize: Product;
	listOfSelectedPartChoices: SelectedPartChoicePair[] = [];
	retrieveProductError: boolean;
	buildPrice: number;
	imageLink = "";
	selectedValue = null;
	JSON;
	map = new Map<PartChoice, PartChoice>();
	selectionMap = new Map<Part, PartChoice>();

	constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private messageService: MessageService, private productService: ProductService) {
		this.productId = null;
		this.productToCustomize = new Product();
		this.retrieveProductError = false;
		this.buildPrice = 0;
		this.JSON = JSON;
	}

	ngOnInit(): void {
		this.checkAccessRight();
		// console.log("INSIDE CUSTOMIZE PRODUCT PAGE");
		this.productId = this.activatedRoute.snapshot.paramMap.get("productId");
		// console.log("selected product: " + this.productId);

		if (this.productId != null) {
			this.productService.getProductById(parseInt(this.productId)).subscribe({
				next: (response) => {
					// console.log(response);

					this.productToCustomize = response;
				},
				error: (error) => {
					this.retrieveProductError = true;
					console.log("********** CUSTOMIZE PRODUCT PAGE Component.ts: " + error);
				},
			});
		}
	}

	generateSerialNumber(): number {
		return Math.random() * 10000000000;
	}

	setMap(part: Part, partChoice: PartChoice) {
		if (this.selectionMap.get(part) != null) {
			this.map.delete(this.selectionMap.get(part)!);
		}
		this.selectionMap.set(part, partChoice);
		this.map.set(partChoice, partChoice);
	}

	getTotalBuildPrice() {
		let totalPrice = 0;
		for (let i = 0; i < this.listOfSelectedPartChoices.length; i++) {
			totalPrice += this.listOfSelectedPartChoices[i].price!;
		}
		this.buildPrice = totalPrice;
	}
	
	// addBuildToCart(addBuildToCartForm: NgForm) {
	addBuildToCart() {
		console.log("CALLING ADD TO CART");

		let checkBuild = true;
		for (let i = 0; i < this.productToCustomize.partEntities.length; i++) {
			let checkPartExist = false;
			let partName = "";
			for (let j = 0; j < this.listOfSelectedPartChoices.length; j++) {
				if (this.listOfSelectedPartChoices[j].part == this.productToCustomize.partEntities[i]) {
					checkPartExist = true;
					if (this.listOfSelectedPartChoices[j].part != undefined) {
						partName = this.listOfSelectedPartChoices[j].part!.partName;
						break;
					}
				}
			}
			if (checkPartExist == false) {
				checkBuild = false;
				this.messageService.add({ severity: "error", summary: "Error", detail: "Missing Part: " + partName });
				break;
			}
		}

		// successfully checked that build is valid
		if (checkBuild) {
			//create an appropriate purchase order line item
			let finalPrice = 0;
			let listOfPartChoices = [];
			for (let j = 0; j < this.listOfSelectedPartChoices.length; j++) {
				finalPrice += this.listOfSelectedPartChoices[j].price!;
				listOfPartChoices.push(this.listOfSelectedPartChoices[j].partChoice);
			}
			let newBuild = new PurchaseOrderLineItem(0, 1, finalPrice, this.imageLink, PurchaseOrderLineItemTypeEnum.BUILD);
			newBuild.productEntity = this.productToCustomize;
			let finalListOfPartChoices: PartChoice[] = [];
			this.listOfSelectedPartChoices.forEach((spc) => {
				finalListOfPartChoices.push(spc.partChoice!);
			});
			newBuild.partChoiceEntities = finalListOfPartChoices;

			// ADD TO CART USING SESSION SERVICE!!
			let cart: PurchaseOrderLineItem[] | undefined = this.sessionService.getCart();
			if (cart) {
				cart.push(newBuild);
			} else {
				cart = [newBuild];
			}
			this.sessionService.setCart(cart);
			console.log("THIS IS THE CART :");
			console.log(cart);
			this.messageService.add({ severity: "success", summary: "Success", detail: "Successfully added Build to Cart" });
		}
	}

	addPairToList(part: Part, partChoice: PartChoice) {
		// console.log("click works");
		// console.log("selected part: " + part.partName);
		// console.log("selected part choice: " + partChoice.partChoiceName);
		// console.log(this.map);

		//check if there is a partchoice selected alr for that part, if have remove
		this.listOfSelectedPartChoices = this.listOfSelectedPartChoices.filter((pair) => pair.part != part);
		//create pair and add into list
		let selectedChoice = new SelectedPartChoicePair(part, this.getBestPrice(partChoice), partChoice);
		this.listOfSelectedPartChoices.push(selectedChoice);
		this.getTotalBuildPrice();
		this.messageService.add({ severity: "success", summary: "Success", detail: "Successfully added " + partChoice.partChoiceName + " to build" });
		// console.log(this.listOfSelectedPartChoices);
	}

	getBestPrice(partChoice: PartChoice): number {
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

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
