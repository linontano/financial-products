import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'product-menu',
  templateUrl: './product-menu.component.html',
  styleUrl: './product-menu.component.scss'
})
export class ProductMenuComponent {
  isMenuOpen = false;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor() {
    document.addEventListener('click', () => {
      this.isMenuOpen = false;
    });
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  editProduct() {
    this.edit.emit();
    this.isMenuOpen = false;
  }

  deleteProduct() {
    this.delete.emit();
    this.isMenuOpen = false;
  }
}
