import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  products: Product[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    description: `Descripcion ${i + 1}`,
    price: (i + 1) * 100
  }));

  getProducts(): Observable<Product[]> {
    console.log('Get Products')
    return of(this.products);
  }

  getProductById(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    return of(product!);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.products[index] = product;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

}
