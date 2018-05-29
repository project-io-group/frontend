import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatsInterval, StatsService } from '../../services/stats/stats.service';
import { Subscription } from 'rxjs/Subscription';
import { AreaStackData } from './stats-area-stack.component';
import { BasicLinesData } from './stats-basic-lines.component';
import moment = require('moment');

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./stats.component.scss'],
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit, OnDestroy {

  private pieData: any;
  private pieLabels: string[];
  private current_pie_data_subscription: Subscription;
  private pieInterval: any;
  private pieShowUnused: boolean = true;
  private pieIncludeDisabled: boolean = false;

  private current_areastack_data_subscription: Subscription;
  private areaStackData: any[];
  private areaStackLabels: string[];
  private areaStackInterval: any;
  private areaShowUnused: boolean = true;
  private areaIncludeDisabled: boolean = false;

  private current_basiclines_data_subscription: Subscription;
  private basicLinesInterval: any[] = Array(2);
  private basicLinesData: BasicLinesData[];
  private basicLinesLabels: string[];
  private basicLinesShowUnused: boolean = true;
  private basicLinesIncludeDisabled: boolean = false;


  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.getPieStatsForNewInterval();
    this.getAreaStackStatsForNewInterval();
    this.getBasiLinesMonthlyStatsForNewInterval();
  }

  getPieStatsForNewInterval(): void {
    if (this.current_pie_data_subscription) {
      this.current_pie_data_subscription.unsubscribe();
    }
    if (this.pieInterval) {
      this.current_pie_data_subscription =
        this.updatePieData(new StatsInterval(this.pieInterval[0], this.pieInterval[1]),
          this.pieIncludeDisabled, this.pieShowUnused)
    } else {
      this.current_pie_data_subscription =
        this.updatePieData(new StatsInterval(new Date(0), new Date()),
          this.pieIncludeDisabled, this.pieShowUnused)
    }
  }

  getAreaStackStatsForNewInterval(): void {
    if (this.current_areastack_data_subscription) {
      this.current_areastack_data_subscription.unsubscribe();
    }
    if (this.areaStackInterval) {
      this.current_areastack_data_subscription =
        this.updateAreaStackData(new StatsInterval(this.areaStackInterval[0], this.areaStackInterval[1]),
          this.areaIncludeDisabled, this.areaShowUnused)
    } else {
      this.current_areastack_data_subscription =
        this.updateAreaStackData(new StatsInterval(new Date(0), new Date()),
          this.areaIncludeDisabled, this.areaShowUnused)
    }
  }

  getBasiLinesMonthlyStatsForNewInterval(): void {
    if (this.current_basiclines_data_subscription) {
      this.current_basiclines_data_subscription.unsubscribe();
    }
    if (this.basicLinesInterval) {
      this.current_basiclines_data_subscription =
        this.updateBasicLinesData(new StatsInterval(moment(this.basicLinesInterval[0]).toDate(),
          moment(this.basicLinesInterval[1]).toDate()), this.basicLinesIncludeDisabled, this.basicLinesShowUnused)
    } else {
      this.current_basiclines_data_subscription =
        this.updateBasicLinesData(new StatsInterval(new Date(0), new Date()), this.basicLinesIncludeDisabled, this.basicLinesShowUnused)
    }
  }

  private updateBasicLinesData(statsInterval: StatsInterval, includeDisabled: boolean, showUnused: boolean) {
    return this.statsService
      .getMonthsHourlyUsageInInterval
      (statsInterval, includeDisabled)
      .subscribe(data => {
        if (!showUnused) {
          data = data.filter(stat => !stat.dataPoints.every(val => val === 0));
        }
        this.basicLinesData = data.map(machineData => new BasicLinesData(machineData.name, machineData.dataPoints));
        this.basicLinesLabels = data.map(machineData => machineData.name);
      });
  }

  private updatePieData(statsInterval: StatsInterval, includeDisabled: boolean, showUnused: boolean) {
    return this.statsService
      .getHoursUsageInInterval(statsInterval, includeDisabled)
      .subscribe(data => {
        if (!showUnused) {
          data = data.filter(stat => stat.value !== 0);
        }
        this.pieData = data;
        this.pieLabels = data.map(stat => stat.name);
      });
  }

  private updateAreaStackData(statsInterval: StatsInterval, includeDisabled: boolean,  showUnused: boolean): Subscription {
    return this.statsService
      .getWeekdaysHourlyUsageInInterval(statsInterval, includeDisabled)
      .subscribe(data => {
        if (!showUnused) {
          data = data.filter(stat => !stat.dataPoints.every(val => val === 0));
        }
        this.areaStackData = data.map(machineData => new AreaStackData(machineData.name, machineData.dataPoints));
        this.areaStackLabels = data.map(machineData => machineData.name);
      })
  }



  ngOnDestroy(): void {
    this.current_pie_data_subscription.unsubscribe();
    this.current_basiclines_data_subscription.unsubscribe();
    this.current_areastack_data_subscription.unsubscribe();
  }
}
