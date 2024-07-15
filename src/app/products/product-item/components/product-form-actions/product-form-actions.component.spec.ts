import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormActionsComponent } from './product-form-actions.component';

describe('ProductFormActionsComponent', () => {
  let component: ProductFormActionsComponent;
  let fixture: ComponentFixture<ProductFormActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
