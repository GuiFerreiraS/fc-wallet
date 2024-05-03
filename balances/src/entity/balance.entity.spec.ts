import Balance from "./balance.entity";

describe("Balance unity tests", () => {
  it("should throw error when accountId is empty", () => {
    expect(() => {
      let balance = new Balance({
        accountId: "",
        balance: 100,
        updatedAt: new Date(),
      });
    }).toThrow("Account id is required");
  });
});
