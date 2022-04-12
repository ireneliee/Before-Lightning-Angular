import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Address } from "src/app/models/address";
import { CreditCard } from "src/app/models/credit-card";
import { Member } from "src/app/models/member";
import { MemberService } from "src/app/services/member.service";
import { SessionService } from "src/app/services/session.service";

@Component({
	selector: "app-settings-page",
	templateUrl: "./settings-page.component.html",
	styleUrls: ["./settings-page.component.css"],
})
export class SettingsPageComponent implements OnInit {
	currMember : Member
	addList: Address[] = []
	cardList: CreditCard[] = []


	// update member details
	createUpdateDisplay:boolean
	memberToUpdate: Member
	//create address 
	newAddress: Address
	createNewAddressDisplay:boolean
	//create credit card
	newCreditCard: CreditCard
	createNewCreditCardDisplay:boolean

	constructor(private router: Router, private sessionService: SessionService, private memberService : MemberService, private messageService : MessageService) {
		this.currMember = this.sessionService.getCurrentMember();
		this.addList = this.currMember.addresses!;
		this.cardList = this.currMember.creditCards!;
		this.createUpdateDisplay = false;
		this.memberToUpdate = this.sessionService.getCurrentMember();
		this.newAddress = new Address;
		this.newAddress.block = ""
		this.newAddress.country = ""
		this.newAddress.postalCode = ""
		this.newAddress.unit = ""
		this.newCreditCard = new CreditCard;
		this.createNewAddressDisplay = false;
		this.createNewCreditCardDisplay = false;
	}

	updateMember(){
		console.log("this method is called")
this.memberService.UpdateMember(this.memberToUpdate.username,
	this.memberToUpdate.firstname
	,this.memberToUpdate.lastname,this.memberToUpdate.email, 
	this.memberToUpdate.contact,this.memberToUpdate.imageLink).subscribe({
		next: (response) => {
			this.sessionService.setCurrentMember(this.memberToUpdate);
			this.initialiseState();
		
	},
	error: (error) => {
	  this.messageService.add({severity: "error", summary: "Service Message", detail: "Error occured when registering member" + error});

	},

});
	
	}

createAddress() {
	if(this.currMember.userEntityId && this.newAddress.block && this.newAddress.unit && this.newAddress.postalCode && this.newAddress.country) {
	this.memberService.AddAddress(this.currMember.userEntityId.toString(), this.newAddress.block, this.newAddress.unit, this.newAddress.postalCode, this.newAddress.country).subscribe({
		next: (response) => {
			this.memberService.RetrieveMemberById(this.currMember.userEntityId!.toString()).subscribe({

				next: (response) => {				
					let member:Member = response;
					if(member){
				this.sessionService.setCurrentMember(member);
					}
				}
			})
			this.currMember = this.sessionService.getCurrentMember();
			this.addList = this.currMember.addresses!;
			this.newAddress = new Address();

		
	},
	error: (error) => {
	  this.messageService.add({severity: "error", summary: "Service Message", detail: "Error occured when creating new address" + error});

	},

});
} else {
	console.log("One or more argument is null")
	this.messageService.add({severity: "error", summary: "Service Message", detail: "Error occured when creating new address"})


}
}

createCreditCard() {
	if(this.currMember.userEntityId && this.newCreditCard.creditCardNumber && this.newCreditCard.nameOnCard, this.newCreditCard.expiryDate) {
		this.memberService.AddCreditCard(this.currMember.userEntityId!.toString(),this.newCreditCard.creditCardNumber!.toString(),this.newCreditCard.nameOnCard!, this.newCreditCard.expiryDate).subscribe({
		next: (response) => {
			this.cardList.push(this.newCreditCard);
			this.newCreditCard = new CreditCard;

		
	},
	error: (error) => {
	  this.messageService.add({severity: "error", summary: "Service Message", detail: "Error occured when creating new address" + error});

	},

});
} else {
	console.log("One or more argument is null")
	this.messageService.add({severity: "error", summary: "Service Message", detail: "Error occured when creating new address"})


}
}

showUpdateMemberDetailDialog(){
	this.createUpdateDisplay = true;
	this.initialiseState() 
}

showCreateNewAddressDialog() {
	this.createNewAddressDisplay = true;
	this.newAddress = new Address();

}

showCreateNewCreditCardDialog() {
	this.createNewCreditCardDisplay = true;
	this.newCreditCard = new CreditCard;
}

initialiseState() {
	this.memberToUpdate = this.sessionService.getCurrentMember();
	this.currMember = this.sessionService.getCurrentMember();

} 

	ngOnInit(): void {
		this.checkAccessRight();
	}
	checkAccessRight() {
		if (!this.sessionService.checkAccessRight(this.router.url)) {
			this.router.navigate(["/accessRightError"]);
		}
	}
}
