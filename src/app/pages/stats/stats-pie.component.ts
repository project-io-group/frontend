import { AfterViewInit, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeVariable } from '@nebular/theme/services/js-themes/theme.options';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class StatsPieComponent implements AfterViewInit, OnDestroy, OnChanges {
  options: any = {};
  themeSubscription: any;

  @Input()
  data: any;

  @Input()
  labels: any;

  private colors: NbJSThemeVariable | undefined;
  private echarts: any;

  constructor(private theme: NbThemeService) {
  }

  ngOnChanges() {
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
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.labels,
        textStyle: {
          color: this.echarts.textColor,
        },
      },
      series: [
        {
          name: 'Countries',
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: this.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: this.echarts.itemHoverShadowColor,
            },
          },
          label: {
            normal: {
              textStyle: {
                color: this.echarts.textColor,
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: this.echarts.axisLineColor,
              },
            },
          },
        },
      ],
    };
  }
}
