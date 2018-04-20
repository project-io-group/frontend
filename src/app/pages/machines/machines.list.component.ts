import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { VMPool } from '../../services/vm_service/vm_pool';
import { VMService } from '../../services/vm_service/vm_service';

@Component({
  selector: 'ngx-machine-list',
  templateUrl: './machines.list.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MachinesListComponent {
  private data: VMPool[];
  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      displayName: {
        title: 'Pool Name',
        type: 'string',
      },
      maximumCount: {
        title: 'Machines Count',
        type: 'number',
      },
      enabled: {
        title: 'Enabled',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private vmService: VMService) {
    vmService.getVMPools().subscribe(vmPools => {
      this.data = vmPools;
      this.source.load(this.data);
    })
  }
}
