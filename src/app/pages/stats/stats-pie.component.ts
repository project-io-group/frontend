import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { StatsInterval, StatsService } from '../../services/stats/stats.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class StatsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  data: any;
  labels: any;
  current_data_subscription: Subscription;

  constructor(private theme: NbThemeService, private statsService: StatsService) {
    //TODO: Get real data
    this.current_data_subscription = this.statsService.getHoursUsageInInterval(new StatsInterval('02-02-2018', '03-03-2019'))
      .subscribe(data => {
        this.data = data;
        this.labels = data.map(stat => stat.name);
    })
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;


      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.labels,
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }


  //TODO: This should be called when interval submit button changes
  getStatsForNewInterval(): void {
    this.current_data_subscription.unsubscribe();
    this.current_data_subscription = this.statsService.getHoursUsageInInterval(new StatsInterval('newDatefrom', 'newDateTo'))
      .subscribe(data => {
        this.data = data;
        this.labels = data.map(stat => stat.name);
      })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.current_data_subscription.unsubscribe();
  }
}
