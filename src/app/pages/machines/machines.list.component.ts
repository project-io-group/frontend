import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

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

  settings = {
    actions: false,
    columns: {
      _poolName: {
        title: 'Pool Name',
        type: 'string',
      },
      _poolId: {
        title: 'Pool ID',
        type: 'string',
      },
      _machinesCount: {
        title: 'Machines Count',
        type: 'number',
      },
      _enabled: {
        title: 'Enabled',
        type: 'string',
      },
      _description: {
        title: 'Description',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor() {
    const data = [
    {_poolName: 'poolName1', _poolId: 'poolIDq', _machinesCount: 60, _enabled: 'Enabled',
      _description: 'Description'},
    {_poolName: 'poolName2', _poolId: 'poolIDw', _machinesCount: 20, _enabled: 'Enabled',
      _description: 'Description'},
    {_poolName: 'poolName3', _poolId: 'poolIDe', _machinesCount: 12, _enabled: 'Disabled',
      _description: 'Description'},
    {_poolName: 'poolName4', _poolId: 'poolIDr', _machinesCount: 5, _enabled: 'Disabled',
      _description: 'Description'},
    {_poolName: 'poolName5', _poolId: 'poolIDt', _machinesCount: 46, _enabled: 'Enabled',
      _description: 'Description'},
    {_poolName: 'poolName6', _poolId: 'poolIDy', _machinesCount: 25, _enabled: 'Enabled',
      _description: 'Description'},
  ];
    this.source.load(data);
  }
}
