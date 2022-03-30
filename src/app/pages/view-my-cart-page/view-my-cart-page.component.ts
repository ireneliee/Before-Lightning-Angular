import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-view-my-cart-page",
	templateUrl: "./view-my-cart-page.component.html",
	styleUrls: ["./view-my-cart-page.component.css"],
})
export class ViewMyCartPageComponent implements OnInit {
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
