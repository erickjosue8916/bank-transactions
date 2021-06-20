import { Column, BaseEntity,  Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserScopeAccess } from "./UserScopeAccess";

@Entity("Users")
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "username", length: 100 })
  username: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("enum", {
    name: "status",
    enum: ["ACTIVE", "INACTIVE", "DELETED"],
    default: () => "'ACTIVE'",
  })
  status: "ACTIVE" | "INACTIVE" | "DELETED";

  @OneToMany(() => UserScopeAccess, (userScopeAccess) => userScopeAccess.user)
  userScopeAccesses: UserScopeAccess[];
}
