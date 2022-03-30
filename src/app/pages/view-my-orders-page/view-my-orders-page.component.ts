import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-view-my-orders-page",
	templateUrl: "./view-my-orders-page.component.html",
	styleUrls: ["./view-my-orders-page.component.css"],
})
export class ViewMyOrdersPageComponent implements OnInit {
	constructor(private router: Router, private sessionService: SessionService) {}

	ngOnInit(): void {
		this.checkAccessRight();
	}
	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
