import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { EmailWidgetComponent } from './email.widget.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    EmailWidgetComponent,
  ],
  exports: [
    EmailWidgetComponent,
  ],
})
export class EmailWidgetModule {
}
