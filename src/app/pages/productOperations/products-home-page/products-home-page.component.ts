import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-products-home-page",
	templateUrl: "./products-home-page.component.html",
	styleUrls: ["./products-home-page.component.scss"],
})
export class ProductsHomePageComponent implements OnInit {
	listOfProductEntities: Product[] = [];
	sortOptions: SelectItem[];
	sortField: string;
	sortOrder: number;
	sortKey: string;

	constructor(private sessionService: SessionService, private router: Router, private productService: ProductService) {
		this.sortOptions = new Array();
		this.sortField = "";
		this.sortKey = "";
		this.sortOrder = 0;
	}

	ngOnInit(): void {
		this.checkAccessRight();

		this.productService.getProducts().subscribe({
			next: (response) => {
				this.listOfProductEntities = response;
				console.log(this.listOfProductEntities);
			},
			error: (error) => {
				console.log("***********ProductPageComponent.ts: " + error);
			},
		});

		this.sortOptions = [
			{ label: "Name", value: "productName" },
			{ label: "Rating", value: "rating" },
			{ label: "Brand", value: "brand" },
		];
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

	customizeProduct(product: Product) {
      this.router.navigate(["/customizeProductsPage/" + product.productEntityId]);
	}

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
