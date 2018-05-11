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

  private current_areastack_data_subscription: Subscription;
  private areaStackData: any[];
  private areaStackLabels: string[];
  private areaStackInterval: any;
  private current_basiclines_data_subscription: Subscription;
  private basicLinesInterval: any[] = Array(2);
  private basicLinesData: BasicLinesData[];
  private basicLinesLabels: string[];

  constructor(private statsService: StatsService) {

  }

  ngOnInit(): void {
    this.current_pie_data_subscription = this.statsService.getHoursUsageInInterval(new StatsInterval(new Date(0), new Date()))
      .subscribe(data => {
        this.pieData = data;
        this.pieLabels = data.map(stat => stat.name);
      });

    this.current_areastack_data_subscription = this.statsService.getWeekdaysHourlyUsageInInterval(new StatsInterval(new Date(0), new Date()))
      .subscribe(data => {
        this.areaStackData = data.map(machineData => new AreaStackData(machineData.name, machineData.dataPoints));
        this.areaStackLabels = data.map(machineData => machineData.name);
      });

    this.current_basiclines_data_subscription = this.statsService.getMonthsHourlyUsageInInterval(new StatsInterval(new Date(0), new Date()))
      .subscribe(data => {
        this.basicLinesData = data.map(machineData => new BasicLinesData(machineData.name, machineData.dataPoints));
        this.basicLinesLabels = data.map(machineData => machineData.name);
      })
  }

  getPieStatsForNewInterval(): void {
    this.current_pie_data_subscription.unsubscribe();
    if(this.pieInterval) {
      this.current_pie_data_subscription = this.statsService.getHoursUsageInInterval(new StatsInterval(this.pieInterval[0], this.pieInterval[1]))
        .subscribe(data => {
          this.pieData = data;
          this.pieLabels = data.map(stat => stat.name);
        })
    }
  }

  getAreaStackStatsForNewInterval(): void {
    this.current_areastack_data_subscription.unsubscribe();
    if(this.areaStackInterval) {
      this.current_areastack_data_subscription = this.statsService.getWeekdaysHourlyUsageInInterval(new StatsInterval(this.areaStackInterval[0],this.areaStackInterval[1]))
        .subscribe(data => {
          this.areaStackData = data.map(machineData => new AreaStackData(machineData.name, machineData.dataPoints));
          this.areaStackLabels = data.map(machineData => machineData.name);
        })
    }
  }

  getBasiLinesMonthlyStatsForNewInterval(): void {
    this.current_basiclines_data_subscription.unsubscribe();
    if(this.basicLinesInterval) {
        this.current_basiclines_data_subscription = this.statsService.getMonthsHourlyUsageInInterval(new StatsInterval(moment(this.basicLinesInterval[0]).toDate(), moment(this.basicLinesInterval[1]).toDate()))
          .subscribe(data => {
            this.basicLinesData = data.map(machineData => new BasicLinesData(machineData.name, machineData.dataPoints));
            this.basicLinesLabels = data.map(machineData => machineData.name);
          })
    }
  }



  ngOnDestroy(): void {
    this.current_pie_data_subscription.unsubscribe();
    this.current_basiclines_data_subscription.unsubscribe();
    this.current_areastack_data_subscription.unsubscribe();
  }
}
