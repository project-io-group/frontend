class VMPoolShort {
  constructor(
    private _id: number,
    private _shortName: string,
    private _displayName: string,
    private  _maximumCount: number,
    private  _enabled: boolean,
    private _description: string,
  ) {
  }


  get id(): number {
    return this._id;
  }

  get shortName(): string {
    return this._shortName;
  }

  get displayName(): string {
    return this._displayName;
  }

  get maximumCount(): number {
    return this._maximumCount;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  get description(): string {
    return this._description;
  }
}
