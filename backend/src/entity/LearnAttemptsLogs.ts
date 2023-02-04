import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class LearnAttemptsLogs {

  @PrimaryGeneratedColumn()
    public id: number;

  @Column({ nullable: false })
    public token: string;

  @Column()
    public formLearnId: number;

  @Column()
    public type: string;

  @ManyToOne(type => User, user => user.learnTokens, { nullable: false })
    public user: User;
}
