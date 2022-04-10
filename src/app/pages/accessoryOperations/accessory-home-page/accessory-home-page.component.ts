import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { Accessory } from "src/app/models/accessory";
import { AccessoryService } from "src/app/services/accessory.service";
import { SessionService } from "src/app/services/session.service";
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Component({
	selector: "app-accessory-home-page",
	templateUrl: "./accessory-home-page.component.html",
	styleUrls: ["./accessory-home-page.component.scss"],
})
export class AccessoryHomePageComponent implements OnInit {
	listOfAccessoryEntities: Accessory[] = [];
	sortOptions: SelectItem[];
	sortField: string;
	sortOrder: number;
	sortKey: string;

	constructor(private sessionService: SessionService, private router: Router, private accessoryService: AccessoryService) {
		this.sortOptions = new Array();
		this.sortField = "";
		this.sortKey = "";
		this.sortOrder = 0;
	}

	ngOnInit(): void {
		this.checkAccessRight();

		this.accessoryService.getAccessories().subscribe({
			next: (response) => {
				this.listOfAccessoryEntities = response;
				console.log(this.listOfAccessoryEntities);
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

	viewAllAccessoryItems(accessory: Accessory) {
		this.router.navigate(["/viewAllAccessoryItemsPage/" + accessory.accessoryEntityId]);
	}

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
