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
import { ToastModule } from "primeng/toast";
import { FileUploadModule } from "primeng/fileupload";
import { RouterModule } from "@angular/router";
import { MessageModule } from "primeng/message";
import { TabMenuModule } from "primeng/tabmenu";
import { FieldsetModule } from "primeng/fieldset";
import { AccordionModule } from "primeng/accordion";
import { DividerModule } from "primeng/divider";
import { SplitterModule } from "primeng/splitter";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessageService } from "primeng/api";
import { AvatarModule } from "primeng/avatar";
import { InputNumberModule } from "primeng/inputnumber";

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
import { CreateNewForumPostComponent } from "./pages/create-new-forum-post/create-new-forum-post.component";
import { EditorModule } from "primeng/editor";
import { ViewMyForumPostComponent } from "./pages/view-my-forum-post/view-my-forum-post.component";
import { ForumMenuComponent } from "./components/forum-menu/forum-menu.component";
import { UpdateForumComponent } from "./pages/update-forum/update-forum.component";
import { TooltipModule } from "primeng/tooltip";
import { SelectButtonModule } from "primeng/selectbutton";
import { CustomizeProductsPageComponent } from "./pages/productOperations/customize-products-page/customize-products-page.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { CarouselModule } from "primeng/carousel";
import { BadgeModule } from "primeng/badge";
import { ViewAllAccessoryItemsPageComponent } from "./pages/accessoryOperations/view-all-accessory-items-page/view-all-accessory-items-page.component";
import {TimelineModule} from 'primeng/timeline';

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
		ViewMyForumPostComponent,
		ForumMenuComponent,
		UpdateForumComponent,
		CustomizeProductsPageComponent,
		UploadFileComponent,
		ViewAllAccessoryItemsPageComponent,
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
		TabMenuModule,
		TooltipModule,
		FieldsetModule,
		SelectButtonModule,
		AccordionModule,
		FieldsetModule,
		DividerModule,
		SplitterModule,
		CheckboxModule,
		RadioButtonModule,
		InputTextareaModule,
		AvatarModule,
		CarouselModule,
		BadgeModule,
		InputNumberModule,
    TimelineModule
	],
	providers: [MessageService],
	bootstrap: [AppComponent],
})
export class AppModule {}
