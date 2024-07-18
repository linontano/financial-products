import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Directive } from '@angular/core';
import { ProductMenuComponent } from './components/product-menu/product-menu.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

describe('ProductListComponent', () => {
  const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'add', component: ProductItemComponent },
    { path: 'edit/:id', component: ProductItemComponent },
  ];
  const productsTestingAPI = Array.from({length: 25}, (_, i) => ({
    id: `id_${i}`,
    name: `Nombre Producto ${i}`,
    description: `Descripcion Producto ${i}`,
    logo: `image_${i}.png`,
    date_release: "2025-07-07",
    date_revision: "2026-07-07",
  }))
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpTestingControler: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes), FormsModule],
      declarations: [ProductListComponent, ProductSearchComponent, ProductTableComponent, ProductMenuComponent, ProductModalComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    httpTestingControler = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Loading Products
    const firstReq = httpTestingControler.expectOne('/api/bp/products');
    firstReq.flush({
      "data": productsTestingAPI
    });
    expect(component.products.length).toEqual(productsTestingAPI.length)
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal, when (delete) product-table was emit', () => {
    jest.spyOn(component, 'deleteProduct');
    const itemToDelete = {
      id: "id_10",
      name: "Nombre Producto 10",
      description: "Descripcion Producto 10",
      logo: "image_10.png",
      dateRelease: new Date("2025-07-07"),
      dateRevision: new Date("2026-07-07"),
    }
    const productTableComponent: ProductTableComponent = fixture.debugElement.query(By.directive(ProductTableComponent)).componentInstance;
    productTableComponent.delete.emit(itemToDelete);
    expect(component.deleteProduct).toHaveBeenCalled();
    expect(component.showDeleteModal).toEqual(true);
    fixture.detectChanges();

    const modalElement: HTMLElement = fixture.debugElement.query(By.directive(ProductModalComponent)).nativeElement;
    const overlayDiv: HTMLElement | null = modalElement.querySelector('.modal-overlay');
    expect(overlayDiv).not.toEqual(null);
  })
});
