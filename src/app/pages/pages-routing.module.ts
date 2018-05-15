import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MachinesListComponent } from './machines/machines.list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { StatsComponent } from './stats/stats.component';
import { MailComponent } from "./mail/mail.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'virtual-machines',
      component: MachinesListComponent,
    },
    {
      path: 'reservation',
      component: ReservationComponent,
    },
    {
      path: 'stats',
      component: StatsComponent,
    },
    {
      path: 'email',
      component: MailComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
