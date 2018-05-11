import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-area-stack',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class StatsAreaStackComponent implements AfterViewInit, OnDestroy, OnChanges {
  options: any = {};
  themeSubscription: any;

  @Input()
  data: AreaStackData[];
  @Input()
  labels: string[];
  private colors: any;
  private echarts: any;

  constructor(private theme: NbThemeService) {
  }


  ngOnChanges(): void {
    if (this.colors && this.data && this.echarts && this.labels) {
      this.setOptions();
    }
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.echarts = config.variables.echarts;
      this.setOptions();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private setOptions() {
    this.options = {
      backgroundColor: this.echarts.bg,
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
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          axisTick: {
            alignWithLabel: true,
          },
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
      ],
      yAxis: [
        {
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
      ],
      series: this.data,
    };
  }
}

export class AreaStackData {
  name: string;
  type: string;
  stack: string;
  areaStyle: any;
  data: number[];

  constructor(name: string, data: number[]) {
    this.name = name;
    this.data = data;
    this.type = 'line';
    this.areaStyle =  { normal: { opacity: echarts.areaOpacity } };
    this.stack = 'Total amount';
  }
}
