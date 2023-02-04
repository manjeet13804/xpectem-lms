import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ContactUs } from './contact-us.entity';

@Entity()
export class ContactUsAttachment {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public uri: string;

  @ManyToOne(type => ContactUs, contactUs => contactUs.contactUsAttachment)
  public contactUs: ContactUs;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  public static create(
    contactUs: ContactUs,
    uri: string,
    ) {
    return new ContactUsAttachment({
      contactUs,
      uri,
    });
  }

  constructor(attachment: Partial<ContactUsAttachment>) {
    !!attachment && Object.assign(
        this,
        attachment,
      );
  }

}
