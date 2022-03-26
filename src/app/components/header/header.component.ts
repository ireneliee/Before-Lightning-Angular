import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Member } from "../../models/member";
import { MemberService } from "../../services/member.service";
import { SessionService } from "../../services/session.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
	username: string | undefined;
	password: string | undefined;
	loginError: boolean;
	errorMessage: string | undefined;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private memberService: MemberService) {
		this.loginError = false;
	}

	ngOnInit(): void {}

	memberLogin(): void {
		this.sessionService.setUsername(this.username);
		this.sessionService.setPassword(this.password);

		this.memberService.MemberLogin(this.username, this.password).subscribe({
			next: (response) => {
				console.log(response);
				let member: Member = response;

				if (member != null) {
					this.sessionService.setIsLogin(true);
					this.sessionService.setCurrentMember(member);
					this.loginError = false;
					window.location.reload();
				} else {
					this.loginError = true;
				}
			},
			error: (error) => {
				this.loginError = true;
				this.errorMessage = error;
			},
		});
	}

	memberLogout(): void {
		this.sessionService.setIsLogin(false);
		this.sessionService.setCurrentMember(null);
		this.router.navigate(["/index"]);
	}
}
