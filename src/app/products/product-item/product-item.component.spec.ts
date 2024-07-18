import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductFormFieldsComponent } from './components/product-form-fields/product-form-fields.component';
import { ProductFormActionsComponent } from './components/product-form-actions/product-form-actions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('ProductItemComponent', () => {
  const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'add', component: ProductItemComponent },
    { path: 'edit/:id', component: ProductItemComponent },
  ];
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let productService: ProductService;
  let compiled: HTMLElement;
  let httpTestingControler: HttpTestingController;

  describe('Add Mode', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
        declarations: [ProductItemComponent, ProductFormFieldsComponent, ProductFormActionsComponent],
        providers: [ProductService, provideHttpClient(), provideHttpClientTesting()]
      })
        .compileComponents();

      fixture = TestBed.createComponent(ProductItemComponent);
      router = TestBed.inject(Router);
      activatedRoute = TestBed.inject(ActivatedRoute);
      productService = TestBed.inject(ProductService);
      httpTestingControler = TestBed.inject(HttpTestingController)
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.nativeElement;
    });

    let defaultFormValues: any;
    beforeEach(() => {
      const dateReleaseDefault = new Date();
      dateReleaseDefault.setHours(0, 0, 0, 0);
      const dateRevisionDefault = new Date(dateReleaseDefault);
      dateRevisionDefault.setFullYear(dateReleaseDefault.getFullYear() + 1);
      defaultFormValues = {
        id: '',
        name: '',
        description: '',
        logo: '',
        dateRelease: dateReleaseDefault.toISOString().split('T')[0],
        dateRevision: dateRevisionDefault.toISOString().split('T')[0]
      }
    })
    it('should load the title "Formulario de Registro" in add mode', () => {
      const h1Element = compiled.querySelector('h1');
      expect(h1Element?.textContent).toContain('Formulario de Registro');
    })

    it('should load form with default Values in add mode', () => {
      const valuesProductForm = component.productForm.value;
      // Testing local value
      expect(valuesProductForm).toEqual(defaultFormValues);

      const debugFormFieldsComponent = fixture.debugElement.query(By.directive(ProductFormFieldsComponent));
      const formFieldComponent: ProductFormFieldsComponent = debugFormFieldsComponent.componentInstance;
      // Testing child value
      expect(formFieldComponent.formGroup.value).toEqual(defaultFormValues);
    });

    it('should load submit button disabled in add mode when productForm is invalid', () => {
      const debugFormFieldsComponent = fixture.debugElement.query(By.directive(ProductFormActionsComponent));
      //const formActionComponent: ProductFormActionsComponent = debugFormFieldsComponent.componentInstance;
      const compiledAction: HTMLElement = debugFormFieldsComponent.nativeElement;
      const submitBtn1 = compiledAction.querySelector('button.btn-primary');
      // Testing default disabled submit button
      expect(submitBtn1?.hasAttribute('disabled')).toBe(true)

      let productForm = component.productForm
      productForm.controls['id'].setValue('test');
      productForm.controls['name'].setValue('Test Product')
      productForm.controls['description'].setValue('Test Description');
      productForm.controls['logo'].setValue('testlogo.png');
      const req = httpTestingControler.expectOne(
        '/api/bp/products/verification/test'
      );
      req.flush(false);
      fixture.detectChanges();
      const submitBtn2 = compiledAction.querySelector('button.btn-primary');
      // Check if form is valid
      expect(component.productForm.valid).toEqual(true);
      // Testing submit button without disabled attribute
      expect(submitBtn2?.hasAttribute('disabled')).toBe(false)
    })

    it('should show dateRevision equal to dateRelease plus one year when dateRelease changes value', () => {
      const newDateRelease = "2050-04-13";
      component.productForm.controls['dateRelease'].setValue(newDateRelease);
      expect(component.productForm.controls['dateRevision'].value).toBe('2051-04-13');
    })

    it('should reset to default value form when button clean is clicked', () => {
      let newValueForm = {
        id: 'test',
        name: 'Test Product',
        description: 'Test Description',
        logo: 'testlogo.png',
        dateRelease: '2050-04-13',
        dateRevision: '2051-04-13'
      }
      let productForm = component.productForm
      productForm.controls['id'].setValue('test');
      productForm.controls['name'].setValue('Test Product')
      productForm.controls['description'].setValue('Test Description');
      productForm.controls['logo'].setValue('testlogo.png');
      productForm.controls['dateRelease'].setValue('2050-04-13');
      // Check if change were applied
      expect(productForm.value).toEqual(newValueForm);
      fixture.detectChanges();

      const debugFormFieldsComponent = fixture.debugElement.query(By.directive(ProductFormActionsComponent));
      const compiledAction: HTMLElement = debugFormFieldsComponent.nativeElement;
      const clearBtn = compiledAction.querySelector('button.btn-secondary');
      clearBtn?.dispatchEvent(new Event('click'));
      // Check if productForm is not equal to previous input values
      expect(productForm.value).not.toEqual(newValueForm);
    });

    it('should make request to create the product when button submit is clicked', () => {
      let newValueForm = {
        id: 'test',
        name: 'Test Product',
        description: 'Test Description',
        logo: 'testlogo.png',
        dateRelease: '2050-04-13',
        dateRevision: '2051-04-13'
      }
      let productForm = component.productForm
      productForm.controls['id'].setValue('test');
      productForm.controls['name'].setValue('Test Product')
      productForm.controls['description'].setValue('Test Description');
      productForm.controls['logo'].setValue('testlogo.png');
      productForm.controls['dateRelease'].setValue('2050-04-13');
      const req = httpTestingControler.expectOne(
        '/api/bp/products/verification/test'
      );
      // ID Validation Async
      req.flush(false);
      // Check if change were applied
      expect(productForm.value).toEqual(newValueForm);
      fixture.detectChanges();

      const debugFormFieldsComponent = fixture.debugElement.query(By.directive(ProductFormActionsComponent));
      const compiledAction: HTMLElement = debugFormFieldsComponent.nativeElement;
      const submitBtn: HTMLButtonElement | null = compiledAction.querySelector('button.btn-primary');

      // Check if form is valid
      expect(component.productForm.valid).toEqual(true);
      // Testing submit button without disabled attribute
      expect(submitBtn?.hasAttribute('disabled')).toBe(false);

      submitBtn?.click();
      fixture.detectChanges();


      const req2 = httpTestingControler.expectOne(
        '/api/bp/products'
      );
      req2.flush(newValueForm);
      // Check if make request POST to the correct URL
      expect(req2.request.method).toEqual('POST');

      expect(component.actionCompleted).toEqual(true);

    })


  });

  describe('Edit Mode', () => {
    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get(param: string) {
            return (param === 'id') ? 'test' : null;
          }
        }
      }
    }
    const productFormCreated = {
      id: 'test',
      name: 'Test Producto',
      description: 'Test Producto Description',
      logo: 'Test Producto Logo',
      date_release: "2025-04-13",
      date_revision: "2026-04-13"
    }
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
        declarations: [ProductItemComponent, ProductFormFieldsComponent, ProductFormActionsComponent],
        providers: [ProductService, provideHttpClient(), provideHttpClientTesting(),
          { provide: ActivatedRoute, useValue: mockActivatedRoute }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(ProductItemComponent);
      productService = TestBed.inject(ProductService);
      httpTestingControler = TestBed.inject(HttpTestingController)
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.nativeElement;

      // Loading Product
      const firstReq = httpTestingControler.expectOne('/api/bp/products/test');
      firstReq.flush(productFormCreated);
      expect(component.productForm.getRawValue()).toEqual({
        id: productFormCreated['id'],
        name: productFormCreated['name'],
        description: productFormCreated['description'],
        logo: productFormCreated['logo'],
        dateRelease: productFormCreated['date_release'],
        dateRevision: productFormCreated['date_revision'],
      });
      fixture.detectChanges();

    });

    it('should disabled the ID field in edit mode', () => {
      const inputId: HTMLInputElement = fixture.debugElement
        .query(By.directive(ProductFormFieldsComponent))
        .nativeElement
        .querySelector('input#id');
      expect(inputId.hasAttribute('disabled')).toBe(true);
    })

    it('should disabled the submit button if not changes the product form in edit mode', () => {
      const submitBtn: HTMLButtonElement = fixture.debugElement
        .query(By.directive(ProductFormActionsComponent))
        .nativeElement
        .querySelector('button.btn-primary');
      // Initial state without changes
      expect(submitBtn.disabled).toBe(true);
      const controls = component.productForm.controls
      controls['name'].setValue('Test Producto Edit');
      controls['name'].markAsDirty();
      controls['name'].markAsTouched();
      fixture.detectChanges();

      expect(component.productForm.valid).toBe(true);
      const submitBtn2: HTMLButtonElement = fixture.debugElement
        .query(By.directive(ProductFormActionsComponent))
        .nativeElement
        .querySelector('button.btn-primary');
      expect(submitBtn2.disabled).toBe(false);

      // Change name to the init value
      controls['name'].setValue('Test Producto');
      fixture.detectChanges();
      expect(submitBtn2.disabled).toBe(true);
    })

    it('should load the Product with the ID "test" in path', () => {
      expect(component.productId).toEqual('test');
    })

    it('should load the title "Formulario de Edición" in edit mode', () => {
      const h1Element = compiled.querySelector('h1');
      expect(h1Element?.textContent).toContain('Formulario de Edición');
    })

    it('should make request to update the product when button submit is clicked', () => {
      let newValueForm = {
        id: 'test',
        name: 'Test Producto',
        description: 'Test Producto Description Edited',
        logo: 'Test Producto Logo',
        dateRelease: "2025-04-13",
        dateRevision: "2026-04-13"
      }
      let productForm = component.productForm
      // Change Name, description
      productForm.controls['name'].setValue('Test Producto')
      productForm.controls['description'].setValue('Test Producto Description Edited');
      
      // Check if change were applied
      expect(productForm.getRawValue()).toEqual(newValueForm);
      fixture.detectChanges();

      const debugFormFieldsComponent = fixture.debugElement.query(By.directive(ProductFormActionsComponent));
      const compiledAction: HTMLElement = debugFormFieldsComponent.nativeElement;
      const submitBtn: HTMLButtonElement | null = compiledAction.querySelector('button.btn-primary');

      // Check if form is valid
      expect(component.productForm.valid).toEqual(true);
      // Testing submit button without disabled attribute
      expect(submitBtn?.disabled).toBe(false);

      submitBtn?.click();
      fixture.detectChanges();

      const req2 = httpTestingControler.expectOne(
        '/api/bp/products/test'
      );
      req2.flush(newValueForm);
      // Check if make request PUT to the correct URL
      expect(req2.request.method).toEqual('PUT');
      expect(component.actionCompleted).toEqual(true);

    })

    it('should reset to default value form when button clean is clicked', () => {
      let newValueForm = {
        id: 'test',
        name: 'Test Producto',
        description: 'Test Producto Description Edited',
        logo: 'Test Producto Logo',
        dateRelease: "2025-04-13",
        dateRevision: "2026-04-13"
      }
      let productForm = component.productForm
      // Change Name, description
      productForm.controls['name'].setValue('Test Producto')
      productForm.controls['description'].setValue('Test Producto Description Edited');
      // Check if change were applied
      expect(productForm.getRawValue()).toEqual(newValueForm);
      fixture.detectChanges();

      const clearBtn: HTMLButtonElement = fixture.debugElement
        .query(By.directive(ProductFormActionsComponent))
        .nativeElement
        .querySelector('button.btn-secondary');

      expect(clearBtn.disabled).toBe(false);
      clearBtn.click();
      fixture.detectChanges();
      // Check if productForm is not equal to previous input values
      expect(productForm.getRawValue()).toEqual({
        id: productFormCreated['id'],
        name: productFormCreated['name'],
        description: productFormCreated['description'],
        logo: productFormCreated['logo'],
        dateRelease: productFormCreated['date_release'],
        dateRevision: productFormCreated['date_revision'],
      });
    });
  });

});