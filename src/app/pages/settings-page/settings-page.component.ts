import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
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
	currMember: Member;
	addList: Address[] = [];
	cardList: CreditCard[] = [];

	// update member details
	createUpdateDisplay: boolean;
	memberToUpdate: Member;
	//create address
	newAddress: Address;
	createNewAddressDisplay: boolean;
	//create credit card
	newCreditCard: CreditCard;
	createNewCreditCardDisplay: boolean;
	//delete address
	deleteAddressId: string;
	deleteAddressCardDisplay: boolean;
	//delte Credit card
	deleteCreditCardId: string;
	deleteCreditCardDisplay: boolean;

	constructor(private router: Router, private sessionService: SessionService, private memberService: MemberService, private messageService: MessageService, private confirmationService: ConfirmationService) {
		this.currMember = this.sessionService.getCurrentMember();
		this.addList = this.currMember.addresses!;
		this.cardList = this.currMember.creditCards!;
		this.createUpdateDisplay = false;
		this.memberToUpdate = this.sessionService.getCurrentMember();
		this.newAddress = new Address();
		this.newCreditCard = new CreditCard();
		this.createNewAddressDisplay = false;
		this.createNewCreditCardDisplay = false;
		this.deleteAddressId = "";
		this.deleteAddressCardDisplay = false;
		this.deleteCreditCardId = "";
		this.deleteCreditCardDisplay = false;
	}

	deleteAddress() {
		if (this.addList.length < 2) {
			this.messageService.add({ severity: "error", summary: "Service Message", detail: "You must at least have one address at all times!" });
		} else {
			this.memberService.DeleteAddress(this.currMember.userEntityId!.toString(), this.deleteAddressId).subscribe({
				next: (response) => {
					this.memberService.RetrieveMemberById(this.currMember.userEntityId!.toString()).subscribe({
						next: (response) => {
							let member: Member = response;
							if (member) {
								this.sessionService.setCurrentMember(member);
								this.currMember = this.sessionService.getCurrentMember();
								this.addList = this.currMember.addresses!;
								this.deleteAddressId = "";
								this.messageService.add({ severity: "info", summary: "Successfully deleted the address" });
							}
						},
					});
				},
				error: (error) => {
					this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when deleting address" + error });
				},
			});
		}
	}

	deleteCreditCard() {
		this.memberService.DeleteCreditCard(this.currMember.userEntityId!.toString(), this.deleteCreditCardId).subscribe({
			next: (response) => {
				this.memberService.RetrieveMemberById(this.currMember.userEntityId!.toString()).subscribe({
					next: (response) => {
						let member: Member = response;
						if (member) {
							this.sessionService.setCurrentMember(member);
							this.currMember = this.sessionService.getCurrentMember();
							this.cardList = this.currMember.creditCards!;
							this.deleteCreditCardId = "";
							this.messageService.add({ severity: "info", summary: "Successfully deleted the credit card" });
						}
					},
				});
			},
			error: (error) => {
				this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when deleting credit card" + error });
			},
		});
	}

	updateMember() {
		console.log("this method is called");
		if (this.memberToUpdate.contact.length != 8) {
			this.messageService.add({ severity: "error", summary: "Service Message", detail: "Contact Number has to be 8 digits!" });
		} else {
			this.memberService.UpdateMember(this.memberToUpdate.username, this.memberToUpdate.firstname, this.memberToUpdate.lastname, this.memberToUpdate.email, this.memberToUpdate.contact, this.memberToUpdate.imageLink).subscribe({
				next: (response) => {
					this.sessionService.setCurrentMember(this.memberToUpdate);
					this.initialiseState();
					this.messageService.add({ severity: "info", summary: "Member has been updated" });
				},
				error: (error) => {
					this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when registering member" + error });
				},
			});
		}
	}

	createAddress() {
		if (this.currMember.userEntityId && this.newAddress.block && this.newAddress.unit && this.newAddress.postalCode && this.newAddress.country) {
			this.memberService.AddAddress(this.currMember.userEntityId.toString(), this.newAddress.block, this.newAddress.unit, this.newAddress.postalCode, this.newAddress.country).subscribe({
				next: (response) => {
					this.memberService.RetrieveMemberById(this.currMember.userEntityId!.toString()).subscribe({
						next: (response) => {
							let member: Member = response;
							if (member) {
								this.sessionService.setCurrentMember(member);
								this.currMember = this.sessionService.getCurrentMember();
								this.addList = this.currMember.addresses!;
								this.newAddress = new Address();
								this.messageService.add({ severity: "info", summary: "Successfully created the address" });
							}
						},
					});
				},
				error: (error) => {
					this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when creating new address" + error });
				},
			});
		} else {
			console.log("One or more argument is null");
			this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when creating new address" });
		}
	}

	createCreditCard() {
		if ((this.currMember.userEntityId && this.newCreditCard.creditCardNumber && this.newCreditCard.nameOnCard, this.newCreditCard.expiryDate)) {
			if (this.newCreditCard.creditCardNumber!.toString().length != 16) {
				console.log(this.newCreditCard.creditCardNumber);
				console.log(this.newCreditCard.creditCardNumber!.toString().length);
				this.messageService.add({ severity: "error", summary: "Service Message", detail: "Credit card number needs to be 16 digits long!" });
			} else {
				this.memberService.AddCreditCard(this.currMember.userEntityId!.toString(), this.newCreditCard.creditCardNumber!.toString(), this.newCreditCard.nameOnCard!, this.newCreditCard.expiryDate).subscribe({
					next: (response) => {
						this.memberService.RetrieveMemberById(this.currMember.userEntityId!.toString()).subscribe({
							next: (response) => {
								let member: Member = response;
								if (member) {
									this.sessionService.setCurrentMember(member);
									this.currMember = this.sessionService.getCurrentMember();
									this.cardList = this.currMember.creditCards!;
									this.newCreditCard = new CreditCard();
									this.messageService.add({ severity: "info", summary: "Successfully created the credit card" });
								}
							},
						});
					},
					error: (error) => {
						this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when creating new address" + error });
					},
				});
			}
		} else {
			console.log("One or more argument is null");
			this.messageService.add({ severity: "error", summary: "Service Message", detail: "Error occured when creating new address" });
		}
	}

	showUpdateMemberDetailDialog() {
		this.createUpdateDisplay = true;
		this.initialiseState();
	}

	showCreateNewAddressDialog() {
		this.createNewAddressDisplay = true;
		this.newAddress = new Address();
	}

	showCreateNewCreditCardDialog() {
		this.createNewCreditCardDisplay = true;
		this.newCreditCard = new CreditCard();
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
	confirmAddress(addressId: string) {
		console.log("button is called");
		this.confirmationService.confirm({
			message: "Do you want to delete this record?",
			header: "Delete Confirmation",
			icon: "pi pi-info-circle",
			accept: () => {
				this.deleteAddressId = addressId;
				this.deleteAddress();
			},
			reject: () => {},
		});
	}

	confirmCreditCard(creditCardId: string) {
		this.confirmationService.confirm({
			message: "Do you want to delete this record?",
			header: "Delete Confirmation",
			icon: "pi pi-info-circle",
			accept: () => {
				this.deleteCreditCardId = creditCardId;
				this.deleteCreditCard();
			},
			reject: () => {},
		});
	}
}
