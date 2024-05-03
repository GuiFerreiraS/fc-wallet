import Balance from "../entity/balance.entity";

export default interface BalanceGateway {
  add(balance: Balance): Promise<void>;
  update(balance: Balance): Promise<void>;
  findByAccountID(accountId: string): Promise<Balance>;
}
