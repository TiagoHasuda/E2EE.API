import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ResetToken } from './reset.token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'char',
    length: 255,
  })
  publicKey: string;

  @OneToMany(_ => ResetToken, resetToken => resetToken.user)
  tokens: ResetToken[]
}
