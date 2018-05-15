import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {MailFormComponent} from './mail-form.component';
import {MailComponent} from './mail.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    MailComponent,
    MailFormComponent,
  ],
  exports: [
    MailComponent,
    MailFormComponent,
  ],
})
export class MailModule {
}
