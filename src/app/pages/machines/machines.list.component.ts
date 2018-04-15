import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { ColumnDefinitionBuilder } from '../common/ag-grid-tools/column-definition-builder';

@Component({
  selector: 'vmms-machine-list',
  templateUrl: './machines.list.html',
})
export class MachinesListComponent {
  private gridOptions: GridOptions;

  //TODO: Get real machines
  private machines = [
    {_poolName: "poolName1", _poolId: "poolIDq", _machinesCount: "12", _enabled: "Enabled", _description: "Description"},
    {_poolName: "poolName2", _poolId: "poolIDw", _machinesCount: "12", _enabled: "Enabled", _description: "Description"},
    {_poolName: "poolName3", _poolId: "poolIDe", _machinesCount: "12", _enabled: "Enabled", _description: "Description"},
    {_poolName: "poolName4", _poolId: "poolIDr", _machinesCount: "12", _enabled: "Enabled", _description: "Description"},
    {_poolName: "poolName5", _poolId: "poolIDt", _machinesCount: "12", _enabled: "Enabled", _description: "Description"},
    {_poolName: "poolName6", _poolId: "poolIDy", _machinesCount: "12", _enabled: "Enabled", _description: "Description"},
    ];

  constructor() {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },
      onGridSizeChanged: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      }
    };

    this.gridOptions.columnDefs = this.buildColumnDefinition();
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.suppressMovableColumns = true;
    this.gridOptions.suppressCellSelection = true;
    this.gridOptions.rowHeight = 45;
    this.gridOptions.pagination = true;
    this.gridOptions.paginationAutoPageSize = true;

  }

  private buildColumnDefinition() : Array<any> {
    let columnDefinitions: any[] = [];

    columnDefinitions.push(new ColumnDefinitionBuilder().setHeaderName('Pool Name')
        .setFieldId('_poolName')
      .setWidth(250)
      .setMinWidth(100)
      .setSort('asc')
      .setSortingOrder(['asc', 'desc'])
      .build());

    columnDefinitions.push(new ColumnDefinitionBuilder().setHeaderName('Pool ID')
      .setFieldId('_poolId')
      .setWidth(250)
      .setMinWidth(100)
      .setSortingOrder(['asc', 'desc'])
      .build());

    columnDefinitions.push(new ColumnDefinitionBuilder().setHeaderName('Number of machines')
      .setFieldId('_machinesCount')
      .setWidth(250)
      .setMinWidth(100)
      .setSortingOrder(['asc', 'desc'])
      .build());

    columnDefinitions.push(new ColumnDefinitionBuilder().setHeaderName('Enabled')
      .setFieldId('_enabled')
      .setWidth(250)
      .setMinWidth(70)
      .setSortingOrder(['asc', 'desc'])
      .build());

    columnDefinitions.push(new ColumnDefinitionBuilder().setHeaderName('Description')
      .setFieldId('_description')
      .setWidth(250)
      .setMinWidth(70)
      .setSortingOrder(['asc', 'desc'])
      .build());


    columnDefinitions.forEach(col => {
      col.headerTooltip = 'sort by column';
    });

    return columnDefinitions;
  }
}
