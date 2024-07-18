import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModalComponent } from './product-modal.component';

describe('ProductModalComponent', () => {
  let component: ProductModalComponent;
  let fixture: ComponentFixture<ProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the message in input messageModal', () => {
    component.messageModal = "Esto es un mensaje";
    fixture.detectChanges();

    const pMessage: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pMessage.textContent).toEqual("Esto es un mensaje");
  });

  it('should emit (cancelAction) when cancel button clicked', () => {
    jest.spyOn(component.cancelAction, 'emit');
    const cancelBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button.btn-secondary');
    cancelBtn.click();
    fixture.detectChanges();

    expect(component.cancelAction.emit).toHaveBeenCalled();

  });
  it('should emit (confirmAction) when confirm button clicked', () => {
    jest.spyOn(component.confirmAction, 'emit');
    const confirmlBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button.btn-primary');
    confirmlBtn.click();
    fixture.detectChanges();

    expect(component.confirmAction.emit).toHaveBeenCalled();
  });
});
