import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Reservation} from '../../services/reservation_service/reservation';
import {ReservationService} from '../../services/reservation_service/reservation_service';

@Component({
  selector: 'ngx-reservation-list',
  templateUrl: './reservations.list.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ReservationsListComponent {
  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      owner: {
        title: 'Owner',
        type: 'string',
      },
      courseName: {
        title: 'Course',
        type: 'string',
      },
      vmPool: {
        title: 'Pool',
        type: 'string',
      },
      machinesNumber: {
        title: 'Machines',
        type: 'number',
      },
      dates: {
        title: 'Dates',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  private data: Reservation[];

  constructor(private reservationService: ReservationService) {
    reservationService.getReservations().subscribe(reservations => {
      this.data = reservations;
      this.source.load(this.data);
    })
  }
}
