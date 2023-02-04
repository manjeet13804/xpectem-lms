import { Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Expose()
export class CourseMedia {
  @Column({ nullable: true })
  @ApiModelProperty()
  public info: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  public hasPhysical: boolean;
}
