import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BackendServicesProxy } from '../remote/backend.services.proxy';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatsService {

  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  getHoursUsageInInterval(interval: StatsInterval): Observable<any[]> {
    return Observable.of([
      { value: 335, name: 'Germany' },
      { value: 310, name: 'France' },
      { value: 234, name: 'Canada' },
      { value: 135, name: 'Russia' },
      { value: 1548, name: 'USA' },
    ])
    // return this.http.get<any[]>(this.backendServicesProxy.createRequestURL('/stats?from=' + interval.from + '&to=' + interval.to))
  }
}

export class StatsInterval {
  private readonly _from: string;
  private readonly _to: string;

  constructor(from: string, to: string) {
    this._from = from;
    this._to = to;
  }

  get from(): string {
    return this._from;
  }

  get to(): string {
    return this._to;
  }
}
