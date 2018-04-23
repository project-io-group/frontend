import { Injectable } from '@angular/core';
import { BackendServicesProxy } from '../remote/backend.services.proxy';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservationService {
  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient){
  }

  requestSingleReservation(reservationRequest: ReservationRequest): Observable<any> {
    return this.http.post(this.backendServicesProxy.createRequestURL('/reservations/single/create'), reservationRequest)
  }

  confirmSingleReservation(reservationId: number): Observable<any> {
    return this.http.post(this.backendServicesProxy.createRequestURL('/reservations/single/confirm'), {reservationId: reservationId})
  }

}


export class ReservationRequest {
  userId: number;
  vmPoolId: number;
  courseName: string;
  machinesCount: number;
  date: Date;

  constructor(userId: number, vmPoolId: number, courseName: string, machinesCount: number, date: Date) {
    this.userId = userId;
    this.vmPoolId = vmPoolId;
    this.courseName = courseName;
    this.machinesCount = machinesCount;
    this.date = date;
  }
}
