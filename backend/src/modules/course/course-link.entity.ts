import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Course } from '../../entity/Course';
import { ApiModelProperty } from '@nestjs/swagger';

@Expose()
@Entity()
@Unique(['course', 'order'])
export class CourseLink {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Exclude()
  @ManyToOne(() => Course, course => course.links)
  public course: Course;

  @Column()
  @ApiModelProperty()
  public url: string;

  @Exclude()
  @Column()
  public order: number;
}
