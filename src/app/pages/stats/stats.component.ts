import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatsInterval, StatsService } from '../../services/stats/stats.service';
import { Subscription } from 'rxjs/Subscription';
import { AreaStackData } from './stats-area-stack.component';
import { BasicLinesData } from './stats-basic-lines.component';

const moment = require('moment');

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./stats.component.scss'],
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit, OnDestroy {

  pieData: any;
  pieLabels: string[];
  current_pie_data_subscription: Subscription;
  pieInterval: any;
  pieShowUnused: boolean = true;
  pieIncludeDisabled: boolean = false;

  current_areastack_data_subscription: Subscription;
  areaStackData: any[];
  areaStackLabels: string[];
  areaStackInterval: any;
  areaShowUnused: boolean = true;
  areaIncludeDisabled: boolean = false;

  current_basiclines_data_subscription: Subscription;
  basicLinesInterval: any[] = Array(2);
  basicLinesData: BasicLinesData[];
  basicLinesLabels: string[];
  basicLinesShowUnused: boolean = true;
  basicLinesIncludeDisabled: boolean = false;


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
