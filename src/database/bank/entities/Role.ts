import { Column, BaseEntity,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleScopeAccess } from "./RoleScopeAccess";

@Entity("Role")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("enum", {
    name: "status",
    enum: ["ACTIVE", "INACTIVE"],
    default: () => "'ACTIVE'",
  })
  status: "ACTIVE" | "INACTIVE";

  @OneToMany(() => RoleScopeAccess, (roleScopeAccess) => roleScopeAccess.role)
  roleScopeAccesses: RoleScopeAccess[];
}
