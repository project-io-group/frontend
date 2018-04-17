export class VMPool {
  private _reservations: {};
  private _id: number;
  private _shortName: string;
  private _displayName: string;
  private _maximumCount: number;
  private _enabled: boolean;
  private _description: string;


  constructor(reservations: {}, id: number, shortName: string, displayName: string,
              maximumCount: number, enable: boolean, description: string) {
    this._reservations = reservations;
    this._id = id;
    this._shortName = shortName;
    this._displayName = displayName;
    this._maximumCount = maximumCount;
    this._enabled = enable;
    this._description = description;
  }

  get reservations(): {} {
    return this._reservations;
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

  static fromJSON(json: any): VMPool {
    return new VMPool(json.reservations, json.id, json.shortName, json.displayName,
      json.maximumCount, json.json.enabled, json.description);
  }
}
