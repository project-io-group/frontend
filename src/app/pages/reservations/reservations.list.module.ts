import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {ReservationsListComponent} from './reservations.list.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ReservationsListComponent,
  ],
})
export class ReservationsListModule {
}
