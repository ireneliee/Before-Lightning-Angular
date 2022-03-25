import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css'],
})
export class MainNavBarComponent implements OnInit {
  constructor(private router: Router, public sessionService: SessionService) {}

  ngOnInit(): void {}

  memberLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentMember(null);

    this.router.navigate(['/index']);
  }
}
