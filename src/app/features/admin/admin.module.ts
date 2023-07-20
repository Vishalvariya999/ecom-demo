import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewOrderComponent } from './components/view-order/view-order.component';



@NgModule({
  declarations: [
    HomeComponent,
    AddProductComponent,
    CategoryComponent,
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
