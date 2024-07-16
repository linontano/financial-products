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
  selectedProduct!: Product | null;
  totalRecords: number = 0;
  loadedProucts: boolean = true;
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  showDeleteModal = false;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    console.log('Product List init')
    this.loadProducts();
    
  }
  loadProducts(){
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products.data;
        this.loadedProucts = false;
        this.filteredProducts = products.data;
      },
      error: (error) => console.error('Error al cargar productos', error)
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
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  changePage(sizePage: number): void {
    this.filteredProducts = this.products.slice(0, sizePage);
  }

  onConfirmDelete() {
    // Lógica para eliminar el producto
    this.showDeleteModal = false;
    console.log('Producto eliminado');
    if (this.selectedProduct){
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: () => {
          console.log('Producto Eliminado');
          this.loadProducts()

        },
        error: (error) => {
          console.error('Error al eliminar producto', error)
        }
      })
      this.selectedProduct = null;
    }
  }

  onCancelDelete() {
    this.showDeleteModal = false;
  }
  



}
