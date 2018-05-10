import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EchartsComponent } from './echarts.component';
import { EchartsAreaStackComponent } from './echarts-area-stack.component';
import { EchartsMultipleXaxisComponent } from './echarts-multiple-xaxis.component';
import { EchartsPieComponent } from './echarts-pie.component';
import { EchartsRadarComponent } from './echarts-radar.component';


@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    Ng2CompleterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxEchartsModule,
  ],
  declarations: [
    EchartsAreaStackComponent,
    EchartsMultipleXaxisComponent,
    EchartsPieComponent,
    EchartsRadarComponent,
    EchartsComponent,
  ],
})
export class StatsModule {
}
