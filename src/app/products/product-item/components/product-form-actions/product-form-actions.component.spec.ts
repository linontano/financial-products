import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormActionsComponent } from './product-form-actions.component';

describe('ProductFormActionsComponent', () => {
  let component: ProductFormActionsComponent;
  let fixture: ComponentFixture<ProductFormActionsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit reset with the clean button', () => {
    jest.spyOn( component.reset, 'emit' );
    const cleanBtn = compiled.querySelector('button.btn-secondary');
    cleanBtn?.dispatchEvent(new Event('click'));

    expect(component.reset.emit).toHaveBeenCalled();
  })

  it('should disabled Submit button when disabledSubmit is true', () => {
    component.disabledSubmit = true;
    fixture.detectChanges();

    const submitBtn = compiled.querySelector('button.btn-primary');
    expect(submitBtn?.hasAttribute('disabled'));
  })
});
