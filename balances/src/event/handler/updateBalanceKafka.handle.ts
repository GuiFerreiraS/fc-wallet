import { EachMessageHandler, EachMessagePayload } from "kafkajs";
import UpdateBalanceUseCase from "../../usecase/updateBalance/updateBalance.usecase";
import BalanceRepository from "../../repository/balance.repository";
import { UpdateBalanceInputDTO } from "../../usecase/updateBalance/updateBalance.dto";

interface KafkaHandlerInterface {
  handle: EachMessageHandler;
}

export default class UpdateBalanceKafkaHandler
  implements KafkaHandlerInterface
{
  async handle(payload: EachMessagePayload) {
    const balanceRepository = new BalanceRepository();
    const updateBalanceUseCase = new UpdateBalanceUseCase(balanceRepository);

    const input: UpdateBalanceInputDTO = JSON.parse(
      payload?.message?.value?.toString()
    )?.Payload;

    console.log({ input });

    updateBalanceUseCase.execute(input);
  }
}
