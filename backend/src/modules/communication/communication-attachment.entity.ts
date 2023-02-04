import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CommunicationMessage } from './communication-message.entity';
import { CommunicationDialog } from './communication-dialog.entity';

@Entity()
export class CommunicationAttachment {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @ManyToOne(type => CommunicationMessage, communicationMessage => communicationMessage.communicationAttachment)
  public communicationMessage: CommunicationMessage;

  @ManyToOne(type => CommunicationDialog, communicationDialog => communicationDialog.communicationAttachment)
  public communicationDialog: CommunicationDialog;

  @Column({ nullable: true })
  public uri: string;

  @Column({ nullable: true })
  public originalName: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  constructor(file: Partial<CommunicationAttachment>) {
    !!file && Object.assign(this, file);
  }
}
