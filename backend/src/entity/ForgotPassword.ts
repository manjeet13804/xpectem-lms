import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class ForgotPassword {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @ManyToOne(type => User)
  public user: number;

  @Column()
  public token: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

}
