import express from "express";
import { balanceRoute } from "./api/routes/balance.route";
const mysql = require("mysql2/promise");
import { Sequelize } from "sequelize-typescript";
import { BalanceModel } from "./repository/balance.model";
import { Kafka } from "kafkajs";
import UpdateBalanceKafkaHandler from "./event/handler/updateBalanceKafka.handle";

const app = express();
app.use(express.json());
app.use("/balances", balanceRoute);

const setupDB = async () => {
  const baseConfig = {
    dialect: "mysql" as "mysql",
    username: "root",
    password: "root",
    host: "mysql",
    port: 3306,
  };

  const connection = await mysql.createConnection({
    host: baseConfig.host,
    port: baseConfig.port,
    user: baseConfig.username,
    password: baseConfig.password,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS balances`);

  let sequelize = new Sequelize({
    database: "balances",
    ...baseConfig,
  });

  sequelize.addModels([BalanceModel]);

  await sequelize.sync();
};

const kafka = new Kafka({
  clientId: "balance",
  brokers: ["kafka:29092"],
});

const consumer = kafka.consumer({ groupId: "wallet" });

const runKafka = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "balances", fromBeginning: true });

  const updateBalanceKafkaHandler = new UpdateBalanceKafkaHandler();

  await consumer.run({
    eachMessage: updateBalanceKafkaHandler.handle,
  });
};

setupDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
    runKafka().then(() => {
      console.log("Kafka is running");
    });
  });
});
