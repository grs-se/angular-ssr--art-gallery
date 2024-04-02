import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { adminGuard } from './core/guards/adminGuard';
import { authGuard } from './core/guards/authGuard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'about', component: AboutComponent },
  //{ path: 'archive', loadChildren: () => import('./archive/archive.module').then(m => m.ArchiveModule) },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery.module').then((m) => m.GalleryModule),
    data: { breadcrumb: 'Gallery' },
  },
  //{ path: 'selected-work', component: SelectedWorkComponent },
  //{ path: 'selected-work', loadChildren: () => import('./selected-work/selected-work.module').then(m => m.SelectedWorkModule) },
  //{ path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  { path: 'contact', component: ContactComponent },
  {
    path: 'writing',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./writing/writing.module').then((m) => m.WritingModule),
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((m) => m.BasketModule),
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
    data: { breadcrumb: { skip: true } },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    data: { breadcrumb: 'Admin' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
