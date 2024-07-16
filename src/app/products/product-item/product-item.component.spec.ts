import { ComponentFixture, TestBed, } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { ProductFormActionsComponent } from './components/product-form-actions/product-form-actions.component';
import { ProductFormFieldsComponent } from './components/product-form-fields/product-form-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products.module';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, of} from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());


describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductItemComponent, 
        ProductFormActionsComponent, 
        ProductFormFieldsComponent
      ],
      imports: [ProductsModule, FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({}), paramMap: new Observable()}
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('should initialize form with correct values', () => {
    const today = new Date();
    today.setHours(0,0,0,0)
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    expect(component.productForm.value).toEqual({
      id: '',
      name: '',
      description: '',
      logo: '',
      dateRelease: today.toISOString().split('T')[0],
      dateRevision: nextYear.toISOString().split('T')[0]
    })
  });
});
