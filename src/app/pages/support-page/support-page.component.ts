import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { SupportTicket } from "src/app/models/support-ticket";
import { MemberService } from "src/app/services/member.service";
import { SessionService } from "src/app/services/session.service";
import { SupportService } from "src/app/services/support.service";

@Component({
	selector: "app-support-page",
	templateUrl: "./support-page.component.html",
	styleUrls: ["./support-page.component.css"],
})
export class SupportPageComponent implements OnInit {
	supportTicketEntities: SupportTicket[] = [];
	sortOptions: SelectItem[];
	sortField: string;
	sortOrder: number;
	sortKey: string;

	constructor(private router: Router, public sessionService: SessionService, private memberService: MemberService, private supportService: SupportService) {
		this.sortOptions = new Array();
		this.sortField = "";
		this.sortKey = "";
		this.sortOrder = 0;
	}

	ngOnInit(): void {
		this.checkAccessRight();

		let email = this.sessionService.getCurrentMember().email;

		this.supportService.retrieveSupportTickets(email).subscribe({
			next: (response) => {
				console.log(response);
				this.supportTicketEntities = response;
			},
			error: (error) => {
				console.log("***********SupportTicketPageComponent.ts: " + error);
			},
		});
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
	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
