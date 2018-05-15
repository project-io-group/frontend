import { BackendServicesProxy } from './remote/backend.services.proxy';
import { NgModule } from '@angular/core';
import { VMService } from './vm_service/vm_service';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './reservation_service/reservationService';
import { AlertService } from './UI_tools/alertService';
import { StatsService } from './stats/stats.service';
import { MailService } from "./mail.service";

const OWN_PROVIDERS = [
  BackendServicesProxy,
  VMService,
  ReservationService,
  AlertService,
  StatsService,
  MailService,
];

const OWN_COMPONENTS = [];

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    ...OWN_COMPONENTS,
  ],
  declarations: [
    ...OWN_COMPONENTS,
  ],
  providers: [
    ...OWN_PROVIDERS,
  ],
})
export class ServicesModule {
}
