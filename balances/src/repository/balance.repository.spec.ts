import { Sequelize } from "sequelize-typescript";
import { BalanceModel } from "./balance.model";
import BalanceRepository from "./balance.repository";
import Balance from "../entity/balance.entity";

describe("BalanceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([BalanceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a balance", async () => {
    const date = new Date();
    const balance = new Balance({
      id: "1",
      accountId: "1",
      balance: 100,
      updatedAt: date,
    });
    const repository = new BalanceRepository();

    await repository.add(balance);

    const balanceDb = await BalanceModel.findOne({ where: { id: "1" } });

    expect(balanceDb.id).toBe(balance.id);
    expect(balanceDb.accountId).toBe(balance.accountId);
    expect(balanceDb.balance).toBe(balance.balance);
    expect(balanceDb.updatedAt).toEqual(date);
  });

  it("should find a balance by account id", async () => {
    const date = new Date();
    const balance = await BalanceModel.create({
      id: "1",
      accountId: "account1",
      balance: 100,
      updatedAt: date,
    });

    const repository = new BalanceRepository();

    const result = await repository.findByAccountID("account1");
    expect(result.id).toBe(balance.id);
    expect(result.accountId).toBe(balance.accountId);
    expect(result.balance).toBe(balance.balance);
    expect(result.updatedAt).toEqual(balance.updatedAt);
  });

  it("should update a balance", async () => {
    const date = new Date();
    const balance = new Balance({
      id: "1",
      accountId: "1",
      balance: 100,
      updatedAt: date,
    });
    await BalanceModel.create({
      id: balance.id,
      accountId: balance.accountId,
      balance: balance.balance,
      updatedAt: balance.updatedAt,
    });

    const repository = new BalanceRepository();

    balance.balance = 200;
    await repository.update(balance);

    const balanceDb = await BalanceModel.findOne({ where: { id: "1" } });

    expect(balanceDb.id).toBe(balance.id);
    expect(balanceDb.accountId).toBe(balance.accountId);
    expect(balanceDb.balance).toBe(200);
    expect(balanceDb.updatedAt).toEqual(date);
  });
});
