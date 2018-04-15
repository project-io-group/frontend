import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { MachinesListComponent } from './machines.list.component';
import { AgGridModule } from 'ag-grid-angular';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    AgGridModule.withComponents([]),
    Ng2SmartTableModule,
  ],
  declarations: [
    MachinesListComponent,
  ],
})
export class MachinesListModule {
}
