import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem } from "primeng/api";
import { SupportTicketStatusEnum } from "src/app/models/enum/support-ticket-status-enum";
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
	loggedIn: boolean;

	constructor(private router: Router, public sessionService: SessionService, private memberService: MemberService, private supportService: SupportService) {
		this.sortOptions = new Array();
		this.sortField = "";
		this.sortKey = "";
		this.sortOrder = 0;
		this.loggedIn = false;
	}

	ngOnInit(): void {
		this.checkAccessRight();

		if (this.sessionService.getIsLogin() == true) {
			this.loggedIn = true;
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
		} else {
			this.loggedIn = false;
		}
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

	callRefreshList(event: any) {
		this.refreshList();
	}
	refreshList() {
		this.supportService.retrieveSupportTickets(this.sessionService.getCurrentMember().email).subscribe({
		  next: (response) => {
			this.supportTicketEntities = response;
		  },
		  error: (error) => {
			console.log('***********ForumPageComponent.ts: ' + error);
		  },
		});
	}
	
	isOpen(st: SupportTicket) {
		// console.log("support ticket status: " + st.supportTicketStatus);
		if (st.supportTicketStatus == SupportTicketStatusEnum.OPEN) {
			return true;
		} else {
			return false;
		}
		
	}

	isProcessing(st: SupportTicket) {
		// console.log("reached isProcessing");
		if (st.supportTicketStatus== SupportTicketStatusEnum.PROCESSING) {
			return true;
		} else {
			return false;
		}
	}

	isClosed(st: SupportTicket) {
		// console.log("reached isClosed");
		if (st.supportTicketStatus == SupportTicketStatusEnum.CLOSED) {
			return true;

		} else {
			return false;

		}
	}
}
