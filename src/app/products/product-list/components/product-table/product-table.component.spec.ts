import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponent } from './product-table.component';
import { FormsModule } from '@angular/forms';
import { ProductMenuComponent } from '../product-menu/product-menu.component';
import { ProductModalComponent } from '../product-modal/product-modal.component';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let compiled: HTMLElement;
  const inputComponent = [
    {
      id: "dos",
      name: "Nombre Producto 2",
      description: "Descripción producto 2",
      logo: "assets-1.png",
      dateRelease: new Date("2025-01-01"),
      dateRevision: new Date("2026-01-01")
    },
    {
      id: "uno",
      name: "Nombre Producto 1",
      description: "Descripción producto 1",
      logo: "assets-1.png",
      dateRelease: new Date("2025-01-01"),
      dateRevision: new Date("2026-01-01")
    },
    {
      id: "tres",
      name: "Nombre Producto 3",
      description: "Descripción producto 3",
      logo: "assets-1.png",
      dateRelease: new Date("2025-01-01"),
      dateRevision: new Date("2026-01-01")
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent, ProductMenuComponent, ProductModalComponent],
      imports: [FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    component.products = inputComponent;

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages equals 2 when products length greater than 5 (itemsPerPage limit)', () => {
    component.calculateTotalPages();
    expect(component.totalPages).toEqual(1);
    component.products = [...component.products,
      {
        id: "cuatro",
        name: "Nombre Producto 4",
        description: "Descripción producto 4",
        logo: "assets-1.png",
        dateRelease: new Date("2025-01-01"),
        dateRevision: new Date("2026-01-01")
      },
      {
        id: "cinco",
        name: "Nombre Producto 5",
        description: "Descripción producto 5",
        logo: "assets-1.png",
        dateRelease: new Date("2025-01-01"),
        dateRevision: new Date("2026-01-01")
      },
      {
        id: "seis",
        name: "Nombre Producto 6",
        description: "Descripción producto 6",
        logo: "assets-1.png",
        dateRelease: new Date("2025-01-01"),
        dateRevision: new Date("2026-01-01")
      }
    ];
    component.calculateTotalPages();
    expect(component.totalPages).toEqual(2);
  });

  it ('should move to the next page and see only one row (the last one) with six element', () => {
    const newProducts = Array.from({length: 8}, (_, i) => ({
      id: `id_${i}`,
      name: `Nombre Producto ${i}`,
      description: `Descripcion Producto ${i}`,
      logo: `image_${i}.png`,
      dateRelease: new Date("2025-07-07"),
      dateRevision: new Date("2026-07-07"),
    }))
    component.products = newProducts;
    component.calculateTotalPages();
    expect(component.totalPages).toEqual(2);
    expect(component.itemsPerPage).toBe(5);
    expect(component.currentPage).toBe(1)
    fixture.detectChanges();

    const nextBtn: HTMLButtonElement | null = compiled.querySelector('button[data-testid="nextbtn"]');
    expect(nextBtn?.disabled).toBe(false);
    nextBtn?.click();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    
    // Show only 3 rows because the size of Page is 5 and products is 8 elements
    expect(compiled.querySelectorAll('tbody tr').length).toBe(3);

    const prevBtn: HTMLButtonElement | null = compiled.querySelector('button[data-testid="prevbtn"]');
    expect(prevBtn?.disabled).toBe(false);
    prevBtn?.click();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    expect(compiled.querySelectorAll('tbody tr').length).toBe(5);
  });

  it('should change items visible (5 items to 8 items) when changes itemsPerPage to 10 with 8 elements in products', () => {
    const newProducts = Array.from({length: 8}, (_, i) => ({
      id: `id_${i}`,
      name: `Nombre Producto ${i}`,
      description: `Descripcion Producto ${i}`,
      logo: `image_${i}.png`,
      dateRelease: new Date("2025-07-07"),
      dateRevision: new Date("2026-07-07"),
    }));
    component.products = newProducts;
    component.calculateTotalPages();
    expect(component.totalPages).toEqual(2);
    expect(component.itemsPerPage).toEqual(5);
    expect(component.currentPage).toEqual(1);
    fixture.detectChanges();

    const selectItemsPage: HTMLSelectElement  = fixture.nativeElement.querySelector('select#itemsPerPage');;
    expect(selectItemsPage.value).toEqual("5");
    
    selectItemsPage.value = "10";
    selectItemsPage.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect (component.itemsPerPage).toEqual("10");
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toEqual(8);
    expect(component.itemsPerPage).toEqual("10");
    expect(component.currentPage).toEqual(1);
  })

});
