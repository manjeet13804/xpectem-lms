import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Expose()
@Entity()
export class UserPhone {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public phone: string;

  @ManyToOne(type => User, user => user.userPhone)
  public user: User;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  create(user: User, phone: string) {
    return new UserPhone({ user, phone });
  }

  constructor(phone: Partial<UserPhone>) {
    !!phone && Object.assign(this, phone);
  }

}
