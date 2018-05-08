import { Injectable } from '@angular/core';
import { BackendServicesProxy } from '../remote/backend.services.proxy';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservationService {
  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  requestReservation(reservationRequestDto: ReservationRequestDto): Observable<any> {
    return this.http.post(this.backendServicesProxy.createRequestURL('/reservation'), reservationRequestDto)
  }

  confirmReservation(reservationId: number): Observable<any> {
    return this.http.put(this.backendServicesProxy.createRequestURL('/reservation/confirm'), reservationId)
  }

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.delete(this.backendServicesProxy.createRequestURL('/reservation/cancel') + '?reservationId=' + reservationId)
  }

}


export class ReservationRequestDto {
  userId: number;
  vmPoolId: number;
  courseName: string;
  machinesNumber: number;
  dates: string[];
  startTime: string;
  endTime: string;

  constructor(userId: number, vmPoolId: number, courseName: string, machinesNumber: number,
              dates: string[], startTime: string, endTime: string) {
    this.userId = userId;
    this.vmPoolId = vmPoolId;
    this.courseName = courseName;
    this.machinesNumber = machinesNumber;
    this.dates = dates;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
