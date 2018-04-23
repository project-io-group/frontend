import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ReservationComponent } from './reservation.component';
import { FormValidationModule } from 'ngx-form-validation';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  imports: [
    ThemeModule,
    FormValidationModule,
    FormsModule,
    Ng2CompleterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    ReservationComponent,
  ],
})
export class ReservationModule{
}
