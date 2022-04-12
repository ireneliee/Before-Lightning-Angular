import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ban-customer',
  templateUrl: './ban-customer.component.html',
  styleUrls: ['./ban-customer.component.css']
})
export class BanCustomerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToHomepage() {
    this.router.navigate(["index"]);
  
  }

}
