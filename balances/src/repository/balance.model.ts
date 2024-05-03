import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "balances",
  timestamps: false,
})
export class BalanceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false, field: "account_id" })
  declare accountId: string;

  @Column({ allowNull: false })
  declare balance: number;

  @Column({ allowNull: false, field: "updated_at" })
  declare updatedAt: Date;
}
