import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';


const routes: Routes = [
  { path: 'review-offers', component: ListOrdersComponent},
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
