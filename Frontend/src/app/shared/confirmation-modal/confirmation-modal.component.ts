import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ConfirmationModalComponent {
  @Output() confirmed = new EventEmitter<void>();
  @Input() title: string = 'Confirm Deletion';
  @Input() message: string = 'Are you sure you want to delete this event?';
  showModal: boolean = false;

  show(): void {
    this.showModal = true;
  }

  hide(): void {
    this.showModal = false;
  }

  confirmDeletion(): void {
    this.confirmed.emit();
    this.hide();
  }
}
