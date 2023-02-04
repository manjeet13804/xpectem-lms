import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Expose()
@Entity()
export class UserEmail {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public welcomeEmailSent: Date;

  @ManyToOne(type => User, user => user.userEmail)
  public user: User;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  create(user: User, email: string, welcomeEmailSent: Date) {
    return new UserEmail({ user, email, welcomeEmailSent });
  }

  constructor(email: Partial<UserEmail>) {
    !!email && Object.assign(this, email);
  }

}
