import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="onCancel()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="onConfirm()">OK</button>
    </div>
  `,
})
export class AcknowledgeModalComponent {

  modalOnConfirm: () => void = () => {};
  modalHeader: string;
  modalContent: string = ``;

  constructor(private activeModal: NgbActiveModal) { }

  onConfirm() {
    this.modalOnConfirm();
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.close();
  }
}
