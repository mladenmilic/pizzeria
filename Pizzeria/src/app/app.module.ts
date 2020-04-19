import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule
  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ReviewOffersComponent } from './components/review-offers/review-offers.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { OverviewPizzaComponent } from './components/overview-pizza/overview-pizza.component';
import { CreatePizzaComponent } from './components/create-pizza/create-pizza.component';
import { OverviewOrderComponent } from './components/overview-order/overview-order.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/AuthGuard';
import { InformationDialogComponent } from './components/dialog/information-dialog/information-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxSpinnerModule} from 'ngx-spinner';
import { MessageDialogComponent } from './components/dialog/message-dialog/message-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewOrderComponent,
    ListOrdersComponent,
    ReviewOffersComponent,
    OverviewPizzaComponent,
    CreatePizzaComponent,
    OverviewOrderComponent,
    InformationDialogComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    CdkTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    InformationDialogComponent,
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    MessageDialogComponent
  ],
  providers: [
    DatePipe,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
