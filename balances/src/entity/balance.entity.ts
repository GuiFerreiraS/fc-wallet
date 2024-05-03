import { v4 as uuid } from "uuid";

interface BalanceProps {
  id?: string;
  accountId: string;
  balance: number;
  updatedAt: Date;
}

export default class Balance {
  private _id: string;
  private _accountId: string;
  private _balance: number;
  private _updatedAt: Date;

  constructor(props: BalanceProps) {
    this._id = props.id || uuid();
    this._accountId = props.accountId;
    this._balance = props.balance;
    this._updatedAt = props.updatedAt;

    this.validate();
  }

  validate() {
    if (!this._accountId || this._accountId.length === 0) {
      throw new Error("Account id is required");
    }
  }

  get id() {
    return this._id;
  }

  get accountId() {
    return this._accountId;
  }

  get balance() {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
