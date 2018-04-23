class User {
  constructor(
    private _id: number,
    private _name: string,
    private _admin: boolean,
  ) {
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get admin(): boolean {
    return this._admin;
  }
}
