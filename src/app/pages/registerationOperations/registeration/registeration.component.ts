import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Address } from "src/app/models/address";
import { Member } from "src/app/models/member";
import { MemberService } from "src/app/services/member.service";
import { SessionService } from "src/app/services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";

@Component({
	selector: "app-registeration",
	templateUrl: "./registeration.component.html",
	styleUrls: ["./registeration.component.css"],
	providers: [MessageService],
})
export class RegisterationComponent implements OnInit {
	address: Address = new Address();
	username: string = "";
	password: string = "";
	firstname: string = "";
	lastname: string = "";
	email: string = "";
	contact: string = "";
	imageLink: string = "";

	resultSuccess: Boolean | undefined;
	resultError: Boolean | undefined;
	submitted: boolean;

	constructor(private memberService: MemberService, private sessionService: SessionService, private messageService: MessageService, private router: Router) {
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
		this.checkAccessRight();

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
		this.checkAccessRight();

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

	//===========FOR UPLOADING IMAGE=================
	// fileName = "";

	// onFileSelected(event : any) {
	// 	const file: File = event.target.files[0];

	// 	if (file) {
	// 		this.fileName = file.name;

	// 		const formData = new FormData();

	// 		formData.append("image", file);

	// 		const upload$ = this.fileUploadService.uploadFile(formData);

	// 		upload$.subscribe();
	// 	}
	// }
	//===============================================

	// onUpload(event : any) {
	// 	for (let file of event.files) {
	// 		this.fileUploadService.upload(file, file.name);
	// 	}

	// 	this.messageService.add({ severity: "info", summary: "File Uploaded", detail: "" });
	// }

	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
