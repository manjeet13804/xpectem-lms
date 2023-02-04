import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Expose()
@Entity()
export class UserLog {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public latestLogin: Date;

  @Column({ nullable: true })
  public operatingSystem: string;

  @Column({ nullable: true })
  public browser: string;

  @ManyToOne(type => User, user => user.userCreatedBy)
  public createdBy: User;

  @ManyToOne(type => User, user => user.userChangedBy)
  public changedBy: User;

  @OneToOne(type => User, user => user.userLog)
  public user: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public updatedAt: Date;

  create(createdBy: User) {
    return new UserLog({ createdBy });
  }

  constructor(userLog: Partial<UserLog>) {
    !!userLog && Object.assign(this, userLog);
  }
}
