import {Component} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {VMPool} from '../../services/vm_service/vm_pool';
import {VMService} from '../../services/vm_service/vm_service';
import {FormControl} from '@angular/forms';

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
        filter: {
          type: 'list',
          config: {
            list: [
              {value: 'true', title: 'true'},
              {value: 'false', title: 'false'},
            ],
          },
        },
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };

  private data: VMPool[];
  keywordSearchControl: FormControl;

  source: LocalDataSource = new LocalDataSource();

  constructor(private vmService: VMService) {

    this.keywordSearchControl = new FormControl();
    this.keywordSearchControl.valueChanges
      .skip(2)
      .distinctUntilChanged()
      .debounceTime(1);

    this.vmService.getVMPools().subscribe(vmPools => {
      this.data = vmPools;
      this.source.load(this.data).then(() =>
        this.keywordSearchControl.valueChanges
          .subscribe(query => this.onKeywordSearch(query)));
    });
  }

  onKeywordSearch(query: any) {

    const keywords = query.split(',').map(k => k.toLocaleLowerCase());

    const dataFilteredByKeywords = this.data.filter(vmPool => {

      const columns = Object.values(vmPool).map(value =>
        value.toString().toLocaleLowerCase());

      return keywords.every(keyword =>
        columns.some(column =>
          column.includes(keyword)));

    });

    this.source.load(dataFilteredByKeywords);
  }
}
