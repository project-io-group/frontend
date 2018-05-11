import { Component, AfterViewInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-basic-lines',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class StatsBasicLinesComponent implements AfterViewInit, OnDestroy, OnChanges {
  options: any = {};
  themeSubscription: any;
  private colors: any;
  private echarts: any;

  @Input()
  private data: any;
  @Input()
  private labels: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      this.echarts = config.variables.echarts;

      this.setOptions();
    });
  }

  ngOnChanges(): void {
    if (this.colors && this.data && this.echarts && this.labels) {
      this.setOptions();
    }
  }

  private setOptions() {
    this.options = {
      ackgroundColor: echarts.bg,
      color: [this.colors.warningLight, this.colors.infoLight, this.colors.dangerLight, this.colors.successLight, this.colors.primaryLight],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: this.echarts.tooltipBackgroundColor,
          },
        },
      },
      legend: {
        data: this.labels,
        textStyle: {
          color: this.echarts.textColor,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: Array.apply(0, Array(12)).map(function(x, y) { return (y + 1).toString() }),
        axisLine: {
          lineStyle: {
            color: this.echarts.axisLineColor,
          },
        },
        axisLabel: {
          textStyle: {
            color: this.echarts.textColor,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: this.echarts.axisLineColor,
          },
        },
        splitLine: {
          lineStyle: {
            color: this.echarts.splitLineColor,
          },
        },
        axisLabel: {
          textStyle: {
            color: this.echarts.textColor,
          },
        },
      },
      series: this.data,
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

export class BasicLinesData {
  name: string;
  type: string;
  data: number[];


  constructor(name: string, data: number[]) {
    this.name = name;
    this.type = 'line';
    this.data = data;
  }
}
