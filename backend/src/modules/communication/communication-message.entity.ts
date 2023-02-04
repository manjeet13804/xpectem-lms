import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './../../entity/User';
import { CommunicationAttachment } from './communication-attachment.entity';
import { CommunicationDialog } from './communication-dialog.entity';

@Entity()
export class CommunicationMessage {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @ManyToOne(type => CommunicationDialog, communicationDialog => communicationDialog.communicationMessage)
  public communicationDialog: CommunicationDialog;

  @ManyToOne(type => User, user => user.communicationMessage)
  public author: User;

  @Column({ type: 'text' })
  public message: string;

  @Column({ default: false })
  public isChecked: boolean;

  @Column({ default: false })
  public isAdminChecked: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @OneToMany(type => CommunicationAttachment, communicationAttachment => communicationAttachment.communicationMessage)
  public communicationAttachment: CommunicationAttachment[];

  constructor(message: Partial<CommunicationMessage>) {
    !!message && Object.assign(this, message);
  }

}
