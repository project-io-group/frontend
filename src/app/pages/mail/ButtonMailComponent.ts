import { Component } from '@angular/core';

@Component({
  selector: 'ngx-mail-button',
  template: `
    <button (click)="openMailModal()"></button>
    `,
})
export class MailComponent {


  constructor() {
  }


  openMailModal() {
  }
}
