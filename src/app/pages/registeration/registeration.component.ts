import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {


  member: Member;
  imageLink: String;

  constructor(
    memberService : MemberService,
    sessionService: SessionService
  ) {
    this.member = new Member();
    this.imageLink= "";
   }

  ngOnInit(): void {
  }

}
