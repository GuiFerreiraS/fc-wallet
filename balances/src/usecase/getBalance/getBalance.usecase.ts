import BalanceRepository from "../../repository/balance.repository";
import { GetBalanceOutputDTO } from "./getBalance.dto";

export default class GetBalanceUseCase {
  private _balanceRepository: BalanceRepository;

  constructor(balanceRepository: BalanceRepository) {
    this._balanceRepository = balanceRepository;
  }

  async execute(accountId: string): Promise<GetBalanceOutputDTO> {
    const balance = await this._balanceRepository.findByAccountID(accountId);

    if (!balance) {
      throw new Error("Balance not found");
    }

    return {
      id: balance.id,
      accountId: balance.accountId,
      balance: balance.balance,
      updatedAt: balance.updatedAt,
    };
  }
}
