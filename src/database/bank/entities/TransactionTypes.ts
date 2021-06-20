import { Column, BaseEntity,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./Transactions";

@Entity("TransactionTypes")
export class TransactionTypes extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "label", length: 100 })
  label: string;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("varchar", { name: "description", length: 100 })
  description: string;

  @Column("enum", {
    name: "group",
    enum: ["DEPOSITS", "WITHDRAWS", "TRANSAFERS"],
    default: () => "'DEPOSITS'",
  })
  group: "DEPOSITS" | "WITHDRAWS" | "TRANSAFERS";

  @OneToMany(() => Transactions, (transactions) => transactions.transactionType)
  transactions: Transactions[];
}
