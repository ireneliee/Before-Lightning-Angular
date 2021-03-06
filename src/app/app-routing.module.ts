import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccessRightErrorComponent } from "./pages/access-right-error/access-right-error.component";
import { IndexComponent } from "./pages/index/index.component";
import { RegisterationComponent } from "./pages/registerationOperations/registeration/registeration.component";
import { ProductsHomePageComponent } from "./pages/productOperations/products-home-page/products-home-page.component";
import { AccessoryHomePageComponent } from "./pages/accessoryOperations/accessory-home-page/accessory-home-page.component";
import { ViewMyCartPageComponent } from "./pages/view-my-cart-page/view-my-cart-page.component";
import { ViewMyOrdersPageComponent } from "./pages/view-my-orders-page/view-my-orders-page.component";
import { SupportPageComponent } from "./pages/support-page/support-page.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";
import { ForumPageComponent } from "./pages/forum-page/forum-page.component";
import { ViewMyForumPostComponent } from "./pages/view-my-forum-post/view-my-forum-post.component";
import { CreateNewForumPostComponent } from "./pages/create-new-forum-post/create-new-forum-post.component";
import { UpdateForumComponent } from "./pages/update-forum/update-forum.component";
import { CustomizeProductsPageComponent } from "./pages/productOperations/customize-products-page/customize-products-page.component";
import { ViewAllAccessoryItemsPageComponent } from "./pages/accessoryOperations/view-all-accessory-items-page/view-all-accessory-items-page.component";
import { BanCustomerComponent } from "./pages/ban-customer/ban-customer.component";

const routes: Routes = [
	{ path: "", redirectTo: "/index", pathMatch: "full" },
	{ path: "index", component: IndexComponent },
	{ path: "accessRightError", component: AccessRightErrorComponent },
	{ path: "registeration", component: RegisterationComponent },
	{ path: "productsHomePage", component: ProductsHomePageComponent },
	{ path: "customizeProductsPage", component: CustomizeProductsPageComponent },
	{ path: "customizeProductsPage/:productId", component: CustomizeProductsPageComponent },
	{ path: "accessoryHomePage", component: AccessoryHomePageComponent },
	{ path: "viewAllAccessoryItemsPage", component: ViewAllAccessoryItemsPageComponent },
	{ path: "viewAllAccessoryItemsPage/:accessoryId", component: ViewAllAccessoryItemsPageComponent },
	{ path: "viewMyCartPage", component: ViewMyCartPageComponent },
	{ path: "viewMyOrdersPage", component: ViewMyOrdersPageComponent },
	{ path: "forumPage", component: ForumPageComponent },
	{ path: "myForumPage", component: ViewMyForumPostComponent },
	{ path: "supportPage", component: SupportPageComponent },
	{ path: "settingsPage", component: SettingsPageComponent },
	{ path: "viewMyForumPage", component: ViewMyForumPostComponent },
	{ path: "createNewForumPage", component: CreateNewForumPostComponent },
	{ path: "updateForumComponent/:forumId", component: UpdateForumComponent },
	{ path: "deactivatedAccount", component: BanCustomerComponent },
	{ path: "viewAllSupportTicket", component: SupportPageComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
