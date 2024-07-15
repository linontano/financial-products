import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  
  onEditProduct(product: Product): void {
    this.edit.emit(product);
  }

  onDeleteProduct(product: Product): void {
    this.delete.emit(product);
  }

}
