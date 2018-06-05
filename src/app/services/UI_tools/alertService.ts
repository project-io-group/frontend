import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from '../../@theme/components/modal/confirm.modal.component';
import { AcknowledgeModalComponent } from '../../@theme/components/modal/acknowledge.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AlertService {
  constructor(private modalService: NgbModal) {
  }

  public newSmallConfirmModal(modalHeader: string, modalContent: string, onConfirm: () => void, onCancel: () => void) {
    const activeModal = this.modalService.open(ConfirmModalComponent, {size: 'sm', container: 'nb-layout'});
    activeModal.componentInstance.modalHeader = modalHeader;
    activeModal.componentInstance.modalContent = modalContent;
    activeModal.componentInstance.modalOnConfirm = onConfirm;
    activeModal.componentInstance.modalOnCancel = onCancel;
    return activeModal;
  }

  public newSmallAcknowledgeModal(modalHeader: string, modalContent: string, onConfirm: () => void) {
    const activeModal = this.modalService.open(AcknowledgeModalComponent, {size: 'sm', container: 'nb-layout'});
    activeModal.componentInstance.modalHeader = modalHeader;
    activeModal.componentInstance.modalContent = modalContent;
    activeModal.componentInstance.modalOnConfirm = onConfirm != null ? onConfirm : () => {};
    return activeModal;
  }
}
