export class ReservationRow {

  constructor(
    private _id: number,
    private _owner: string,
    private _courseName: string,
    private _vmPool: string,
    private _machinesNumber: number,
    private _startTime: string,
    private _endTime: string,
    private _date: string) {
  }


  get id(): number {
    return this._id;
  }

  get owner(): string {
    return this._owner;
  }

  get courseName(): string {
    return this._courseName;
  }

  get vmPool(): string {
    return this._vmPool;
  }

  get machinesNumber(): number {
    return this._machinesNumber;
  }

  get startTime(): string {
    return this._startTime;
  }

  get endTime(): string {
    return this._endTime;
  }

  get date(): string {
    return this._date;
  }
}
