import UpdateBalanceUseCase from "./updateBalance.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  update: jest.fn(),
  findByAccountID: jest.fn().mockReturnValue(Promise.resolve(null)),
});

describe("Update balance use case unit test", () => {
  it("should update the balance", async () => {
    const repository = MockRepository();
    const useCase = new UpdateBalanceUseCase(repository);
    const input = {
      account_id_from: "account_id_from",
      account_id_to: "account_id_to",
      balance_account_id_from: 100,
      balance_account_id_to: 200,
    };
    await useCase.execute(input);

    expect(repository.add).toHaveBeenCalledTimes(2);
    expect(repository.update).toHaveBeenCalledTimes(0);
    expect(repository.findByAccountID).toHaveBeenCalledTimes(2);
  });
});
