import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-accessory-home-page",
	templateUrl: "./accessory-home-page.component.html",
	styleUrls: ["./accessory-home-page.component.css"],
})
export class AccessoryHomePageComponent implements OnInit {
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
