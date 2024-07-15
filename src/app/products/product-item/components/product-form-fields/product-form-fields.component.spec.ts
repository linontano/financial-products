import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormFieldsComponent } from './product-form-fields.component';

describe('ProductFormFieldsComponent', () => {
  let component: ProductFormFieldsComponent;
  let fixture: ComponentFixture<ProductFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
