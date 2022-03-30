import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-products-home-page",
	templateUrl: "./products-home-page.component.html",
	styleUrls: ["./products-home-page.component.css"],
})
export class ProductsHomePageComponent implements OnInit {
	constructor(private sessionService: SessionService, private router: Router) {}

	ngOnInit(): void {
		this.checkAccessRight();
	}
	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
