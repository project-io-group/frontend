import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ReservationRow} from './reservation_row';
import {HttpErrorResponse} from '@angular/common/http';
import { AlertService } from '../../services/UI_tools/alertService';
import { ReservationService } from '../../services/reservation_service/reservation.service';

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
  static USER_PLACEHOLDER = 3;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
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
  private _reservationService: ReservationService;

  constructor(reservationService: ReservationService, private alertService: AlertService) {
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
    this._reservationService = reservationService;
  }

  deleteRecord(event): void {
    this.alertService.newSmallConfirmModal('Delete Confirmation', 'Are you sure you want to delete?',
      () => {
        this._reservationService.deleteReservation(event.data.id, event.data.date).subscribe(
          res => {
            event.confirm.resolve(event.source.data);
          },
          (err: HttpErrorResponse) => {
            this.alertService.newSmallAcknowledgeModal('Error', 'Error occured during delete,' +
              ' please try again later', null);
          });
      },
      () => {
        event.confirm.reject();
      });
  }
}
