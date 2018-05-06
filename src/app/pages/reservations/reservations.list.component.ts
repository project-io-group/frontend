import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ReservationService} from '../../services/reservation_service/reservation_service';
import {ReservationRow} from './reservation_row';

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
  static USER_PLACEHOLDER = -1;
  source: LocalDataSource = new LocalDataSource();
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
      startTime: {
        title: 'Start Time',
        type: 'string',
      },
      endTime: {
        title: 'End Time',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
    },
  };
  private data: ReservationRow[];

  constructor(reservationService: ReservationService) {
    reservationService.getReservationsForUser(ReservationsListComponent.USER_PLACEHOLDER).subscribe(reservations => {

      this.data = reservations.map(r =>
        r.dates.map(d =>
          new ReservationRow(
            r.id,
            r.owner.name,
            r.courseName,
            r.vmPool.shortName,
            r.machinesNumber,
            r.startTime,
            r.endTime,
            d,
          ))).reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);

      this.source.load(this.data);

    })
  }
}
