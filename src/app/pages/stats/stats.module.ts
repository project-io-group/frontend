import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { StatsComponent } from './stats.component';
import { StatsAreaStackComponent } from './stats-area-stack.component';
import { StatsMultipleXaxisComponent } from './stats-multiple-xaxis.component';
import { StatsPieComponent } from './stats-pie.component';
import { StatsRadarComponent } from './stats-radar.component';


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
    StatsAreaStackComponent,
    StatsMultipleXaxisComponent,
    StatsPieComponent,
    StatsRadarComponent,
    StatsComponent,
  ],
})
export class StatsModule {
}
