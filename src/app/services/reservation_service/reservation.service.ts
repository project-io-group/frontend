import { Injectable } from '@angular/core';
import { BackendServicesProxy } from '../remote/backend.services.proxy';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation';

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

  getReservationsForUser(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      this.backendServicesProxy.createRequestURL('/reservations?userId=' + userId));
  }
  deleteReservation(reservationId: number, date: string): Observable<any> {
    return this.http.delete(this.backendServicesProxy
      .createRequestURL('/reservation/dates') + '?reservationId=' + reservationId + '&cancelledDates=' + date);
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
