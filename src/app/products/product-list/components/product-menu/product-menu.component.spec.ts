import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuComponent } from './product-menu.component';

describe('ProductMenuComponent', () => {
  let component: ProductMenuComponent;
  let fixture: ComponentFixture<ProductMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the menu when click the menu-button', () => {
    
    const menuContainer: HTMLElement = fixture.nativeElement.querySelector('div.menu');
    expect(menuContainer).toEqual(null);
    expect(component.isMenuOpen).toEqual(false);

    const menuBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button.menu-button')
    menuBtn.click();

    fixture.detectChanges();

    expect(component.isMenuOpen).toEqual(true);
    const itemsMenu = fixture.nativeElement.querySelectorAll('div.menu li').length;
    expect(itemsMenu).toBe(2);
  })

  it('should emit (edit) when clicked "Editar" option', () => {
    jest.spyOn(component.edit, 'emit');
    const menuBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button.menu-button')
    menuBtn.click();

    fixture.detectChanges();
    expect(component.isMenuOpen).toEqual(true);

    const editOption: HTMLElement = fixture.nativeElement.querySelector('li[data-testid="editoption"]');
    editOption.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.edit.emit).toHaveBeenCalled();
  })
  it('should emit (delete) when clicked "Eliminar" option', () => {
    jest.spyOn(component.delete, 'emit');
    const menuBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button.menu-button')
    menuBtn.click();

    fixture.detectChanges();
    expect(component.isMenuOpen).toEqual(true);

    const deleteOption: HTMLElement = fixture.nativeElement.querySelector('li[data-testid="deleteoption"]');
    deleteOption.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.delete.emit).toHaveBeenCalled();
  })
});
