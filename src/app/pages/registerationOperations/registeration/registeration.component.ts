import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Address } from "src/app/models/address";
import { Member } from "src/app/models/member";
import { MemberService } from "src/app/services/member.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-registeration",
	templateUrl: "./registeration.component.html",
	styleUrls: ["./registeration.component.css"],
	providers: [MessageService],
})
export class RegisterationComponent implements OnInit {
	member: Member = new Member();
	address: Address = new Address();
	imageLink: String | undefined;
	resultSuccess: Boolean | undefined;
	resultError: Boolean | undefined;

	constructor(private memberService: MemberService, private sessionService: SessionService, private messageService: MessageService) {
		this.member = new Member();
		this.address = new Address();
		this.imageLink = "";
		this.resultSuccess = false;
		this.resultError = false;
	}

	initializeState(): void {
		this.member = new Member();
		this.address = new Address();
		this.imageLink = "";
		this.resultSuccess = false;
		this.resultError = false;
	}

	ngOnInit(): void {
		this.initializeState();
	}

	createNewMember(createNewMemberForm: NgForm) {
		console.log(this.member);
		console.log(this.address);
		console.log("result error: " + this.resultError);

		this.memberService.RegisterNewMember(this.member, this.address).subscribe({
			next: (response) => {
				let newMember: Member = response;
				this.resultSuccess = true;
				this.resultError = false;
				this.initializeState;
				this.messageService.add({ severity: "success", summary: "Service Message", detail: "Registeration Complete! Welcome to BeforeLightning " + newMember.firstname + " " + newMember.lastname });
				createNewMemberForm.resetForm();
				createNewMemberForm.reset();
			},
			error: (error) => {
				this.resultError = true;
				this.resultSuccess = false;
				this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when registering member"});
				console.log("********** REGISTERATION.ts: " + error);
			},
		});
	}
}
