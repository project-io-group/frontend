import {Component} from '@angular/core';

@Component({
  selector: 'mail',
  template: `
    <nb-card>
      <nb-card-header>
        Contact Admin
      </nb-card-header>
      <nb-card-body>
        <mail-form></mail-form>
      </nb-card-body>
    </nb-card>`,
})
export class MailComponent {
}
