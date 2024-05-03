import Balance from "../entity/balance.entity";
import BalanceGateway from "../gateway/balance.gateway";
import { BalanceModel } from "./balance.model";

export default class BalanceRepository implements BalanceGateway {
  async add(balance: Balance): Promise<void> {
    await BalanceModel.create({
      id: balance.id,
      accountId: balance.accountId,
      balance: balance.balance,
      updatedAt: balance.updatedAt,
    });
  }

  async update(balance: Balance): Promise<void> {
    await BalanceModel.update(
      { balance: balance.balance, updatedAt: balance.updatedAt },
      { where: { id: balance.id } }
    );
  }

  async findByAccountID(accountId: string): Promise<Balance | null> {
    const balance = await BalanceModel.findOne({ where: { accountId } });

    if (!balance) {
      return null;
    }

    return new Balance({
      id: balance.id,
      accountId: balance.accountId,
      balance: balance.balance,
      updatedAt: balance.updatedAt,
    });
  }
}
