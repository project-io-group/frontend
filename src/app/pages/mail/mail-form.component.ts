import {Component} from '@angular/core';
import {Mail, MailService} from '../../services/mail.service';

@Component({
  selector: 'ngx-mail-form',
  templateUrl: './mail-form.component.html',
})
export class MailFormComponent {

  protected subjects: string[];
  private readonly model: Mail;

  constructor(private mailService: MailService) {

    this.model = new Mail('', '');

    mailService.getPossibleSubjects().subscribe(subjects => {
      this.subjects = subjects;
      if (subjects.length > 0) {
        this.model.subject = subjects[0]
      }
    });

  }

  onSubmit(): void {
    this.mailService.sendMail(this.model).subscribe()
  }
}
