import {Component} from '@angular/core';

@Component({
  selector: 'ngx-mail',
  template: `
    <nb-card>
      <nb-card-header>
        Contact Admin
      </nb-card-header>
      <nb-card-body>
        <ngx-mail-form></ngx-mail-form>
      </nb-card-body>
    </nb-card>`,
})
export class MailComponent {
}
