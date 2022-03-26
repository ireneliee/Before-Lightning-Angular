import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";

import { SessionService } from "../../services/session.service";

@Component({
	selector: "app-main-nav-bar",
	templateUrl: "./main-nav-bar.component.html",
	styleUrls: ["./main-nav-bar.component.css"],
})
export class MainNavBarComponent implements OnInit {
	items: MenuItem[];

	constructor(private router: Router, public sessionService: SessionService) {
		if (this.sessionService.getIsLogin() == true) {
			this.items = [
				{
					label: "Home",
					icon: "pi pi-home",
					command: () => {
						this.router.navigate(["/index"]);
					},
				},
				{
					label: "Products",
					icon: "pi pi-desktop",
					command: () => {
						this.router.navigate(["/productsHomePage"]);
					},
				},
				{
					label: "Accessories",
					icon: "pi pi-database",
					command: () => {
						this.router.navigate(["/accessoryHomePage"]);
					},
				},
				{
					label: "View My Cart",
					icon: "pi pi-shopping-cart",
					command: () => {
						this.router.navigate(["/viewMyCartPage"]);
					},
				},
				{
					label: "View My Orders",
					icon: "pi pi-list",
					command: () => {
						this.router.navigate(["/viewMyOrdersPage"]);
					},
				},
				{
					label: "Forum",
					icon: "pi pi-qrcode",
					command: () => {
						this.router.navigate(["/forumPage"]);
					},
				},
				{
					label: "Settings",
					icon: "pi pi-cog",
					command: () => {
						this.router.navigate(["/settingsPage"]);
					},
				},
				{
					label: "Log Out",
					icon: "pi pi-sign-out",
					command: () => {
						this.memberLogout();
					},
				},
			];
		} else {
			this.items = [
				{
					label: "Home",
					icon: "pi pi-home",
					command: () => {
						this.router.navigate(["/index"]);
					},
				},
				{
					label: "Registeration",
					icon: "pi pi-plus",
					command: () => {
						this.router.navigate(["/registeration"]);
					},
				},
				{
					label: "Products",
					icon: "pi pi-desktop",
					command: () => {
						this.router.navigate(["/productsHomePage"]);
					},
				},
				{
					label: "Accessories",
					icon: "pi pi-database",
					command: () => {
						this.router.navigate(["/accessoryHomePage"]);
					},
				},
				{
					label: "View My Cart",
					icon: "pi pi-shopping-cart",
					command: () => {
						this.router.navigate(["/viewMyCartPage"]);
					},
				},
				{
					label: "Forum",
					icon: "pi pi-qrcode",
					command: () => {
						this.router.navigate(["/forumPage"]);
					},
				},
			];
		}
	}

	ngOnInit() {
		
	}

	memberLogout(): void {
		this.sessionService.setIsLogin(false);
		this.sessionService.setCurrentMember(null);
		this.router.navigate(["/index"]);
	}
}