import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VMService} from '../../services/vm_service/vm_service';
import {CompleterData, CompleterService} from 'ng2-completer';
import {VMPool} from '../../services/vm_service/vm_pool';

import {ReservationRequestDto, ReservationService} from '../../services/reservation_service/reservationService';
import {AlertService} from '../../services/UI_tools/alertService';
import {UserService} from '../../@core/data/users.service';

const moment = require('moment');


class TimingsValidator {
  public static validate(firstField, secondField) {

    return (c: FormGroup) => {

      return (c.controls && moment(c.controls[firstField].value).isBefore(moment(c.controls[secondField].value))) ? null : {
        timingsBefore: {
          valid: false,
        },
      };
    };
  }
}


@Component({
  selector: 'ngx-reservation-component',
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.scss'],
})

export class ReservationComponent {
  form: FormGroup;

  vmPoolCompleterData: CompleterData;
  vmPools: VMPool[];

  dates;

  timings: FormGroup;

  completerTouched: boolean = false;
  endDateIsLast: boolean = true;

  user: any;

  touchCompleter(): void {
    this.completerTouched = true;
  }

  constructor(private vmService: VMService,
              private reservationService: ReservationService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private userService: UserService) {
    this.vmPoolCompleterData = this.completerService
      .local(this.vmService.getVMPools().map(vmPools => this.vmPools = vmPools), 'displayName', 'displayName');

    this.form = this.formBuilder.group({
      courseName: new FormControl('', Validators.required),
      machinesNumber: new FormControl('', Validators.compose([Validators.pattern('[0-9]+'), Validators.required])),
      vmPool: new FormControl('', Validators.required),
      timings: this.formBuilder.group({
        startTime: new FormControl('', Validators.required),
        endTime: new FormControl('', Validators.required),
      }, {validator: TimingsValidator.validate('startTime', 'endTime')}),
      dates: this.formBuilder.array([this.createDate()]),
      cyclic: new FormControl('', null),
      endDate: new FormControl('', null),
      interval: new FormControl('', null),
    });

    this.timings = <FormGroup>this.form.controls['timings'];

    this.form.controls['cyclic'].valueChanges.subscribe(value => {
      if (value) {
        this.form.controls['endDate'].setValidators([Validators.required]);
        this.form.controls['interval'].setValidators([Validators.pattern('[0-9]+'), Validators.required]);
      } else {
        this.form.controls['endDate'].setValidators([]);
        this.form.controls['interval'].setValidators([]);
        this.form.controls['endDate'].clearValidators();
        this.form.controls['interval'].clearValidators();
      }
      this.form.controls['endDate'].updateValueAndValidity();
      this.form.controls['interval'].updateValueAndValidity();
    });

    this.form.controls['dates'].valueChanges.subscribe(dates => {
      this.endDateIsLast = !!dates.every(date => moment(date).isBefore(moment(this.form.value.endDate)));
    });
    this.form.controls['endDate'].valueChanges.subscribe(endDate => {
      this.endDateIsLast = this.form.value.dates.every(date => moment(date).isBefore(moment(endDate)));
    });


    this.timings.controls['startTime'].valueChanges.subscribe(startDate => {
      this.timings.controls['endTime'].setValue(moment(startDate).add('1', 'h').add('30', 'm').toDate());
    });

    this.userService.currentUser.subscribe(currentUser => this.user = currentUser)
  }

  onSubmit(values) {
    if (this.form.valid) {
      const pool = this.vmPools.find(vmPool => vmPool.displayName === values.vmPool);
      const interval_dates = [];
      if (values.interval) {
        values.dates.forEach(date => {
          const curr_date = moment(date).add(values.interval, 'd');
          const end_date = moment(values.endDate);
          while (!end_date.isBefore(curr_date)) {
            interval_dates.push(curr_date.format('YYYY-MM-DD'));
            curr_date.add(values.interval, 'd')
          }
        });
      }
      const all_dates = new Set<string>(values.dates.map(date => moment(date).format('YYYY-MM-DD')).concat(interval_dates));
      const start_time = moment(values.timings.startTime).format('HH:mm');
      const end_time = moment(values.timings.endTime).format('HH:mm');

      this.reservationService.requestReservation(new ReservationRequestDto(
        this.user,
        pool.id,
        values.courseName,
        values.machinesNumber,
        Array.from(all_dates.values()),
        start_time,
        end_time)).subscribe(
        response => {
          let modalContent = '';
          if (response.daysNotReserved.length === all_dates.size) {
            modalContent = 'Machines are not available on selected dates, try using different' +
              ' pool, minimizing number of machines or contact the admin'
          } else if (response.daysNotReserved.length > 0) {
            modalContent = 'Selected Virtual Machine Pools are' +
              ' not available on selected date(s): ' + response.daysNotReserved.map(date => moment(date).format('YYYY-MM-DD')).join(', ') +
              '. Are You sure want to reserve all others except mentioned above?';
          } else {
            modalContent = 'Selected date is available. Are you' +
              ' sure you want to reserve this slot?';
          }
          if (!pool.enabled) {
            modalContent += '\nSelected VM pool is currently disabled.' +
              ' Request to enable it will be automatically sent to admin after confirming reservation.'
          }
          this.alertService.newSmallConfirmModal('Confirm Reservation', modalContent,
            () => {
              this.reservationService.confirmReservation(response.id)
                .subscribe(
                  () => this.form.reset(),
                  () => this.alertService.newSmallAcknowledgeModal('Error', 'Error confirming reservation', null));
            },
            () => {
              return this.reservationService.cancelReservation(response.id).subscribe(null);
            });
        });

    } else {
      ReservationComponent.markFormGroupTouched(this.form);
      this.touchCompleter();
    }
  }

  public static markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        if (Array.isArray(control.controls)) {
          control.controls.forEach(c => c.markAsTouched());
        } else {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      }
    });
  }

  private createDate() {
    return new FormControl('', Validators.required)
  }

  removeDate(i: number): void {
    this.dates = this.form.get('dates') as FormArray;
    this.dates.removeAt(i);
  }

  addDate(): void {
    this.dates = this.form.get('dates') as FormArray;
    this.dates.push(this.createDate());
  }

  getDates() {
    return this.form.get('dates')['controls'];
  }
}
