export type SORTING = 'asc' | 'desc' | 'null';
export type COLUMN_GROUP_SHOW = 'open' | 'closed';

export class ColumnDefinitionBuilder {

  private headerName: string;
  private fieldId: any;
  private width: number;
  private minWidth: number;
  private maxWidth: number;
  private sort: SORTING;
  private sortingOrder: SORTING[];
  private suppressFilter: boolean;
  private suppressSorting: boolean;
  private cellRendererFramework: any;
  private filterFramework: any;
  private filter: string;
  private headerTooltip: string;
  private columnGroupShow: COLUMN_GROUP_SHOW;
  private headerGroupComponentFramework: any;
  private children: any[];
  private pin: boolean;
  private checkboxSelection: boolean;
  private headerCheckboxSelection: boolean;


  public build(): any {
    return {
      headerName: this.headerName,
      field: this.fieldId,
      width: this.width,
      minWidth: this.minWidth,
      sort: this.sort,
      sortingOrder: this.sortingOrder,
      suppressFilter: this.suppressFilter,
      suppressSorting: this.suppressSorting,
      cellRendererFramework: this.cellRendererFramework,
      filterFramework: this.filterFramework,
      filter: this.filter,
      columnGroupShow: this.columnGroupShow,
      headerGroupComponentFramework: this.headerGroupComponentFramework,
      children: this.children,
      pinned: this.pin,
      checkboxSelection: this.checkboxSelection,
      headerCheckboxSelection: this.headerCheckboxSelection,
    };
  }

  public setHeaderCheckboxSelection(selectAllButtonEnabled: boolean): ColumnDefinitionBuilder {
    this.headerCheckboxSelection = selectAllButtonEnabled;
    return this;
  }
  public setCheckbox(isCheckBox: boolean): ColumnDefinitionBuilder {
    this.checkboxSelection = isCheckBox;
    return this;
  }
  public setColumnPinned(pinned: boolean): ColumnDefinitionBuilder {
    this.pin = pinned;
    return this;
  }

  public setHeaderName(name: string): ColumnDefinitionBuilder {
    this.headerName = name;
    return this;
  }

  public setFieldId(id: any): ColumnDefinitionBuilder {
    this.fieldId = id;
    return this;
  }

  public setWidth(width: number): ColumnDefinitionBuilder {
    this.width = width;
    return this;
  }

  public setMinWidth(minWidth: number): ColumnDefinitionBuilder {
    this.minWidth = minWidth;
    return this;
  }

  public setMaxWidth(maxWidth: number): ColumnDefinitionBuilder {
    this.maxWidth = maxWidth;
    return this;
  }

  public setSort(sort: SORTING): ColumnDefinitionBuilder {
    this.sort = sort;
    return this;
  }

  public setSortingOrder(sort: SORTING[]): ColumnDefinitionBuilder {
    this.sortingOrder = sort;
    return this;
  }

  public setSuppressFilter(suppress: boolean): ColumnDefinitionBuilder {
    this.suppressFilter = suppress;
    return this;
  }

  public setSuppressSorting(suppress: boolean): ColumnDefinitionBuilder {
    this.suppressSorting = suppress;
    return this;
  }

  public setCellRenderFramework(framework: any): ColumnDefinitionBuilder {
    this.cellRendererFramework = framework;
    return this;
  }

  public setFilterFramework(framework: any): ColumnDefinitionBuilder {
    this.filterFramework = framework;
    return this;
  }

  public setHeaderTooltip(headerTooltip: string): ColumnDefinitionBuilder {
    this.headerTooltip = headerTooltip;
    return this;
  }

  public setColumnGroupShow(columnGroupShow: COLUMN_GROUP_SHOW): ColumnDefinitionBuilder {
    this.columnGroupShow = columnGroupShow;
    return this;
  }

  public setHeaderGroupComponentFramework(framework: any): ColumnDefinitionBuilder {
    this.headerGroupComponentFramework = framework;
    return this;
  }

  public setChildren(children: any[]): ColumnDefinitionBuilder {
    this.children = children;
    return this;
  }

  public setFilter(filter: string): ColumnDefinitionBuilder {
    this.filter = filter;
    return this;
  }

}
