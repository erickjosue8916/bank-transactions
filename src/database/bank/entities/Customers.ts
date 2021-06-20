import { Column, BaseEntity,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BankAccounts } from "./BankAccounts";
import { Documents } from "./Documents";

@Entity("Customers")
export class Customers extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "firstName", length: 100 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 100 })
  lastName: string;

  @Column("varchar", { name: "phoneNumber", length: 100 })
  phoneNumber: string;

  @Column("int", { name: "createAt", nullable: true, unsigned: true })
  createAt: number | null;

  @Column("int", { name: "dateBirth", nullable: true, unsigned: true })
  dateBirth: number | null;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "username", length: 100 })
  username: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("enum", {
    name: "status",
    enum: ["ACTIVE", "INACTIVE", "DELETED", "BLOKED"],
    default: () => "'ACTIVE'",
  })
  status: "ACTIVE" | "INACTIVE" | "DELETED" | "BLOKED";

  @OneToMany(() => BankAccounts, (bankAccounts) => bankAccounts.customer)
  bankAccounts: BankAccounts[];

  @OneToMany(() => Documents, (documents) => documents.customer)
  documents: Documents[];
}
