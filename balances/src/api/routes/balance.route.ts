import express from "express";
import GetBalanceUseCase from "../../usecase/getBalance/getBalance.usecase";
import BalanceRepository from "../../repository/balance.repository";

export const balanceRoute = express.Router();

balanceRoute.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const balanceRepository = new BalanceRepository();
    const getBalanceUseCase = new GetBalanceUseCase(balanceRepository);

    const balance = await getBalanceUseCase.execute(id);
    res.send(balance);
  } catch (error) {
    res.status(400).send(error);
  }
});
