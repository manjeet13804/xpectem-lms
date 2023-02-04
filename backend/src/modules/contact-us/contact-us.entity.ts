import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './../../entity/User';
import { Course } from '../../entity/Course';
import { ContactUsAttachment } from './contact-us-attachment.entity';

@Entity()
export class ContactUs {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public message: string;

  @ManyToOne(type => Course, course => course.contactUs)
  public course: Course;

  @ManyToOne(type => User, user => user.contactUs)
  public user: User;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @OneToMany(type => ContactUsAttachment, contactUsAttachment => contactUsAttachment.contactUs)
  public contactUsAttachment: ContactUsAttachment[];

  public static create(
      message: string,
      user: User,
      course?: Course,
      ) {
    return new ContactUs({
      message,
      user,
      course: course || null,
    });
  }

  constructor(contact: Partial<ContactUs>) {
    !!contact && Object.assign(
          this,
          contact,
        );
  }
}
