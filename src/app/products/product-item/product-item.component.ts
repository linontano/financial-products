import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CustomValidators, UniqueIDValidator } from './utils/validator.directive';
import { Product } from '../models/product.model';
import { isEqual } from './utils/helpers';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  productForm!: FormGroup;
  originalProduct!: Product;
  loadingProductForm: boolean = true;
  isEditMode: boolean = false;
  isProductFormChanged: boolean = false
  productId: string = '';
  actionCompleted: boolean = false;
  notFoundProduct: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.productId = productId;
    }
    this.initializeProductForm();
    if (this.isEditMode) {
      this.loadProduct(this.productId)
    }
    else {
      this.loadingProductForm = false;
    }
  }
  initializeProductForm() {
    let defaultRelease = new Date();
    defaultRelease.setHours(0, 0, 0, 0);
    let defaultRevision = new Date(defaultRelease);
    defaultRevision.setFullYear(defaultRelease.getFullYear() + 1);

    this.productForm = this.fb.group(
      {
        id: [{ value: '', disabled: this.isEditMode }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [UniqueIDValidator.createValidator(this.productService, this.isEditMode)]],
        name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]], // Fixed: MS bug when minLength is 5
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo: ['', [Validators.required]],
        dateRelease: [this.formatISODatePicker(defaultRelease), [Validators.required, CustomValidators.releaseDateValidator()]],
        dateRevision: [this.formatISODatePicker(defaultRevision), [Validators.required, CustomValidators.revisionDateValidator()]]
      }
    );
    this.productForm.get('dateRelease')?.valueChanges.subscribe(value => this.setRevisionDate(value));
    this.productForm.valueChanges.subscribe((data) => {
      if (this.originalProduct) {
        this.checkIfProductFormChanged(data)
      }
    })
  }
  setRevisionDate(releaseDate: string): void {
    const release = new Date(releaseDate);
    if (!isNaN(release.getTime())) {
      const revision = new Date(release);
      revision.setFullYear(release.getFullYear() + 1);
      this.productForm.patchValue({
        dateRevision: this.formatISODatePicker(revision)
      })
    }
  }
  getProductModelByForm(productForm: any, id: string='') {
    let updateProduct = productForm;
    if (id){
      updateProduct['id'] = id;
    }
    updateProduct['dateRelease'] = new Date(updateProduct.dateRelease)
    updateProduct['dateRevision'] = new Date(updateProduct.dateRevision)
    return updateProduct
  }
  onSubmit() {
    if (this.productForm.invalid) {
      return
    }
    this.isEditMode ? this.updateProduct() : this.addProduct()
  }
  loadProduct(productId: string) {
    this.productService.getProductById(productId).subscribe({
      next: (data: Product) => {
        this.productForm.reset({
          id: data.id,
          name: data.name,
          description: data.description,
          logo: data.logo,
          dateRelease: this.formatISODatePicker(data.dateRelease),
          dateRevision: this.formatISODatePicker(data.dateRevision)
        });
        this.originalProduct = data;
        this.loadingProductForm = false;
      },
      error: (error) => {
        console.error('Error detectado', error);
        if (error?.status === 404) {
          this.router.navigate(['products/notfound']);
        }
      }
    })
  }
  addProduct() {
    const newProduct = this.getProductModelByForm(this.productForm.value, this.productId)
    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        console.log('Producto creado');
        this.actionCompleted = true
        setTimeout(() => {
          this.actionCompleted = false
        }, 3000)
        this.resetProductForm()
      },
      error: (error) => console.error('Error al crear el producto', error)
    })
  }
  updateProduct() {
    if (this.isProductFormChanged) {
      const updateProduct = this.getProductModelByForm(this.productForm.value, this.productId);
      
      this.productService.updateProduct(this.productId, updateProduct).subscribe({
        next: () => {
          console.log('Producto actualizado');
          this.actionCompleted = true
          this.originalProduct = updateProduct;
          this.isProductFormChanged = false;
          setTimeout(() => {
            this.actionCompleted = false
          }, 3000)
        },
        error: (error) => console.error('Error al actualizar el producto', error)
      })
    }
  }
  onCancel() {
    this.router.navigate(['/products']);
  }
  formatISODatePicker(date: Date) {
    return date.toISOString().split('T')[0];
  }
  checkIfProductFormChanged(dataFormChanged: any) {

    let bodyOriginalForm = {
      name: this.originalProduct.name,
      description: this.originalProduct.description,
      logo: this.originalProduct.logo,
      dateRelease: this.formatISODatePicker(this.originalProduct.dateRelease),
      dateRevision: this.formatISODatePicker(this.originalProduct.dateRevision),
    }
    this.isProductFormChanged = !isEqual(dataFormChanged, bodyOriginalForm)
  }
  resetProductForm() {
    if (this.isEditMode) {
      this.productForm.reset({
        id: this.originalProduct.id,
        name: this.originalProduct.name,
        description: this.originalProduct.description,
        logo: this.originalProduct.logo,
        dateRelease: this.formatISODatePicker(this.originalProduct.dateRelease),
        dateRevision: this.formatISODatePicker(this.originalProduct.dateRevision)
      });
    }
    else {
      let defaultRelease = new Date();
      defaultRelease.setHours(0, 0, 0, 0);
      let defaultRevision = new Date(defaultRelease);
      defaultRevision.setFullYear(defaultRelease.getFullYear() + 1);
      this.productForm.reset({
        dateRelease: this.formatISODatePicker(defaultRelease),
        dateRevision: this.formatISODatePicker(defaultRevision)
      });
    }

  }

}
