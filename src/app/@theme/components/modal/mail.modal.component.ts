import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Mail, MailService } from '../../../services/mail.service';

@Component({
  selector: 'ngx-mail-modal',
  template: `<ngx-mail></ngx-mail>`,
})
export class AcknowledgeModalComponent {

  constructor(private mailService: MailService, private activeModal: NgbActiveModal) { }

  onConfirm() {
    this.mailService.sendMail(new Mail('asd', 'asd'));
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.close();
  }
}
