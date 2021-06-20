import {
  Column, BaseEntity, 
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScopeAccess } from "./ScopeAccess";
import { Users } from "./Users";

@Index("UserScopeAccess_FK", ["scopeAccessId"], {})
@Index("UserScopeAccess_FK_1", ["userId"], {})
@Entity("UserScopeAccess")
export class UserScopeAccess extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("enum", {
    name: "status",
    enum: ["ACTIVE", "INACTIVE"],
    default: () => "'ACTIVE'",
  })
  status: "ACTIVE" | "INACTIVE";

  @Column("int", { name: "scopeAccessId" })
  scopeAccessId: number;

  @ManyToOne(
    () => ScopeAccess,
    (scopeAccess) => scopeAccess.userScopeAccesses,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "scopeAccessId", referencedColumnName: "id" }])
  scopeAccess: ScopeAccess;

  @ManyToOne(() => Users, (users) => users.userScopeAccesses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
