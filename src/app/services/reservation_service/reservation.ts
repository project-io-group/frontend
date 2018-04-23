export class Reservation {
  constructor(
    private _id: number,
    private _owner: User,
    private _courseName: string,
    private _vmPool: VMPoolShort,
    private _machinesNumber: number,
    private _dates: string[]) {
  }


  get id(): number {
    return this._id;
  }

  get owner(): User {
    return this._owner;
  }

  get courseName(): string {
    return this._courseName;
  }

  get vmPool(): VMPoolShort {
    return this._vmPool;
  }

  get machinesNumber(): number {
    return this._machinesNumber;
  }

  get dates(): string[] {
    return this._dates;
  }
}
