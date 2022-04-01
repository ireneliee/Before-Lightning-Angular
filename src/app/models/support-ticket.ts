import { SupportTicketStatusEnum } from "./enum/support-ticket-status-enum";

export class SupportTicket {
	supportTicketId: number | undefined;
	issue: string;
	supportTicketStatus: SupportTicketStatusEnum;
	email: string;

	constructor(issue: string, supportTicketStatus: SupportTicketStatusEnum, email: string, supportTicketId?: number) {
		this.supportTicketId = supportTicketId;
		this.issue = issue;
		this.supportTicketStatus = supportTicketStatus;
		this.email = email;
	}
}
