import {
  Column,
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BankAccounts } from "./BankAccounts";
import { Transactions } from "./Transactions";
import dayjs from "dayjs";

@Index("Transference_FK", ["fromBankAccountId"], {})
@Index("Transference_FK_1", ["toBankAccountId"], {})
@Index("Transference_FK_2", ["depositId"], {})
@Index("Transference_FK_3", ["withdrawId"], {})
@Entity("Transference")
export class Transference extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "fromBankAccountId" })
  fromBankAccountId: number;

  @Column("int", { name: "toBankAccountId" })
  toBankAccountId: number;

  @Column("int", { name: "depositId" })
  depositId: number;

  @Column("int", { name: "withdrawId" })
  withdrawId: number;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description: string | null;

  @Column("double", { name: "amount", precision: 22 })
  amount: number;

  @Column("double", { name: "charge", precision: 22, default: () => "'0'" })
  charge: number;

  @Column("double", { name: "total", precision: 22})
  total: number;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date | null = new Date(dayjs().valueOf());

  @Column("enum", {
    name: "status",
    enum: ["SUCCESS", "DRAFT", "CANCELLED", "REFUNDED"],
    default: () => "'DRAFT'",
  })
  status: "SUCCESS" | "DRAFT" | "CANCELLED" | "REFUNDED";

  @ManyToOne(() => BankAccounts, (bankAccounts) => bankAccounts.transferences, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "fromBankAccountId", referencedColumnName: "id" }])
  fromBankAccount: BankAccounts;

  @ManyToOne(
    () => BankAccounts,
    (bankAccounts) => bankAccounts.transferences2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "toBankAccountId", referencedColumnName: "id" }])
  toBankAccount: BankAccounts;

  @ManyToOne(() => Transactions, (transactions) => transactions.transferences, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "depositId", referencedColumnName: "id" }])
  deposit: Transactions;

  @ManyToOne(
    () => Transactions,
    (transactions) => transactions.transferences2,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "withdrawId", referencedColumnName: "id" }])
  withdraw: Transactions;
}
