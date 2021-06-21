import {
  Column,
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import dayjs from 'dayjs'

import { TransactionTypes } from "./TransactionTypes";
import { BankAccounts } from "./BankAccounts";
import { Transference } from "./Transference";


@Index("Transactions_FK", ["transactionTypeId"], {})
@Index("Transactions_FK_1", ["bankAccountId"], {})
@Entity("Transactions")
export class Transactions extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "bankAccountId" })
  bankAccountId: number;

  @Column("double", { name: "amount", precision: 22 })
  amount: number;

  @Column("int", { name: "balance" })
  balance: number;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description: string | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date | null = new Date(dayjs().valueOf());

  @Column("enum", {
    name: "status",
    enum: ["SUCCESS", "DRAFT", "CANCELLED"],
    default: () => "'SUCCESS'",
  })
  status: "SUCCESS" | "DRAFT" | "CANCELLED";

  @Column("enum", {
    name: "actionType",
    enum: ["CREDIT", "DEBIT"],
    default: () => "'CREDIT'",
  })
  actionType: "CREDIT" | "DEBIT";

  @Column("int", { name: "transactionTypeId" })
  transactionTypeId: number;

  @ManyToOne(
    () => TransactionTypes,
    (transactionTypes) => transactionTypes.transactions,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "transactionTypeId", referencedColumnName: "id" }])
  transactionType: TransactionTypes;

  @ManyToOne(() => BankAccounts, (bankAccounts) => bankAccounts.transactions, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "bankAccountId", referencedColumnName: "id" }])
  bankAccount: BankAccounts;

  @OneToMany(() => Transference, (transference) => transference.deposit)
  transferences: Transference[];

  @OneToMany(() => Transference, (transference) => transference.withdraw)
  transferences2: Transference[];
}