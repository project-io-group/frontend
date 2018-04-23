import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VMService } from '../../services/vm_service/vm_service';
import { CompleterData, CompleterService } from 'ng2-completer';
import { VMPool } from '../../services/vm_service/vm_pool';

import {
  ReservationRequest,
  ReservationService
} from '../../services/reservation_service/reservationService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../@theme/components/modal/modal.component';

@Component({
  selector: 'ngx-reservation-component',
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.scss'],
})
export class ReservationComponent {
  private form: FormGroup;

  private vmPoolCompleterData: CompleterData;
  private vmPools: VMPool[];

  private completerTouched: boolean = false;


  touchCompleter(): void {
    this.completerTouched = true;
  }

  constructor(private vmService: VMService, private reservationService: ReservationService, private modalService: NgbModal,
              private completerService: CompleterService, private formBuilder: FormBuilder) {
    this.vmPoolCompleterData = this.completerService.local(this.vmService.getVMPools().map(vmPools => this.vmPools = vmPools), "displayName", "displayName");

    this.form = this.formBuilder.group({
      courseName: new FormControl('', Validators.required),
      machinesCount: new FormControl('', Validators.compose([Validators.pattern("[0-9]+"), Validators.required])),
      vmPool: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      cyclic: new FormControl('', null),
      endDate: new FormControl('', null),
      interval: new FormControl('', null),
    });

    this.form.controls['cyclic'].valueChanges.subscribe(value => {
      if (value) {
        this.form.controls['endDate'].setValidators([Validators.required]);
        this.form.controls['interval'].setValidators([Validators.pattern("[0-9]+"), Validators.required]);
      } else {
        this.form.controls['endDate'].setValidators([]);
        this.form.controls['interval'].setValidators([]);
        this.form.controls['endDate'].clearValidators();
        this.form.controls['interval'].clearValidators();
      }
      this.form.controls['endDate'].updateValueAndValidity();
      this.form.controls['interval'].updateValueAndValidity();
    })


  }

  onSubmit(values) {
    if (this.form.valid) {
      let vmPoolId = this.vmPools.find(vmPool => vmPool.displayName == values.vmPool).id;

      this.reservationService.requestSingleReservation(new ReservationRequest(
        1, //TODO: UserService.getCurrentUser()
        vmPoolId,
        values.courseName,
        values.machinesCount,
        values.date)).subscribe(
          response => {
            const activeModal = this.modalService.open(ModalComponent, {size: 'sm', container: 'nb-layout'});
            activeModal.componentInstance.modalHeader = 'Confirm Reservation';
            activeModal.componentInstance.modalContent = 'Enetered date is available. Are You' +
              ' sure want to reserve this slot?';
            // TODO: Get reservation Id and confirm
            // activeModal.componentInstance.modalOnConfirm = () =>
            // this.reservationService.confirmSingleReservation(1)
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
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
}
