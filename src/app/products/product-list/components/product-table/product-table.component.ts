import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent implements OnInit, OnChanges{
  @Input() products: Product[] = [];
  itemsPerPageOptions: number[] = [5, 10, 20];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  currentPage: number = 1;
  totalPages: number = 1;
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() changePage = new EventEmitter<number>()
  
  ngOnInit(): void {
    this.calculateTotalPages()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && !changes['products'].firstChange){
      this.currentPage = 1;
      this.calculateTotalPages();
    }
  }

  onEditProduct(product: Product): void {
    this.edit.emit(product);
  }

  onDeleteProduct(product: Product): void {
    this.delete.emit(product);
  }

  onItemsPerPageChange(){
    this.changePage.emit(this.itemsPerPage);
  }
  nextPage(){
    if (this.currentPage < this.totalPages){
      this.currentPage++
    }
  }
  prevPage(){
    if (this.currentPage > 1){
      this.currentPage--;
    }
  }
  calculateTotalPages(){
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
  }
  isValidImage(url: string): boolean {
    return (!!url && (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')));
  }

}
