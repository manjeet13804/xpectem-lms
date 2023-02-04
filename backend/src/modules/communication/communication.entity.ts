import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './../../entity/User';
import { Course } from '../../entity/Course';
import { CommunicationDialog } from './communication-dialog.entity';
import { ICreateCommunication } from './communication.interface';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public title: string;

  @ManyToOne(type => Course, course => course.communication)
  public course: Course;

  @ManyToOne(type => User, user => user.communication)
  public user: User;

  @ManyToOne(type => User, tutor => tutor.communication)
  public tutor: User;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  create(data: ICreateCommunication) {
    return new Communication(data);
  }

  constructor(communication: Partial<Communication>) {
    !!communication && Object.assign(this, communication);
  }
}
