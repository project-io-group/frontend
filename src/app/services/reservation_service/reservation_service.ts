import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Reservation} from './reservation';
import {BackendServicesProxy} from '../remote/backend.services.proxy';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ReservationService {

  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.backendServicesProxy.createRequestURL('/reservations/all/'))
  }
}
