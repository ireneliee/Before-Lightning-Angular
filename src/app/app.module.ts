import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { MenuModule } from "primeng/menu";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { ChipModule } from "primeng/chip";
import { PasswordModule } from "primeng/password";
import { CardModule } from "primeng/card";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { FileUploadModule } from "primeng/fileupload";

import { MessageService } from "primeng/api";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./pages/index/index.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainNavBarComponent } from "./components/main-nav-bar/main-nav-bar.component";
import { AccessRightErrorComponent } from "./pages/access-right-error/access-right-error.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { RegisterationComponent } from "./pages/registerationOperations/registeration/registeration.component";
import { ProductsHomePageComponent } from "./pages/productOperations/products-home-page/products-home-page.component";
import { AccessoryHomePageComponent } from "./pages/accessoryOperations/accessory-home-page/accessory-home-page.component";
import { ViewMyCartPageComponent } from "./pages/view-my-cart-page/view-my-cart-page.component";
import { ForumPageComponent } from "./pages/forum-page/forum-page.component";
import { ViewMyOrdersPageComponent } from "./pages/view-my-orders-page/view-my-orders-page.component";
import { SupportPageComponent } from "./pages/support-page/support-page.component";
import { SettingsPageComponent } from "./pages/settings-page/settings-page.component";
import { CreateNewForumPostComponent } from './pages/create-new-forum-post/create-new-forum-post.component';
import {EditorModule} from 'primeng/editor';

@NgModule({
	declarations: [
		AppComponent,
		IndexComponent,
		HeaderComponent,
		FooterComponent,
		MainNavBarComponent,
		AccessRightErrorComponent,
		BreadcrumbComponent,
		RegisterationComponent,
		ProductsHomePageComponent,
		AccessoryHomePageComponent,
		ViewMyCartPageComponent,
		ForumPageComponent,
		ViewMyOrdersPageComponent,
		SupportPageComponent,
		SettingsPageComponent,
  		CreateNewForumPostComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		PanelModule,
		TableModule,
		ButtonModule,
		DialogModule,
		RatingModule,
		BreadcrumbModule,
		MenuModule,
		InputTextModule,
		PasswordModule,
		CardModule,
		MessagesModule,
		MessageModule,
		ToastModule,
		DataViewModule,
		InputTextModule,
		RippleModule,
		HttpClientModule,
		DropdownModule,
		ChipModule,
		FileUploadModule,
		EditorModule,

	],
	providers: [MessageService],
	bootstrap: [AppComponent],
})
export class AppModule {}
