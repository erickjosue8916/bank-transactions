import { Column, BaseEntity,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleScopeAccess } from "./RoleScopeAccess";
import { UserScopeAccess } from "./UserScopeAccess";

@Entity("ScopeAccess")
export class ScopeAccess extends BaseEntity {
  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @OneToMany(
    () => RoleScopeAccess,
    (roleScopeAccess) => roleScopeAccess.scopeAccess
  )
  roleScopeAccesses: RoleScopeAccess[];

  @OneToMany(
    () => UserScopeAccess,
    (userScopeAccess) => userScopeAccess.scopeAccess
  )
  userScopeAccesses: UserScopeAccess[];
}
