import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/orders/list/list.component';
import { CreateComponent } from './pages/orders/create/create.component';
import { ViewOrderComponent } from './pages/orders/view-order/view-order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'orders/create', component: CreateComponent },
  { path: 'orders/list', component: ListComponent },
  { path: 'orders/:id/view', component: ViewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
