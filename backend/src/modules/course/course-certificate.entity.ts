import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Course } from '../../entity/Course';

@Entity()
export class CourseCertificate {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiModelProperty({ nullable: true })
  public gradeText: string;

  @Column()
  @ApiModelProperty({ nullable: true })
  public dontShowExams: boolean;

  @Column()
  @ApiModelProperty({ nullable: true })
  public signatures: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public courseName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiModelProperty({ nullable: true })
  public content: string;

  @Column()
  @ApiModelProperty()
  public url: string;

  @Column()
  @ApiModelProperty()
  public originalName: string;

  @OneToMany(type => Course, course => course.courseCertificate)
  @ApiModelProperty()
  public course: Course[];

  constructor(certificate: Partial<CourseCertificate>) {
    !!certificate && Object.assign(this, certificate);
  }
}
