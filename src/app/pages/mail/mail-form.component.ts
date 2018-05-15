import {Component} from '@angular/core';
import {Mail, MailService} from "../../services/mail.service";

@Component({
  selector: 'mail-form',
  templateUrl: './mail-form.component.html',
})
export class MailFormComponent {

  protected subjects: string[];
  protected recipients: string[];
  private readonly model: Mail;

  constructor(private mailService: MailService) {

    this.model = new Mail("", "", "");

    mailService.getPossibleSubjects().subscribe(subjects => {
      this.subjects = subjects;
      if (subjects.length > 0) {
        this.model.subject = subjects[0]
      }
    });

    mailService.getPossibleRecipients().subscribe(recipients => {
      this.recipients = recipients;
      if (recipients.length > 0) {
        this.model.recipient = recipients[0]
      }
    });

  }

  onSubmit(): void {
    this.mailService.sendMail(this.model).subscribe()
  }

}
