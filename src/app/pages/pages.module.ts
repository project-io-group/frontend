import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MachinesListModule } from './machines/machines.list.module';
import { ReservationModule } from './reservation/reservation.module';
import { StatsModule } from './stats/stats.module';
import { MailModule } from "./mail/mail.module";


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MachinesListModule,
    ReservationModule,
    StatsModule,
    MailModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
