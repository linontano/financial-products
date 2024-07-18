import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormFieldsComponent } from './product-form-fields.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators, UniqueIDValidator } from '../../utils/validator.directive';
import { ProductService } from '../../../services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductFormFieldsComponent', () => {
  let component: ProductFormFieldsComponent;
  let httpTestingControler: HttpTestingController;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductFormFieldsComponent>;
  let compiled: HTMLElement;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormFieldsComponent],
      providers: [FormBuilder, ProductService, provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    productService = TestBed.inject(ProductService);
    httpTestingControler = TestBed.inject(HttpTestingController)

    fixture = TestBed.createComponent(ProductFormFieldsComponent);
    component = fixture.componentInstance;
    component.formGroup = formBuilder.group(
      {
        id: [{ value: '' }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [UniqueIDValidator.createValidator(productService, false)]],
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]], 
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo: ['', [Validators.required]],
        dateRelease: ['2024-07-07', [Validators.required, CustomValidators.releaseDateValidator()]],
        dateRevision: ['2025-07-07', [Validators.required, CustomValidators.revisionDateValidator()]]
      }
    );
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show required error for id', () => {
    const idControl = component.f['id'];
    idControl.setValue('');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('Un ID es requerido');
  });

  it('should show (minlenght || maxlength) error for id', () => {
    const idControl = component.f['id'];
    idControl.setValue('lo');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    let errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('El ID debe ser de 3 a 10 caracteres');

    idControl.setValue('lov demasiado ID largo más de 10');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('El ID debe ser de 3 a 10 caracteres');
  });

  it('should show id exists error', () => {
    const idControl = component.f['id'];
    idControl.setValue('lov_exists');
    idControl.markAsTouched();
    idControl.markAsDirty();
    const req1 = httpTestingControler.expectOne(
      '/api/bp/products/verification/lov_exists'
    );
    req1.flush(true);
    fixture.detectChanges();
    let errorElement1 = compiled.querySelector('small');
    expect(errorElement1?.textContent).toContain('El ID ya existe');

    idControl.setValue('lov');
    const req2 = httpTestingControler.expectOne(
      '/api/bp/products/verification/lov'
    );
    req2.flush(false);
    fixture.detectChanges();
    let errorElement2 = compiled.querySelector('small');
    expect(errorElement2).toBe(null);
  });

  it('should show required error for name', () => {
    const idControl = component.f['name'];
    idControl.setValue('');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('Un nombre es requerido');
  });

  it('should show (minlenght || maxlength) error for name', () => {
    const idControl = component.f['name'];
    idControl.setValue('a'.repeat(5));
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    let errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('El nombre debe ser de 6 a 100 caracteres');

    idControl.setValue('a'.repeat(101));
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('El nombre debe ser de 6 a 100 caracteres');
  });

  it('should show required error for description', () => {
    const idControl = component.f['description'];
    idControl.setValue('');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('Una descripción es requerida');
  });

  it('should show (minlenght || maxlength) error for description', () => {
    const idControl = component.f['description'];
    idControl.setValue('a'.repeat(9));
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    let errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('La descripción debe ser de 10 a 200 caracteres');

    idControl.setValue('a'.repeat(201));
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('La descripción debe ser de 10 a 200 caracteres');
  });

  it('should show required error for logo', () => {
    const idControl = component.f['logo'];
    idControl.setValue('');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('Una URL para el Logo es requerida');
  });

  it('should show required error for dateRelease', () => {
    const idControl = component.f['dateRelease'];
    idControl.setValue('');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('Fecha de lanzamiento es requerida');
  });

  it('should show required error for dateRevision', () => {
    const idControl = component.f['dateRevision'];
    idControl.setValue('');
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement = compiled.querySelector('small');
    expect(errorElement?.textContent).toContain('Fecha de revisión es requerida');
  });

  it('should show dateRevision in readonly mode', () => {
    const dateRevisionElement = compiled.querySelector('#dateRevision');
    expect(dateRevisionElement?.hasAttribute('readonly')).toBe(true);
  });

  it('should show min date error for dateRelease', () => {
    const yesterday = new Date()
    yesterday.setHours(0,0,0,0);
    yesterday.setDate(yesterday.getDate() - 1) // Yesterday generated
    const formDateYesterday = yesterday.toISOString().split('T')[0];
    
    const idControl = component.f['dateRelease'];
    idControl.setValue(formDateYesterday);
    idControl.markAsTouched();
    idControl.markAsDirty();
    fixture.detectChanges();
    
    const errorElement1 = compiled.querySelector('small');
    expect(errorElement1?.textContent).toContain('Fecha de lanzamiento debe ser mayor o igual a la fecha actual');

    const today = new Date()
    today.setHours(0,0,0,0); // Today generated
    const formDateToday = today.toISOString().split('T')[0];
    idControl.setValue(formDateToday);
    fixture.detectChanges();

    const errorElement2 = compiled.querySelector('small');
    expect(errorElement2).toBe(null);
  });

  

  // it('should not appear inputs if formGroup is undefined', () => {
  //   const inputs = compiled.querySelectorAll('input');
  //   expect(inputs.length).toBe(0);
  // });

  // it('should appear inputs if formGroup exists', () => {
    
  //   fixture.detectChanges();
  //   const inputs = compiled.querySelectorAll('input');
  //   expect(inputs.length).toBe(6); // One input by field
  // });

  // it('should validate fields', () => {
    
  //   component.formGroup.markAsPristine;
  //   fixture.detectChanges();
  //   const idInput = compiled.querySelector('#id');
  //   idInput.set
  //   expect(component.formGroup.invalid).toBe(true)

  // })
  // it('should validate fields', () => {
  //   component.formGroup = formBuilder.group(
  //     {
  //       id: [{ value: '' }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)], []],
  //       name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]], 
  //       description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
  //       logo: ['', [Validators.required]],
  //       dateRelease: ['2024-07-07', [Validators.required, CustomValidators.releaseDateValidator()]],
  //       dateRevision: ['2025-07-07', [Validators.required, CustomValidators.revisionDateValidator()]]
  //     }
  //   );
  //   fixture.detectChanges();
  //   const inputs = compiled.querySelectorAll('input');
  //   expect(inputs.length).toBe(6); // One input by field
  // });

});
