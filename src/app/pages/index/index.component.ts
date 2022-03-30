import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SessionService } from "../../services/session.service";

@Component({
	selector: "app-index",
	templateUrl: "./index.component.html",
	styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
	constructor(public sessionService: SessionService, private router: Router) {}

	ngOnInit(): void {
		this.checkAccessRight();

		console.log("*********** YOU ARE AT INDEX {NOT LOGGED IN)");
		if (this.sessionService.getIsLogin()) {
			console.log("*********** YOU ARE AT INDEX (LOGGED IN)");
		}
	}

	parseDate(d: Date | undefined) {
		if (d != null) {
			return d.toString().replace("[UTC]", "");
		} else {
			return "";
		}
	}
	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
