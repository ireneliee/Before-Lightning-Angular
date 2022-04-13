import { Component, Input, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
	selector: "app-breadcrumb",
	templateUrl: "./breadcrumb.component.html",
	styleUrls: ["./breadcrumb.component.css"],
})
export class BreadcrumbComponent implements OnInit {
	@Input()
	pageName: string | undefined;

	items: MenuItem[];

	home: MenuItem;

	constructor() {
		this.items = [];
		this.home = {};
	}

	ngOnInit() {
		if (this.pageName == "Products") {
			this.items.push({ label: "Products", routerLink: "/productsHomePage" });
		}
		if (this.pageName == "Customize Products") {
			this.items.push({ label: "Products", routerLink: "/productsHomePage" });
			this.items.push({ label: "Customize Products" });
		}
		if (this.pageName == "Registeration") {
			this.items.push({ label: "Registeration", routerLink: "/registeration" });
		}
		if (this.pageName == "Accessory") {
			this.items.push({ label: "Accessory", routerLink: "accessoryHomePage" });
		}
		if (this.pageName == "View All Accessory Items") {
			this.items.push({ label: "Accessory", routerLink: "accessoryHomePage" });
			this.items.push({ label: "View All Accessories" });
		}
		if (this.pageName == "View My Cart") {
			this.items.push({ label: "View My Cart", routerLink: "/viewMyCartPage" });
		}
		if (this.pageName == "View My Orders") {
			this.items.push({
				label: "View My Orders",
				routerLink: "/viewMyOrdersPage",
			});
		}
		if (this.pageName == "Support") {
			this.items.push({ label: "Support", routerLink: "/supportPage" });
		}
		if (this.pageName == "Settings") {
			this.items.push({ label: "Settings", routerLink: "/settingsPage" });
		}
		if (this.pageName == "Forum: All posts") {
			this.items.push({ label: "Forum: All posts", routerLink: "/forumPage" });
		}
		if (this.pageName == "Forum: My posts") {
			this.items.push({ label: "Forum: My posts", routerLink: "/myForumPage" });
		}

		this.home = { icon: "pi pi-home", routerLink: "/" };
	}
}
