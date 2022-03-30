import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-support-page",
	templateUrl: "./support-page.component.html",
	styleUrls: ["./support-page.component.css"],
})
export class SupportPageComponent implements OnInit {
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
