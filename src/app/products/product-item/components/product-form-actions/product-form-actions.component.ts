import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-form-actions',
  templateUrl: './product-form-actions.component.html',
  styleUrl: './product-form-actions.component.scss'
})
export class ProductFormActionsComponent {
  @Input() disabledSubmit = false;
  @Output() reset = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }
  onReset(){
    this.reset.emit();
  }
}
