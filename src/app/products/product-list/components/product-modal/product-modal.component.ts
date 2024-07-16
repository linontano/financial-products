import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  @Input() messageModal!: string;
  @Output() confirmAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  onConfirm() {
    this.confirmAction.emit();
  }

  onCancel() {
    this.cancelAction.emit();
  }
}
