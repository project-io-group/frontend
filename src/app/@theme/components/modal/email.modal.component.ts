import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Mail, MailService} from '../../../services/mail.service';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>Message for Admin</span>
      <button class="close" aria-label="Close" (click)="onCancel()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <textarea class="form-control" id="message"
                placeholder="Message"
                required
                [(ngModel)]="model.message" name="message"
                #message="ngModel" rows="6"></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="onConfirm()">Send</button>
    </div>
  `,
})
export class EmailModalComponent {

  subject: string = `error`;
  protected model: Mail;

  constructor(private activeModal: NgbActiveModal, private mailService: MailService) {
    this.model = new Mail('', '');
  }
  onConfirm() {
    this.model.subject = this.subject;
    this.mailService.sendMail(this.model).subscribe();
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.close();
  }
}
