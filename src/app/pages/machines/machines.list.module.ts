import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { MachinesListComponent } from './machines.list.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    ThemeModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    MachinesListComponent
  ]
})
export class MachinesListModule {
}
