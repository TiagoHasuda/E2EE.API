import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ResetToken {
  @Column({
    nullable: false,
    type: 'char',
    length: 6,
  })
  token: string

  @PrimaryColumn()
  userId: string

  @ManyToOne(_ => User, user => user.tokens)
  user: User
}