import { Column, BaseEntity,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BankAccounts } from "./BankAccounts";

@Entity("BankAccountTypes")
export class BankAccountTypes extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "LABEL", length: 100 })
  label: string;

  @Column("varchar", { name: "VALUE", length: 100 })
  value: string;

  @OneToMany(() => BankAccounts, (bankAccounts) => bankAccounts.accountType)
  bankAccounts: BankAccounts[];
}
