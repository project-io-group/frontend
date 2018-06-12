import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MachinesListComponent } from './machines/machines.list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { StatsComponent } from './stats/stats.component';
import { ReservationsListComponent } from './reservations/reservations.list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'virtual-machines',
      component: MachinesListComponent,
    },
    {
      path: 'list_reservations',
      component: ReservationsListComponent,
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
      path: '',
      redirectTo: 'virtual-machines',
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
