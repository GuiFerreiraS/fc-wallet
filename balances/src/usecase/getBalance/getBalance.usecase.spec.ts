import Balance from "../../entity/balance.entity";
import GetBalanceUseCase from "./getBalance.usecase";

const balanceMock = new Balance({
  id: "1",
  accountId: "account1",
  balance: 101,
  updatedAt: new Date(),
});

const MockRepository = () => ({
  add: jest.fn(),
  update: jest.fn(),
  findByAccountID: jest.fn().mockReturnValue(Promise.resolve(balanceMock)),
});

describe("Get balance use case unit test", () => {
  it("should get the balance by account id", async () => {
    const repository = MockRepository();
    const useCase = new GetBalanceUseCase(repository);

    const result = await useCase.execute("account1");

    expect(repository.findByAccountID).toHaveBeenCalledTimes(1);
    expect(result.id).toBe(balanceMock.id);
    expect(result.accountId).toBe(balanceMock.accountId);
    expect(result.balance).toBe(balanceMock.balance);
    expect(result.updatedAt).toBe(balanceMock.updatedAt);
  });
});
