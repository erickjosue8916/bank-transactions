import {
  Column, BaseEntity, 
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentType } from "./DocumentType";
import { Customers } from "./Customers";

@Index("Documents_FK", ["documentTypeId"], {})
@Index("Documents_FK_1", ["customerId"], {})
@Entity("Documents")
export class Documents extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "documentTypeId" })
  documentTypeId: number;

  @Column("int", { name: "customerId" })
  customerId: number;

  @Column("varchar", { name: "value", length: 100 })
  value: string;

  @Column("varchar", { name: "url", length: 100 })
  url: string;

  @ManyToOne(() => DocumentType, (documentType) => documentType.documents, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "documentTypeId", referencedColumnName: "id" }])
  documentType: DocumentType;

  @ManyToOne(() => Customers, (customers) => customers.documents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customers;
}
