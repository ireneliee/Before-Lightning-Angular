import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Part } from "src/app/models/part";
import { PartChoice } from "src/app/models/part-choice";
import { Product } from "src/app/models/product";
import { SelectedPartChoicePair } from "src/app/models/selected-part-choice-pair";
import { ProductService } from "src/app/services/product.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-customize-products-page",
	templateUrl: "./customize-products-page.component.html",
	styleUrls: ["./customize-products-page.component.css"],
})


export class CustomizeProductsPageComponent implements OnInit {
	productId: string | null;
	productToCustomize: Product;
	listOfSelectedPartChoices: SelectedPartChoicePair[] = [];
	retrieveProductError: boolean;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private productService: ProductService) {
		this.productId = null;
		this.productToCustomize = new Product();
		this.listOfSelectedPartChoices = [];
		this.retrieveProductError = false;
	}

	ngOnInit(): void {
		this.checkAccessRight();
		// console.log("INSIDE CUSTOMIZE PRODUCT PAGE");
		this.productId = this.activatedRoute.snapshot.paramMap.get("productId");
		// console.log("selected product: " + this.productId);

		if (this.productId != null) {
			this.productService.getProductById(parseInt(this.productId)).subscribe({
				next: (response) => {
					console.log(response);

					this.productToCustomize = response;
				},
				error: (error) => {
					this.retrieveProductError = true;
					console.log("********** CUSTOMIZE PRODUCT PAGE Component.ts: " + error);
				},
			});
		}
	}

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
