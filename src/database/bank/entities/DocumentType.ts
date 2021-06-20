import { Column, PrimaryGeneratedColumn, BaseEntity,  Entity, OneToMany } from "typeorm";
import { Documents } from "./Documents";

@Entity("DocumentType")
export class DocumentType extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @OneToMany(() => Documents, (documents) => documents.documentType)
  documents: Documents[];
}
