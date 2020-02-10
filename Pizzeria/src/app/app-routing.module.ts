import { OverviewOrderComponent } from './components/overview-order/overview-order.component';
import { OverviewPizzaComponent } from './components/overview-pizza/overview-pizza.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ReviewOffersComponent } from './components/review-offers/review-offers.component';
import { CreatePizzaComponent } from './components/create-pizza/create-pizza.component';
import { AuthGuard } from './guards/AuthGuard';


const routes: Routes = [
  { path: 'overview-order/:id', component: OverviewOrderComponent, canActivate:[AuthGuard]},
  { path: 'overview-pizza/:id', component: OverviewPizzaComponent, canActivate:[AuthGuard]},
  { path: 'create-pizza/:id', component: CreatePizzaComponent, canActivate:[AuthGuard]},
  { path: 'create-pizza', component: CreatePizzaComponent, canActivate:[AuthGuard]},
  { path: 'review-offers', component: ReviewOffersComponent, canActivate: [AuthGuard]},
  { path: 'list-orders', component: ListOrdersComponent, canActivate: [AuthGuard]},
  { path: 'new-order/:id', component: NewOrderComponent, canActivate: [AuthGuard]},
  { path: 'new-order', component: NewOrderComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
