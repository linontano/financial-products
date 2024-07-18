import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { FormsModule } from '@angular/forms';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductSearchComponent],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit (search) Output with the input string when changes', () => {
    jest.spyOn(component.search, 'emit');

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = "New Search";
    inputElement.dispatchEvent(new Event('input'));

    expect(component.search.emit).toHaveBeenCalledWith("New Search");
  })


});
