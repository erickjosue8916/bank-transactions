import {
  Column, BaseEntity, 
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { ScopeAccess } from "./ScopeAccess";

@Index("RoleScopeAccess_FK", ["roleId"], {})
@Index("RoleScopeAccess_FK_1", ["scopeAccessId"], {})
@Entity("RoleScopeAccess")
export class RoleScopeAccess extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "roleId" })
  roleId: number;

  @Column("int", { name: "scopeAccessId" })
  scopeAccessId: number;

  @ManyToOne(() => Role, (role) => role.roleScopeAccesses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
  role: Role;

  @ManyToOne(
    () => ScopeAccess,
    (scopeAccess) => scopeAccess.roleScopeAccesses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "scopeAccessId", referencedColumnName: "id" }])
  scopeAccess: ScopeAccess;
}
