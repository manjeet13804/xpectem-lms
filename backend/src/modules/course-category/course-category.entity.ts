import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Course } from '../../entity/Course';

@Entity()
@Expose()
export class CourseCategory {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public readonly id: number;

  @Column()
  @ApiModelProperty()
  public name: string;

  @ManyToMany(
    () => Course,
    course => course.categories,
  )
  public courses: Course[];

  constructor(category: Partial<CourseCategory>) {
    if (category) {
      Object.assign(this, category);
    }
  }
}
