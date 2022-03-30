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
	address: Address = new Address();
	username: String = "";
	password: String = "";
	firstname: String = "";
	lastname: String = "";
	email: String = "";
	contact: String = "";
	imageLink: String = "";

	resultSuccess: Boolean | undefined;
	resultError: Boolean | undefined;
	submitted: boolean;

	constructor(private memberService: MemberService, private sessionService: SessionService, private messageService: MessageService) {
		this.address = new Address();
		this.username = "";
		this.password = "";
		this.firstname = "";
		this.lastname = "";
		this.email = "";
		this.contact = "";
		this.imageLink = "";
		this.resultSuccess = false;
		this.resultError = false;
		this.submitted = false;
	}

	initializeState(): void {
		this.address = new Address();
		this.username = "";
		this.password = "";
		this.firstname = "";
		this.lastname = "";
		this.email = "";
		this.contact = "";
		this.imageLink = "";

		this.resultSuccess = false;
		this.resultError = false;
		this.submitted = false;
	}

	ngOnInit(): void {
		this.initializeState();
	}

	createNewMember(createNewMemberForm: NgForm) {
		console.log(this.address);
		console.log("result error: " + this.resultError);

		this.memberService.RegisterNewMember(this.address, this.username, this.password, this.firstname, this.lastname, this.email, this.contact, this.imageLink).subscribe({
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
				this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when registering member" });
				console.log("********** REGISTERATION.ts: " + error);
			},
		});
	}
}
