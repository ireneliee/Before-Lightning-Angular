import { SupportTicketStatusEnum } from "./enum/support-ticket-status-enum";

export class SupportTicket {
	supportTicketId: number | undefined;
	issue: string | undefined;
	supportTicketStatus: SupportTicketStatusEnum | undefined;
	email: string | undefined;

	constructor(supportTicketId?: number, issue?: string, supportTicketStatus?: SupportTicketStatusEnum, email?: string) {
		this.supportTicketId = supportTicketId;
		this.issue = issue;
		this.supportTicketStatus = supportTicketStatus;
		this.email = email;
	}
}
