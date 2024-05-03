import Balance from "../../entity/balance.entity";
import BalanceRepository from "../../repository/balance.repository";
import { UpdateBalanceInputDTO } from "./updateBalance.dto";

export default class UpdateBalanceUseCase {
  private _balanceRepository: BalanceRepository;

  constructor(balanceRepository: BalanceRepository) {
    this._balanceRepository = balanceRepository;
  }

  async execute(input: UpdateBalanceInputDTO) {
    console.log("usecase input", input);
    const balanceAccountFrom = await this._balanceRepository.findByAccountID(
      input.account_id_from
    );
    if (balanceAccountFrom) {
      balanceAccountFrom.updatedAt = new Date();
      balanceAccountFrom.balance = input.balance_account_id_from;
      await this._balanceRepository.update(balanceAccountFrom);
    } else {
      await this._balanceRepository.add(
        new Balance({
          accountId: input.account_id_from,
          balance: input.balance_account_id_from,
          updatedAt: new Date(),
        })
      );
    }

    const balanceAccountTo = await this._balanceRepository.findByAccountID(
      input.account_id_to
    );
    if (balanceAccountTo) {
      balanceAccountTo.updatedAt = new Date();
      balanceAccountTo.balance = input.balance_account_id_to;
      await this._balanceRepository.update(balanceAccountTo);
    } else {
      await this._balanceRepository.add(
        new Balance({
          accountId: input.account_id_to,
          balance: input.balance_account_id_to,
          updatedAt: new Date(),
        })
      );
    }
  }
}
