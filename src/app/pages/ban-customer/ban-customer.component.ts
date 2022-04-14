import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-ban-customer',
  templateUrl: './ban-customer.component.html',
  styleUrls: ['./ban-customer.component.css']
})
export class BanCustomerComponent implements OnInit {

  constructor(private router: Router,
    public sessionService: SessionService) { }

  ngOnInit(): void {
    if(this.sessionService.getIsLogin() == true) {
      this.redirectToHomepage();
    }
  }

  redirectToHomepage() {
    this.router.navigate(["index"]);
  
  }

  redirectToSupportPage() {
    this.router.navigate(["supportPage"]);
  
  }

}
