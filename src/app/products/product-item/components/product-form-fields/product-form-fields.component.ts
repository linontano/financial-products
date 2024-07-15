import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'product-form-fields',
  templateUrl: './product-form-fields.component.html',
  styleUrl: './product-form-fields.component.scss'
})
export class ProductFormFieldsComponent {
  @Input() formGroup!: FormGroup;
}
