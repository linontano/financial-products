import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CustomValidators } from './utils/CustomValidators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
  productForm!: FormGroup;
  isEditMode: boolean = false;
  productId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ){}
  ngOnInit(): void {
    this.initializeProductForm();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId){
      this.isEditMode = true;
      this.productId = productId;
      // TODO Loading Product
    } 
  }
  initializeProductForm() {
    this.productForm = this.fb.group(
      {
        id : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo: ['', [Validators.required, Validators.pattern(/^(http[s]?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,5}(\/[^\s]*)?\.(png|jpg)$/)]],
        dateRelease: ['',[Validators.required, CustomValidators.releaseDateValidator()]],
        dateRevision: [{value: ''}, [Validators.required, CustomValidators.revisionDateValidator()]]
      }
    );
    this.productForm.get('dateRelease')?.valueChanges.subscribe(value => this.setRevisionDate(value));
  }
  setRevisionDate(releaseDate: string): void {
    console.log('Setting revision date...')
    const release = new Date(releaseDate);
    if (!isNaN(release.getTime())){
      const revision = new Date(release);
      revision.setFullYear(release.getFullYear() + 1);
      this.productForm.patchValue({
        dateRevision: revision.toISOString().split('T')[0]
      })
    }
  }
  onSubmit() {
    console.log("TODO submit")
  }
}
