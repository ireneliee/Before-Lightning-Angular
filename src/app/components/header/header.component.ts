import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { SessionService } from '../../services/session.service';
import {OverlayPanelModule} from 'primeng/overlaypanel';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  loginError: boolean;
  errorMessage: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private memberService: MemberService,
    private messageService: MessageService
  ) {
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

        if (member != null && member.isActive == true) {
          this.sessionService.setIsLogin(true);
          this.sessionService.setCurrentMember(member);
          this.loginError = false;
          this.router.navigate(['/index']);
          window.location.reload();
        } else if (member != null && member.isActive == false) {
          this.router.navigate(['/deactivatedAccount']);
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

  dummydum() {
	  console.log("hihi");
  }
  resetButton(): void {
    this.password = '';
    this.username = '';
  }
  memberLogout(): void {
    this.sessionService.setIsLogin(false);
    this.messageService.add({
      severity: 'success',
      summary: 'Log Out Successful!',
      detail:
        'Good Bye! ' +
        this.sessionService.getCurrentMember().firstname +
        ' ' +
        this.sessionService.getCurrentMember().lastname,
    });
    this.sessionService.setCurrentMember(null);
    this.router.navigate(['/index']);
    window.location.reload();
  }
}
