import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    console.log('Product List init')
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  addProduct(): void {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  editProduct(product: Product): void {
    this.router.navigate(['edit', product.id],  {relativeTo: this.route});
  }

  deleteProduct(product: Product): void {
    // Aquí se llamaría al modal de confirmación de eliminación
  }

}
