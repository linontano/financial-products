import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTableComponent } from './product-list/components/product-table/product-table.component';
import { ProductSearchComponent } from './product-list/components/product-search/product-search.component';
import { ProductMenuComponent } from './product-list/components/product-menu/product-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductFormFieldsComponent } from './product-item/components/product-form-fields/product-form-fields.component';
import { ProductFormActionsComponent } from './product-item/components/product-form-actions/product-form-actions.component';
import { ProductModalComponent } from './product-list/components/product-modal/product-modal.component'



@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductSearchComponent,
    ProductTableComponent,
    ProductItemComponent,
    ProductFormFieldsComponent,
    ProductFormActionsComponent,
    ProductMenuComponent,
    ProductModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
