import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessRightErrorComponent } from './pages/access-right-error/access-right-error.component';
import { IndexComponent } from './pages/index/index.component';
import { RegisterationComponent } from './pages/registeration/registeration.component';
import { ProductsHomePageComponent } from './pages/productOperations/products-home-page/products-home-page.component';
import { AccessoryHomePageComponent } from './pages/accessoryOperations/accessory-home-page/accessory-home-page.component';
import { ViewMyCartPageComponent } from './pages/view-my-cart-page/view-my-cart-page.component';
import { ViewMyOrdersPageComponent } from './pages/view-my-orders-page/view-my-orders-page.component';
import { SupportPageComponent } from './pages/support-page/support-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'accessRightError', component: AccessRightErrorComponent },
  { path: 'registeration', component: RegisterationComponent },
  { path: 'productsHomePage', component: ProductsHomePageComponent },
  { path: 'accessoryHomePage', component: AccessoryHomePageComponent },
  { path: 'viewMyCartPage', component: ViewMyCartPageComponent },
  { path: 'viewMyOrdersPage', component: ViewMyOrdersPageComponent },
  { path: 'forumPage', component: ForumPageComponent },
  { path: 'supportPage', component: SupportPageComponent },
  { path: 'settingsPage', component: SettingsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
