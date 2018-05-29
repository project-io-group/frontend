import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BackendServicesProxy } from '../remote/backend.services.proxy';
import { HttpClient } from '@angular/common/http';
import moment = require('moment');
import { AppConfig } from '../../app.config';

@Injectable()
export class StatsService {

  constructor(private backendServicesProxy: BackendServicesProxy, private http: HttpClient) {
  }

  getHoursUsageInInterval(interval: StatsInterval, includeDisabled: boolean): Observable<StatsDataPoint[]> {
    return this.http.get<any[]>(this.backendServicesProxy
      .createRequestURL('/stats/hourly?' + interval.getAsQueryParams() + '&includeDisabled=' + includeDisabled))
  }

  getWeekdaysHourlyUsageInInterval(interval: StatsInterval, includeDisabled: boolean): Observable<StatsDataPoints[]> {
    return this.http.get<StatsDataPoints[]>(this.backendServicesProxy
      .createRequestURL('/stats/weekdays?' + interval.getAsQueryParams() + '&includeDisabled=' + includeDisabled))
  }


  getMonthsHourlyUsageInInterval(interval: StatsInterval, includeDisabled: boolean): Observable<StatsDataPoints[]> {
    return this.http.get<StatsDataPoints[]>(this.backendServicesProxy
      .createRequestURL('/stats/monthly?' + interval.getAsQueryParams() + '&includeDisabled=' + includeDisabled));
  }
}


export class StatsInterval {
  private readonly _from: Date;
  private readonly _to: Date;

  constructor(from: Date, to: Date) {
    this._from = from;
    this._to = to;
  }

  get from(): Date {
    return this._from;
  }

  get to(): Date {
    return this._to;
  }

  getAsQueryParams(): string {
    return 'from=' + moment(this.from).format(AppConfig.DATE_FORMAT) + '&to=' + moment(this.to).format(AppConfig.DATE_FORMAT);
  }
}


export class StatsDataPoint {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class StatsDataPoints {
  name: string;
  dataPoints: number[];


  constructor(name: string, weekDaysData: number[]) {
    this.name = name;
    this.dataPoints = weekDaysData;
  }
}
