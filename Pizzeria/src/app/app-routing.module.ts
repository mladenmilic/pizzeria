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


const routes: Routes = [
  { path: 'overview-order/:id', component: OverviewOrderComponent},
  { path: 'overview-pizza/:id', component: OverviewPizzaComponent},
  { path: 'create-pizza/:id', component: CreatePizzaComponent},
  { path: 'create-pizza', component: CreatePizzaComponent},
  { path: 'review-offers', component: ReviewOffersComponent},
  { path: 'list-orders', component: ListOrdersComponent},
  { path: 'new-order', component: NewOrderComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
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
