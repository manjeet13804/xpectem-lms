import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CommunicationMessage } from './communication-message.entity';
import { Communication } from './communication.entity';
import { CommunicationAttachment } from './communication-attachment.entity';
import { User } from '../../entity/User';
import { Course } from '../../entity/Course';

@Entity()
export class CommunicationDialog {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  public heading: string;

  @Column({ type: 'text' })
  public message: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @OneToMany(type => CommunicationMessage, communicationMessage => communicationMessage.communicationDialog)
  public communicationMessage: CommunicationMessage[];

  @OneToMany(type => CommunicationAttachment, communicationAttachment => communicationAttachment.communicationDialog)
  public communicationAttachment: CommunicationAttachment[];

  @ManyToOne(type => User, user => user.communicationDialog)
  public author: User;

  @ManyToOne(type => Course, course => course.communicationDialog)
  public course: Course

  @ManyToOne(type => User, user => user.communicationDialog)
  public accepter: User;

  @ManyToOne(type => User, user => user.communicationDialog)
  public lastAnswerAdmin: User;

  @Column({ default: false })
  public isClosed: boolean;

  @Column({ default: false })
  public isCompleted: boolean;

  constructor(dialog: Partial<CommunicationDialog>) {
    !!dialog && Object.assign(this, dialog);
  }

}
