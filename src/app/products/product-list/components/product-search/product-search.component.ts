import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  
}
