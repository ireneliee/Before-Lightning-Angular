import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, SelectItem } from "primeng/api";
import { Accessory } from "src/app/models/accessory";
import { AccessoryItem } from "src/app/models/accessory-item";
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

	addToCart(accessoryItem: AccessoryItem) {}

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

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
