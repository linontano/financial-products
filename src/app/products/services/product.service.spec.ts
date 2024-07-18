import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

describe('ProductService', () => {
  let httpTestingControler: HttpTestingController;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService
      ]
    });
    httpTestingControler = TestBed.inject(HttpTestingController)
    productService = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpTestingControler.verify();
  })

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('getProductById', () => {
    it('should return a Product with ID "lov"', () => {
      let product: Product | undefined;
      productService.getProductById('lov').subscribe(response => {
        product = response;
      });

      const req = httpTestingControler.expectOne('/api/bp/products/lov');
      req.flush({
        id: 'lov',
        name: 'Lov Product',
        description: 'Lov Product description',
        logo: 'image.png',
        date_release: "2024-07-17",
        date_revision: "2025-07-17",
      })
      expect(req.request.method).toEqual('GET');
      expect(product).toEqual({
        id: 'lov',
        name: 'Lov Product',
        description: 'Lov Product description',
        logo: 'image.png',
        dateRelease: new Date("2024-07-17"),
        dateRevision: new Date("2025-07-17"),
      });
    })
  });
  describe('getProducts', () => {
    it('should return a list of Products', () => {
      let serverData = {
        data: [
          {
            id: "dos",
            name: "Nombre Producto 2",
            description: "Descripción producto 2",
            logo: "assets-1.png",
            date_release: "2025-01-01",
            date_revision: "2026-01-01"
          },
          {
            id: "uno",
            name: "Nombre Producto 1",
            description: "Descripción producto 1",
            logo: "assets-1.png",
            date_release: "2025-01-01",
            date_revision: "2026-01-01"
          }
        ]
      };
      let products: Product[] | undefined;
      productService.getProducts().subscribe(response => {
        products = response.data;
      });
      const req = httpTestingControler.expectOne('/api/bp/products');
      expect(req.request.method).toEqual('GET');
    
      req.flush(serverData);
      expect(products).toEqual([
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
        }
      ]);
    })
  })
});
