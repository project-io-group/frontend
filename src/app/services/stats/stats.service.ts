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

  getHoursUsageInInterval(interval: StatsInterval): Observable<StatsDataPoint[]> {

    // TODO: GET REAL DATA
    if (moment(interval.from).format('YYYY-MM-DD') == '2018-01-01') {
      return Observable.of([
        { value: 335, name: 'Germany' },
        { value: 310, name: 'France' },
        { value: 234, name: 'Canada' },
        { value: 135, name: 'Russia' },
        { value: 1548, name: 'USA' },
      ])
    } else {
      return Observable.of([
        { value: 20, name: 'Germany' },
        { value: 150, name: 'France' },
        { value: 50, name: 'Canada' },
        { value: 31, name: 'Russia' },
        { value: 15, name: 'USA' },
      ])
    }
    // TODO:
    // return this.http.get<any[]>(this.backendServicesProxy.createRequestURL('/stats/hourly?' + interval.getAsQueryParams()))
  }

  getWeekdaysHourlyUsageInInterval(interval: StatsInterval): Observable<StatsDataPoints[]> {
    // TODO: GET REAL DATA
    if (moment(interval.from).format('YYYY-MM-DD') == '2018-01-01') {
      return Observable.of([
        new StatsDataPoints('Sabre Virtual Machine', [120, 132, 101, 134, 90, 230, 210]),
        new StatsDataPoints('Statystyka Virtual Machine', [220, 182, 191, 234, 290, 330, 310]),
        new StatsDataPoints('Java Machine', [150, 232, 201, 154, 190, 330, 410]),
        new StatsDataPoints('Python Intellij Machine', [320, 332, 301, 334, 390, 330, 320]),
        new StatsDataPoints('Super Fajna Maszyna', [820, 932, 901, 934, 1290, 1330, 1320]),
        new StatsDataPoints('Lepsza Maszyna', [150, 190, 330, 410, 232, 201, 154]),
      ])
    } else {
      return Observable.of([
        new StatsDataPoints('Sabre Virtual Machine', [120, 132, 101, 134, 90, 230, 210]),
        new StatsDataPoints('Statystyka Virtual Machine', [820, 932, 901, 934, 1290, 1330, 1320]),
        new StatsDataPoints('Java Machine', [220, 182, 191, 234, 290, 330, 310]),
        new StatsDataPoints('Python Intellij Machine', [320, 332, 301, 334, 390, 330, 320]),
        new StatsDataPoints('Super Fajna Maszyna', [150, 232, 201, 154, 190, 330, 410]),
        new StatsDataPoints('Lepsza Maszyna', [150, 190, 330, 410, 232, 201, 154]),
      ])
    }
    //TODO:
    // return
    // this.http.get<StatsDataPoints[]>(this.backendServicesProxy.createRequestURL('/stats/weekdays?' + interval.getAsQueryParams()))
  }


  getMonthsHourlyUsageInInterval(interval: StatsInterval): Observable<StatsDataPoints[]> {
    if (moment(interval.from).format('YYYY-MM-DD') == '2018-01-01') {
        return Observable.of([
          new StatsDataPoints('Sabre Virtual Machine', [120, 132, 101, 134, 90, 230, 210,320,198,250,110,520]),
          new StatsDataPoints('Statystyka Virtual Machine', [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]),
          new StatsDataPoints('Java Machine', [150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 410, 220]),
          new StatsDataPoints('Python Intellij Machine', [320, 332, 301, 334, 390, 330, 320, 301, 334, 390, 330, 320]),
          new StatsDataPoints('Super Fajna Maszyna', [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320]),
          new StatsDataPoints('Lepsza Maszyna', [150, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232, 420]),
        ])
      } else {
        return Observable.of([
          new StatsDataPoints('Sabre Virtual Machine', [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320]),
          new StatsDataPoints('Statystyka Virtual Machine',[150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 410, 220]),
          new StatsDataPoints('Java Machine', [150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 410, 220]),
          new StatsDataPoints('Python Intellij Machine', [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320]),
          new StatsDataPoints('Super Fajna Maszyna', [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]),
          new StatsDataPoints('Lepsza Maszyna', [150, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232, 420]),
        ])
      }

    //TODO:
    // return this.http.get<StatsDataPoints>(this.backendServicesProxy.createRequestURL('stats/monthly?' + interval.getAsQueryParams()));
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
