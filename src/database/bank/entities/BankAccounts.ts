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
import { Customers } from "./Customers";
import { BankAccountTypes } from "./BankAccountTypes";
import { Transactions } from "./Transactions";
import { Transference } from "./Transference";
import dayjs from "dayjs";

@Index("BankAccounts_FK", ["customerId"], {})
@Index("BankAccounts_FK_1", ["accountTypeId"], {})
@Entity("BankAccounts")
export class BankAccounts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date | null = new Date(dayjs().valueOf());

  @Column("int", { name: "customerId" })
  customerId: number;

  @Column("enum", {
    name: "status",
    enum: ["ACTIVE", "INACTIVE", "BLOKED", "DELETED"],
    default: () => "'ACTIVE'",
  })
  status: "ACTIVE" | "INACTIVE" | "BLOKED" | "DELETED";

  @Column("int", { name: "balance", unsigned: true, default: () => "'0'" })
  balance: number;

  @Column("int", { name: "accountTypeId" })
  accountTypeId: number;

  @ManyToOne(() => Customers, (customers) => customers.bankAccounts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customers;

  @ManyToOne(
    () => BankAccountTypes,
    (bankAccountTypes) => bankAccountTypes.bankAccounts,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "accountTypeId", referencedColumnName: "id" }])
  accountType: BankAccountTypes;

  @OneToMany(() => Transactions, (transactions) => transactions.bankAccount)
  transactions: Transactions[];

  @OneToMany(() => Transference, (transference) => transference.fromBankAccount)
  transferences: Transference[];

  @OneToMany(() => Transference, (transference) => transference.toBankAccount)
  transferences2: Transference[];
}
